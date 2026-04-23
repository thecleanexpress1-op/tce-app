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
  clock: "M12 6v6l4 2 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
};

type Item = [string, number];

// All prices are 1.5× the Dry Clean MRP (rounded to nearest ₹5).
const LUX_GENTS: Item[] = [
  ["Shirt", 210], ["T-Shirt", 195], ["Pant", 225], ["Jeans", 255],
  ["Blazer", 675], ["Jacket Half", 525], ["Jacket Full", 675],
  ["Dhoti / Lungi", 165], ["Overcoat Short", 600], ["Overcoat Large", 825],
  ["Shorts Premium", 120], ["Sweater Half", 300], ["Pullover Half", 375],
  ["Pullover Full", 375], ["Track Pant", 225], ["Track Upper", 450],
  ["Waist Coat", 375], ["Cap", 150], ["Tie", 150],
];

const LUX_TRAD: Item[] = [
  ["Kurta Normal", 240], ["Kurta with Starch", 240], ["Pajama Normal", 225],
  ["Pajama with Starch", 225], ["Kurta Premium", 375], ["Pajama Premium", 300],
  ["Kurta-Pajama Set", 525], ["Kurta-Pajama Premium", 675],
  ["Sherwani Plain", 825], ["Sherwani Embroidered", 1425],
  ["Premium Sherwani", 1800], ["Suit 2 Pc", 900], ["Suit 3 Pc", 1275],
  ["Sadri", 375], ["School Blazer", 525], ["Woollen Kurta", 450],
  ["Woollen Pajama", 270], ["Woollen Coat", 750], ["Leather Jacket", 1275],
  ["Muffler", 225],
];

const LUX_LADIES: Item[] = [
  ["Kurti Plain", 270], ["Kurti Embroidered", 375], ["Salwar Plain", 225],
  ["Salwar Embroidered", 300], ["Dupatta Plain", 150], ["Dupatta Heavy", 525],
  ["Dupatta Embroidered", 600], ["Stole Woollen", 300], ["Stole Normal", 225],
  ["Petticoat", 150], ["Lehenga Plain", 975], ["Lehenga Embroidered", 1500],
  ["Bridal Lehenga", 2475], ["Dress Short", 450], ["Dress Long", 525],
  ["Dress Long Embroidered", 675], ["Top", 225], ["Shorts", 150],
  ["Skirt Plain", 525], ["Skirt Heavy", 675], ["Saree Plain", 450],
  ["Silk Saree", 600], ["Saree Premium Embroidered", 750],
  ["Blouse Plain", 180], ["Blouse Embroidered", 225],
  ["Blouse Premium Embroidered", 375], ["Scarf", 225], ["Shawl", 450],
  ["Night Dress", 375], ["Burkha", 450], ["Gown Dress", 750],
  ["Woollen Kurti", 450], ["Cardigan Half", 375], ["Cardigan Full", 525],
];

const LUX_HOME: Item[] = [
  ["Bed Sheet Single", 225], ["Bed Sheet Double", 375], ["Pillow Cover S", 75],
  ["Pillow Cover L", 150], ["Bed Cover Single", 300], ["Bed Cover Double", 450],
  ["Bathrobe", 450], ["Foot Mats / sq.ft.", 60], ["Apron Set", 375],
  ["AC Blanket", 375], ["Blanket Single", 750], ["Blanket Double", 1050],
  ["Quilt Single", 1050], ["Carpet / sq.ft.", 60],
  ["Plain Window Curtains", 225], ["Plain Net Curtains", 195],
  ["Plain Door Curtains", 375], ["Net Door Curtains", 375],
  ["Curtains with Astar", 525], ["Net Curtain with Astar", 450],
  ["Curtains Heavy Work", 825], ["Pillow", 225],
  ["Handbag Small", 525], ["School Bag Large", 525],
  ["Suitcase Small", 405], ["Suitcase Medium", 735], ["Suitcase Large", 1050],
];

const LUX_SHOE: Item[] = [["Sports Shoes", 525], ["Leather Shoes", 900]];

const TABS = [
  { id: "gents",       label: "Gents",       data: LUX_GENTS  },
  { id: "traditional", label: "Traditional", data: LUX_TRAD   },
  { id: "ladies",      label: "Ladies",      data: LUX_LADIES },
  { id: "household",   label: "Household",   data: LUX_HOME   },
  { id: "shoes",       label: "Shoes",       data: LUX_SHOE   },
] as const;

type TabId = typeof TABS[number]["id"];

