"use client";

import { useState } from "react";

const categories = [
  { name: "Fashion", icon: "👕" },
  { name: "Electronics", icon: "📱" },
  { name: "Home & Kitchen", icon: "🏠" },
  { name: "Agriculture", icon: "🚜" },
  { name: "Beauty", icon: "💄" },
  { name: "Grocery", icon: "🛒" },
  { name: "Industrial", icon: "🏭" },
  { name: "Automobile", icon: "🚗" },
];

const products = [
  { id: 1, name: "Premium Cotton T-Shirt", price: 499, icon: "👕" },
  { id: 2, name: "Wireless Headphones", price: 1299, icon: "🎧" },
  { id: 3, name: "Kitchen Essentials", price: 899, icon: "🍳" },
  { id: 4, name: "Agriculture Tools", price: 1499, icon: "🚜" },
  { id: 5, name: "Beauty Products", price: 699, icon: "💄" },
  { id: 6, name: "Smart Watch", price: 1999, icon: "⌚" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [mode, setMode] = useState("Retail");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ background: "#f4f7f4", minHeight: "100vh", color: "#173b27" }}>
      <header style={{ background: "#087b42", padding: 18, color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 25, fontWeight: "bold" }}>DS</div>
            <div style={{ fontSize: 16, fontWeight: "bold" }}>DRONA SAJIVANI</div>
          </div>
          <div style={{ fontSize: 20 }}>🛒 {cart.length}</div>
        </div>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 14,
            marginTop: 18,
            borderRadius: 9,
            border: "none",
            fontSize: 16,
          }}
        />

        <div style={{ display: "flex", gap: 10,
