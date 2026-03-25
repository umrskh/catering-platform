import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🍽️ Welcome to Catering Platform</h1>
      <p>Find the best catering services near you</p>
      <Link href="/caterers">
        <button style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#f97316",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          Browse Caterers
        </button>
      </Link>
    </div>
  );
}