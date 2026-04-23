"use client";

import Link from "next/link";
import { useState } from "react";

function Svg({ d, size = 20, sw = 1.8 }: { d: string; size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICON = {
  back: "M15 6l-6 6 6 6",
  check: "M5 13l4 4 10-10",
  cross: "M6 6l12 12 M18 6L6 18",
  arrow: "M5 12h14 M13 5l7 7-7 7",
};

type Service = { id: string; name: string; price: string; note: string; tag?: string };

const PART1: Service[] = [
  { id: "fold",    name: "Wash and Fold",   price: "₹120", note: "Detergent wash, machine dry, neat fold" },
  { id: "iron",    name: "Wash and Iron",   price: "₹170", note: "Washed, pressed, on hangers", tag: "POPULAR" },
  { id: "organic", name: "Organic Laundry", price: "₹250", note: "Plant-based detergent, hypoallergenic" },
];

const ADDONS = [
  { id: "fragrance", label: "Fragrance boost",          price: "+ ₹40",  unit: "per kg" },
  { id: "softener",  label: "Premium softener",         price: "+ ₹30",  unit: "per kg" },
  { id: "bag49",     label: "TCE Carry Bag",         price: "+₹49",    unit: "per piece" },
  { id: "bag59",     label: "TCE Large Carry Bag", price: "+₹59", unit: "per piece" },
  { id: "bag349",    label: "TCE Laundry Bag for Homes", price: "+₹249",   unit: "per piece" },
];

const GOES_IN = [
  "Cotton shirts, t-shirts, trousers",
  "Jeans and casual kurtas",
  "Bed sheets and pillow covers",
  "Towels and napkins",
  "Socks and undergarments",
  "Kidswear and gym wear",
];

const DOES_NOT_GO = [
  "Silk, satin, velvet, chiffon",
  "Wool sweaters and cashmere",
  "Suits, blazers, heavy jackets",
  "Leather and suede items",
  "Bridal or heavily embroidered",
  "Sequined, beaded, embellished",
  "Anything labelled dry clean only",
];

export default function LaundryByKgPage() {
  const [service, setService] = useState("iron");
  const [express, setExpress] = useState(false);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setAddons((a) => ({ ...a, [id]: !a[id] }));

  return (
    <div style={{ padding: "18px 20px 120px", color: "#000", background: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <Link href="/services" style={{ color: "#000" }}><Svg d={ICON.back} size={22} /></Link>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Laundry by Kg</div>
      </div>

      {/* Top grey notification */}
      <div style={{ padding: 14, borderRadius: 14, background: "#f3f3f3", marginBottom: 22 }}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "#3a3a3a" }}>
          Minimum 3 kg per order. Weighed at the hub on a tamper-proof scale. A photo of the weighing goes to you before wash starts.
        </div>
      </div>

      {/* PART 1: services */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {PART1.map((s) => {
          const active = service === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setService(s.id)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 18px",
                border: active ? "2px solid #000" : "1px solid #e7e7e7",
                borderRadius: 16,
                background: active ? "#000" : "#fff",
                color: active ? "#fff" : "#000",
                cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{s.name}</div>
                  {s.tag && (
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", padding: "2px 8px", borderRadius: 999, background: active ? "#fff" : "#000", color: active ? "#000" : "#fff" }}>
                      {s.tag}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 12, color: active ? "rgba(255,255,255,0.75)" : "#6b6b6b" }}>{s.note}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.price}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>per kg</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* PART 2: ADD EXPRESS */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", margin: "0 4px 10px" }}>
        ADD EXPRESS
      </div>
      <button
        onClick={() => setExpress(!express)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",
          padding: "16px 18px",
          border: express ? "2px solid #000" : "1px solid #e7e7e7",
          borderRadius: 16,
          background: express ? "#000" : "#fff",
          color: express ? "#fff" : "#000",
          cursor: "pointer", textAlign: "left", fontFamily: "inherit", marginBottom: 10,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Under 4 hours express</div>
          <div style={{ fontSize: 12, color: express ? "rgba(255,255,255,0.75)" : "#6b6b6b" }}>Same-day, before 11am pickup</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>₹299</div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>per kg</div>
        </div>
      </button>
      <div style={{ padding: 12, borderRadius: 12, background: "#fff1ee", border: "1px solid #f4d6cf", marginBottom: 28 }}>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: "#b4421f" }}>
          Not available for cashmere, wool, silk, carpets and felting-risk items.
        </div>
      </div>

      {/* PART 3: ADD-ONS */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", margin: "0 4px 10px" }}>
        ADD-ONS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {ADDONS.map((a) => {
          const on = !!addons[a.id];
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 16px", border: "1px solid #e7e7e7", borderRadius: 14,
                background: "#fff", color: "#000", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: on ? "none" : "1.5px solid #c9c9c9", background: on ? "#000" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                  {on && <Svg d={ICON.check} size={14} sw={2.4} />}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.label}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{a.price}</div>
                <div style={{ fontSize: 10, color: "#6b6b6b" }}>{a.unit}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* WHAT GOES IN */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", margin: "0 4px 10px" }}>
        WHAT GOES IN KILO
      </div>
      <div style={{ padding: 16, border: "1px solid #e7e7e7", borderRadius: 14, marginBottom: 20 }}>
        {GOES_IN.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 0" }}>
            <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Svg d={ICON.check} size={12} sw={2.4} />
            </div>
            <div style={{ fontSize: 13 }}>{item}</div>
          </div>
        ))}
      </div>

      {/* WHAT DOES NOT GO + red notification */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", margin: "0 4px 10px" }}>
        WHAT DOES NOT GO IN KILO
      </div>
      <div style={{ padding: 12, borderRadius: 12, background: "#fff1ee", border: "1px solid #f4d6cf", marginBottom: 10 }}>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: "#b4421f" }}>
          Heavy, delicate or bulky items are priced per piece under Dry Clean or Couture. This keeps your fabric safe.
        </div>
      </div>
      <div style={{ padding: 16, border: "1px solid #e7e7e7", borderRadius: 14, marginBottom: 24 }}>
        {DOES_NOT_GO.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 0" }}>
            <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#f5f3ee", color: "#6b6b6b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Svg d={ICON.cross} size={12} sw={2.4} />
            </div>
            <div style={{ fontSize: 13, color: "#6b6b6b" }}>{item}</div>
          </div>
        ))}
      </div>

      {/* Sticky CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #e7e7e7", padding: "14px 20px 22px" }}>
        <Link
          href={`/book?service=laundry&type=${service}${express ? "&express=1" : ""}`}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "#000", color: "#fff", padding: "14px 0", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textDecoration: "none" }}
        >
          SCHEDULE PICKUP <Svg d={ICON.arrow} size={16} />
        </Link>
      </div>
    </div>
  );
}