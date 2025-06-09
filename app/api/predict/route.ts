import { type NextRequest, NextResponse } from "next/server"

// Mock prediction function - in production, this would call your Python model
async function makePrediction(measurements: Record<string, number>) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple heuristic for demo - replace with actual model inference
  const {
    radius_mean,
    texture_mean,
    perimeter_mean,
    area_mean,
    smoothness_mean,
    compactness_mean,
    concavity_mean,
    concave_points_mean,
    symmetry_mean,
    fractal_dimension_mean,
  } = measurements

  // Calculate a risk score based on key features
  let riskScore = 0

  // Higher values generally indicate higher risk
  if (radius_mean > 15) riskScore += 2
  if (texture_mean > 20) riskScore += 1.5
  if (perimeter_mean > 100) riskScore += 2
  if (area_mean > 800) riskScore += 2.5
  if (smoothness_mean > 0.12) riskScore += 1
  if (compactness_mean > 0.15) riskScore += 1.5
  if (concavity_mean > 0.15) riskScore += 2
  if (concave_points_mean > 0.08) riskScore += 1.5
  if (symmetry_mean > 0.2) riskScore += 1
  if (fractal_dimension_mean > 0.07) riskScore += 1

  const isMalignant = riskScore > 6
  const confidence = Math.min(95, Math.max(75, 75 + riskScore * 2))

  return {
    prediction: isMalignant ? "M" : "B",
    confidence: Math.round(confidence),
    risk_score: riskScore,
    probabilities: {
      malignant: isMalignant ? confidence / 100 : (100 - confidence) / 100,
      benign: isMalignant ? (100 - confidence) / 100 : confidence / 100,
    },
  }
}

function generateRiskFactors(measurements: Record<string, number>, prediction: string) {
  const factors = []

  if (measurements.radius_mean > 15) {
    factors.push("Large tumor radius detected")
  }
  if (measurements.texture_mean > 20) {
    factors.push("High texture variation")
  }
  if (measurements.perimeter_mean > 100) {
    factors.push("Irregular tumor perimeter")
  }
  if (measurements.area_mean > 800) {
    factors.push("Large tumor area")
  }
  if (measurements.concavity_mean > 0.15) {
    factors.push("High concavity values")
  }
  if (measurements.compactness_mean > 0.15) {
    factors.push("High compactness")
  }

  if (factors.length === 0) {
    if (prediction === "B") {
      factors.push("Normal cell structure patterns")
      factors.push("Regular tumor boundaries")
      factors.push("Low asymmetry values")
    } else {
      factors.push("Multiple risk indicators present")
    }
  }

  return factors
}

function generateRecommendations(prediction: string, confidence: number) {
  if (prediction === "M") {
    return [
      "Immediate consultation with oncologist required",
      "Additional imaging studies recommended",
      "Tissue biopsy confirmation needed",
      "Discuss treatment options with medical team",
    ]
  } else {
    if (confidence < 85) {
      return [
        "Regular monitoring recommended",
        "Follow-up imaging in 6 months",
        "Consider additional diagnostic tests",
        "Maintain healthy lifestyle",
      ]
    } else {
      return [
        "Continue routine screening schedule",
        "Annual mammography recommended",
        "Maintain healthy lifestyle",
        "Report any changes to physician",
      ]
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { measurements } = body

    // Validate input
    if (!measurements || typeof measurements !== "object") {
      return NextResponse.json({ error: "Invalid measurements data" }, { status: 400 })
    }

    // Required fields
    const requiredFields = [
      "radius_mean",
      "texture_mean",
      "perimeter_mean",
      "area_mean",
      "smoothness_mean",
      "compactness_mean",
      "concavity_mean",
      "concave_points_mean",
      "symmetry_mean",
      "fractal_dimension_mean",
    ]

    // Check if all required fields are present and valid
    for (const field of requiredFields) {
      if (!(field in measurements) || isNaN(Number(measurements[field]))) {
        return NextResponse.json({ error: `Invalid or missing field: ${field}` }, { status: 400 })
      }
    }

    // Convert to numbers
    const numericMeasurements: Record<string, number> = {}
    for (const [key, value] of Object.entries(measurements)) {
      numericMeasurements[key] = Number(value)
    }

    // Make prediction
    const result = await makePrediction(numericMeasurements)

    // Generate additional insights
    const riskFactors = generateRiskFactors(numericMeasurements, result.prediction)
    const recommendations = generateRecommendations(result.prediction, result.confidence)

    const response = {
      prediction: result.prediction,
      confidence: result.confidence,
      risk_factors: riskFactors,
      recommendations: recommendations,
      probabilities: result.probabilities,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Breast Cancer Prediction API",
    version: "1.0.0",
    endpoints: {
      predict: "POST /api/predict",
    },
  })
}
