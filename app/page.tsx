import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 30px",
        fontFamily: "Poppins, -apple-system, sans-serif",
      }}
    >
      <svg viewBox="0 0 440 180" width="220" style={{ display: "block", marginBottom: 14 }}>
        <text x="220" y="105" textAnchor="middle" fill="#fff" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="120" letterSpacing="2">TCE</text>
        <line x1="90" y1="125" x2="350" y2="125" stroke="#fff" strokeWidth="3" />
        <text x="220" y="163" textAnchor="middle" fill="#fff" fontFamily="'Dancing Script', cursive" fontStyle="italic" fontWeight="500" fontSize="34">Luxury in every fold</text>
      </svg>

      <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 16 }}>
        The Clean Express
      </div>

      <div style={{ marginTop: 40, width: "100%", maxWidth: 340 }}>
        <Link href="/location" style={{ textDecoration: "none", display: "block" }}>
          <button style={{ width: "100%", padding: "14px", background: "#fff", color: "#000", border: "none", borderRadius: 14, fontWeight: 800, fontSize: 14, marginBottom: 10, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
            Get started
          </button>
        </Link>
        <Link href="/login" style={{ textDecoration: "none", display: "block" }}>
          <button style={{ width: "100%", padding: "14px", background: "transparent", color: "#fff", border: "1.5px solid #333", borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
            I have an account
          </button>
        </Link>
      </div>

      <div style={{ marginTop: 20, fontSize: 10, opacity: 0.5 }}>
        Est. by doctors. Built for clean wardrobes.
      </div>
    </main>
  );
}