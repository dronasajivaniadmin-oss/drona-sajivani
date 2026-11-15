"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  seller: string;
};

type CartItem = {
  id: number;
  mode: string;
  quantity: number;
};

const green = "#087b42";
const gold = "#d4a62c";

const categories = [
  { name: "Fashion", icon: "👕" },
  { name: "Electronics", icon: "📱" },
  { name: "Home & Kitchen", icon: "🏠" },
  { name: "Agriculture", icon: "🚜" },
  { name: "Beauty", icon: "💄" },
  { name: "Grocery", icon: "🛒" },
  { name: "Automobile", icon: "🚗" },
];

const data = [
  ["Premium Cotton T-Shirt", "Fashion", 499, "photo-1521572163474-6864f9cf17ab"],
  ["Fashion Shoes", "Fashion", 1499, "photo-1542291026-7eec264c27ff"],
  ["Leather Handbag", "Fashion", 2499, "photo-1584917865442-de89df76afd3"],
  ["Premium Sunglasses", "Fashion", 899, "photo-1511499767150-a48a237f0083"],

  ["Smart Watch", "Electronics", 1999, "photo-1523275335684-37898b6baf30"],
  ["Wireless Headphones", "Electronics", 1299, "photo-1505740420928-5e560c06d30e"],
  ["Smartphone", "Electronics", 12999, "photo-1511707171634-5f897ff02aa9"],
  ["Laptop", "Electronics", 45999, "photo-1496181133206-80ce9b88a853"],

  ["Coffee Maker", "Home & Kitchen", 2999, "photo-1517256673644-36ad11246d21"],
  ["Modern Chair", "Home & Kitchen", 3499, "photo-1503602642458-232111445657"],
  ["Table Lamp", "Home & Kitchen", 1199, "photo-1507473885765-e6ed057f782c"],

  ["Garden Tools", "Agriculture", 1499, "photo-1416879595882-3373a0480b5b"],
  ["Plant Sprayer", "Agriculture", 899, "photo-1466692476868-aef1dfb1e735"],
  ["Garden Plants", "Agriculture", 399, "photo-1416879595882-3373a0480b5b"],

  ["Beauty Cream", "Beauty", 699, "photo-1556228578-0d85b1a4d571"],
  ["Perfume", "Beauty", 1499, "photo-1541643600914-78b084683601"],

  ["Fresh Fruits", "Grocery", 499, "photo-1619566636858-adf3ef46400b"],
  ["Premium Coffee", "Grocery", 799, "photo-1447933601403-0c6688de566e"],

  ["Car Accessories", "Automobile", 1299, "photo-1492144534655-ae79c964c9d7"],
  ["Car Care Kit", "Automobile", 999, "photo-1485291571150-772bcfc10da5"],
] as const;

const products: Product[] = data.map((item, index) => ({
  id: index + 1,
  name: item[0],
  category: item[1],
  price: item[2],
  image:
    "https://images.unsplash.com/" +
    item[3] +
    "?auto=format&fit=crop&w=500&q=80",
  rating: 4.2 + (index % 7) * 0.1,
  seller: "DS Marketplace Demo",
}));

