"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { GlassButton } from "../../components/ui/glass-button";

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", date: "", time: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Hi Vees Star!\nI would like to book a VIP Consultation:\n• Name: ${formData.name}\n• Date: ${formData.date}\n• Time: ${formData.time}\n• Notes: ${formData.notes || "None"}`;
    setTimeout(() => { window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank"); }, 1500);
  };

  return (
    <div className="relative min-h-screen text-[#FAF7F2] pt-[180px] pb-16 px-6 md:px-12 overflow-hidden">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">VIP Desk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
            Schedule a <span className="font-display italic gold-gradient-text">Private Viewing</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-xs md:text-sm leading-relaxed">
            We are happiest when we are innovating, and fanatically dedicated to our craft. Do check it for yourself. We will be obliged to acquaint you with our services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-[#FAF7F2]">Our Studio</h3>
              <p className="text-[#C4BAB0] font-light text-sm leading-relaxed">Our luxury showroom provides private consultation rooms where you can view raw selections, GIA records, and finished custom pieces.</p>
            </div>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Showroom Address", value: "W-182, North Main Rd, Anna Nagar West Extension, Chennai, Tamil Nadu 600101" },
                { icon: Phone, label: "Telephone Inquiry", value: "+91 44 45536003 / +91 93830 07477" },
                { icon: Mail, label: "Electronic Mail", value: "contact@veesstardiamonds.com" },
                { icon: Clock, label: "Operating Hours", value: "Monday – Saturday: 10:30 AM – 7:30 PM (IST)" },
              ].map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h5 className="text-[10px] uppercase tracking-wider text-[#C9A84C] font-bold">{info.label}</h5>
                      <p className="text-sm text-[#C4BAB0] font-light mt-0.5 leading-relaxed">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#C9A84C]/10 pt-6 flex items-center space-x-2 text-[10px] text-[#7A6E66] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              <span>GIA Registered & Insured Showroom</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-3xl border border-[#C9A84C]/12 relative overflow-hidden luxury-shadow"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/6 to-transparent pointer-events-none" />
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <CheckCircle2 className="w-16 h-16 text-[#C9A84C] animate-bounce" />
                <h3 className="text-2xl font-light text-[#FAF7F2]">Booking Request Initiated</h3>
                <p className="text-sm text-[#C4BAB0] max-w-sm leading-relaxed">We are redirecting you to our VIP desk on WhatsApp to confirm details. Thank you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
                <div className="space-y-1">
                  <h4 className="text-xl font-light text-[#FAF7F2]">Appointment Registration</h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#7A6E66]">All fields required</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold">Your Name</label>
                    <input type="text" required placeholder="e.g. Adithya Raman" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold">Email Address</label>
                    <input type="email" required placeholder="e.g. adithya@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-dark" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold">Preferred Date</label>
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="input-dark" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold">Preferred Time</label>
                    <input type="time" required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="input-dark" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold">Bespoke Specifications / Notes</label>
                  <textarea rows={4} placeholder="e.g. Interested in viewing 2.0 carat Round brilliant solitaires in platinum setting..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="input-dark resize-none" />
                </div>
                <GlassButton type="submit" size="lg" className="w-full" contentClassName="text-center w-full">
                  Schedule Appointment
                </GlassButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
