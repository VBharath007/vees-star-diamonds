"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Trash2, Sparkles, Volume2, VolumeX } from "lucide-react";

// Vees Star Diamonds Config
const WHATSAPP_PHONE = "919383007477";
const SHOWROOM_ADDRESS = "W-182, North Main Rd, Anna Nagar West Extension, Chennai, Tamil Nadu 600101.";

export default function KiraFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false); // Silent by default for luxury discretion
  const [tamilVoice, setTamilVoice] = useState(null);
  const [hindiVoice, setHindiVoice] = useState(null);
  const [englishVoice, setEnglishVoice] = useState(null);

  // Custom Diamond Config State Machine
  const [calcState, setCalcState] = useState({
    cut: null, // round, princess, emerald, pear
    carats: 0,
    metal: null, // platinum, gold, rose_gold
    customerName: "",
    customerPhone: "",
    stage: "idle", // idle, ask_cut, ask_carats, ask_metal, ask_name, ask_phone
    language: "english" // detected language: 'tamil', 'hindi', 'english'
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Speech synthesizers setup
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const findVoice = (voices, langPattern, namePatterns = []) => {
      const premiumMatch = voices.find(v => {
        const name = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();
        return (lang.includes(langPattern) || lang.startsWith(langPattern)) && 
               namePatterns.some(pattern => name.includes(pattern));
      });
      if (premiumMatch) return premiumMatch;
      return voices.find(v => v.lang.toLowerCase().includes(langPattern)) || null;
    };

    const selectVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setTamilVoice(findVoice(voices, "ta", ["kani", "sabita", "female", "natural"]));
      setHindiVoice(findVoice(voices, "hi", ["swara", "madhur", "female", "natural"]));
      setEnglishVoice(findVoice(voices, "en", ["neerja", "samantha", "female", "natural"]));
    };

    selectVoices();
    window.speechSynthesis.onvoiceschanged = selectVoices;
  }, []);

  // Initialize Welcome Message
  useEffect(() => {
    const saved = localStorage.getItem("vees_kira_history");
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) { setMessages([getWelcomeMessage()]); }
    } else {
      setMessages([getWelcomeMessage()]);
    }
  }, []);

  const saveHistory = (newMsgs) => {
    setMessages(newMsgs);
    localStorage.setItem("vees_kira_history", JSON.stringify(newMsgs));
  };

  const getWelcomeMessage = () => ({
    sender: "kira",
    text: `Vanakkam & Namaste. ✦\nI am **Kira**, your virtual **Vees Star AI Concierge**.\n\nI can calculate bespoke diamond budgets, detail our heritage, or book private viewings.\n\n💡 Try saying:\n• *"Calculate a 1.5 carat round cut ring"* \n• *"Where is your showroom?"*\n• *"Book a private design consultation"*`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Language detector
  const detectLanguage = (query) => {
    const q = query.toLowerCase();
    if (/[\u0900-\u097F]/.test(query)) return "hindi";
    const hindiKeywords = ["namaste", "kya", "hai", "batao", "kitna", "chahiye", "kaha", "bache", "naam"];
    if (hindiKeywords.some(word => q.includes(word))) return "hindi";
    const tamilKeywords = ["vanakkam", "enna", "iruku", "evalavu", "romba", "nalla", "vees", "solunga", "aama", "illa"];
    if (tamilKeywords.some(word => q.includes(word))) return "tamil";
    return "english";
  };

  // Speaks output
  const speakText = async (text, lang) => {
    if (!ttsEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    
    let speechText = text.replace(/[*#_]/g, "").replace(/₹/g, "rupees ").replace(/\$/g, "dollars ");
    let utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    
    let voice = englishVoice;
    if (lang === "tamil" && tamilVoice) voice = tamilVoice;
    if (lang === "hindi" && hindiVoice) voice = hindiVoice;

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = lang === "tamil" ? "ta-IN" : lang === "hindi" ? "hi-IN" : "en-US";
    }

    window.speechSynthesis.speak(utterance);
  };

  // Calculate simulated budget
  const calculateDiamondPrice = (cut, carats, metal) => {
    let baseRate = 5500; // default round rate
    if (cut === "princess") baseRate = 5000;
    if (cut === "emerald") baseRate = 5300;
    if (cut === "pear") baseRate = 5700;

    let metalCost = 1200; // default gold
    if (metal === "platinum") metalCost = 1800;
    if (metal === "rose_gold") metalCost = 1100;

    // Exponential scaling for larger diamonds
    const rawPrice = (baseRate * Math.pow(carats, 1.35)) + metalCost;
    return Math.round(rawPrice);
  };

  // WhatsApp redirection
  const triggerWhatsAppBooking = (cut, carats, metal, name, phone) => {
    const price = calculateDiamondPrice(cut, carats, metal);
    const msg = `Hello Vees Star Diamonds Concierge! I would like to schedule a virtual showroom viewing and discuss a bespoke order.\n\nCustomization Details:\n• Cut Style: ${cut.toUpperCase()}\n• Carat Weight: ${carats} ct\n• Metal Type: ${metal.replace("_", " ").toUpperCase()}\n• Estimated Budget: ₹${price.toLocaleString("en-IN")}\n\nClient Profile:\n• Name: ${name}\n• Contact: ${phone}\n\nPlease reach out to me to coordinate.`;
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // State machine loop
  const processQueryAndReply = (userQuery, lang) => {
    const q = userQuery.toLowerCase().trim();
    let reply = "";
    let action = null;
    let next = { ...calcState, language: lang };

    // STAGE: ask_name
    if (calcState.stage === "ask_name") {
      next = { ...calcState, customerName: userQuery, stage: "ask_phone", language: lang };
      setCalcState(next);
      reply = `Thank you, **${userQuery}**. What is your contact phone number to register this booking?`;
      return { reply, action };
    }

    // STAGE: ask_phone
    if (calcState.stage === "ask_phone") {
      const finalName = calcState.customerName;
      const finalPhone = userQuery;
      reply = `✦ Perfect. I have registered your details for a bespoke **${calcState.carats}ct ${calcState.cut}** diamond custom ring. Redirecting you to our WhatsApp VIP Desk for design confirmation...`;
      action = () => triggerWhatsAppBooking(calcState.cut, calcState.carats, calcState.metal, finalName, finalPhone);
      setCalcState({ stage: "idle", cut: null, carats: 0, metal: null, customerName: "", customerPhone: "", language: lang });
      return { reply, action };
    }

    // STAGE: ask_cut
    if (calcState.stage === "ask_cut") {
      const cuts = ["round", "princess", "emerald", "pear"];
      const matchedCut = cuts.find(c => q.includes(c));
      
      if (matchedCut) {
        next = { ...calcState, cut: matchedCut, stage: "ask_carats", language: lang };
        setCalcState(next);
        reply = `Selected cut: **${matchedCut.toUpperCase()}**. Please tell me the carat weight you desire (e.g. *1.2 carat* or *2.5*)?`;
      } else {
        reply = `I didn't recognize that cut style. Please select from: **Round**, **Princess**, **Emerald**, or **Pear**.`;
      }
      return { reply, action };
    }

    // STAGE: ask_carats
    if (calcState.stage === "ask_carats") {
      const numMatch = q.match(/(\d+(\.\d+)?)/);
      if (numMatch) {
        const carats = parseFloat(numMatch[1]);
        if (carats > 0 && carats <= 15) {
          next = { ...calcState, carats, stage: "ask_metal", language: lang };
          setCalcState(next);
          reply = `Selected weight: **${carats} Carat**. Finally, what metal setting would you prefer?\n• **Platinum**\n• **Gold** (Champagne)\n• **Rose Gold**`;
        } else {
          reply = `Please provide a realistic carat weight between 0.1 and 15.`;
        }
      } else {
        reply = `Please input a number for the carat weight (e.g. *1.5*).`;
      }
      return { reply, action };
    }

    // STAGE: ask_metal
    if (calcState.stage === "ask_metal") {
      let metal = null;
      if (q.includes("plat") || q.includes("silver")) metal = "platinum";
      else if (q.includes("rose")) metal = "rose_gold";
      else if (q.includes("gold") || q.includes("champagne")) metal = "gold";

      if (metal) {
        const price = calculateDiamondPrice(calcState.cut, calcState.carats, metal);
        next = { ...calcState, metal, stage: "ask_name", language: lang };
        setCalcState(next);
        reply = `✦ **Bespoke Estimate Ready** ✦\n\n• Custom **${calcState.carats} ct** Diamond\n• Cut: **${calcState.cut.toUpperCase()}**\n• Setting: **${metal.replace("_", " ").toUpperCase()}**\n• Estimated Price: **₹${price.toLocaleString("en-IN")}**\n\nTo lock this quote and connect with a jewellery designer, please provide your **Name**:`;
      } else {
        reply = `Please specify: **Platinum**, **Gold**, or **Rose Gold**.`;
      }
      return { reply, action };
    }

    // GENERAL COMMAND TRIGGERS
    if (q.includes("calc") || q.includes("estimate") || q.includes("price") || q.includes("ring") || q.includes("custom")) {
      // Parse for values in query
      let matchedCut = ["round", "princess", "emerald", "pear"].find(c => q.includes(c));
      let carats = null;
      const numMatch = q.match(/(\d+(\.\d+)?)\s*(ct|carat)/);
      if (numMatch) carats = parseFloat(numMatch[1]);

      let metal = null;
      if (q.includes("plat")) metal = "platinum";
      else if (q.includes("rose")) metal = "rose_gold";
      else if (q.includes("gold")) metal = "gold";

      next = {
        cut: matchedCut || null,
        carats: carats || 0,
        metal: metal || null,
        customerName: "",
        customerPhone: "",
        stage: matchedCut ? (carats ? (metal ? "ask_name" : "ask_metal") : "ask_carats") : "ask_cut",
        language: lang
      };
      
      setCalcState(next);
      
      if (!matchedCut) {
        reply = `Let's estimate your custom design. Which diamond cut style do you prefer? (Choose: **Round**, **Princess**, **Emerald**, or **Pear**)`;
      } else if (!carats) {
        reply = `A **${matchedCut.toUpperCase()}** cut is excellent. What carat weight (e.g. *1.5 ct*) would you like?`;
      } else if (!metal) {
        reply = `Selected: **${carats}ct ${matchedCut.toUpperCase()}**. Choose your metal setting:\n• **Platinum**\n• **Gold**\n• **Rose Gold**`;
      } else {
        const price = calculateDiamondPrice(matchedCut, carats, metal);
        next.stage = "ask_name";
        setCalcState(next);
        reply = `✦ **Bespoke Estimate Ready** ✦\n\n• Custom **${carats} ct** Diamond\n• Cut: **${matchedCut.toUpperCase()}**\n• Setting: **${metal.replace("_", " ").toUpperCase()}**\n• Estimated Price: **₹${price.toLocaleString("en-IN")}**\n\nTo connect with our VIP Desk, please tell me your **Name**:`;
      }
      return { reply, action };
    }

    // Showroom Address
    if (q.includes("address") || q.includes("showroom") || q.includes("where") || q.includes("location") || q.includes("office")) {
      if (lang === "tamil") {
        reply = `எங்கள் ஷோரூம் முகவரி: \n📍 **${SHOWROOM_ADDRESS}** \n\nநேரடியாக வந்து எங்களை சந்திக்கலாம்!`;
      } else if (lang === "hindi") {
        reply = `हमारा शोरूम पता है: \n📍 **${SHOWROOM_ADDRESS}** \n\nनिजी मुलाकात के लिए आपका स्वागत है।`;
      } else {
        reply = `Our luxury showroom is located at:\n📍 **${SHOWROOM_ADDRESS}**\n\nOpen Monday to Saturday (10:00 AM - 7:30 PM). Bookings recommended.`;
      }
      return { reply, action };
    }

    // Heritage
    if (q.includes("heritage") || q.includes("history") || q.includes("craft") || q.includes("india")) {
      reply = `✦ **The Vees Star Heritage** ✦\n\nBorn from generations of South Indian master craftsmanship, Vees Star Diamonds blends global standards of diamond cutting with meticulous attention to detail. Every single pavilion facet is handcrafted to maximize fire, brilliance, and light dispersion.`;
      return { reply, action };
    }

    // Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("vanakkam") || q.includes("namaste") || q.includes("hey")) {
      if (lang === "tamil") {
        reply = "வணக்கம்! விஸ் ஸ்டார் அசிஸ்டன்ட் உங்களை வரவேற்கிறது. வைரம் பட்ஜெட் அல்லது ஷோரூம் விவரங்களை கேளுங்கள்!";
      } else if (lang === "hindi") {
        reply = "नमस्ते! वीस स्टार AI असिस्टेंट में आपका स्वागत है। डायमंड प्राइसिंग या शोरूम एड्रेस के बारे में पूछें।";
      } else {
        reply = "Hello. Vees Star Concierge is at your service. Ask me for a diamond estimate, our office address, or to book a virtual consultation.";
      }
      return { reply, action };
    }

    // Fallback
    if (lang === "tamil") {
      reply = "மன்னிக்கவும், எனக்கு புரியவில்லை. வைரத்தின் அளவு (Carats), ஷோரூம் முகவரி அல்லது புக்கிங் பற்றி கேட்கவும்.";
    } else if (lang === "hindi") {
      reply = "क्षमा करें, मुझे समझ नहीं आया। आप डायमंड कस्टमाइज़ेशन, शो-रूम का पता या मीटिंग के बारे में पूछ सकते हैं।";
    } else {
      reply = "I apologize, I didn't quite catch that. You can calculate custom ring estimates (e.g. *'calculate 2 carat round gold ring'*), ask for our address, or inquire about diamond clarity.";
    }
    return { reply, action };
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // unlock TTS context on user gesture
      const u = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(u);
    }
    if (!isOpen && ttsEnabled) {
      speakText("Welcome to Vees Star Diamonds. I am Kira.", "english");
    }
  };

  const handleSend = (override) => {
    const val = (override || inputVal).trim();
    if (!val || isThinking) return;

    const lang = detectLanguage(val);
    const userMsg = {
      sender: "user",
      text: val,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    const updated = [...messages, userMsg];
    
    setInputVal("");
    setIsThinking(true);
    saveHistory(updated);

    setTimeout(() => {
      const { reply, action } = processQueryAndReply(val, lang);
      const kiraMsg = {
        sender: "kira",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      
      saveHistory([...updated, kiraMsg]);
      setIsThinking(false);
      
      if (action) action();
      speakText(reply, lang);
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem("vees_kira_history");
    setMessages([getWelcomeMessage()]);
    setCalcState({ stage: "idle", cut: null, carats: 0, metal: null, customerName: "", customerPhone: "", language: "english" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[370px] h-[520px] rounded-2xl overflow-hidden glass-panel flex flex-col mb-4 shadow-2xl border border-champagne-gold/15"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-neutral-900 to-black border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-champagne-gold to-white flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wider uppercase">Vees Star</h4>
                  <span className="text-[9px] text-champagne-gold/90 font-medium block">
                    ✦ VIP DIAMOND DESK
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`p-1.5 rounded-lg transition-colors ${ttsEnabled ? "text-champagne-gold bg-white/5" : "text-neutral-500 hover:text-white"}`}
                  title={ttsEnabled ? "Mute" : "Voice Feedback"}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-450 transition-colors"
                  title="Reset Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 hide-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-xl text-[12px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-champagne-gold text-black font-medium rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-neutral-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap font-sans font-light">
                      {msg.text.split("**").map((part, index) =>
                        index % 2 === 1 ? (
                          <strong key={index} className={msg.sender === "user" ? "font-bold text-black" : "text-champagne-gold font-medium"}>
                            {part}
                          </strong>
                        ) : part
                      )}
                    </p>
                  </div>
                  <span className="text-[8px] text-neutral-600 mt-1.5 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isThinking && (
                <div className="mr-auto max-w-[85%]">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl rounded-tl-none flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && !isThinking && (
              <div className="px-5 pb-2.5 flex flex-wrap gap-1.5">
                {["1.5ct Round Platinum Ring", "Book VIP Consultation", "Showroom Address"].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-champagne-gold/15 border border-white/5 hover:border-champagne-gold/20 rounded-full text-[10px] text-neutral-400 hover:text-white transition-all cursor-pointer font-sans"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Inputs */}
            <div className="p-4 border-t border-white/5 bg-black/60 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask or say 'estimate 1.5ct emerald gold'..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isThinking}
                className="flex-1 bg-white/5 border border-white/5 focus:border-champagne-gold/20 px-4 py-2.5 rounded-lg text-xs text-white placeholder-neutral-600 outline-none transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isThinking || !inputVal.trim()}
                className="p-2.5 rounded-lg bg-champagne-gold text-black font-semibold hover:bg-yellow-600 disabled:bg-white/5 disabled:text-neutral-600 transition-colors active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Bubble */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-champagne-gold to-yellow-600 text-black shadow-2xl hover:shadow-champagne-gold/20 transition-all flex items-center justify-center relative cursor-pointer group"
      >
        <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-black rounded-full border border-champagne-gold flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-emerald-450 rounded-full animate-ping" />
        </span>
      </motion.button>
    </div>
  );
}
