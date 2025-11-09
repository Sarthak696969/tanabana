"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { AuthGuard } from "@/components/auth-guard"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "USER"
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwordsDoNotMatch"))
      toast.error(t("auth.passwordsDoNotMatch"))
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError(t("auth.passwordTooShort"))
      toast.error(t("auth.passwordTooShort"))
      setIsLoading(false)
      return
    }

    try {
      // Create user account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t("common.error"))
        toast.error(data.error || t("common.error"))
        return
      }

      // Auto sign in after successful registration
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError(t("common.error"))
        toast.error(t("common.error"))
      } else {
        toast.success(t("auth.accountCreatedSuccessfully"))
        // Immediately direct all new signups to payment ($10)
        router.push('/payment?total=10.00&type=signup')
      }
    } catch {
      setError(t("common.error"))
      toast.error(t("common.error"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#C17642] to-[#A85D32] relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Header */}
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-2">TanaBana</h1>
              <p className="text-xl opacity-90">
                Where Local Artistry Meets Global Hearts
              </p>
            </div>

            {/* Illustration Area */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Decorative circles with animation */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-80"
              ></motion.div>
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/3 right-1/3 w-12 h-12 bg-yellow-400 rounded-full opacity-70"
              ></motion.div>
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-yellow-400 rounded-full opacity-60"
              ></motion.div>

              {/* Artisan illustration with animation */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                {/* Body */}
                <div className="w-48 h-32 bg-[#8B4513] rounded-t-full relative">
                  {/* Head with subtle bob */}
                  <motion.div 
                    animate={{ 
                      rotate: [-2, 2, -2],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#D2691E] rounded-full flex items-center justify-center"
                  >
                    {/* Face */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-6 left-3 w-3 h-2 bg-[#8B4513]"></div>
                      <div className="absolute top-6 right-3 w-3 h-2 bg-[#8B4513]"></div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-8 h-3 bg-[#8B4513] rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Left Arm with weaving motion */}
                  <motion.div 
                    animate={{ 
                      rotate: [-50, -40, -50],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-8 -left-8 w-16 h-6 bg-[#D2691E] rounded-full origin-right"
                  ></motion.div>
                  {/* Right Arm with weaving motion */}
                  <motion.div 
                    animate={{ 
                      rotate: [50, 40, 50],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.75
                    }}
                    className="absolute top-8 -right-8 w-16 h-6 bg-[#D2691E] rounded-full origin-left"
                  ></motion.div>
                  {/* Loom */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-[#654321] rounded-lg flex items-center justify-center">
                    <div className="space-y-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                          className="w-20 h-0.5 bg-yellow-600"
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* More decorative circles with animation */}
              <motion.div 
                animate={{ 
                  y: [0, -12, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute top-1/2 right-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-50"
              ></motion.div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <p className="text-lg italic mb-4">
                "Joining TanaBana was the best decision for my artisan business."
              </p>
              <p className="text-sm opacity-90">- Rajesh, Pottery Artisan</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md py-4"
          >
            {/* Language Selector - Always visible */}
            <div className="flex justify-end mb-3">
              <LanguageSelector />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                {t("auth.joinTanaBana")}
              </h2>
              <p className="text-sm text-gray-600">Create your artisan account</p>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t("auth.fullName")}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("auth.enterFullName")}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17642] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t("auth.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("auth.enterEmail")}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17642] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Account Type */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t("auth.accountType")}
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17642] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                >
                  <option value="USER">{t("auth.customer")}</option>
                  <option value="ARTISAN">{t("auth.artisan")}</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t("auth.createPassword")}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17642] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t("auth.confirmPassword")}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t("auth.confirmYourPassword")}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17642] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-[#C17642] hover:bg-[#A85D32] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? t("auth.creatingAccount") : t("auth.signUp")}
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">or</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={() => signIn("facebook")}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600">
                {t("auth.alreadyHaveAccount")}{" "}
                <Link
                  href="/auth/signin"
                  className="text-[#C17642] hover:text-[#A85D32] font-semibold"
                >
                  {t("auth.signIn")}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}