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
  search: "M21 21l-4.3-4.3 M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
  minus: "M5 12h14",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 5l7 7-7 7",
};

type Item = [string, number];

const DC_GENTS: Item[] = [
  ["Shirt", 140], ["T-Shirt", 130], ["Pant", 150], ["Jeans", 170],
  ["Blazer", 450], ["Jacket Half", 350], ["Jacket Full", 450],
  ["Dhoti / Lungi", 110], ["Overcoat Short", 400], ["Overcoat Large", 550],
  ["Shorts Premium", 80], ["Sweater Half", 200], ["Pullover Half", 250],
  ["Pullover Full", 250], ["Track Pant", 150], ["Track Upper", 300],
  ["Waist Coat", 250], ["Cap", 100], ["Tie", 100],
];

const DC_TRAD: Item[] = [
  ["Kurta Normal", 160], ["Kurta with Starch", 160], ["Pajama Normal", 150],
  ["Pajama with Starch", 150], ["Kurta Premium", 250], ["Pajama Premium", 200],
  ["Kurta-Pajama Set", 350], ["Kurta-Pajama Premium", 450],
  ["Sherwani Plain", 550], ["Sherwani Embroidered", 950],
  ["Premium Sherwani", 1200], ["Suit 2 Pc", 600], ["Suit 3 Pc", 850],
  ["Sadri", 250], ["School Blazer", 350], ["Woollen Kurta", 300],
  ["Woollen Pajama", 180], ["Woollen Coat", 500], ["Leather Jacket", 850],
  ["Muffler", 150],
];

const DC_LADIES: Item[] = [
  ["Kurti Plain", 180], ["Kurti Embroidered", 250], ["Salwar Plain", 150],
  ["Salwar Embroidered", 200], ["Dupatta Plain", 100], ["Dupatta Heavy", 350],
  ["Dupatta Embroidered", 400], ["Stole Woollen", 200], ["Stole Normal", 150],
  ["Petticoat", 100], ["Lehenga Plain", 650], ["Lehenga Embroidered", 1000],
  ["Bridal Lehenga", 1650], ["Dress Short", 300], ["Dress Long", 350],
  ["Dress Long Embroidered", 450], ["Top", 150], ["Shorts", 100],
  ["Skirt Plain", 350], ["Skirt Heavy", 450], ["Saree Plain", 300],
  ["Silk Saree", 400], ["Saree Premium Embroidered", 500],
  ["Blouse Plain", 120], ["Blouse Embroidered", 150],
  ["Blouse Premium Embroidered", 250], ["Scarf", 150], ["Shawl", 300],
  ["Night Dress", 250], ["Burkha", 300], ["Gown Dress", 500],
  ["Woollen Kurti", 300], ["Cardigan Half", 250], ["Cardigan Full", 350],
];

const DC_HOME: Item[] = [
  ["Bed Sheet Single", 150], ["Bed Sheet Double", 250], ["Pillow Cover S", 50],
  ["Pillow Cover L", 100], ["Bed Cover Single", 200], ["Bed Cover Double", 300],
  ["Bathrobe", 300], ["Foot Mats / sq.ft.", 40], ["Apron Set", 250],
  ["AC Blanket", 250], ["Blanket Single", 500], ["Blanket Double", 700],
  ["Quilt Single", 700], ["Carpet / sq.ft.", 40],
  ["Plain Window Curtains", 150], ["Plain Net Curtains", 130],
  ["Plain Door Curtains", 250], ["Net Door Curtains", 250],
  ["Curtains with Astar", 350], ["Net Curtain with Astar", 300],
  ["Curtains Heavy Work", 550], ["Pillow", 150],
  ["Handbag Small", 350], ["School Bag Large", 350],
  ["Suitcase Small", 270], ["Suitcase Medium", 490], ["Suitcase Large", 700],
];

const DC_SHOE: Item[] = [["Sports Shoes", 350], ["Leather Shoes", 600]];

const TABS = [
  { id: "gents",       label: "Gents",       data: DC_GENTS  },
  { id: "traditional", label: "Traditional", data: DC_TRAD   },
  { id: "ladies",      label: "Ladies",      data: DC_LADIES },
  { id: "household",   label: "Household",   data: DC_HOME   },
  { id: "shoes",       label: "Shoes",       data: DC_SHOE   },
] as const;

type TabId = typeof TABS[number]["id"];

export default function DryCleanPage() {
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
    <div style={{ padding: "18px 20px 160px", color: "#000", background: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <Link href="/services" style={{ color: "#000" }}><Svg d={ICON.back} size={22} /></Link>
        <div style={{ flex: 1, fontSize: 22, fontWeight: 800 }}>Dry Clean</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e7e7e7", padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em" }}>
          <Svg d={ICON.search} size={12} sw={2} />
          SEARCH
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid #e7e7e7" }}>
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

      {/* Press-is-included note */}
      <div style={{ padding: 14, borderRadius: 14, background: "#f3f3f3", marginBottom: 20 }}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "#3a3a3a" }}>
          <b>Press is included.</b> Every dry clean garment comes back hand pressed and hanger ready. If you just want an iron, use the Iron only catalogue.
        </div>
      </div>

      {/* Price list */}
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
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 12, color: "#6b6b6b" }}>₹{price}</div>
              </div>
              {q === 0 ? (
                <button
                  onClick={() => bump(key, 1)}
                  style={{
                    padding: "6px 14px", borderRadius: 999,
                    border: "1px solid #000", background: "#fff", color: "#000",
                    fontSize: 11, fontWeight: 800, letterSpacing: "0.12em",
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

      {/* Turnaround */}
      <div style={{ padding: 14, borderRadius: 14, background: "#f3f3f3", marginTop: 20 }}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "#3a3a3a" }}>
          <b>Turnaround.</b> 3 days standard. Express under 4 hours adds ₹99 per garment on regular items, adds 249 on lehenga, sherwani, curtain, carpet and heavy female wear. Shoe express is additional ₹149 over base charge per pair.
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #e7e7e7", padding: "14px 20px 22px" }}>
        {totalItems > 0 ? (
          <Link
            href={`/book?service=dryclean&items=${totalItems}&total=${totalPrice}`}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "#000", color: "#fff", padding: "14px 0", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textDecoration: "none" }}
          >
            ADD {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"} · ₹{totalPrice.toLocaleString("en-IN")} <Svg d={ICON.arrow} size={16} />
          </Link>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f3f3", color: "#6b6b6b", padding: "14px 0", borderRadius: 999, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em" }}>
            SELECT ITEMS TO CONTINUE
          </div>
        )}
      </div>
    </div>
  );
}