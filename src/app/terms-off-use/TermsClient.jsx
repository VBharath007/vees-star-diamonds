"use client";
import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function TermsClient() {
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/3 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-6 border-b border-[#C9A84C]/10 pb-12"
        >
          <div className="flex items-center space-x-3 text-[#C9A84C]">
            <Scale className="w-5 h-5" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Legal Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
            Terms <span className="font-display italic gold-gradient-text">off use</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-sm">
            Last Updated: June 2026
          </p>
        </motion.div>

        {/* ── Content ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="prose prose-invert prose-p:text-[#C4BAB0] prose-p:font-light prose-p:text-sm prose-p:leading-relaxed prose-headings:text-[#FAF7F2] prose-headings:font-light prose-headings:mb-4 max-w-none space-y-8"
        >
          <div>
            <h3 className="text-xl">1. Acceptance of Terms</h3>
            <p>
              By accessing and using the Vees Star Diamonds & Jewellery website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </div>

          <div>
            <h3 className="text-xl">2. Intellectual Property Rights</h3>
            <p>
              All content on this website, including but not limited to designs, text, graphics, pictures, video, information, applications, software, music, sound and other files, and their selection and arrangement (the "Site Content"), are the proprietary property of Vees Star Diamonds & Jewellery. No Site Content may be modified, copied, distributed, framed, reproduced, republished, downloaded, displayed, posted, transmitted, or sold in any form or by any means, in whole or in part, without prior written permission.
            </p>
          </div>

          <div>
            <h3 className="text-xl">3. Product Descriptions and Pricing</h3>
            <p>
              Vees Star Diamonds & Jewellery attempts to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. In the event a product is listed at an incorrect price or with incorrect information due to typographical error or error in pricing or product information received from our suppliers, we shall have the right to refuse or cancel any orders placed for product listed at the incorrect price.
            </p>
          </div>

          <div>
            <h3 className="text-xl">4. Governing Law</h3>
            <p>
              These Terms of Use and your use of the Site are governed by and construed in accordance with the laws of India, applicable to agreements made and to be entirely performed within the State of Tamil Nadu, without resort to its conflict of law provisions.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
