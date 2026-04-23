import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TCE — The Clean Express",
  description: "Luxury in every fold. Premium laundry in Lucknow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#e5e5e5", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: 420,
            margin: "0 auto",
            minHeight: "100vh",
            background: "#fff",
            boxShadow: "0 0 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Status bar — prototype iOS-style header with TCE wordmark */}
          <div
            style={{
              height: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 22px 0",
              fontSize: 11,
              fontWeight: 600,
              color: "#000",
              background: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 50,
              borderBottom: "1px solid transparent",
            }}
          >
            <span style={{ letterSpacing: "-0.01em" }}>9:41</span>
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              <span style={{ width: 3, height: 3, background: "currentColor", borderRadius: "50%" }} />
              <span style={{ width: 3, height: 3, background: "currentColor", borderRadius: "50%" }} />
              <span style={{ width: 3, height: 3, background: "currentColor", borderRadius: "50%" }} />
              <span style={{ width: 3, height: 3, background: "currentColor", borderRadius: "50%" }} />
            </div>
            <Link
              href="/home"
              style={{
                fontWeight: 900,
                letterSpacing: "0.12em",
                fontSize: 11,
                color: "#000",
                textDecoration: "none",
              }}
            >
              TCE
            </Link>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}