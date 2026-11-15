"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Premium Cotton T-Shirt", price: 499, icon: "👕" },
  { id: 2, name: "Wireless Headphones", price: 1299, icon: "🎧" },
  { id: 3, name: "Kitchen Essentials", price: 899, icon: "🍳" },
  { id: 4, name: "Agriculture Tools", price: 1499, icon: "🚜" },
  { id: 5, name: "Beauty Products", price: 699, icon: "💄" },
  { id: 6, name: "Smart Watch", price: 1999, icon: "⌚" },
];

const categories = [
  "Fashion",
  "Electronics",
  "Home & Kitchen",
  "Agriculture",
  "Beauty",
  "Grocery",
  "Industrial",
  "Automobile",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [mode, setMode] = useState("Retail");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7f4",
        color: "#173b27",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#087b42",
          color: "white",
          padding: 18,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: "bold" }}>
          DS
        </div>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>
          DRONA SAJIVANI
        </div>
        <div>🛒 Cart: {cart.length}</div>
      </header>

      <section style={{ padding: 20 }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 14,
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {["Retail", "Wholesale"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              style={{
                padding: 12,
                background: mode === item ? "#087b42" : "white",
                color: mode === item ? "white" : "#087b42",
                border: "1px solid #087b42",
                borderRadius: 8,
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <h2>Shop by Category</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
          }}
        >
          {categories.map((category) => (
            <div
              key={category}
              style={{
                background: "white",
                padding: 15,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              {category}
            </div>
          ))}
        </div>

        <h2>Our Products</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                padding: 15,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 45 }}>{product.icon}</div>

              <h3>{product.name}</h3>

              <p>
                ₹
                {mode === "Wholesale"
                  ? Math.round(product.price * 0.85)
                  : product.price}
              </p>

              <button
                onClick={() =>
                  setCart((previous) => [...previous, product.id])
                }
                style={{
                  background: "#087b42",
                  color: "white",
                  border: "none",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <p>No products found.</p>}
      </section>

      <footer
        style={{
          background: "#087b42",
          color: "white",
          textAlign: "center",
          padding: 20,
        }}
      >
        DRONA SAJIVANI © 2026
      </footer>
    </main>
  );
}
