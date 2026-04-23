"use client";

import Link from "next/link";

type ActiveOrder = {
  id: string;
  riderName: string;
  minutesAway: number;
  itemCount: number;
  service: string;
  speed: string;
};

const MOCK_ACTIVE_ORDER: ActiveOrder | null = {
  id: "TCE-4829",
  riderName: "Ramesh",
  minutesAway: 8,
  itemCount: 12,
  service: "Wash and Iron",
  speed: "Express",
};

function Svg({ d, size = 20, sw = 1.8 }: { d: string; size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICON = {
  pin: "M12 22s-7-7.58-7-12a7 7 0 1 1 14 0c0 4.42-7 12-7 12z M12 10a2 2 0 1 0 0-0.01",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M13.7 21a2 2 0 0 1-3.4 0",
  sun: "M12 3v1 M12 20v1 M4.2 4.2l.7 .7 M19.1 19.1l.7 .7 M3 12h1 M20 12h1 M4.2 19.8l.7-.7 M19.1 4.9l.7-.7 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  arrow: "M5 12h14 M13 5l7 7-7 7",
  star: "M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  tshirt: "M8 3l4 3 4-3 5 3-2 4-3-1v12H6V9L3 10 1 6z",
  hanger: "M12 4a2 2 0 1 1 2 2c0 1-2 1.5-2 3v1 M4 18l8-6 8 6H4z",
  drop: "M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12z",
  camera: "M4 7h3l2-3h6l2 3h3v13H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  dress: "M9 3l3 3 3-3 3 4-2 3 2 11H7l2-11-2-3z",
  home: "M3 12l9-9 9 9 M5 10v10h14V10",
  grid: "M4 6h16 M4 12h16 M4 18h16",
  check: "M9 11l3 3 8-8 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  user: "M20 21a8 8 0 0 0-16 0 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

// ---------- Segmented Light/Dark toggle ----------
function ThemeToggle() {
  return (
    <div style={{ display: "inline-flex", border: "1px solid #e7e7e7", borderRadius: 999, padding: 4, background: "#fff" }}>
      <div style={{ background: "#000", color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em" }}>
        LIGHT
      </div>
      <div style={{ color: "#6b6b6b", padding: "6px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em" }}>
        DARK
      </div>
    </div>
  );
}

// ---------- Active Order Card ----------
function ActiveOrderCard({ order }: { order: ActiveOrder }) {
  return (
    <div style={{ background: "#000", color: "#fff", borderRadius: 20, padding: 20, margin: "18px 0 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.25)", padding: "5px 12px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.16em" }}>
          ACTIVE ORDER
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.7 }}>
          #{order.id}
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
        Rider {order.riderName} is {order.minutesAway} minutes away
      </div>
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>
        {order.itemCount} items · {order.service} · {order.speed}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Link href={`/orders/${order.id}/track`} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#000", padding: "10px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textDecoration: "none" }}>
          TRACK <Svg d={ICON.arrow} size={14} />
        </Link>
        <Link href={`/orders/${order.id}/chat`} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "10px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textDecoration: "none" }}>
          <Svg d={ICON.chat} size={14} /> CHAT RIDER
        </Link>
      </div>
    </div>
  );
}

// ---------- Quick Book Tile (left-aligned, subtitle, badge icon) ----------
function QuickTile({ icon, label, sub, href, dark = false }: { icon: string; label: string; sub: string; href: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: 16,
        border: "1px solid #e7e7e7",
        borderRadius: 18,
        color: dark ? "#fff" : "#000",
        background: dark ? "#000" : "#fff",
        textDecoration: "none",
      }}
    >
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

// ---------- Bottom Nav ----------
function NavItem({ icon, label, href, active = false }: { icon: string; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: active ? "#000" : "#6b6b6b", textDecoration: "none", flex: 1 }}>
      <Svg d={icon} size={22} sw={active ? 2 : 1.6} />
      <div style={{ fontSize: 10, fontWeight: active ? 800 : 500, letterSpacing: "0.08em" }}>{label}</div>
    </Link>
  );
}

// ---------- Page ----------
export default function HomePage() {
  const activeOrder = MOCK_ACTIVE_ORDER;

  return (
    <div style={{ padding: "18px 20px 100px", color: "#000", background: "#fff", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", marginBottom: 6 }}>
            <Svg d={ICON.pin} size={12} />
            HOME · GOMTI NAGAR
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.15 }}>
            Good morning, Aanya
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", border: "1px solid #e7e7e7", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", cursor: "pointer" }}>
            <Svg d={ICON.bell} size={18} />
            <span style={{ position: "absolute", top: 8, right: 10, width: 8, height: 8, borderRadius: "50%", background: "#e04e2b", border: "1.5px solid #fff" }} />
          </button>
          <Link href="/profile" style={{ width: 40, height: 40, borderRadius: "50%", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, textDecoration: "none" }}>
            A
          </Link>
        </div>
      </div>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Active Order */}
      {activeOrder && <ActiveOrderCard order={activeOrder} />}

      {/* Quick Book */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", margin: "22px 4px 12px" }}>
        QUICK BOOK
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <QuickTile icon={ICON.target}  label="Laundry by Kg" sub="from ₹120 per kg"     href="/services/laundry" />
        <QuickTile icon={ICON.tshirt}  label="Dry Clean"     sub="press included"       href="/services/dryclean" dark />
        <QuickTile icon={ICON.hanger}  label="Iron only"     sub="from ₹20 per piece"   href="/services/iron" />
        <QuickTile icon={ICON.drop}    label="Stain SOS"     sub="from ₹29 per stain"   href="/services/stain" />
        <QuickTile icon={ICON.camera}  label="Snap and Bill" sub="AI weight estimate"   href="/services/snap" />
        <QuickTile icon={ICON.dress}   label="Luxury Laundry"  sub="bridal, heirloom"     href="/services/luxury" />
      </div>
<Link href="/services" style={{ display: "block", textAlign: "center", marginTop: 14, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", color: "#000", textDecoration: "none" }}>
  SEE ALL 8 CATEGORIES →
</Link>
      {/* Rated card */}
      <div style={{ marginTop: 22, padding: 18, border: "1px solid #e7e7e7", borderRadius: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: "#6b6b6b", marginBottom: 10 }}>
          RATED BY OUR CUSTOMERS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Svg d={ICON.star} size={22} />
          <div style={{ fontSize: 22, fontWeight: 800 }}>4.8</div>
          <div style={{ fontSize: 13, color: "#6b6b6b" }}>6,214 reviews · 99.6% on time</div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: "#fff", borderTop: "1px solid #e7e7e7", display: "flex", justifyContent: "space-around", padding: "10px 0 14px" }}>
        <NavItem icon={ICON.home} label="HOME" href="/home" active />
        <NavItem icon={ICON.grid} label="SERVICES" href="/services" />
        <NavItem icon={ICON.check} label="ORDERS" href="/orders" />
        <NavItem icon={ICON.user} label="PROFILE" href="/profile" />
      </div>
    </div>
  );
}