export default function LuxuryLaundryPage() {
  const [tab, setTab] = useState<TabId>("gents");
  const [qty, setQty] = useState<Record<string, number>>({});

  const current = TABS.find((t) => t.id === tab)!;

  const bump = (key: string, delta: number) => {
    setQty((q) => {
      const next = Math.max(0, (q[key] || 0) + delta);
      const { [key]: _omit, ...rest } = q;
      return next === 0 ? rest : { ...rest, [key]: next };
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    let items = 0, price = 0;
    for (const [k, q] of Object.entries(qty)) {
      const [tabId, name] = k.split("::");
      const tabDef = TABS.find((t) => t.id === tabId);
      const item = tabDef?.data.find(([n]) => n === name);
      if (item) { items += q; price += q * item[1]; }
    }
    return { totalItems: items, totalPrice: price };
  }, [qty]);

  return (
    <div style={{ padding: "0 0 160px", color: "#000", background: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 14px" }}>
        <Link href="/services" style={{ color: "#000" }}><Svg d={ICON.back} size={22} /></Link>
        <div style={{ flex: 1, fontSize: 22, fontWeight: 800 }}>Luxury Laundry</div>
      </div>

      {/* Black hero */}
      <div style={{ background: "#000", color: "#fff", padding: "26px 24px 32px" }}>
        <div style={{ display: "inline-block", border: "1px solid #333", background: "#111", padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em" }}>
          HAND-FINISHED
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.15, marginTop: 12, letterSpacing: "-0.01em" }}>
          Heirlooms, bridal and couture.
        </div>
        <div style={{ fontFamily: '"Dancing Script", cursive', fontSize: 18, opacity: 0.92, marginTop: 10, lineHeight: 1.2 }}>
          Hand-spot. Hand-steam. Hand-wrap.
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "16px 20px 14px", borderBottom: "1px solid #e7e7e7" }}>
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 14px", borderRadius: 999,
                border: on ? "1px solid #000" : "1px solid #e7e7e7",
                background: on ? "#000" : "#fff", color: on ? "#fff" : "#000",
                fontSize: 12, fontWeight: 800, letterSpacing: "0.1em",
                cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Price list */}
      <div style={{ padding: "18px 20px 0" }}>
        <div style={{ border: "1px solid #e7e7e7", borderRadius: 14, overflow: "hidden" }}>
          {current.data.map(([name, price], i) => {
            const key = `${current.id}::${name}`;
            const q = qty[key] || 0;
            return (
              <div
                key={name}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px",
                  borderBottom: i < current.data.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#6b6b6b", marginTop: 2 }}>₹{price.toLocaleString("en-IN")}</div>
                </div>
                {q === 0 ? (
                  <button
                    onClick={() => bump(key, 1)}
                    style={{
                      padding: "5px 12px", borderRadius: 999,
                      border: "1px solid #000", background: "#fff", color: "#000",
                      fontSize: 10, fontWeight: 800, letterSpacing: "0.14em",
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    ADD
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #000", borderRadius: 999, padding: "4px 6px" }}>
                    <button onClick={() => bump(key, -1)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4, display: "flex", color: "#000" }}>
                      <Svg d={ICON.minus} size={14} sw={2.4} />
                    </button>
                    <div style={{ fontSize: 13, fontWeight: 800, minWidth: 14, textAlign: "center" }}>{q}</div>
                    <button onClick={() => bump(key, 1)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4, display: "flex", color: "#000" }}>
                      <Svg d={ICON.plus} size={14} sw={2.4} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Turnaround */}
      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", marginBottom: 10 }}>
          TURNAROUND
        </div>
        <div style={{ padding: 14, borderRadius: 14, background: "#f3f3f3", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ paddingTop: 2, flexShrink: 0 }}>
            <Svg d={ICON.clock} size={18} />
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: "#3a3a3a" }}>
            Minimum 3 days. Express is not available on couture, bridal or silk pieces — hand-finishing takes its own time.
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #e7e7e7", padding: "14px 20px 22px" }}>
        <Link
          href={`/book?service=luxury${totalItems ? `&items=${totalItems}&total=${totalPrice}` : ""}`}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "#000", color: "#fff", padding: "14px 0", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textDecoration: "none" }}
        >
          {totalItems > 0
            ? <>BOOK LUXURY PICKUP · {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"} · ₹{totalPrice.toLocaleString("en-IN")} <Svg d={ICON.arrow} size={16} /></>
            : <>BOOK LUXURY PICKUP <Svg d={ICON.arrow} size={16} /></>
          }
        </Link>
      </div>
    </div>
  );
}