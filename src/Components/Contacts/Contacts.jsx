"use client"

import { useState } from "react"
import { 
  Mail, Phone, MapPin, MessageSquare, Send, 
  CheckCircle, AlertCircle, MessageCircle 
} from "lucide-react"

const Contacts = () => {
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // ✅ YOUR WHATSAPP CONFIG
  const WHATSAPP_NUMBER = "256700966715" 

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ WHATSAPP REDIRECT FUNCTION
  const sendToWhatsApp = () => {
    const text = `Hi iONA Tech! My name is ${formData.name}. I'm interested in a project. %0A%0A*Message:* ${formData.message}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setResult("Sending...")

    const payload = {
      ...formData,
      access_key: "059244e1-534a-434e-a22d-7add58b68447",
      subject: `New iONA Tech Inquiry: ${formData.name}`,
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (data.success) {
        setResult("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setResult("error")
      }
    } catch (error) {
      setResult("error")
    } finally {
      setIsLoading(false)
      setTimeout(() => setResult(""), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Let's Build Something</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Have a project in mind? Reach out via the form for an official quote, or jump straight into a chat via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <MessageSquare className="text-blue-600" /> Direct Contact
              </h3>

              <div className="space-y-6">
                <a href="mailto:ionatec002@gmail.com" className="group flex items-center gap-5 p-4 bg-white rounded-2xl hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-slate-900 font-semibold">ionatec002@gmail.com</p>
                  </div>
                </a>

                <div className="group flex items-center gap-5 p-4 bg-white rounded-2xl">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-slate-900 font-semibold">Kampala, Uganda</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action */}
              <div className="mt-12 p-8 bg-green-50 rounded-3xl border border-green-100">
                <p className="text-green-700 font-bold mb-4 flex items-center gap-2">
                  <MessageCircle size={20} /> Instant Response?
                </p>
                <button 
                  onClick={sendToWhatsApp}
                  className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-3"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Right: The Form */}
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="allan B"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="allan@example.com"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+256 ..."
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us about your project goals..."
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isLoading ? "Sending..." : (
                  <>
                    Send Official Inquiry <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Alerts */}
              {result === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-100 animate-pulse">
                  <CheckCircle size={20} /> <span>Success! We'll be in touch soon.</span>
                </div>
              )}
              {result === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                  <AlertCircle size={20} /> <span>Something went wrong. Try WhatsApp?</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contacts