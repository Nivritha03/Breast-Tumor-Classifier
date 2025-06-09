import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Global variables
model = None
scaler = None
feature_names = None

def load_models():
    """Load the trained model and scaler"""
    global model, scaler, feature_names
    
    try:
        # Use absolute paths - update this to your actual project path
        base_path = r"D:\Nivritha\Projects\Skillfied_Projects\Breast_Cancer_prediction\breast-cancer-prediction-app2\scripts"
        
        model_path = os.path.join(base_path, 'model.pkl')
        scaler_path = os.path.join(base_path, 'scaler.pkl')
        feature_names_path = os.path.join(base_path, 'feature_names.pkl')
        
        print(f"Looking for models in: {base_path}")
        print(f"Model path: {model_path}")
        print(f"Model exists: {os.path.exists(model_path)}")
        print(f"Scaler path: {scaler_path}")
        print(f"Scaler exists: {os.path.exists(scaler_path)}")
        
        if not os.path.exists(model_path):
            print(f"ERROR: model.pkl not found at {model_path}")
            # List all files in the directory
            print("Files in scripts directory:")
            for file in os.listdir(base_path):
                print(f"  - {file}")
            return False
            
        if not os.path.exists(scaler_path):
            print(f"ERROR: scaler.pkl not found at {scaler_path}")
            return False
        
        # Load model
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        print("✓ Model loaded successfully")
        
        # Load scaler
        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)
        print("✓ Scaler loaded successfully")
        
        # Load feature names (with fallback)
        if os.path.exists(feature_names_path):
            with open(feature_names_path, 'rb') as f:
                feature_names = pickle.load(f)
            print("✓ Feature names loaded successfully")
        else:
            # Use default feature names
            feature_names = [
                'mean radius', 'mean texture', 'mean perimeter', 'mean area',
                'mean smoothness', 'mean compactness', 'mean concavity',
                'mean concave points', 'mean symmetry', 'mean fractal dimension',
                'radius error', 'texture error', 'perimeter error', 'area error',
                'smoothness error', 'compactness error', 'concavity error',
                'concave points error', 'symmetry error', 'fractal dimension error',
                'worst radius', 'worst texture', 'worst perimeter', 'worst area',
                'worst smoothness', 'worst compactness', 'worst concavity',
                'worst concave points', 'worst symmetry', 'worst fractal dimension'
            ]
            print("✓ Using default feature names")
        
        print(f"Total features expected: {len(feature_names)}")
        return True
        
    except Exception as e:
        print(f"Error loading models: {e}")
        import traceback
        traceback.print_exc()
        return False

@app.route('/predict', methods=['POST'])
def predict():
    """Make prediction using the loaded model"""
    if model is None or scaler is None:
        return jsonify({'error': 'Models not loaded'}), 500
    
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        
        # Create feature array in the correct order
        features = []
        for feature_name in feature_names:
            # Convert feature name format (e.g., 'mean radius' -> 'mean_radius')
            key = feature_name.replace(' ', '_')
            if key in data:
                features.append(float(data[key]))
            else:
                # If feature is missing, use a default value
                print(f"Warning: Missing feature {key}, using default value 0")
                features.append(0.0)
        
        # Convert to numpy array and reshape
        features_array = np.array(features).reshape(1, -1)
        print(f"Features array shape: {features_array.shape}")
        
        # Scale the features
        features_scaled = scaler.transform(features_array)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        prediction_proba = model.predict_proba(features_scaled)[0]
        
        # Calculate confidence
        confidence = max(prediction_proba) * 100
        
        # Generate risk factors and recommendations
        measurements = {feature_names[i]: features[i] for i in range(len(features))}
        risk_factors = generate_risk_factors(measurements, prediction_proba)
        recommendations = generate_recommendations(prediction, confidence)
        
        result = {
            'prediction': int(prediction),  # 0 = Malignant, 1 = Benign
            'prediction_label': 'Benign' if prediction == 1 else 'Malignant',
            'confidence': round(confidence, 2),
            'probability': {
                'malignant': round(prediction_proba[0] * 100, 2),
                'benign': round(prediction_proba[1] * 100, 2)
            },
            'risk_factors': risk_factors,
            'recommendations': recommendations
        }
        
        print(f"Prediction result: {result}")
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

def generate_risk_factors(measurements, prediction_proba):
    """Generate risk factors based on measurements"""
    risk_factors = []
    
    # Define thresholds based on domain knowledge
    thresholds = {
        'mean radius': 14.0,
        'mean texture': 19.0,
        'mean perimeter': 92.0,
        'mean area': 654.0,
        'mean smoothness': 0.096,
        'mean compactness': 0.104,
        'mean concavity': 0.089,
        'mean concave points': 0.048,
        'mean symmetry': 0.181,
        'mean fractal dimension': 0.063
    }
    
    for feature, threshold in thresholds.items():
        if feature in measurements:
            if measurements[feature] > threshold:
                risk_factors.append(f"Elevated {feature.replace('mean ', '')}")
    
    if len(risk_factors) == 0:
        if prediction_proba[1] > 0.7:  # Benign with high confidence
            risk_factors = ["Normal tissue characteristics", "Regular cell structure", "Low risk indicators"]
        else:
            risk_factors = ["Some irregular patterns detected"]
    
    return risk_factors

def generate_recommendations(prediction, confidence):
    """Generate medical recommendations"""
    if prediction == 0:  # Malignant
        return [
            "Immediate consultation with oncologist required",
            "Additional imaging studies recommended", 
            "Tissue biopsy confirmation needed",
            "Discuss treatment options with medical team"
        ]
    else:  # Benign
        if confidence < 85:
            return [
                "Regular monitoring recommended",
                "Follow-up imaging in 6 months",
                "Consider additional diagnostic tests if symptoms persist",
                "Maintain healthy lifestyle"
            ]
        else:
            return [
                "Continue routine screening schedule",
                "Annual mammography recommended",
                "Maintain healthy lifestyle",
                "Report any changes to physician"
            ]

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Breast Cancer Prediction API',
        'version': '1.0.0',
        'models_loaded': model is not None and scaler is not None
    })

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    return jsonify({
        'model_type': type(model).__name__,
        'n_features': len(feature_names) if feature_names else 0,
        'feature_names': feature_names[:10] if feature_names else [],
        'total_features': len(feature_names) if feature_names else 0
    })

if __name__ == '__main__':
    print("Starting Flask server...")
    print(f"Current working directory: {os.getcwd()}")
    
    if load_models():
        print("✓ All models loaded successfully!")
        print("Server starting on http://localhost:5000")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("✗ Failed to load models.")
