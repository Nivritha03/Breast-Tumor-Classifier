"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Heart, Shield, Stethoscope, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const aboutContent = (
  <div className="max-w-xl mx-auto text-left text-base md:text-lg space-y-4 p-4">
    <h2 className="text-2xl font-bold flex items-center mb-2">🩺 About This Breast Tumor Classifier Tool</h2>
    <p>
      Welcome to the Breast Tumor Classifier Tool — an AI-powered platform designed to assist in the early detection of breast cancer. Using advanced machine learning techniques, this tool helps predict whether a breast tumor is benign (non-cancerous) or malignant (cancerous) based on medical imaging data.
    </p>
    <h3 className="text-lg font-semibold mt-4 mb-1">🔍 How It Works</h3>
    <p>
      This tool analyzes key characteristics of breast cells collected during a routine fine needle aspiration (FNA) — a common, minimally invasive test performed when a lump is found in the breast. From this test, several features are measured, such as:
    </p>
    <ul className="list-disc list-inside ml-4">
      <li>Size of the cell (e.g., radius, area, perimeter)</li>
      <li>Texture and smoothness</li>
      <li>Symmetry and shape irregularities</li>
    </ul>
    <p>
      These features are entered into a trained machine learning model that has studied thousands of similar cases. Based on the patterns it has learned, the model predicts the likelihood of the tumor being cancerous or non-cancerous.
    </p>
    <h3 className="text-lg font-semibold mt-4 mb-1">✅ What You Can Expect</h3>
    <ul className="list-disc list-inside ml-4">
      <li>
        <b>Fast Predictions:</b> Instantly receive results after entering the necessary measurements.
      </li>
      <li>
        <b>Accurate Insights:</b> Built using real-world medical data from the Wisconsin Breast Cancer Diagnostic Dataset, a trusted research dataset.
      </li>
      <li>
        <b>Privacy-Focused:</b> No personal data is stored or shared. The tool only uses anonymized medical measurements.
      </li>
    </ul>
    <h3 className="text-lg font-semibold mt-4 mb-1">⚠️ Important Note</h3>
    <p>
      This tool is intended for educational and research use only. It does not replace a doctor’s diagnosis. If you have concerns about your health or breast cancer risk, please consult a certified healthcare professional.
    </p>
    <h3 className="text-lg font-semibold mt-4 mb-1">💡 Why It Matters</h3>
    <p>
      Early detection saves lives. By offering a data-driven second opinion, this tool empowers users — especially students, researchers, and medical learners — to explore how artificial intelligence can support modern healthcare.
    </p>
  </div>
)

export default function WelcomePage() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div className="p-2 bg-pink-100 rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Heart className="w-6 h-6 text-pink-600" />
            </motion.div>
            <span className="text-2xl md:text-4xl font-extrabold text-gray-800">CanSure</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              className="text-gray-600 hover:text-pink-600 transition-colors focus:outline-none"
              onClick={() => setAboutOpen(true)}
            >
              About
            </button>
            {/* Contact and Help removed */}
          </nav>
        </motion.header>

        {/* About Modal */}
        <AnimatePresence>
          {aboutOpen && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAboutOpen(false)}
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 relative flex flex-col max-h-[90vh]"
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setAboutOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
                <div className="overflow-y-auto px-2 py-3" style={{ maxHeight: "80vh" }}>
                  {aboutContent}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mb-6"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(236, 72, 153, 0.4)",
                    "0 0 0 20px rgba(236, 72, 153, 0)",
                    "0 0 0 0 rgba(236, 72, 153, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Stethoscope className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Breast Cancer
                <br />
                Classifier
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Advanced AI-powered analysis to help healthcare professionals make informed decisions. Get accurate
                predictions based on tumor characteristics.
              </motion.p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Accurate Analysis</h3>
                <p className="text-gray-600">Advanced machine learning algorithms for precise tumor classification</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Patient Care</h3>
                <p className="text-gray-600">Supporting healthcare decisions with reliable predictions</p>
              </motion.div>

              <motion.div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Stethoscope className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Medical Grade</h3>
                <p className="text-gray-600">Built for healthcare professionals with clinical precision</p>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link href="/patient-details">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Analysis
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
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p>© 2025 CanSure. For healthcare professional use only.</p>
        </motion.footer>
      </div>
    </div>
  )
}