"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Language = "EN" | "HI";
type Mode = "retail" | "wholesale";

type Product = {
  id: number;
  name: string;
  hindiName: string;
  category: string;
  brand: string;
  own: boolean;
  price: number;
  mrp: number;
  image: string;
  description: string;
  hindiDescription: string;
};

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

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Premium Cotton Shirt",
    hindiName: "प्रीमियम कॉटन शर्ट",
    category: "Fashion",
    brand: "DRONA SAJIVANI",
    own: true,
    price: 799,
    mrp: 1299,
    image: "photo-1598032895397-b9472444bf93",
    description: "Comfortable premium cotton clothing.",
    hindiDescription: "आरामदायक प्रीमियम कॉटन कपड़े।",
  },
  {
    id: 2,
    name: "Smartphone",
    hindiName: "स्मार्टफोन",
    category: "Electronics",
    brand: "Demo Tech",
    own: false,
    price: 12999,
    mrp: 15999,
    image: "photo-1511707171634-5f897ff02aa9",
    description: "Modern smartphone for everyday use.",
    hindiDescription: "रोजमर्रा के उपयोग के लिए स्मार्टफोन।",
  },
  {
    id: 3,
    name: "Organic Grocery Pack",
    hindiName: "ऑर्गेनिक किराना पैक",
    category: "Grocery",
    brand: "DRONA SAJIVANI",
    own: true,
    price: 599,
    mrp: 799,
    image: "photo-1542838132-92c53300491e",
    description: "A selection of grocery essentials.",
    hindiDescription: "रोजमर्रा के किराने का सामान।",
  },
  {
    id: 4,
    name: "Kitchen Essentials",
    hindiName: "रसोई का सामान",
    category: "Home & Kitchen",
    brand: "Demo Home",
    own: false,
    price: 1299,
    mrp: 1899,
    image: "photo-1556911220-bff31c812dba",
    description: "Useful kitchen accessories.",
    hindiDescription: "रसोई में उपयोगी सामान।",
  },
  {
    id: 5,
    name: "Beauty Collection",
    hindiName: "ब्यूटी कलेक्शन",
    category: "Beauty",
    brand: "Demo Beauty",
    own: false,
    price: 899,
    mrp: 1299,
    image: "photo-1596462502278-27bfdc403348",
    description: "Beauty and personal care collection.",
    hindiDescription: "सौंदर्य और व्यक्तिगत देखभाल उत्पाद।",
  },
  {
    id: 6,
    name: "Agriculture Equipment",
    hindiName: "कृषि उपकरण",
    category: "Agriculture",
    brand: "DRONA SAJIVANI",
    own: true,
    price: 4999,
    mrp: 6499,
    image: "photo-1500382017468-9049fed747ef",
    description: "Agricultural equipment category product.",
    hindiDescription: "खेती के उपकरणों का डेमो उत्पाद।",
  },
  {
    id: 7,
    name: "Industrial Supplies",
    hindiName: "औद्योगिक सामान",
    category: "Industrial",
    brand: "Demo Industrial",
    own: false,
    price: 3499,
    mrp: 4999,
    image: "photo-1565043589221-1a6fd9ae45c7",
    description: "Industrial supplies and materials.",
    hindiDescription: "उद्योगों में उपयोग होने वाला सामान।",
  },
  {
    id: 8,
    name: "Business Machinery",
    hindiName: "व्यापारिक मशीनरी",
    category: "Machinery",
    brand: "Demo Machines",
    own: false,
    price: 15999,
    mrp: 19999,
    image: "photo-1581091226825-a6a2a5aee158",
    description: "Machinery for business applications.",
    hindiDescription: "व्यापार में उपयोग होने वाली मशीनरी।",
  },
  {
    id: 9,
    name: "Sports Shoes",
    hindiName: "स्पोर्ट्स जूते",
    category: "Fashion",
    brand: "Demo Fashion",
    own: false,
    price: 1499,
    mrp: 2499,
    image: "photo-1542291026-7eec264c27ff",
    description: "Comfortable sports shoes.",
    hindiDescription: "आरामदायक स्पोर्ट्स जूते।",
  },
  {
    id: 10,
    name: "Laptop Computer",
    hindiName: "लैपटॉप कंप्यूटर",
    category: "Electronics",
    brand: "Demo Tech",
    own: false,
    price: 39999,
    mrp: 45999,
    image: "photo-1496181133206-80ce9b88a853",
    description: "Laptop for work and study.",
    hindiDescription: "काम और पढ़ाई के लिए लैपटॉप।",
  },
  {
    id: 11,
    name: "Fresh Vegetables",
    hindiName: "ताजी सब्जियां",
    category: "Grocery",
    brand: "DRONA SAJIVANI",
    own: true,
    price: 399,
    mrp: 499,
    image: "photo-1540420773420-3366772f4999",
    description: "Fresh vegetable assortment.",
    hindiDescription: "ताजी सब्जियों का पैक।",
  },
  {
    id: 12,
    name: "Home Furniture",
    hindiName: "घरेलू फर्नीचर",
    category: "Home & Kitchen",
    brand: "Demo Home",
    own: false,
    price: 6999,
    mrp: 8999,
    image: "photo-1555041469-a586c61ea9bc",
    description: "Furniture for modern homes.",
    hindiDescription: "आधुनिक घरों के लिए फर्नीचर।",
  },
  {
    id: 13,
    name: "Skin Care Products",
    hindiName: "स्किन केयर उत्पाद",
    category: "Beauty",
    brand: "Demo Beauty",
    own: false,
    price: 699,
    mrp: 999,
    image: "photo-1556229010-6c3f2c9ca5f8",
    description: "Daily skin care products.",
    hindiDescription: "रोजाना त्वचा की देखभाल के उत्पाद।",
  },
  {
    id: 14,
    name: "Agriculture Seeds",
    hindiName: "कृषि बीज",
    category: "Agriculture",
    brand: "DRONA SAJIVANI",
    own: true,
    price: 899,
    mrp: 1199,
    image: "photo-1416879595882-3373a0480b5b",
    description: "Agricultural seeds category.",
    hindiDescription: "कृषि बीजों का डेमो उत्पाद।",
  },
  {
    id: 15,
    name: "Industrial Tools",
    hindiName: "औद्योगिक औजार",
    category: "Industrial",
    brand: "Demo Industrial",
    own: false,
    price: 2499,
    mrp: 3499,
    image: "photo-1504148455328-c376907d081c",
    description: "Tools for industrial applications.",
    hindiDescription: "औद्योगिक कार्यों के लिए औजार।",
  },
  {
    id: 16,
    name: "Factory Machinery",
    hindiName: "फैक्ट्री मशीनरी",
    category: "Machinery",
    brand: "Demo Machines",
    own: false,
    price: 59999,
    mrp: 74999,
    image: "photo-1581092160562-40aa08e78837",
    description: "Industrial machinery category product.",
    hindiDescription: "फैक्ट्री मशीनरी का डेमो उत्पाद।",
  },
  {
    id: 17,
    name: "Fashion Handbag",
    hindiName: "फैशन हैंडबैग",
    category: "Fashion",
    brand: "Demo Fashion",
    own: false,
    price: 1199,
    mrp: 1799,
    image: "photo-1547949003-9792a18a2601",
    description: "Stylish everyday handbag.",
    hindiDescription: "स्टाइलिश हैंडबैग।",
  },
  {
    id: 18,
    name: "Wireless Headphones",
    hindiName: "वायरलेस हेडफोन",
    category: "Electronics",
    brand: "Demo Tech",
    own: false,
    price: 1999,
    mrp: 2999,
    image: "photo-1505740420928-5e560c06d30e",
    description: "Wireless audio headphones.",
    hindiDescription: "वायरलेस ऑडियो हेडफोन।",
  },
  {
    id: 19,
    name: "Premium Food Pack",
    hindiName: "प्रीमियम फूड पैक",
    category: "Grocery",
    brand: "DRONA SAJIVANI",
    own: true,
    price: 999,
    mrp: 1399,
    image: "photo-1504674900247-0877df9cc836",
    description: "Assorted food essentials.",
    hindiDescription: "खाद्य सामग्री का पैक।",
  },
  {
    id: 20,
    name: "Home Decoration",
    hindiName: "घर की सजावट",
    category: "Home & Kitchen",
    brand: "Demo Home",
    own: false,
    price: 1599,
    mrp: 2299,
    image: "photo-1600210492486-724fe5c67fb0",
    description: "Decorative items for your home.",
    hindiDescription: "घर की सजावट का सामान।",
  },
];