const money = (value: number) =>
  "₹" + value.toLocaleString("en-IN");

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Retail");
  const [tab, setTab] = useState("Home");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ds-cart-v1");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCart(
            parsed.filter(
              (item): item is CartItem =>
                typeof item === "object" &&
                item !== null &&
                Number.isInteger(item.id) &&
                products.some((p) => p.id === item.id) &&
                ["Retail", "Wholesale"].includes(item.mode) &&
                Number.isSafeInteger(item.quantity) &&
                item.quantity > 0
            )
          );
        }
      }

      const savedWishlist = localStorage.getItem("ds-wishlist-v1");
      if (savedWishlist) {
        const parsed: unknown = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          setWishlist(
            parsed.filter(
              (id): id is number =>
                typeof id === "number" &&
                products.some((p) => p.id === id)
            )
          );
        }
      }
    } catch {
      // Use an empty cart if saved data is invalid.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("ds-cart-v1", JSON.stringify(cart));
      localStorage.setItem(
        "ds-wishlist-v1",
        JSON.stringify(wishlist)
      );
    } catch {
      // Continue without persistent storage.
    }
  }, [cart, wishlist, loaded]);

  const priceFor = (product: Product, itemMode: string) =>
    itemMode === "Wholesale"
      ? Math.round(product.price * 0.85)
      : product.price;

  const addToCart = (id: number) => {
    setCart((old) => {
      const existing = old.find(
        (item) => item.id === id && item.mode === mode
      );

      if (existing) {
        return old.map((item) =>
          item.id === id && item.mode === mode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...old, { id, mode, quantity: 1 }];
    });
  };

  const changeQuantity = (
    id: number,
    itemMode: string,
    change: number
  ) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === id && item.mode === itemMode
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return product
      ? total + priceFor(product, item.mode) * item.quantity
      : total;
  }, 0);

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || product.category === category) &&
      (tab !== "Wishlist" || wishlist.includes(product.id))
  );

  const buttonStyle = {
    background: green,
    color: "white",
    border: "none",
    borderRadius: 9,
    padding: "11px 13px",
    cursor: "pointer",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f5",
        color: "#173b27",
        fontFamily: "Arial, sans-serif",
        paddingBottom: 100,
      }}
    >
      <header
        style={{
          background: green,
          color: "white",
          padding: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            border: `2px solid ${gold}`,
            borderRadius: "50%",
            padding: 13,
            color: gold,
            fontSize: 27,
            fontWeight: "bold",
          }}
        >
          DS
        </div>

        <h1 style={{ fontSize: 25, marginBottom: 5 }}>
          DRONA SAJIVANI
        </h1>

        <p style={{ margin: 0 }}>
          Premium Global Shopping Marketplace
        </p>

        <button
          style={{
            ...buttonStyle,
            border: "1px solid white",
            marginTop: 14,
          }}
          onClick={() => setTab("Cart")}
        >
          🛒 Cart ({cartCount})
        </button>
      </header>

      {tab === "Cart" ? (
        <section style={{ padding: 16 }}>
          <h2>🛒 My Shopping Cart</h2>

          {cart.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: 25,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <p>Your cart is empty.</p>
              <button
                style={buttonStyle}
                onClick={() => setTab("Home")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => {
                const product = products.find(
                  (p) => p.id === item.id
                );

                if (!product) return null;

                const unitPrice = priceFor(product, item.mode);

                return (
                  <div
                    key={`${item.id}-${item.mode}`}
                    style={{
                      background: "white",
                      borderRadius: 12,
                      padding: 15,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: 90,
                          height: 90,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />

                      <div>
                        <h3 style={{ margin: "0 0 5px" }}>
                          {product.name}
                        </h3>
                        <p>{item.mode}</p>
                        <strong>{money(unitPrice)}</strong>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <button
                        style={buttonStyle}
                        onClick={() =>
                          changeQuantity(item.id, item.mode, -1)
                        }
                      >
                        −
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        style={buttonStyle}
                        onClick={() =>
                          changeQuantity(item.id, item.mode, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Subtotal:{" "}
                      <strong>
                        {money(unitPrice * item.quantity)}
                      </strong>
                    </p>

                    <button
                      onClick={() =>
                        setCart((old) =>
                          old.filter(
                            (entry) =>
                              !(
                                entry.id === item.id &&
                                entry.mode === item.mode
                              )
                          )
                        )
                      }
                      style={{
                        background: "#b42318",
                        color: "white",
                        border: "none",
                        padding: 10,
                        borderRadius: 8,
                      }}
                    >
                      Remove Product
                    </button>
                  </div>
                );
              })}

              <div
                style={{
                  background: "#fff8e5",
                  border: `1px solid ${gold}`,
                  padding: 20,
                  borderRadius: 12,
                }}
              >
                <h2>Total: {money(cartTotal)}</h2>

                <p>
                  Demo prices. Shipping and taxes not included.
                </p>

                <button
                  style={{ ...buttonStyle, width: "100%" }}
                  onClick={() =>
                    alert(
                      "Checkout coming soon. No order has been placed."
                    )
                  }
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>
      ) : (
        <section style={{ padding: 16 }}>
          <input
            type="search"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: 14,
              border: "1px solid #ddd",
              borderRadius: 12,
              fontSize: 16,
            }}
          />

          <div
            style={{
              background: green,
              color: "white",
              padding: 24,
              marginTop: 18,
              borderRadius: 16,
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

          <h2 id="categories">Shop by Category</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 8,
            }}
          >
            {categories.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCategory(item.name);
                  setTab("Home");
                }}
                style={{
                  background:
                    category === item.name ? "#e1f3e8" : "white",
                  border:
                    category === item.name
                      ? `2px solid ${green}`
                      : "1px solid #eee",
                  borderRadius: 12,
                  padding: "14px 4px",
                  textAlign: "center",
                  fontSize: 12,
                  overflowWrap: "anywhere",
                }}
              >
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                {item.name}
              </button>
            ))}
          </div>

          <h2>
            {tab === "Wishlist"
              ? "❤️ My Wishlist"
              : "✨ Featured Products"}
          </h2>

          {category !== "All" && (
            <button
              style={{ ...buttonStyle, marginBottom: 12 }}
              onClick={() => setCategory("All")}
            >
              Show All Products
            </button>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {filtered.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "white",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 155,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <button
                    onClick={() =>
                      setWishlist((old) =>
                        old.includes(product.id)
                          ? old.filter((id) => id !== product.id)
                          : [...old, product.id]
                      )
                    }
                    aria-label="Toggle wishlist"
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: 35,
                      height: 35,
                      fontSize: 20,
                    }}
                  >
                    {wishlist.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                <div style={{ padding: 12 }}>
                  <h3
                    style={{
                      fontSize: 14,
                      minHeight: 36,
                      margin: "0 0 8px",
                    }}
                  >
                    {product.name}
                  </h3>

                  <div
                    style={{
                      color: "#b8860b",
                      fontSize: 13,
                    }}
                  >
                    ★ {product.rating.toFixed(1)} (Demo)
                  </div>

                  <p
                    style={{
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    {product.seller}
                  </p>

                  <strong style={{ fontSize: 17 }}>
                    {money(priceFor(product, mode))}
                  </strong>

                  {mode === "Wholesale" && (
                    <p style={{ color: green, fontSize: 12 }}>
                      Demo Wholesale Price
                    </p>
                  )}

                  <button
                    style={{
                      ...buttonStyle,
                      width: "100%",
                      marginTop: 12,
                    }}
                    onClick={() => addToCart(product.id)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
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
              padding: 20,
              borderRadius: 14,
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
              padding: 20,
              borderRadius: 14,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            <h2>🏪 Become a Seller</h2>
            <p>Grow your business with DRONA SAJIVANI</p>

            <button
              style={buttonStyle}
              onClick={() =>
                alert("Seller registration coming soon")
              }
            >
              Register as Seller
            </button>
          </div>
        </section>
      )}

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
          zIndex: 10,
        }}
      >
        {[
          { name: "Home", icon: "🏠" },
          { name: "Categories", icon: "📂" },
          { name: "Wishlist", icon: "❤️" },
          { name: "Cart", icon: "🛒" },
          { name: "Account", icon: "👤" },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name === "Account") {
                alert("Customer account coming soon");
                return;
              }

              if (item.name === "Categories") {
                setTab("Home");
                setTimeout(() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 50);
                return;
              }

              setTab(item.name);

              if (item.name === "Home") {
                setCategory("All");
              }

              if (item.name === "Wishlist") {
                setCategory("All");
              }

              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              border: "none",
              background: "white",
              color: tab === item.name ? green : "#666",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 21 }}>{item.icon}</div>
            {item.name}
            {item.name === "Cart" ? ` (${cartCount})` : ""}
          </button>
        ))}
      </nav>
    </main>
  );
}
