"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

function Svg({ d, size = 20, sw = 1.8 }: { d: string; size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICON = {
  back: "M15 6l-6 6 6 6",
  minus: "M5 12h14",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 5l7 7-7 7",
};

type Item = [string, number];

const IRON_ONLY: Item[] = [
  ["Shirt", 50],                 ["T-Shirt", 50],
  ["Pant", 40],                  ["Jeans", 50],
  ["Kurta Normal", 50],          ["Kurta Premium", 80],
  ["Pajama", 40],                ["Kurta-Pajama Set", 80],
  ["Salwar", 40],                ["Dupatta Plain", 30],
  ["Dupatta Heavy", 50],         ["Saree Plain", 120],
  ["Silk Saree", 150],           ["Saree Premium", 200],
  ["Lehenga Plain", 180],        ["Lehenga Embroidered", 250],
  ["Sherwani Plain", 150],       ["Sherwani Embroidered", 170],
  ["Premium Sherwani", 200],     ["Suit 2 Piece", 200],
  ["Suit 3 Piece", 230],         ["Blazer", 150],
  ["Blouse Plain", 40],          ["Blouse Embroidered", 50],
  ["Dress Short", 50],           ["Dress Long", 70],
  ["Skirt Plain", 50],           ["Night Dress", 50],
];

export default function IronOnlyPage() {
  const [qty, setQty] = useState<Record<string, number>>({});

  const bump = (name: string, delta: number) => {
    setQty((q) => {
      const next = Math.max(0, (q[name] || 0) + delta);
      const { [name]: _omit, ...rest } = q;
      return next === 0 ? rest : { ...rest, [name]: next };
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    let items = 0, price = 0;
    for (const [n, q] of Object.entries(qty)) {
      const item = IRON_ONLY.find(([name]) => name === n);
      if (item) { items += q; price += q * item[1]; }
    }
    return { totalItems: items, totalPrice: price };
  }, [qty]);

  return (
    <div style={{ padding: "18px 20px 160px", color: "#000", background: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <Link href="/services" style={{ color: "#000" }}><Svg d={ICON.back} size={22} /></Link>
        <div style={{ flex: 1, fontSize: 22, fontWeight: 800 }}>Iron only</div>
        <div style={{ border: "1px solid #000", padding: "5px 12px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.16em" }}>
          NO WASH
        </div>
      </div>

      {/* Hero info card */}
      <div style={{ padding: 16, border: "1px solid #e7e7e7", borderRadius: 14, background: "#fafafa", marginBottom: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>You already washed them. We just press.</div>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: "#6b6b6b" }}>
          Steam iron by trained press team. Hanger and cover included for every piece.
        </div>
      </div>

      {/* Price list label */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", margin: "0 4px 10px" }}>
        PRICE LIST
      </div>

      {/* Two-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
        {IRON_ONLY.map(([name, price]) => {
          const q = qty[name] || 0;
          return (
            <button
              key={name}
              onClick={() => bump(name, 1)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between",
                gap: 8, padding: "12px 12px",
                border: q > 0 ? "1.5px solid #000" : "1px solid #e7e7e7",
                borderRadius: 12, background: "#fff", color: "#000",
                cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                minHeight: 72,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.25 }}>{name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ fontSize: 13, fontWeight: 800 }}>₹{price}</div>
                {q > 0 ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      onClick={(e) => { e.stopPropagation(); bump(name, -1); }}
                      style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Svg d={ICON.minus} size={10} sw={2.4} />
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, minWidth: 10, textAlign: "center" }}>{q}</span>
                    <span
                      onClick={(e) => { e.stopPropagation(); bump(name, 1); }}
                      style={{ width: 20, height: 20, borderRadius: "50%", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Svg d={ICON.plus} size={10} sw={2.4} />
                    </span>
                  </div>
                ) : (
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", color: "#6b6b6b" }}>TAP TO ADD</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Turnaround */}
      <div style={{ padding: 14, borderRadius: 14, background: "#f3f3f3", marginBottom: 20 }}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "#3a3a3a" }}>
          <b>Turnaround.</b> Next day standard. Express under 3 hours adds ₹50 per piece on regular items, ₹99 on sherwani, lehenga, heavy saree.
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #e7e7e7", padding: "14px 20px 22px" }}>
        {totalItems > 0 ? (
          <Link
            href={`/book?service=ironly&items=${totalItems}&total=${totalPrice}`}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "#000", color: "#fff", padding: "14px 0", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textDecoration: "none" }}
          >
            CONTINUE · {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"} · ₹{totalPrice.toLocaleString("en-IN")} <Svg d={ICON.arrow} size={16} />
          </Link>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f3f3", color: "#6b6b6b", padding: "14px 0", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em" }}>
            TAP ITEMS TO ADD
          </div>
        )}
      </div>
    </div>
  );
}