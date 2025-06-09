"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, User, Calendar, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientDetailsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "female", // Locked to female
    phone: "",
    email: "",
    medicalId: "",
    medicalHistory: "",
    imagingData: "",
    clinicalExam: {
      lump: false,
      nippleDischarge: false,
      skinChanges: false,
    }
  })

  const [showValidation, setShowValidation] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setShowValidation(false)
  }

  const handleClinicalExamChange = (feature: keyof typeof formData.clinicalExam, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      clinicalExam: {
        ...prev.clinicalExam,
        [feature]: value,
      },
    }))
    setShowValidation(false)
  }

  // Required fields except medicalId and clinicalExam
  const requiredFields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "medicalHistory", label: "Medical History" },
    { key: "imagingData", label: "Imaging Data" },
  ]

  const missingFields = requiredFields.filter(
    (field) => (formData as any)[field.key].trim() === ""
  )

  const isFormValid = missingFields.length === 0

  // Handler for Continue button (prevents navigation if not valid)
  const handleContinue = (e: React.MouseEvent) => {
    if (!isFormValid) {
      e.preventDefault()
      setShowValidation(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-pink-200 rounded-full opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
          <Link href="/">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500 ml-2">Step 1 of 2</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full mb-4"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  "0 0 0 15px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Patient Information</h1>
            <p className="text-gray-600">Please provide the patient details for accurate analysis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl text-gray-700">Patient Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="firstName" className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>First Name</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`border-2 focus:border-blue-400 transition-colors ${showValidation && formData.firstName.trim() === "" ? "border-red-500" : ""}`}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`border-2 focus:border-blue-400 transition-colors ${showValidation && formData.lastName.trim() === "" ? "border-red-500" : ""}`}
                    />
                  </motion.div>
                </div>

                {/* Age & Gender */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="age" className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-pink-500" />
                      <span>Age</span>
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className={`border-2 focus:border-pink-400 transition-colors ${showValidation && formData.age.trim() === "" ? "border-red-500" : ""}`}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value="female"
                      disabled
                      onValueChange={() => {}} // Locked select
                    >
                      <SelectTrigger className="border-2 focus:border-pink-400 bg-gray-100 cursor-not-allowed">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>Phone Number</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`border-2 focus:border-green-400 transition-colors ${showValidation && formData.phone.trim() === "" ? "border-red-500" : ""}`}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`border-2 focus:border-purple-400 transition-colors ${showValidation && formData.email.trim() === "" ? "border-red-500" : ""}`}
                    />
                  </motion.div>
                </div>

                {/* Medical ID */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="medicalId">Medical ID (Optional)</Label>
                  <Input
                    id="medicalId"
                    placeholder="Enter medical ID"
                    value={formData.medicalId}
                    onChange={(e) => handleInputChange("medicalId", e.target.value)}
                    className="border-2 focus:border-blue-400 transition-colors"
                  />
                </motion.div>

                {/* Medical History */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <textarea
                    id="medicalHistory"
                    placeholder="Family history of breast cancer, previous tumors, hormone therapy use"
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                    className={`border-2 focus:border-blue-400 transition-colors w-full rounded-md p-2 min-h-[60px] ${showValidation && formData.medicalHistory.trim() === "" ? "border-red-500" : ""}`}
                  />
                </motion.div>

                {/* Clinical Exam */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label>Clinical Exam</Label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.clinicalExam.lump}
                        onChange={(e) => handleClinicalExamChange("lump", e.target.checked)}
                        className="form-checkbox"
                      />
                      <span>Presence of lump</span>
                    </label>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.clinicalExam.nippleDischarge}
                        onChange={(e) => handleClinicalExamChange("nippleDischarge", e.target.checked)}
                        className="form-checkbox"
                      />
                      <span>Nipple discharge</span>
                    </label>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.clinicalExam.skinChanges}
                        onChange={(e) => handleClinicalExamChange("skinChanges", e.target.checked)}
                        className="form-checkbox"
                      />
                      <span>Skin changes</span>
                    </label>
                  </div>
                </motion.div>

                {/* Imaging Data */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="imagingData">Imaging Data</Label>
                  <textarea
                    id="imagingData"
                    placeholder="Mammogram results, MRI data (sometimes preprocessed into features)"
                    value={formData.imagingData}
                    onChange={(e) => handleInputChange("imagingData", e.target.value)}
                    className={`border-2 focus:border-pink-400 transition-colors w-full rounded-md p-2 min-h-[60px] ${showValidation && formData.imagingData.trim() === "" ? "border-red-500" : ""}`}
                  />
                </motion.div>

                {/* Validation message */}
                {showValidation && !isFormValid && (
                  <div className="text-red-500 text-sm">
                    Please fill the following required fields:
                    <ul className="list-disc list-inside">
                      {missingFields.map((field) => (
                        <li key={field.key}>{field.label}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Continue Button */}
                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href={isFormValid ? "/prediction" : "#"} onClick={handleContinue}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-800 to-pink-800 hover:from-blue-900 hover:to-pink-900 text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        type="button"
                      >
                        Continue to Analysis
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}