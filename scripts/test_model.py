import pickle
import numpy as np

# Load the model and scaler
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

print(f"Model type: {type(model)}")
print(f"Model loaded successfully!")

# Test with sample data (30 features for breast cancer dataset)
sample_data = np.random.rand(1, 30)  # Replace with actual feature values
scaled_data = scaler.transform(sample_data)
prediction = model.predict(scaled_data)
probability = model.predict_proba(scaled_data)

print(f"Sample prediction: {prediction[0]}")
print(f"Probabilities: {probability[0]}")
