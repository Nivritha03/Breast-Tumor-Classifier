"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Activity, AlertCircle, CheckCircle, Loader2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface TumorMeasurements {
  radius_mean: string
  texture_mean: string
  perimeter_mean: string
  area_mean: string
  smoothness_mean: string
  compactness_mean: string
  concavity_mean: string
  concave_points_mean: string
  symmetry_mean: string
  fractal_dimension_mean: string
}

interface PredictionResult {
  prediction: "M" | "B"
  confidence: number
  risk_factors: string[]
  recommendations: string[]
  probabilities: {
    malignant: number
    benign: number
  }
  timestamp: string
}

export default function PredictionPage() {
  const [measurements, setMeasurements] = useState<TumorMeasurements>({
    radius_mean: "",
    texture_mean: "",
    perimeter_mean: "",
    area_mean: "",
    smoothness_mean: "",
    compactness_mean: "",
    concavity_mean: "",
    concave_points_mean: "",
    symmetry_mean: "",
    fractal_dimension_mean: "",
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof TumorMeasurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }))
    setError(null) // Clear error when user starts typing
  }

  const isFormValid = Object.values(measurements).every((value) => value.trim() !== "" && !isNaN(Number(value)))

  const performAnalysis = async () => {
    setIsAnalyzing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      // Make API call to backend
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          measurements: measurements,
        }),
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Prediction failed")
      }

      const predictionResult: PredictionResult = await response.json()

      // Small delay to show 100% progress
      await new Promise((resolve) => setTimeout(resolve, 500))

      setResult(predictionResult)
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const measurementFields = [
    { key: "radius_mean", label: "Radius Mean", unit: "mm", icon: Activity, color: "blue", placeholder: "14.5" },
    { key: "texture_mean", label: "Texture Mean", unit: "", icon: TrendingUp, color: "green", placeholder: "19.2" },
    {
      key: "perimeter_mean",
      label: "Perimeter Mean",
      unit: "mm",
      icon: Activity,
      color: "purple",
      placeholder: "92.0",
    },
    { key: "area_mean", label: "Area Mean", unit: "mm²", icon: TrendingUp, color: "pink", placeholder: "655" },
    {
      key: "smoothness_mean",
      label: "Smoothness Mean",
      unit: "",
      icon: Activity,
      color: "indigo",
      placeholder: "0.096",
    },
    {
      key: "compactness_mean",
      label: "Compactness Mean",
      unit: "",
      icon: TrendingUp,
      color: "red",
      placeholder: "0.104",
    },
    { key: "concavity_mean", label: "Concavity Mean", unit: "", icon: Activity, color: "orange", placeholder: "0.089" },
    {
      key: "concave_points_mean",
      label: "Concave Points Mean",
      unit: "",
      icon: TrendingUp,
      color: "teal",
      placeholder: "0.048",
    },
    { key: "symmetry_mean", label: "Symmetry Mean", unit: "", icon: Activity, color: "cyan", placeholder: "0.181" },
    {
      key: "fractal_dimension_mean",
      label: "Fractal Dimension Mean",
      unit: "",
      icon: TrendingUp,
      color: "violet",
      placeholder: "0.063",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full opacity-10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-56 h-56 bg-pink-200 rounded-full opacity-10"
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/patient-details">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient Details</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
            <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
            <span className="text-sm text-gray-500 ml-2">Step 2 of 2</span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(168, 85, 247, 0.4)",
                  "0 0 0 15px rgba(168, 85, 247, 0)",
                  "0 0 0 0 rgba(168, 85, 247, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Tumor Analysis</h1>
            <p className="text-gray-600">Enter the tumor measurements for AI-powered prediction</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-xl text-gray-700">Tumor Measurements</CardTitle>
                    <p className="text-sm text-gray-500">Please enter all measurements accurately</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {measurementFields.map((field, index) => {
                        const Icon = field.icon
                        return (
                          <motion.div
                            key={field.key}
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Label htmlFor={field.key} className="flex items-center space-x-2">
                              <Icon className={`w-4 h-4 text-${field.color}-500`} />
                              <span>{field.label}</span>
                              {field.unit && <span className="text-xs text-gray-400">({field.unit})</span>}
                            </Label>
                            <Input
                              id={field.key}
                              type="number"
                              step="0.001"
                              placeholder={field.placeholder}
                              value={measurements[field.key as keyof TumorMeasurements]}
                              onChange={(e) => handleInputChange(field.key as keyof TumorMeasurements, e.target.value)}
                              className={`border-2 focus:border-${field.color}-400 transition-colors`}
                            />
                          </motion.div>
                        )
                      })}
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-700">{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4 pt-6 border-t"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                          <span className="text-gray-600">Analyzing tumor characteristics...</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                        <p className="text-center text-sm text-gray-500">{progress}% Complete</p>
                      </motion.div>
                    )}

                    <motion.div
                      className="pt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={performAnalysis}
                        disabled={!isFormValid || isAnalyzing}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Analyzing...
                          </>
                        ) : (
                          "Start Analysis"
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Main Result Card */}
                <Card className={`shadow-xl border-0 ${result.prediction === "M" ? "bg-red-50" : "bg-green-50"}`}>
                  <CardContent className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                        result.prediction === "M" ? "bg-red-100" : "bg-green-100"
                      }`}
                    >
                      {result.prediction === "M" ? (
                        <AlertCircle className="w-10 h-10 text-red-600" />
                      ) : (
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      )}
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`text-3xl font-bold mb-2 ${
                        result.prediction === "M" ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      {result.prediction === "M" ? "Malignant Tumor Detected" : "Benign Tumor Detected"}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-600 mb-4"
                    >
                      Prediction Confidence: <span className="font-semibold">{result.confidence}%</span>
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mb-4"
                    >
                      <Progress value={result.confidence} className="w-full max-w-md mx-auto" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="text-sm text-gray-500"
                    >
                      <p>
                        Malignant: {(result.probabilities.malignant * 100).toFixed(1)}% | Benign:{" "}
                        {(result.probabilities.benign * 100).toFixed(1)}%
                      </p>
                      <p className="mt-1">Analysis completed: {new Date(result.timestamp).toLocaleString()}</p>
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Details Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          <span>Key Factors</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.risk_factors.map((factor, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.4 + index * 0.1 }}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{factor}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Recommendations</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.recommendations.map((recommendation, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.4 + index * 0.1 }}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{recommendation}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    onClick={() => {
                      setResult(null)
                      setMeasurements({
                        radius_mean: "",
                        texture_mean: "",
                        perimeter_mean: "",
                        area_mean: "",
                        smoothness_mean: "",
                        compactness_mean: "",
                        concavity_mean: "",
                        concave_points_mean: "",
                        symmetry_mean: "",
                        fractal_dimension_mean: "",
                      })
                      setError(null)
                    }}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    New Analysis
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-2"
                  >
                    Print Report
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
