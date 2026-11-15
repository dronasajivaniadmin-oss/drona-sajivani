"use client";

import { useMemo, useState } from "react";

const categories = [
  "Fashion",
  "Electronics",
  "Grocery",
  "Home & Kitchen",
  "Beauty",
  "Agriculture",
  "Industrial",
  "Machinery",
];

const products = [
  { id: 1, name: "Premium Cotton Clothing", price: 799, icon: "👕", category: "Fashion" },
  { id: 2, name: "Smart Electronics", price: 2499, icon: "📱", category: "Electronics" },
  { id: 3, name: "Organic Grocery Pack", price: 599, icon: "🥦", category: "Grocery" },
  { id: 4, name: "Kitchen Essentials", price: 1299, icon: "🍳", category: "Home & Kitchen" },
  { id: 5, name: "Beauty Collection", price: 899, icon: "💄", category: "Beauty" },
  { id: 6, name: "Agriculture Equipment", price: 4999, icon: "🚜", category: "Agriculture" },
  { id: 7, name: "Industrial Supplies", price: 3499, icon: "🏭", category: "Industrial" },
  { id: 8, name: "Business Machinery", price: 15999, icon: "⚙️", category: "Machinery" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"retail" | "wholesale">("retail");
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [cart, setCart] = useState<number[]>([]);
  const [category, setCategory] = useState("All");

  const hindi = language === "HI";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f5",
        color: "#173b2b",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#086b3c",
          color: "white",
          padding: "16px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                background: "#d4af37",
                color: "#06452b",
                padding: 12,
                borderRadius: 12,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              DS
            </div>

            <div>
              <h1 style={{ fontSize: 23, fontWeight: "bold" }}>
                DRONA SAJIVANI
              </h1>
              <p style={{ fontSize: 12, color: "#f3d77b" }}>
                Global Retail & Wholesale Marketplace
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
              style={headerButton}
            >
              {language === "EN" ? "हिन्दी" : "English"}
            </button>

            <button style={headerButton}>
              🛒 {cart.length}
            </button>
          </div>
        </div>
      </header>

      <section
        style={{
          background: "linear-gradient(135deg,#087544,#043d29)",
          color: "white",
          textAlign: "center",
          padding: "55px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px,5vw,44px)",
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {hindi
            ? "दुनिया का सामान, एक ही बाजार"
            : "Your Gateway to Global Trade"}
        </h2>

        <p style={{ fontSize: 17, marginBottom: 25 }}>
          {hindi
            ? "भारत और दुनिया के लिए रिटेल एवं होलसेल मार्केटप्लेस"
            : "Shop Retail. Buy Wholesale. Trade Worldwide."}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <button
            onClick={() => setMode("retail")}
            style={modeButton(mode === "retail")}
          >
            🛍️ {hindi ? "रिटेल खरीदारी" : "Retail Shopping"}
          </button>

          <button
            onClick={() => setMode("wholesale")}
            style={modeButton(mode === "wholesale")}
          >
            🏭 {hindi ? "थोक व्यापार" : "Wholesale Business"}
          </button>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "auto",
          padding: "30px 16px",
        }}
      >
        <input
          type="search"
          placeholder={
            hindi ? "प्रोडक्ट खोजें..." : "Search products..."
          }
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 16,
            background: "white",
            color: "#173b2b",
          }}
        />

        <h2 style={sectionTitle}>
          {hindi ? "सभी कैटेगरी" : "Shop by Category"}
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 35,
          }}
        >
          {["All", ...categories].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{
                padding: "12px 16px",
                borderRadius: 25,
                border: "1px solid #ddd",
                background: category === item ? "#087544" : "white",
                color: category === item ? "white" : "#173b2b",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <h2 style={sectionTitle}>
          {mode === "retail"
            ? hindi
              ? "लोकप्रिय प्रोडक्ट"
              : "Featured Products"
            : hindi
              ? "थोक व्यापार के प्रोडक्ट"
              : "Wholesale Product Catalogue"}
        </h2>

        {mode === "wholesale" && (
          <p style={{ marginBottom: 20 }}>
            {hindi
              ? "बड़ी मात्रा में खरीदारी के लिए सप्लायर से संपर्क करें।"
              : "Explore bulk products and supplier opportunities."}
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: 16,
                padding: 22,
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 65,
                  background: "#edf7ef",
                  borderRadius: 12,
                  padding: 25,
                  marginBottom: 15,
                }}
              >
                {product.icon}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: "bold" }}>
                {product.name}
              </h3>

              <p style={{ color: "#777", marginTop: 8 }}>
                {product.category}
              </p>

              <p
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#087544",
                  margin: "15px 0",
                }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <button
                onClick={() => {
                  if (mode === "retail") {
                    setCart((previous) => [...previous, product.id]);
                  } else {
                          const productName = product.name;
 
const buyerName = prompt("Enter Buyer / Business Name:");
if (!buyerName?.trim()) return;

const mobile = prompt("Enter Mobile Number:");
if (!mobile?.trim()) return;

const quantity = prompt("Enter Bulk Quantity:");
if (!quantity || Number(quantity) <= 0) return;

const country = prompt("Enter Delivery Country:");
if (!country?.trim()) return;

alert(
  "DRONA SAJIVANI - Wholesale Enquiry\n\n" +
  "Product: " + productName + "\n" +
  "Buyer: " + buyerName + "\n" +
  "Mobile: " + mobile + "\n" +
  "Quantity: " + quantity + "\n" +
  "Country: " + country + "\n\n" +
  "Demo enquiry prepared. Not sent to supplier."
);
                  }
                }}
                style={{
                  background: "#d4af37",
                  color: "#173b2b",
                  border: "none",
                  padding: 13,
                  width: "100%",
                  borderRadius: 9,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {mode === "retail"
                  ? hindi
                    ? "कार्ट में डालें"
                    : "Add to Cart"
                  : hindi
                    ? "थोक भाव पुछे"
                    : "Request Quote"}
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", padding: 30 }}>
            {hindi ? "कोई प्रोडक्ट नहीं मिला" : "No products found"}
          </p>
        )}
      </section>

      <section
        style={{
          background: "#e8f3eb",
          padding: "45px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={sectionTitle}>
          {hindi ? "हमारे साथ व्यापार करें" : "Grow Your Business With Us"}
        </h2>

        <p style={{ marginBottom: 20 }}>
          Retail • Wholesale • Import • Export
        </p>

        <button
          onClick={() => alert("Seller registration coming soon.")}
          style={{
            background: "#087544",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {hindi ? "सेलर बनें" : "Become a Seller"}
        </button>
      </section>

      <footer
        style={{
          background: "#043d29",
          color: "white",
          padding: 30,
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#d4af37", fontWeight: "bold" }}>
          DRONA SAJIVANI
        </h3>

        <p style={{ marginTop: 10 }}>
          India • International Marketplace
        </p>

        <p style={{ marginTop: 12, fontSize: 13 }}>
          © {new Date().getFullYear()} DRONA SAJIVANI.
          All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}

const headerButton = {
  background: "#d4af37",
  color: "#173b2b",
  border: "none",
  padding: "10px 15px",
  borderRadius: 8,
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const sectionTitle = {
  fontSize: 26,
  fontWeight: "bold" as const,
  marginBottom: 22,
};

function modeButton(active: boolean) {
  return {
    background: active ? "#d4af37" : "white",
    color: "#173b2b",
    padding: "14px 22px",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold" as const,
    cursor: "pointer",
  };
}
