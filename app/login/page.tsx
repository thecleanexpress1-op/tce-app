"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const phoneValid = phone.length === 10 && /^\d+$/.test(phone);
  const otpComplete = otp.every((d) => d !== "");

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const cellBase: React.CSSProperties = {
    width: 44,
    height: 52,
    border: "1.5px solid #000",
    borderRadius: 12,
    textAlign: "center",
    fontWeight: 800,
    fontSize: 18,
    fontFamily: "Poppins, sans-serif",
    background: "#fff",
    color: "#000",
    outline: "none",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#000",
        padding: "28px 22px 40px",
        fontFamily: "Poppins, -apple-system, sans-serif",
      }}
    >
      <svg viewBox="0 0 440 180" width="70" style={{ display: "block", marginBottom: 22 }}>
        <text x="220" y="105" textAnchor="middle" fill="#000" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="120" letterSpacing="2">TCE</text>
        <line x1="90" y1="125" x2="350" y2="125" stroke="#000" strokeWidth="3" />
        <text x="220" y="163" textAnchor="middle" fill="#000" fontFamily="'Dancing Script', cursive" fontStyle="italic" fontWeight="500" fontSize="34">Luxury in every fold</text>
      </svg>

      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>Welcome to TCE.</div>
      <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Sign in to schedule your first pickup.</div>

      {/* Language */}
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", margin: "24px 0 10px" }}>
        Language
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ padding: "8px 16px", borderRadius: 999, background: "#000", color: "#fff", fontSize: 12, fontWeight: 700 }}>English</div>
        <div style={{ padding: "8px 16px", borderRadius: 999, border: "1.5px dashed #ccc", fontSize: 12, fontWeight: 700, color: "#bbb", cursor: "not-allowed" }} title="Coming soon">
          हिन्दी
        </div>
        <div style={{ fontSize: 10, color: "#bbb" }}>Coming soon</div>
      </div>

      {/* Phone input */}
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", margin: "24px 0 10px" }}>
        Phone number
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, border: `1.5px solid ${phoneValid ? "#000" : "#ccc"}`, borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontWeight: 800 }}>+91</div>
        <div style={{ width: 1, height: 18, background: "#ddd" }} />
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontWeight: 700,
            fontSize: 15,
            fontFamily: "Poppins, sans-serif",
            background: "transparent",
            color: "#000",
          }}
        />
      </div>

      {!otpSent && (
        <div style={{ marginTop: 20 }}>
          <button
            disabled={!phoneValid}
            onClick={() => setOtpSent(true)}
            style={{
              width: "100%",
              padding: "14px",
              background: phoneValid ? "#000" : "#ddd",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 14,
              cursor: phoneValid ? "pointer" : "not-allowed",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Send OTP
          </button>
        </div>
      )}

      {otpSent && (
        <>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", margin: "24px 0 10px" }}>
            Enter OTP
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  otpRefs.current[i] = el;
                }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                style={cellBase}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginTop: 10 }}>
            OTP sent to +91 {phone} · Resend in 00:28
          </div>

          <div style={{ marginTop: 30 }}>
            <Link
              href={otpComplete ? "/welcome" : "#"}
              style={{ textDecoration: "none", display: "block", pointerEvents: otpComplete ? "auto" : "none" }}
            >
              <button
                disabled={!otpComplete}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: otpComplete ? "#000" : "#ddd",
                  color: "#fff",
                  border: "none",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: otpComplete ? "pointer" : "not-allowed",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Continue →
              </button>
            </Link>
            <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginTop: 12 }}>
              By continuing you agree to our Terms & Privacy.
            </div>
          </div>
        </>
      )}
    </main>
  );
}