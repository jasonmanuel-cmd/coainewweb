// Contact.jsx — COAI Contact page with form + info panel

function Contact({ onNavigate }) {
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({ first_name: "", business_name: "", phone: "", email: "", website: "", message: "" });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = e => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">Contact</span>
          <h1 className="section-title">Let's talk.<br/><span className="text-green">No pressure.</span></h1>
          <p style={{ color: "var(--text-soft)", fontSize: ".98rem", lineHeight: 1.7, maxWidth: 520 }}>
            Jason responds same business day. If it's urgent, call directly — (661) 610-9198. He picks up.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 60, paddingBottom: 100 }}>
        <div className="contact-grid">
          {/* Info panel */}
          <div className="contact-info">
            <div className="contact-info-block">
              <div className="contact-info-label">Direct Line</div>
              <a href="tel:+16616109198" className="contact-info-val contact-phone">(661) 610-9198</a>
              <div className="contact-info-sub">Jason picks up. No receptionist gatekeeping.</div>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-label">Email</div>
              <a href="mailto:jason@coaibakersfield.com" className="contact-info-val">jason@coaibakersfield.com</a>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-label">Office</div>
              <div className="contact-info-val" style={{ fontSize: ".92rem" }}>
                1712 19th St #216<br />
                Bakersfield, CA 93301
              </div>
            </div>
            <div className="contact-info-block">
              <div className="contact-info-label">Hours</div>
              <div className="contact-info-val" style={{ fontSize: ".88rem" }}>Monday–Friday<br/>9:00 am – 5:00 pm Pacific</div>
            </div>

            {/* Trust badges */}
            <div className="contact-trust">
              {["No high-pressure sales","Clear scope before any contract","Free diagnostic, always"].map(t => (
                <div key={t} className="contact-trust-item">
                  <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span> {t}
                </div>
              ))}
            </div>

            <div className="contact-alt">
              <div className="contact-alt-label">Prefer to start with a diagnostic?</div>
              <a className="btn-primary btn-sm" onClick={() => onNavigate("intake")} style={{ cursor: "pointer", display: "block", textAlign: "center" }}>
                Run Free Diagnostic →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {done ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <div className="contact-success-title">Message Received</div>
                <p>Jason will respond same business day. If it's urgent, call (661) 610-9198.</p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", background: "rgba(16,217,138,.1)", border: "1px solid rgba(16,217,138,.22)", color: "#10d98a", padding: "4px 12px", borderRadius: 4, letterSpacing: 1 }}>QUEUED</span>
              </div>
            ) : (
              <>
                <h2 className="contact-form-title">Send a Message</h2>
                <p className="contact-form-sub">Submissions go to jason@coaibakersfield.com. Jason responds same business day.</p>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="cf-row">
                    <div className="field-group">
                      <label className="field-label">First Name</label>
                      <input className="field" value={form.first_name} onChange={e => update("first_name", e.target.value)} placeholder="First name" required />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Business Name</label>
                      <input className="field" value={form.business_name} onChange={e => update("business_name", e.target.value)} placeholder="Your business name" required />
                    </div>
                  </div>
                  <div className="cf-row">
                    <div className="field-group">
                      <label className="field-label">Phone</label>
                      <input className="field" type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(661) 000-0000" required />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Email</label>
                      <input className="field" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@yourbiz.com" required />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Business Website</label>
                    <input className="field" value={form.website} onChange={e => update("website", e.target.value)} placeholder="https://yourbusiness.com (or type 'none')" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Message</label>
                    <textarea className="field" rows={5} value={form.message} onChange={e => update("message", e.target.value)} placeholder="What's your biggest digital challenge right now?" required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Send Message →</button>
                  <p style={{ textAlign: "center", fontSize: ".72rem", color: "var(--text-muted2)", marginTop: 12 }}>
                    Or skip the form — call (661) 610-9198 directly. Jason picks up.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Contact });
