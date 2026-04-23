"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- Icon helper (matches the convention used in other service pages) -------
function Svg({ d, size = 18, sw = 2 }: { d: string; size?: number; sw?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const I = {
  back: "M15 18l-6-6 6-6",
  drop: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  cam: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 13a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 13z",
  shirt: "M16 4l4 2v5l-2 1v9H6v-9l-2-1V6l4-2l4 3z",
  chr: "M9 18l6-6-6-6",
};

// --- Data (matches STAIN_PRICES in build_v2.py) -----------------------------
const STAIN_PRICES: Array<{ label: string; price: number; desc: string }> = [
  { label: "Light stains", price: 29, desc: "Coffee, tea, juice, light food" },
  { label: "Medium stains", price: 49, desc: "Oil, ghee, curry, turmeric, chocolate" },
  { label: "Pigment stains", price: 69, desc: "Wine, lipstick, ink, mehndi, paint" },
  { label: "Tough / old stains", price: 99, desc: "Old stains, blood, grease, shoe polish" },
];

const COMMON_STAINS: Array<{ name: string; tier: string }> = [
  { name: "Coffee, tea, juice", tier: "Light, from ₹29" },
  { name: "Oil, ghee, curry", tier: "Medium, ₹49" },
  { name: "Turmeric, chocolate", tier: "Medium, ₹49" },
  { name: "Wine, lipstick, ink", tier: "Pigment, ₹69" },
  { name: "Blood, old stains", tier: "Tough, ₹99" },
  { name: "Grease, shoe polish", tier: "Tough, ₹99" },
];

// --- Style atoms ------------------------------------------------------------
const SECTION_TITLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: 1.2,
  color: "#000",
  marginTop: 20,
  marginBottom: 8,
};

const CARD: React.CSSProperties = {
  border: "1px solid #e5e5e5",
  borderRadius: 14,
  background: "#fff",
};

const MUTED: React.CSSProperties = { color: "#777" };

// ---------------------------------------------------------------------------
export default function StainSOSPage() {
  const [note, setNote] = useState("");
  const [photoSelected, setPhotoSelected] = useState(false);

  return (
    <div style={{ paddingBottom: 110, background: "#fff", minHeight: "100vh" }}>
      {/* Topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 18px",
          borderBottom: "1px solid #eee",
          background: "#fff",
          position: "sticky",
          top: 32,
          zIndex: 10,
        }}
      >
        <Link href="/services" style={{ color: "#000", textDecoration: "none", display: "inline-flex" }}>
          <Svg d={I.back} size={18} />
        </Link>
        <div style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>Stain SOS</div>
      </div>

      <div style={{ padding: "14px 18px 0 18px" }}>
        {/* Hero photo-upload card */}
        <div style={{ ...CARD, border: "1px solid #000", padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#000" }}>
            Photograph the stain before pickup.
          </div>
          <div style={{ fontSize: 11, marginTop: 4, lineHeight: 1.45, ...MUTED }}>
            Our fabric specialist confirms treatment and price before work begins. No surprises on
            the bill.
          </div>
          <button
            onClick={() => setPhotoSelected(true)}
            style={{
              marginTop: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid #000",
              background: photoSelected ? "#000" : "#fff",
              color: photoSelected ? "#fff" : "#000",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.5,
              cursor: "pointer",
            }}
          >
            <Svg d={I.cam} size={12} sw={2} />
            {photoSelected ? "PHOTO ATTACHED" : "UPLOAD PHOTO"}
          </button>
        </div>

        {/* Pricing by difficulty */}
        <div style={SECTION_TITLE}>Pricing by difficulty</div>
        {STAIN_PRICES.map((s) => (
          <div
            key={s.label}
            style={{
              ...CARD,
              padding: 12,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#000" }}>{s.label}</div>
              <div style={{ fontSize: 11, marginTop: 2, ...MUTED }}>{s.desc}</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, whiteSpace: "nowrap" }}>
              ₹{s.price}
              <span style={{ fontSize: 10, fontWeight: 600, color: "#777" }}> per stain</span>
            </div>
          </div>
        ))}

        {/* How we price */}
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: 12,
            padding: 10,
            marginTop: 4,
          }}
        >
          <div style={{ fontSize: 11, color: "#444", lineHeight: 1.5 }}>
            <b style={{ color: "#000" }}>How we price. </b>
            Every stain is classified on arrival by our fabric team. You approve the total before
            wash begins. No removal means no charge on that stain.
          </div>
        </div>

        {/* Common stains */}
        <div style={SECTION_TITLE}>Common stains we handle</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {COMMON_STAINS.map((s) => (
            <div key={s.name} style={{ ...CARD, padding: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Svg d={I.drop} size={16} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#000" }}>{s.name}</div>
              <div style={{ fontSize: 10, marginTop: 2, ...MUTED }}>{s.tier}</div>
            </div>
          ))}
        </div>

        {/* Your garment */}
        <div style={SECTION_TITLE}>Your garment</div>
        <div
          style={{
            ...CARD,
            padding: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Svg d={I.shirt} size={14} />
            <div style={{ fontSize: 12, fontWeight: 600 }}>Cotton shirt</div>
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "4px 10px",
              background: "#000",
              color: "#fff",
              borderRadius: 20,
              letterSpacing: 0.5,
            }}
          >
            SELECTED
          </div>
        </div>

        {/* Notes */}
        <div style={SECTION_TITLE}>Notes to specialist</div>
        <div style={{ ...CARD, padding: 12 }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Splashed coffee on the collar last night, still slightly damp."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 11,
              color: "#333",
              resize: "vertical",
              minHeight: 64,
              fontFamily: "inherit",
              background: "transparent",
            }}
          />
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 420,
          padding: "12px 18px 16px 18px",
          background: "#fff",
          borderTop: "1px solid #eee",
          zIndex: 20,
        }}
      >
        <Link href="/book?service=stain" style={{ textDecoration: "none", display: "block" }}>
          <button
            style={{
              width: "100%",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              padding: "14px 16px",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 1.2,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            REQUEST ASSESSMENT
            <Svg d={I.chr} size={14} />
          </button>
        </Link>
      </div>
    </div>
  );
}