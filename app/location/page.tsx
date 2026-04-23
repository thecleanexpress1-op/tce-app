import Link from "next/link";

export default function LocationPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "#000",
        overflow: "hidden",
        fontFamily: "Poppins, -apple-system, sans-serif",
      }}
    >
      {/* dim splash background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "60px 22px 0",
          color: "#fff",
          opacity: 0.35,
        }}
      >
        <svg viewBox="0 0 440 180" width="160" style={{ display: "block" }}>
          <text x="220" y="105" textAnchor="middle" fill="#fff" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="120" letterSpacing="2">TCE</text>
          <line x1="90" y1="125" x2="350" y2="125" stroke="#fff" strokeWidth="3" />
          <text x="220" y="163" textAnchor="middle" fill="#fff" fontFamily="'Dancing Script', cursive" fontStyle="italic" fontWeight="500" fontSize="34">Luxury in every fold</text>
        </svg>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 12 }}>
          The Clean Express
        </div>
      </div>

      {/* modal popup */}
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          background: "#fff",
          color: "#111",
          borderRadius: 22,
          padding: "22px 20px 18px",
          boxShadow: "0 20px 40px rgba(0,0,0,.35)",
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </div>
        <div style={{ fontSize: 16, fontWeight: 900, textAlign: "center", letterSpacing: "-0.01em" }}>
          Allow TCE to use your location?
        </div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 4, textAlign: "center", lineHeight: 1.45 }}>
          So the rider finds your door, not just your street. We only use location during pickup and delivery.
        </div>

        <div style={{ marginTop: 14, border: "1px solid #eee", borderRadius: 12, padding: "6px 10px" }}>
          <Row text="Precise pin at your gate" />
          <Row text="Only while the app is open" />
          <Row text="You can change this anytime" />
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "12px 0", background: "transparent", color: "#000", border: "1.5px solid #ddd", borderRadius: 12, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
              Not now
            </button>
          </Link>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "12px 0", background: "#000", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
              Allow
            </button>
          </Link>
        </div>

        <div style={{ marginTop: 10, fontSize: 10, color: "#888", textAlign: "center" }}>
          Pincode 226010 · Gomti Nagar detected
        </div>
      </div>
    </main>
  );
}

function Row({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div style={{ fontSize: 11, fontWeight: 700 }}>{text}</div>
      </div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}