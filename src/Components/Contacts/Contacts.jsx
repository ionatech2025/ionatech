"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"

const Contacts = () => {
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setResult("Sending...")

    // Construct the payload using state
    const payload = {
      ...formData,
      access_key: "059244e1-534a-434e-a22d-7add58b68447",
      subject: `New Inquiry from ${formData.name}`,
      from_name: "iONA Tech Contact Form",
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        setResult("success")
        // Reset the form state
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        console.error("Web3Forms Error:", data)
        setResult("error")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setResult("error")
    } finally {
      setIsLoading(false)
      // Clear status message after 5 seconds
      setTimeout(() => setResult(""), 5000)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "ionatec002@gmail.com",
      href: "mailto:ionatec002@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+256700966715",
      href: "tel:+256700966715",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Address",
      value: "P.O BOX 1491, Kampala, Uganda",
      href: null,
    },
  ]

  return (
    <section className="contact_us min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Let's Start a Conversation</h3>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                We're here to help bring your ideas to life. Whether you have a question about our services, want to
                discuss a project, or just want to say hello, we'd love to hear from you.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="group">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-100"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                          <p className="text-gray-900 font-semibold">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-transparent">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                          <p className="text-gray-900 font-semibold">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Why Choose iONA Tech?</h4>
              <ul className="space-y-3">
                {[
                  "Expert team with 5+ years experience",
                  "Cutting-edge technology solutions",
                  "24/7 support and maintenance",
                  "Competitive pricing",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-200" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Web3Forms Honeypot Spam Protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us about your project or inquiry..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              <div className="min-h-[60px]">
                {result === "success" && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Message sent! We'll get back to you soon.</span>
                  </div>
                )}

                {result === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium">Something went wrong. Please check your connection.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts