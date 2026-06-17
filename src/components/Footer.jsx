"use client";
import React from "react";
import Link from "next/link";
import { Gem, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0806] border-t border-[#C9A84C]/8 pt-16 pb-8 relative z-10 overflow-hidden">

      {/* Decorative pulse glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[100px] bg-gradient-to-t from-[#C9A84C]/4 to-transparent blur-3xl pointer-events-none" />
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[#C9A84C]/8">

        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col space-y-5 text-center md:text-left items-center md:items-start">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 relative flex items-center justify-center bg-gradient-to-br from-[#0B3C8F] to-[#041F50] border border-[#C9A84C]/20 rounded-lg overflow-hidden shadow-lg">
              <img src="/VEES STAR LOGO 1.png" alt="Vees Star Diamonds Logo" className="w-full h-full object-cover scale-[1.05]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-[0.2em] text-[#FAF7F2] uppercase leading-none">Vees Star</span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mt-1 leading-none">Diamonds</span>
            </div>
          </div>
          {/* Changed description text to a very bright off-white for crisp readability */}
          <p className="text-xs text-[#EAE5DF] font-light leading-relaxed max-w-sm">
            Crafting international standards of diamond brilliance, backed by multi-generational South Indian master heritage. Unlocking raw light geometries for over four decades.
          </p>
          <div className="flex items-center space-x-2.5 text-[10px] text-[#FAF7F2] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>GIA Certified Diamond Registry</span>
          </div>
          <div className="flex items-center space-x-4 pt-1">
            <a href="https://www.facebook.com/veesstardiamonds" target="_blank" rel="noopener noreferrer" className="text-xs text-[#C4BAB0] hover:text-[#C9A84C] transition-colors uppercase font-bold tracking-wider" title="Follow Vees Star Diamonds on Facebook">Facebook</a>
            <span className="text-[#C9A84C]/30">|</span>
            <a href="https://www.instagram.com/veesstardiamonds" target="_blank" rel="noopener noreferrer" className="text-xs text-[#C4BAB0] hover:text-[#C9A84C] transition-colors uppercase font-bold tracking-wider" title="Follow Vees Star Diamonds on Instagram">Instagram</a>
          </div>
        </div>

        {/* Quick Links & Services */}
        <div className="md:col-span-3 flex flex-col space-y-4 text-center md:text-left items-center md:items-start">
          <h5 className="text-[12px] font-bold tracking-widest text-[#C9A84C] uppercase">Navigation & Services</h5>
          {/* Changed link text color to pure white with a gold hover effect */}
          <div className="flex flex-col space-y-2.5 text-[11px] font-medium text-white/90">
            <Link href="/" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Vees Star Diamonds Home | GIA Diamond Showroom Chennai & Karaikudi">Home</Link>
            <Link href="/about" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="About Vees Star Diamonds | Diamond Goldsmithing Heritage & Standards">About Us</Link>
            <Link href="/blog" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Guides on Diamond Sourcing, Care & Trends | Learn & Explore">Learn and Explore (Blog)</Link>
            <Link href="/lifetime-of-service" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block mt-2" title="Lifetime Diamond Warranty, Sizing & Service Policies">Lifetime of Service</Link>
            <Link href="/contact" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Book a Private Diamond Consultation Appointment in Anna Nagar, Chennai">Book Appointment</Link>
            <Link href="/wfh-franchise" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Join Vees Star Diamonds Work From Home Franchise Business">WFH Franchise</Link>
          </div>
        </div>

        {/* Gallery Column */}
        <div className="md:col-span-2 flex flex-col space-y-4 text-center md:text-left items-center md:items-start">
          <h5 className="text-[12px] font-bold tracking-widest text-[#C9A84C] uppercase">Gallery</h5>
          {/* Changed link text color to pure white with a gold hover effect */}
          <div className="flex flex-col space-y-2.5 text-[11px] font-medium text-white/90">
            <Link href="/gallery" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block text-[#C9A84C] font-bold" title="Sovereign Heritage Diamond Jewellery Collection Campaign Lookbook">Campaign Lookbook</Link>
            <Link href="/gallery" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Browse Handcrafted Diamond Jewellery Collections">All Collections</Link>
            <Link href="/custom-build" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Design Custom Diamond Rings Online | 3D Solitaire Configurator">Custom Rings</Link>
            <Link href="/gallery/bracelets" className="hover:text-[#C9A84C] hover:translate-x-1.5 transition-all duration-300 inline-block" title="Handcrafted Solitaire Diamond Bracelets & Bangles">Bracelets</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-3 flex flex-col space-y-4 text-center md:text-left items-center md:items-start">
          <h5 className="text-[12px] font-bold tracking-widest text-[#C9A84C] uppercase">Contact Information</h5>
          {/* Changed contact info text to readable off-white */}
          <div className="space-y-4 text-[11px] text-[#EAE5DF] font-light leading-relaxed">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
              <span>W-182, North Main Rd, Anna Nagar West Extension, Chennai, Tamil Nadu 600101</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <Gem className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
              <span>Phone: +91 93830 07477 / +91 98848 56057</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <Mail className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
              <a href="mailto:vsdjbusiness@gmail.com" className="hover:text-[#C9A84C] transition-colors break-all" title="Email Vees Star Diamonds customer support">vsdjbusiness@gmail.com</a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      {/* Changed copyright text and links to an elegant white-gold balance for clarity */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C4BAB0] font-semibold tracking-widest uppercase gap-4 text-center">
        <span>© 2026 Vees Star Diamonds. All rights reserved.</span>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors" title="Vees Star Diamonds Privacy Policy">Privacy Policy</a>
          <a href="/terms-off-use" className="hover:text-white transition-colors" title="Vees Star Diamonds Terms of Service">Terms of Service</a>
          <a href="/contact" className="text-[#C9A84C] hover:text-[#E8D5A0] font-bold transition-colors" title="Book a Private VIP Diamond Appointment">VIP Consultation</a>
        </div>
      </div>
    </footer>
  );
}