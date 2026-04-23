"use client";

import Link from "next/link";

function Svg({ d, size = 20, sw = 1.8 }: { d: string; size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICON = {
  back: "M15 6l-6 6 6 6",
  search: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z M21 21l-4.3-4.3",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  tshirt: "M8 3l4 3 4-3 5 3-2 4-3-1v12H6V9L3 10 1 6z",
  hanger: "M12 4a2 2 0 1 1 2 2c0 1-2 1.5-2 3v1 M4 18l8-6 8 6H4z",
  drop: "M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12z",
  camera: "M4 7h3l2-3h6l2 3h3v13H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  dress: "M9 3l3 3 3-3 3 4-2 3 2 11H7l2-11-2-3z",
  box: "M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10",
  shoe: "M3 17h14l4-3-2-3-4 1-2-4H6l-3 4z",
  building: "M4 21V6l6-3v18 M10 21h10V10H10 M13 13h3 M13 17h3",
  home: "M3 12l9-9 9 9 M5 10v10h14V10",
  grid: "M4 6h16 M4 12h16 M4 18h16",
  crown: "M3 18h18 M3 8l4 5 5-8 5 8 4-5v10H3z",
  user: "M20 21a8 8 0 0 0-16 0 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

function ServiceTile({ icon, label, sub, href, dark = false }: { icon: string; label: string; sub: string; href: string; dark?: boolean }) {
  return (
    <Link href={href} style={{ display: "flex", flexDirection: "column", gap: 14, padding: 16, border: "1px solid #e7e7e7", borderRadius: 18, color: dark ? "#fff" : "#000", background: dark ? "#000" : "#fff", textDecoration: "none" }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: dark ? "rgba(255,255,255,0.08)" : "#f5f3ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Svg d={icon} size={20} />
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.65)" : "#6b6b6b" }}>{sub}</div>
      </div>
    </Link>
  );
}

function NavItem({ icon, label, href, active = false }: { icon: string; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: active ? "#000" : "#6b6b6b", textDecoration: "none", flex: 1 }}>
      <Svg d={icon} size={22} sw={active ? 2 : 1.6} />
      <div style={{ fontSize: 10, fontWeight: active ? 800 : 500, letterSpacing: "0.08em" }}>{label}</div>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <div style={{ padding: "18px 20px 100px", color: "#000", background: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/home" style={{ color: "#000" }}><Svg d={ICON.back} size={22} /></Link>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Services</div>
        </div>
        <Link href="/services/search" style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid #e7e7e7", borderRadius: 999, padding: "7px 14px", color: "#000", textDecoration: "none", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em" }}>
          <Svg d={ICON.search} size={12} /> SEARCH
        </Link>
      </div>

      {/* Headline */}
      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>What are we cleaning today?</div>
      <div style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 22, lineHeight: 1.4 }}>Pick a category. You can mix and match in one pickup.</div>

      {/* 8 tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <ServiceTile icon={ICON.target} label="Laundry by Kg" sub="from ₹120 per kg" href="/services/laundry" />
        <ServiceTile icon={ICON.tshirt} label="Dry Clean" sub="press included, from ₹110" href="/services/dryclean" dark />
        <ServiceTile icon={ICON.hanger} label="Iron only" sub="from ₹20 per piece" href="/services/iron" />
        <ServiceTile icon={ICON.drop} label="Stain SOS" sub="from ₹29 per stain" href="/services/stain" />
        <ServiceTile icon={ICON.camera} label="Snap and Bill" sub="AI weight from photo" href="/services/snap" />
        <ServiceTile icon={ICON.dress} label="Luxury Laundry" sub="bridal, heirloom" href="/services/luxury" />
        <ServiceTile icon={ICON.box} label="Household" sub="linens, curtains" href="/services/household" />
        <ServiceTile icon={ICON.shoe} label="Shoe Care" sub="sports, leather" href="/services/shoes" />
      </div>

      {/* B2B block — prototype style */}
     {/* B2B block */}
<div style={{ marginTop: 18 }}>
  <Link
    href="/business"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 16px",
      border: "1px solid #e7e7e7",
      borderRadius: 14,
      background: "#fff",
      color: "#000",
      textDecoration: "none",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Svg d={ICON.building} size={18} />
      <div style={{ fontSize: 14, fontWeight: 800 }}>B2B and institutional enquiries</div>
    </div>
    <div style={{ border: "1px solid #000", padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.16em" }}>
      OPEN
    </div>
  </Link>
  <div style={{ fontSize: 12, color: "#6b6b6b", textAlign: "center", marginTop: 14, lineHeight: 1.6, padding: "0 20px" }}>
    Hotels, hospitals, salons, spas, gyms, airlines, universities, schools, central government.
  </div>
</div>

      {/* Bottom nav — matches prototype */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #e7e7e7", display: "flex", justifyContent: "space-around", padding: "10px 0 14px" }}>
        <NavItem icon={ICON.home} label="HOME" href="/home" />
        <NavItem icon={ICON.grid} label="SERVICES" href="/services" active />
        <NavItem icon={ICON.crown} label="PLANS" href="/plans" />
        <NavItem icon={ICON.user} label="ME" href="/profile" />
      </div>
    </div>
  );
}