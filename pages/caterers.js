// pages/caterers.js

import { useState, useEffect } from "react";
import CatererCard from "../components/CatererCard";
import styles from "../styles/caterers.module.css";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCaterers() {
      try {
        const res = await fetch("/api/caterers");
        if (!res.ok) throw new Error("Failed to fetch caterers");
        const json = await res.json();
        setCaterers(json); // ✅ Fixed — direct array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCaterers();
  }, []);

  const filtered = caterers.filter((c) => {
    const matchesName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = maxPrice === "" || c.price <= Number(maxPrice); // ✅ Fixed — price
    return matchesName && matchesPrice;
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>🍽️ Find Your Caterer</h1>
        <p className={styles.subtitle}>Discover the best catering services near you</p>
      </header>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by caterer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Max price per plate (₹)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={styles.input}
          min={0}
        />
      </div>

      {!loading && !error && (
        <p className={styles.resultCount}>
          Showing {filtered.length} of {caterers.length} caterers
        </p>
      )}

      {loading && <p className={styles.status}>Loading caterers...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {!loading && !error && (
        <div className={styles.grid}>
          {filtered.length > 0 ? (
            filtered.map((caterer) => (
              <CatererCard key={caterer.id} caterer={caterer} />
            ))
          ) : (
            <p className={styles.noResults}>No caterers match your filters.</p>
          )}
        </div>
      )}
    </div>
  );
}