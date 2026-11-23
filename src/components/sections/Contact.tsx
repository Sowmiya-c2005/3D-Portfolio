import React, { useState, useEffect } from "react";
import { personal } from "../../data/portfolio";
import RollInCard from "../ui/RollInCard";
import { useTheme } from "../../context/ThemeContext";

interface StoredMsg {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [savedMessages, setSavedMessages] = useState<StoredMsg[]>([]);
  const { theme } = useTheme();

  // Load saved messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sowmiya_received_messages");
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // 1. Save locally to browser storage
    const newMsg: StoredMsg = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const updated = [newMsg, ...savedMessages];
      localStorage.setItem("sowmiya_received_messages", JSON.stringify(updated));
      setSavedMessages(updated);
    } catch {
      // ignore
    }

    // 2. Open direct email client to send to Sowmiya's inbox (csowmiya2003@gmail.com)
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Sowmiya,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n— Sent from your 3D Portfolio`
    );
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`, "_blank");

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 8000);
  };

  const clearMessages = () => {
    localStorage.removeItem("sowmiya_received_messages");
    setSavedMessages([]);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "transparent",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      {/* Volumetric Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "20%",
          width: "600px",
          height: "450px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.glowColor} 0%, ${theme.glowColorSecondary} 50%, transparent 80%)`,
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.8s ease",
        }}
      />

      {/* ── Section Header ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        <div>
          {/* Eyebrow Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              background: `${theme.primary}18`,
              border: `1px solid ${theme.borderColor}`,
              backdropFilter: "blur(12px)",
              marginBottom: "16px",
              transition: "all 0.4s ease",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: theme.primary,
                boxShadow: `0 0 10px ${theme.primary}`,
                transition: "all 0.4s ease",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                color: theme.accent,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "color 0.4s ease",
              }}
            >
              07 // TRANSMISSION // GET IN TOUCH
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5.2vw, 4rem)",
              letterSpacing: "-0.03em",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            LET'S BUILD TOGETHER<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.82)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Available for full-time Software Engineer positions, developer internships, and technical collaborations.
          </p>
        </div>
      </div>

      {/* ── Content Container: Two Column Contact Layout ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1040px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Left Column: Direct Communication Channels */}
          <RollInCard
            index={0}
            total={2}
            maxTilt={6}
            scale={1.01}
            style={{
              borderRadius: "24px",
              background: theme.glassBg,
              border: `1.5px solid ${theme.borderColor}`,
              backdropFilter: "blur(24px)",
              padding: "clamp(24px, 3.5vw, 36px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.4s ease",
            }}
          >
            <div className="glass-shimmer-crimson" />

            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: theme.accent,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  transition: "color 0.4s ease",
                }}
              >
                Direct Communication Channels
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  color: "#ffffff",
                  marginBottom: "20px",
                }}
              >
                Reach Out Directly
              </h3>

              {/* Email Card */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(0, 0, 0, 0.45)",
                  border: `1px solid ${theme.borderColor}`,
                  marginBottom: "14px",
                  transition: "border-color 0.4s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.6)" }}>
                    PRIMARY DESTINATION EMAIL
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    style={{
                      background: "none",
                      border: "none",
                      color: copiedEmail ? theme.secondary : theme.accent,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {copiedEmail ? "✓ COPIED" : "COPY"}
                  </button>
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.95rem",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  {personal.email}
                </a>
              </div>

              {/* Phone Card */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(0, 0, 0, 0.45)",
                  border: `1px solid ${theme.borderColor}`,
                  marginBottom: "14px",
                  transition: "border-color 0.4s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.6)" }}>
                    PHONE / WHATSAPP
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    style={{
                      background: "none",
                      border: "none",
                      color: copiedPhone ? theme.secondary : theme.accent,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {copiedPhone ? "✓ COPIED" : "COPY"}
                  </button>
                </div>
                <a
                  href={`tel:${personal.phone}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.95rem",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  {personal.phone}
                </a>
              </div>

              {/* Location */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(0, 0, 0, 0.45)",
                  border: `1px solid ${theme.borderColor}`,
                  marginBottom: "20px",
                  transition: "border-color 0.4s ease",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "4px" }}>
                  LOCATION
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", color: "#ffffff", fontWeight: 600 }}>
                  {personal.location}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                GitHub ↗
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  background: `${theme.primary}22`,
                  border: `1px solid ${theme.borderColor}`,
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                LinkedIn ↗
              </a>
            </div>
          </RollInCard>

          {/* Right Column: Transmission Form */}
          <RollInCard
            index={1}
            total={2}
            maxTilt={6}
            scale={1.01}
            style={{
              borderRadius: "24px",
              background: theme.glassBg,
              border: `1.5px solid ${theme.borderColor}`,
              backdropFilter: "blur(24px)",
              padding: "clamp(24px, 3.5vw, 36px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.4s ease",
            }}
          >
            <div className="glass-shimmer-crimson" />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: theme.secondary,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "color 0.4s ease",
                }}
              >
                Direct Message Transmission
              </div>

              {/* Destination badge */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: `${theme.primary}25`,
                  border: `1px solid ${theme.borderColor}`,
                  color: theme.accent,
                }}
              >
                ➔ {personal.email}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Send an Inquiry
            </h3>

            {/* Clear explanation of where messages go */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.5,
                marginBottom: "18px",
              }}
            >
              Messages dispatch directly to <strong style={{ color: theme.secondary }}>{personal.email}</strong> and are saved in your local transmission history.
            </p>

            {submitted && (
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "12px",
                  background: `${theme.secondary}25`,
                  border: `1px solid ${theme.secondary}66`,
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  marginBottom: "20px",
                  lineHeight: 1.5,
                }}
              >
                <div style={{ color: theme.secondary, fontWeight: 700, marginBottom: "4px" }}>
                  ✓ Message Prepared &amp; Transmitted!
                </div>
                <div>Your mail client has been opened to dispatch directly to <strong>{personal.email}</strong>. Message is also saved in your local inbox history below.</div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "6px",
                  }}
                >
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    borderColor: theme.borderColor,
                    background: "rgba(0, 0, 0, 0.45)",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "6px",
                  }}
                >
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    borderColor: theme.borderColor,
                    background: "rgba(0, 0, 0, 0.45)",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "6px",
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, team or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    resize: "vertical",
                    borderColor: theme.borderColor,
                    background: "rgba(0, 0, 0, 0.45)",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  background: theme.btnGradient,
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: `0 8px 24px ${theme.glowColor}`,
                  transition: "all 0.2s ease",
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                TRANSMIT MESSAGE ➔
              </button>

              {/* Local Inbox Log Toggle */}
              <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowInbox(!showInbox)}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme.secondary,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: 0,
                  }}
                >
                  <span>{showInbox ? "▼ HIDE" : "▶ VIEW"} SAVED TRANSMISSIONS INBOX ({savedMessages.length})</span>
                </button>

                {showInbox && (
                  <div
                    style={{
                      marginTop: "12px",
                      background: "rgba(0, 0, 0, 0.55)",
                      borderRadius: "12px",
                      padding: "14px",
                      border: `1px solid ${theme.borderColor}`,
                      maxHeight: "220px",
                      overflowY: "auto",
                    }}
                  >
                    {savedMessages.length === 0 ? (
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "rgba(255, 255, 255, 0.5)" }}>
                        No messages transmitted yet. Try sending a test message!
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>
                            Local Message Log:
                          </span>
                          <button
                            type="button"
                            onClick={clearMessages}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#ff5252",
                              fontSize: "0.68rem",
                              fontFamily: "var(--font-mono)",
                              cursor: "pointer",
                            }}
                          >
                            Clear All
                          </button>
                        </div>
                        {savedMessages.map((msg) => (
                          <div
                            key={msg.id}
                            style={{
                              padding: "10px",
                              borderRadius: "8px",
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              fontSize: "0.75rem",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", color: theme.secondary, fontWeight: 700, marginBottom: "4px" }}>
                              <span>{msg.name} ({msg.email})</span>
                              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{msg.timestamp}</span>
                            </div>
                            <div style={{ color: "rgba(255, 255, 255, 0.85)", whiteSpace: "pre-wrap" }}>
                              {msg.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </RollInCard>
        </div>
      </div>
    </section>
  );
}
