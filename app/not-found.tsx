import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#e8a020", marginBottom: "8px" }}>404</h1>
      <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px", marginBottom: "32px", lineHeight: 1.6 }}>
        That page doesn&apos;t exist. If you think it should, call Jason — he probably just hasn&apos;t built it yet.
      </p>
      <Link href="/" style={{ padding: "12px 28px", background: "#e8a020", color: "#000", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
        Go Home
      </Link>
    </div>
  );
}
