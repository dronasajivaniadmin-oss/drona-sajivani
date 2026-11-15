"use client";

import { useState } from "react";

const categories = [
  { name: "Fashion", icon: "👕" },
  { name: "Electronics", icon: "📱" },
  { name: "Home & Kitchen", icon: "🏠" },
  { name: "Agriculture", icon: "🚜" },
  { name: "Grocery", icon: "🛒" },
  { name: "Beauty", icon: "💄" },
  { name: "Industrial", icon: "🏭" },
  { name: "Automobile", icon: "🚗" },
];

const products = [
  { id: 1, name: "Premium T-Shirt", price: 499, icon: "👕" },
  { id: 2, name: "Smart Watch", price: 1999, icon: "⌚" },
  { id: 3, name: "Headphones", price: 1299, icon: "🎧" },
  { id: 4, name: "Kitchen Set", price: 899, icon: "🍳" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [mode, setMode] = useState("Retail");
  const [tab, setTab] = useState("Home");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const green = "#087b42";
  const gold = "#d4a62c";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f5",
        color: "#173b27",
        fontFamily: "Arial, sans-serif",
        paddingBottom: 85,
      }}
    >
      <header
        style={{
          background: green,
          color: "white",
          padding: 18,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            border: `2px solid ${gold}`,
            borderRadius: "50%",
            padding: 12,
            fontSize: 25,
            fontWeight: "bold",
            color: gold,
          }}
        >
          DS
        </div>

        <h1 style={{ fontSize: 24, marginBottom: 5 }}>
          DRONA SAJIVANI
        </h1>

        <p style={{ margin: 0 }}>
          Your Global Shopping Marketplace
        </p>
      </header>

      <section style={{ padding: 16 }}>
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 14,
            border: "1px solid #ddd",
            borderRadius: 10,
            fontSize: 16,
          }}
        />

        <div
          style={{
            background: green,
            color: "white",
            borderRadius: 15,
            padding: 22,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          <h2>Welcome to DRONA SAJIVANI</h2>
          <p>Shop Local. Trade Global.</p>
          <p>Retail • Wholesale • Import • Export</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
          }}
        >
          {["Retail", "Wholesale"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              style={{
                flex: 1,
                padding: 13,
                borderRadius: 10,
                border: `1px solid ${green}`,
                background: mode === item ? green : "white",
                color: mode === item ? "white" : green,
                fontWeight: "bold",
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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              style={{
                background: "white",
                borderRadius: 12,
                padding: "14px 4px",
                textAlign: "center",
                fontSize: 12,
                overflowWrap: "anywhere",
              }}
            >
              <div style={{ fontSize: 28 }}>
                {category.icon}
              </div>
              {category.name}
            </div>
          ))}
        </div>

        <h2>Featured Products</h2>

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
                borderRadius: 12,
                padding: 14,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48 }}>
                {product.icon}
              </div>

              <h3 style={{ fontSize: 15 }}>
                {product.name}
              </h3>

              <p style={{ fontWeight: "bold" }}>
                ₹
                {mode === "Wholesale"
                  ? Math.round(product.price * 0.85)
                  : product.price}
              </p>

              <button
                onClick={() =>
                  setCart((old) => [...old, product.id])
                }
                style={{
                  background: green,
                  color: "white",
                  border: "none",
                  padding: 11,
                  borderRadius: 8,
                  width: "100%",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p>No products found.</p>
        )}

        <div
          style={{
            background: "#fff8e5",
            border: `1px solid ${gold}`,
            borderRadius: 14,
            padding: 20,
            marginTop: 25,
            textAlign: "center",
          }}
        >
          <h2>🌍 International Marketplace</h2>
          <p>Connect Buyers and Sellers Worldwide</p>
          <p>Import • Export • Global Wholesale</p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: 20,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <h2>🏪 Become a Seller</h2>
          <p>Grow your business with DRONA SAJIVANI</p>
          <button
            onClick={() =>
              alert("Seller registration coming soon")
            }
            style={{
              background: green,
              color: "white",
              border: "none",
              padding: 13,
              borderRadius: 8,
            }}
          >
            Register as Seller
          </button>
        </div>
      </section>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "white",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-around",
          padding: "12px 0",
        }}
      >
        {[
          { name: "Home", icon: "🏠" },
          { name: "Categories", icon: "📂" },
          { name: "Cart", icon: "🛒" },
          { name: "Account", icon: "👤" },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setTab(item.name);
              if (item.name === "Cart") {
                alert(`Cart contains ${cart.length} items`);
              } else if (item.name === "Account") {
                alert("Account feature coming soon");
              } else if (item.name === "Categories") {
                document
                  .querySelector("h2")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{
              border: "none",
              background: "white",
              color: tab === item.name ? green : "#666",
              fontSize: 12,
            }}
          >
            <div style={{ fontSize: 22 }}>
              {item.icon}
            </div>
            {item.name}
          </button>
        ))}
      </nav>
    </main>
  );
}
