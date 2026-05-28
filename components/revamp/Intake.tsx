"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Dot } from "lucide-react";

// Phone masking function: converts digits to (XXX) XXX-XXXX format
const formatPhoneNumber = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
  
  if (digitsOnly.length === 0) return "";
  if (digitsOnly.length <= 3) return `(${digitsOnly}`;
  if (digitsOnly.length <= 6) return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
  return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
};

export function IntakePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const update = (k: string, v: string) => {
    // Apply phone masking for phone field
    const finalValue = k === "phone" ? formatPhoneNumber(v) : v;
    setFormData(f => ({ ...f, [k]: finalValue }));
    // Clear error when user starts typing
    if (errors[k]) {
      setErrors(e => ({ ...e, [k]: "" }));
    }
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (stepNum === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/[\d\s\-\(\)]+/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }
    
    if (stepNum === 2) {
      if (!formData.goal.trim()) {
        newErrors.goal = "Please tell us your biggest challenge";
      } else if (formData.goal.trim().length < 10) {
        newErrors.goal = "Please provide more detail (at least 10 characters)";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (submitted) return (
    <div style={{ padding: "120px 0", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 20, color: "var(--accent)" }}>
          <Dot size={64} strokeWidth={5} aria-hidden="true" />
        </div>
        <h2 className="section-title">Growth Diagnostic Submitted</h2>
        <p className="section-sub" style={{ margin: "0 auto 32px" }}>Your roadmap is being generated. Jason will review your information and follow up within 24 hours with a prioritized fix list and next steps — no pressure, no fluff, just actionable data.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: "32px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", background: "rgba(232,160,32,.1)", border: "1px solid rgba(232,160,32,.22)", color: "#E8A020", padding: "6px 16px", borderRadius: 4, fontWeight: 700 }}>IN REVIEW</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", background: "rgba(29,158,117,.1)", border: "1px solid rgba(29,158,117,.22)", color: "#1D9E75", padding: "6px 16px", borderRadius: 4, fontWeight: 700 }}>24-HOUR RESPONSE TIME</span>
        </div>
         <div style={{ fontSize: "14px", color: "var(--cream-muted)", lineHeight: 1.6, backgroundColor: "rgba(232,160,32,0.08)", padding: "20px", borderRadius: "8px", border: "1px solid rgba(232,160,32,0.15)" }}>
           <strong style={{ color: "var(--amber)" }}>What Happens Next:</strong><br/>
           <strong>1. Jason reviews your audit</strong> within 24 hours (even weekends — this is his priority)<br/>
           <strong>2. You get a custom roadmap</strong> with prioritized fixes + estimated impact<br/>
           <strong>3. Optional: Strategy call</strong> to discuss implementation & pricing<br/>
           <br/>
            <strong>Until then:</strong> Check your email for Jason&apos;s follow-up & roadmap. If you have questions, call directly: <a href="tel:6616591376" style={{ color: "var(--amber)", textDecoration: "underline" }}>(661) 659-1376</a>
         </div>

         <div style={{ 
           display: "flex", 
           gap: "12px", 
           justifyContent: "center",
           marginTop: "32px",
           flexWrap: "wrap"
         }}>
           <a href="tel:6616591376" className="btn-phone" style={{ cursor: "pointer" }}>
             Call Now <ArrowRight size={16} aria-hidden="true" />
           </a>
           <a href="https://calendly.com/jasonm/audit" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ cursor: "pointer" }}>
             Schedule Call <ArrowRight size={16} aria-hidden="true" />
           </a>
         </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "100px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px" }}>
           <div className="intake-intro">
             <span className="section-eyebrow">Free Growth Diagnostic</span>
             <h1 className="section-title">Tell Us Your<br /><span className="text-amber">Biggest Challenge</span></h1>
             <p className="section-sub">No high-pressure sales. No contracts. Just a free roadmap showing exactly how to get more quality leads. Jason will personally review and respond within 24 hours.</p>
             
             <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "40px" }}>
               {[
                 ["Quick contact info", "Name and phone number only"],
                 ["Describe your challenge", "What's holding you back from more leads?"],
                 ["Get your roadmap", "Free prioritized fix list within 24h"]
               ].map(([t, d], i) => (
                 <div key={t} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                   <div style={{ 
                     width: "32px", height: "32px", borderRadius: "50%", 
                     background: step > i + 1 ? "var(--accent)" : "var(--gradient-brand)", 
                     color: step > i + 1 ? "#032219" : "#fff",
                     display: "flex", alignItems: "center", justifyContent: "center",
                     fontSize: ".8rem", fontWeight: 800, flexShrink: 0
                   }}>
                     {step > i + 1 ? <CheckCircle2 size={18} aria-hidden="true" /> : i + 1}
                   </div>
                   <div>
                     <div style={{ fontSize: ".95rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{t}</div>
                     <div style={{ fontSize: ".82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{d}</div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

            <div className="pkg-card" style={{ padding: "40px" }}>
              <div style={{
                width: "100%",
                height: "4px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: `${(step / 2) * 100}%`,
                  height: "100%",
                  background: "var(--amber)",
                  transition: "width 0.3s ease"
                }}></div>
              </div>

              <div style={{ fontSize: ".72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px" }}>
                Step {step} of 2 — Complete in ~2 minutes • {["Your Contact Info", "Your Challenge"][step - 1]}
              </div>
             
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                 {step === 1 && (
                   <motion.div
                     initial={{ opacity: 0, y: 12 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                   >
                     <>
                       <div className="field-group">
                         <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Your Name</label>
                          <input 
                            style={{ 
                              width: "100%", 
                              padding: "14px", 
                              background: "rgba(255,255,255,0.05)", 
                              border: errors.name ? "1.5px solid rgba(255,67,54,0.5)" : "1px solid rgba(255,255,255,0.1)", 
                              borderRadius: "8px", 
                              color: "#fff", 
                              outline: "none",
                              transition: "border-color 0.2s ease"
                            }}
                            type="text"
                            autoComplete="name"
                            value={formData.name} 
                            onChange={e => update("name", e.target.value)} 
                            placeholder="Jason Manuel" 
                          />
                         {errors.name && (
                           <div style={{ fontSize: ".72rem", color: "rgba(255,107,107,0.9)", marginTop: "6px", fontWeight: 500 }}>
                             {errors.name}
                           </div>
                         )}
                       </div>
                       <div className="field-group">
                         <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Phone Number</label>
                          <input
                            style={{ 
                              width: "100%", 
                              padding: "14px", 
                              background: "rgba(255,255,255,0.05)", 
                              border: errors.phone ? "1.5px solid rgba(255,67,54,0.5)" : "1px solid rgba(255,255,255,0.1)", 
                              borderRadius: "8px", 
                              color: "#fff", 
                              outline: "none",
                              transition: "border-color 0.2s ease"
                            }}
                            type="tel" 
                            autoComplete="tel"
                            value={formData.phone} 
                            onChange={e => update("phone", e.target.value)} 
                            placeholder="(661) 555-0100" 
                          />
                         {errors.phone && (
                           <div style={{ fontSize: ".72rem", color: "rgba(255,107,107,0.9)", marginTop: "6px", fontWeight: 500 }}>
                             {errors.phone}
                           </div>
                         )}
                       </div>
                   <div style={{ background: "rgba(108,99,255,.06)", border: "1px solid rgba(108,99,255,.15)", borderRadius: 10, padding: "16px" }}>
                     <div style={{ fontSize: ".78rem", fontWeight: 700, color: "#c4b5fd", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Your Roadmap Includes:</div>
                     {["Prioritized growth opportunities", "Estimated impact on calls/leads", "Clear next steps — no obligation"].map(i => (
                       <div key={i} style={{ fontSize: ".82rem", color: "var(--text-soft)", marginBottom: "6px", display: "flex", gap: "8px" }}>
                       <CheckCircle2 size={16} aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                       <span>{i}</span>
                       </div>
                     ))}
                   </div>
                      </>
                    </motion.div>
                )}
               
                 {step === 2 && (
                   <motion.div
                     initial={{ opacity: 0, y: 12 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                   >
                     <>
                       <div className="field-group">
                          <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>What&apos;s Your Biggest Challenge Right Now?</label>
                         <textarea 
                           style={{ 
                             width: "100%", 
                             padding: "14px", 
                             background: "rgba(255,255,255,0.05)", 
                             border: errors.goal ? "1.5px solid rgba(255,67,54,0.5)" : "1px solid rgba(255,255,255,0.1)", 
                             borderRadius: "8px", 
                             color: "#fff", 
                             outline: "none", 
                             resize: "none",
                             transition: "border-color 0.2s ease"
                           }}
                           rows={6} 
                           value={formData.goal} 
                           onChange={e => update("goal", e.target.value)} 
                           placeholder="e.g. Not getting enough calls, losing leads to competitors, need a better online presence, outdated website..." 
                         />
                         {errors.goal && (
                           <div style={{ fontSize: ".72rem", color: "rgba(255,107,107,0.9)", marginTop: "6px", fontWeight: 500 }}>
                             {errors.goal}
                           </div>
                         )}
                       </div>
                      <div style={{ background: "rgba(232,160,32,.08)", border: "1px solid rgba(232,160,32,.15)", borderRadius: 10, padding: "16px" }}>
                        <div style={{ fontSize: ".78rem", fontWeight: 700, color: "#E8A020", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>After You Submit:</div>
                        {["Jason reviews within 24 hours", "You get a custom roadmap", "Optional: Schedule a 20-min strategy call"].map(i => (
                          <div key={i} style={{ fontSize: ".82rem", color: "var(--cream-muted)", marginBottom: "6px", display: "flex", gap: "8px" }}>
                          <CheckCircle2 size={16} aria-hidden="true" style={{ color: "var(--amber)", flexShrink: 0, marginTop: 2 }} />
                          <span>{i}</span>
                          </div>
                        ))}
                       </div>
                      </>
                    </motion.div>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  {step > 1 && (
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(s => s - 1)}>
                      <ArrowLeft size={16} aria-hidden="true" /> Back
                    </button>
                  )}
                  {step < 2 && (
                    <button 
                      className="btn-primary" 
                      style={{ flex: 1, justifyContent: "center" }} 
                      onClick={() => {
                        if (validateStep(step)) {
                          setStep(s => s + 1);
                        }
                      }}
                    >
                      Continue <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )}
                  {step === 2 && (
                    <button 
                      className="btn-primary" 
                      style={{ flex: 1, justifyContent: "center" }} 
                      onClick={() => {
                        if (validateStep(step)) {
                          setSubmitted(true);
                        }
                      }}
                    >
                      Submit & Get Roadmap <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
              
              <div style={{
                display: "flex",
                gap: "12px",
                fontSize: "11px",
                color: "var(--cream-dim)",
                justifyContent: "center",
                marginTop: "20px",
                flexWrap: "wrap"
              }}>
                <span>🔒 SSL Secure</span>
                <span>•</span>
                <span>Privacy Protected</span>
                <span>•</span>
                <span>No Spam Ever</span>
              </div>
              
              <p style={{ textAlign: "center", fontSize: ".72rem", color: "var(--text-muted2)", marginTop: "24px" }}>
                No spam. No cold calls. No contracts.<br/>
                Just a real roadmap from someone who knows your business.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
