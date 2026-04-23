import Link from "next/link";

const LogoTiny = ({ size = 50, color = "#fff" }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 120 70" width={size} style={{ display: "block" }}>
    <text x="60" y="42" textAnchor="middle" fill={color} fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="44" letterSpacing="1">TCE</text>
    <line x1="20" y1="50" x2="100" y2="50" stroke={color} strokeWidth="2" />
    <text x="60" y="65" textAnchor="middle" fill={color} fontFamily="'Dancing Script', cursive" fontStyle="italic" fontWeight="500" fontSize="12">Luxury in every fold</text>
  </svg>
);

const ChevronRight = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ICONS = {
  wash: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  shirt: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l4 2 2-2 2 2 4-2 2 5-4 2v10H8V10L4 8z" />
    </svg>
  ),
  drop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />
    </svg>
  ),
  sparkles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      <path d="M19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
    </svg>
  ),
};

export default function Welcome() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff", color: "#000", fontFamily: "Poppins, -apple-system, sans-serif" }}>
      <div style={{ background: "#000", color: "#fff", padding: "24px 22px 60px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <LogoTiny size={50} color="#fff" />
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 10px",
            borderRadius: 999,
            background: "#111",
            border: "1px solid #333",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            New
          </div>
        </div>

        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1.1, marginTop: 16 }}>
          Your first order,<br />30% lighter.
        </div>
        <div style={{ fontFamily: "'Dancing Script', cursive", fontStyle: "italic", fontWeight: 500, fontSize: 16, marginTop: 8, opacity: 0.9 }}>
          Luxury in every fold.
        </div>
      </div>

      <div style={{ marginTop: -40, padding: "0 18px" }}>
        <div style={{ background: "#fff", borderRadius: 18, padding: 16, border: "1px solid #e7e7e7" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 10px",
              borderRadius: 999,
              background: "#f7f4ee",
              border: "1px solid #e5dfd0",
              color: "#6b5a1a",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              FIRST30
            </div>
            <div style={{ fontSize: 10, color: "#6b6b6b" }}>auto applied</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.12, marginTop: 8 }}>
            30% off your very first bag.
          </div>
          <div style={{ fontSize: 10, color: "#6b6b6b", lineHeight: 1.5 }}>
            Capped at ₹2,000. The reorder coupon kicks in from your second order onward. Referral credits of ₹99 can apply straight away.
          </div>
        </div>

        <div style={{ padding: "18px 0 8px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 800, color: "#555" }}>
          Popular first orders
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Tile title="Wash and Fold" price="₹120 per kg" icon={ICONS.wash} />
          <Tile title="Dry Clean" price="from ₹110" icon={ICONS.shirt} dark />
          <Tile title="Stain SOS" price="from ₹29 per stain" icon={ICONS.drop} />
          <Tile title="Couture" price="bridal care" icon={ICONS.sparkles} />
        </div>

        <div style={{ marginTop: 18, paddingBottom: 30 }}>
          <Link href="/home" style={{ textDecoration: "none", display: "block" }}>
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: "100%",
              padding: "11px 16px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}>
              Book my first pickup
              <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function Tile({ title, price, icon, dark }: { title: string; price: string; icon: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{
      background: dark ? "#000" : "#fff",
      color: dark ? "#fff" : "#000",
      borderRadius: 18,
      padding: "14px 12px",
      minHeight: 106,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      border: dark ? "1px solid #000" : "1px solid #e7e7e7",
    }}>
      <div style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: dark ? "#222" : "#f3f3f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: dark ? "#fff" : "#000",
      }}>
        {icon}
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 12, fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.7)" : "#6b6b6b", marginTop: 2 }}>{price}</div>
      </div>
    </div>
  );
}