const money = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("retail");
  const [language, setLanguage] = useState<Language>("EN");
  const [cart, setCart] = useState<number[]>([]);
  const [category, setCategory] = useState("All");
  const [brandFilter, setBrandFilter] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);

  const hindi = language === "HI";

  const t = (english: string, hindiText: string) =>
    hindi ? hindiText : english;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.hindiName.includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesBrand =
        brandFilter === "all" ||
        (brandFilter === "own" && product.own) ||
        (brandFilter === "other" && !product.own);

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [search, category, brandFilter]);

  const cartProducts = cart
    .map((id) => demoProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  function addToCart(product: Product) {
    setCart((previous) => [...previous, product.id]);
    alert(
      t(
        `${product.name} added to cart.`,
        `${product.hindiName} कार्ट में जोड़ दिया गया।`
      )
    );
  }

  function buyNow(product: Product) {
    alert(
      t(
        `Demo Checkout\n\nProduct: ${product.name}\nPrice: ${money(
          product.price
        )}\n\nOnline ordering is not active yet.`,
        `डेमो चेकआउट\n\nप्रोडक्ट: ${product.hindiName}\nकीमत: ${money(
          product.price
        )}\n\nऑनलाइन ऑर्डर अभी शुरू नहीं हुए हैं।`
      )
    );
  }

  function requestQuote(product: Product) {
    const buyerName = prompt(
      t("Enter Buyer / Business Name:", "खरीदार / व्यवसाय का नाम:")
    );
    if (!buyerName?.trim()) return;

    const mobile = prompt(
      t("Enter Mobile Number:", "मोबाइल नंबर:")
    );
    if (!mobile?.trim()) return;

    const quantity = prompt(
      t("Enter Bulk Quantity:", "थोक मात्रा दर्ज करें:")
    );
    if (!quantity?.trim() || Number(quantity) <= 0) return;

    const country = prompt(
      t("Enter Delivery Country:", "डिलीवरी का देश:")
    );
    if (!country?.trim()) return;

    alert(
      `DRONA SAJIVANI - Wholesale Enquiry\n\n` +
        `Product: ${product.name}\n` +
        `Brand: ${product.brand}\n` +
        `Buyer: ${buyerName}\n` +
        `Mobile: ${mobile}\n` +
        `Quantity: ${quantity}\n` +
        `Country: ${country}\n\n` +
        t(
          "Demo enquiry prepared. Not sent to supplier.",
          "डेमो पूछताछ तैयार है। सप्लायर को नहीं भेजी गई।"
        )
    );
  }

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
          padding: 16,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
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
              <h1
                style={{
                  fontSize: 23,
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                DRONA SAJIVANI
              </h1>

              <p
                style={{
                  fontSize: 12,
                  color: "#f3d77b",
                  marginTop: 5,
                }}
              >
                Global Retail & Wholesale Marketplace
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() =>
                setLanguage(language === "EN" ? "HI" : "EN")
              }
              style={headerButton}
            >
              {language === "EN" ? "हिन्दी" : "English"}
            </button>

            <button
              onClick={() => setShowCart(true)}
              style={headerButton}
            >
              🛒 {cart.length}
            </button>
          </div>
        </div>
      </header>

      <section
        style={{
          background:
            "linear-gradient(135deg,#087544,#043d29)",
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
          {t(
            "Your Gateway to Global Trade",
            "दुनिया का सामान, एक ही बाजार"
          )}
        </h2>

        <p style={{ fontSize: 17, marginBottom: 25 }}>
          {t(
            "Shop Retail. Buy Wholesale. Trade Worldwide.",
            "भारत और दुनिया के लिए रिटेल एवं होलसेल मार्केटप्लेस"
          )}
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
            🛍️ {t("Retail Shopping", "रिटेल खरीदारी")}
          </button>

          <button
            onClick={() => setMode("wholesale")}
            style={modeButton(mode === "wholesale")}
          >
            🏭 {t("Wholesale Business", "थोक व्यापार")}
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
          placeholder={t(
            "Search products or brands...",
            "प्रोडक्ट या ब्रांड खोजें..."
          )}
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
          {t("Shop by Category", "सभी कैटेगरी")}
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 25,
          }}
        >
          {["All", ...categories].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{
                ...filterButton,
                background:
                  category === item ? "#087544" : "white",
                color:
                  category === item ? "white" : "#173b2b",
              }}
            >
              {item === "All" ? t("All", "सभी") : item}
            </button>
          ))}
        </div>

        <h2 style={sectionTitle}>
          {t("Shop by Brand", "कंपनी के अनुसार प्रोडक्ट")}
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 35,
          }}
        >
          {[
            { id: "all", en: "All Brands", hi: "सभी कंपनियाँ" },
            {
              id: "own",
              en: "DRONA SAJIVANI",
              hi: "DRONA SAJIVANI",
            },
            {
              id: "other",
              en: "Other Companies",
              hi: "दूसरी कंपनियाँ",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setBrandFilter(item.id)}
              style={{
                ...filterButton,
                background:
                  brandFilter === item.id ? "#087544" : "white",
                color:
                  brandFilter === item.id ? "white" : "#173b2b",
              }}
            >
              {hindi ? item.hi : item.en}
            </button>
          ))}
        </div>

        <h2 style={sectionTitle}>
          {mode === "retail"
            ? t("Featured Products", "लोकप्रिय प्रोडक्ट")
            : t(
                "Wholesale Product Catalogue",
                "थोक व्यापार के प्रोडक्ट"
              )}
        </h2>

        <p style={{ marginBottom: 20, color: "#64746b" }}>
          {filteredProducts.length}{" "}
          {t("Demo Products", "डेमो प्रोडक्ट")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {filteredProducts.map((product) => {
            const discount = Math.round(
              ((product.mrp - product.price) / product.mrp) * 100
            );

            return (
              <div
                key={product.id}
                style={{
                  background: "white",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#edf7ef",
                  }}
                >
                  <img
                    src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=80`}
                    alt={product.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "#d4af37",
                      color: "#173b2b",
                      padding: "6px 9px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {discount}% OFF
                  </span>
                </div>

                <div style={{ padding: 18 }}>
                  <p
                    style={{
                      color: "#087544",
                      fontSize: 12,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {product.brand}
                  </p>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      minHeight: 45,
                    }}
                  >
                    {hindi ? product.hindiName : product.name}
                  </h3>

                  <p
                    style={{
                      color: "#777",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    {product.category}
                  </p>

                  <div style={{ margin: "14px 0" }}>
                    <span
                      style={{
                        color: "#087544",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      {money(product.price)}
                    </span>

                    <span
                      style={{
                        color: "#888",
                        textDecoration: "line-through",
                        marginLeft: 10,
                        fontSize: 14,
                      }}
                    >
                      {money(product.mrp)}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelected(product)}
                    style={{
                      ...outlineButton,
                      marginBottom: 10,
                    }}
                  >
                    {t("View Details", "पूरी जानकारी")}
                  </button>

                  {mode === "retail" ? (
                    <>
                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          ...goldButton,
                          marginBottom: 10,
                        }}
                      >
                        🛒 {t("Add to Cart", "कार्ट में डालें")}
                      </button>

                      <button
                        onClick={() => buyNow(product)}
                        style={greenButton}
                      >
                        {t("Buy Now", "अभी खरीदें")}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => requestQuote(product)}
                      style={goldButton}
                    >
                      {t("Request Quote", "थोक भाव पूछें")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", padding: 30 }}>
            {t("No products found", "कोई प्रोडक्ट नहीं मिला")}
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
          {t(
            "Grow Your Business With Us",
            "हमारे साथ व्यापार करें"
          )}
        </h2>

        <p style={{ marginBottom: 20 }}>
          Retail • Wholesale • Import • Export
        </p>

        <Link
          href="/seller/register"
          style={{
            ...greenButton,
            display: "inline-block",
            width: "auto",
            padding: "15px 30px",
            textDecoration: "none",
          }}
        >
          {t("Become a Seller", "सेलर बनें")}
        </Link>
      </section>

      <footer
        style={{
          background: "#043d29",
          color: "white",
          padding: 30,
          textAlign: "center",
        }}
      >
        <h3
          style={{
            color: "#d4af37",
            fontWeight: "bold",
          }}
        >
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

      {selected && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setSelected(null)}
              style={closeButton}
            >
              ✕
            </button>

            <img
              src={`https://images.unsplash.com/${selected.image}?auto=format&fit=crop&w=600&q=80`}
              alt={selected.name}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <h2 style={{ marginTop: 15 }}>
              {hindi ? selected.hindiName : selected.name}
            </h2>

            <p style={{ marginTop: 10 }}>
              {t("Brand", "कंपनी")}: {selected.brand}
            </p>

            <p style={{ marginTop: 10 }}>
              {hindi
                ? selected.hindiDescription
                : selected.description}
            </p>

            <p
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#087544",
                margin: "15px 0",
              }}
            >
              {money(selected.price)}
            </p>

            <button
              onClick={() => {
                if (mode === "retail") {
                  addToCart(selected);
                } else {
                  requestQuote(selected);
                }
              }}
              style={greenButton}
            >
              {mode === "retail"
                ? t("Add to Cart", "कार्ट में डालें")
                : t("Request Quote", "थोक भाव पूछें")}
            </button>
          </div>
        </div>
      )}

      {showCart && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setShowCart(false)}
              style={closeButton}
            >
              ✕
            </button>

            <h2 style={sectionTitle}>
              🛒 {t("Shopping Cart", "शॉपिंग कार्ट")}
            </h2>

            {cartProducts.length === 0 ? (
              <p>
                {t(
                  "Your cart is empty.",
                  "आपका कार्ट खाली है।"
                )}
              </p>
            ) : (
              <>
                {cartProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      borderBottom: "1px solid #ddd",
                      padding: "12px 0",
                    }}
                  >
                    <div>
                      <strong>
                        {hindi
                          ? product.hindiName
                          : product.name}
                      </strong>
                      <p>{money(product.price)}</p>
                    </div>

                    <button
                      onClick={() =>
                        setCart((previous) =>
                          previous.filter(
                            (_, itemIndex) => itemIndex !== index
                          )
                        )
                      }
                      style={{
                        border: "none",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: 8,
                        padding: 10,
                        cursor: "pointer",
                      }}
                    >
                      {t("Remove", "हटाएँ")}
                    </button>
                  </div>
                ))}

                <h3 style={{ margin: "20px 0" }}>
                  {t("Total", "कुल राशि")}:{" "}
                  {money(cartTotal)}
                </h3>

                <button
                  onClick={() =>
                    alert(
                      t(
                        "Demo cart only. Checkout is coming soon.",
                        "यह डेमो कार्ट है। चेकआउट जल्द शुरू होगा।"
                      )
                    )
                  }
                  style={greenButton}
                >
                  {t("Checkout", "चेकआउट")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
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

const filterButton = {
  padding: "12px 16px",
  borderRadius: 25,
  border: "1px solid #ddd",
  cursor: "pointer",
};

const goldButton = {
  background: "#d4af37",
  color: "#173b2b",
  border: "none",
  padding: 13,
  width: "100%",
  borderRadius: 9,
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const greenButton = {
  background: "#087544",
  color: "white",
  border: "none",
  padding: 13,
  width: "100%",
  borderRadius: 9,
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const outlineButton = {
  background: "white",
  color: "#087544",
  border: "1px solid #087544",
  padding: 12,
  width: "100%",
  borderRadius: 9,
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  color: "#173b2b",
  padding: 25,
  borderRadius: 16,
  width: "100%",
  maxWidth: 500,
  maxHeight: "85vh",
  overflowY: "auto" as const,
  position: "relative" as const,
};

const closeButton = {
  position: "absolute" as const,
  right: 12,
  top: 12,
  border: "none",
  background: "#e8f3eb",
  color: "#173b2b",
  borderRadius: 8,
  padding: 10,
  cursor: "pointer",
  zIndex: 2,
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
