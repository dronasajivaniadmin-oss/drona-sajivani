"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  icon: string;
  category: string;
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
  { name: "Grocery", icon: "🛒" },
  { name: "Beauty", icon: "💄" },
  { name: "Industrial", icon: "🏭" },
  { name: "Automobile", icon: "🚗" },
];

const products: Product[] = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 499,
    icon: "👕",
    category: "Fashion",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    icon: "⌚",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Headphones",
    price: 1299,
    icon: "🎧",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Kitchen Set",
    price: 899,
    icon: "🍳",
    category: "Home & Kitchen",
  },
];

const money = (amount: number) =>
  "₹" + amount.toLocaleString("en-IN");

const buttonStyle = {
  background: green,
  color: "white",
  border: "none",
  borderRadius: 9,
  padding: "11px 14px",
  cursor: "pointer",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Retail");
  const [tab, setTab] = useState("Home");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ds-cart-v1");

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item): item is CartItem =>
              typeof item === "object" &&
              item !== null &&
              typeof item.id === "number" &&
              products.some((p) => p.id === item.id) &&
              (item.mode === "Retail" ||
                item.mode === "Wholesale") &&
              Number.isSafeInteger(item.quantity) &&
              item.quantity > 0
          );

          setCart(valid);
        }
      }
    } catch {
      // Start with an empty cart.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(
          "ds-cart-v1",
          JSON.stringify(cart)
        );
      } catch {
        // Cart still works during this session.
      }
    }
  }, [cart, loaded]);

  const getPrice = (product: Product, itemMode: string) =>
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
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number, itemMode: string) => {
    setCart((old) =>
      old.filter(
        (item) =>
          !(item.id === id && item.mode === itemMode)
      )
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(
      (p) => p.id === item.id
    );

    return product
      ? sum +
          getPrice(product, item.mode) * item.quantity
      : sum;
  }, 0);

  const filtered = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f5",
        color: "#173b27",
        fontFamily: "Arial, sans-serif",
        paddingBottom: 95,
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

        <button
          onClick={() => setTab("Cart")}
          style={{
            ...buttonStyle,
            marginTop: 12,
            border: "1px solid white",
          }}
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

                const price = getPrice(
                  product,
                  item.mode
                );

                return (
                  <div
                    key={`${item.id}-${item.mode}`}
                    style={{
                      background: "white",
                      padding: 16,
                      borderRadius: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ fontSize: 40 }}>
                      {product.icon}
                    </div>

                    <h3>{product.name}</h3>

                    <p>{item.mode}</p>

                    <p>
                      Unit Price: {money(price)}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <button
                        style={buttonStyle}
                        onClick={() =>
                          changeQuantity(
                            item.id,
                            item.mode,
                            -1
                          )
                        }
                      >
                        −
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        style={buttonStyle}
                        onClick={() =>
                          changeQuantity(
                            item.id,
                            item.mode,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Subtotal:{" "}
                      <strong>
                        {money(price * item.quantity)}
                      </strong>
                    </p>

                    <button
                      onClick={() =>
                        removeItem(item.id, item.mode)
                      }
                      style={{
                        background: "#b42318",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: 10,
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
                  Demo prices only. Shipping and taxes
                  are not included.
                </p>

                <button
                  style={{
                    ...buttonStyle,
                    width: "100%",
                  }}
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
            <p>
              Retail • Wholesale • Import • Export
            </p>
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
                  background:
                    mode === item ? green : "white",
                  color:
                    mode === item ? "white" : green,
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
              gridTemplateColumns: "repeat(4, 1fr)",
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
                    category === item.name
                      ? "#e1f3e8"
                      : "white",
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
                <div style={{ fontSize: 28 }}>
                  {item.icon}
                </div>
                {item.name}
              </button>
            ))}
          </div>

          <h2>Featured Products</h2>

          {category !== "All" && (
            <button
              onClick={() => setCategory("All")}
              style={{
                ...buttonStyle,
                marginBottom: 12,
              }}
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
                  {money(getPrice(product, mode))}
                </p>

                <button
                  onClick={() =>
                    addToCart(product.id)
                  }
                  style={{
                    ...buttonStyle,
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
            <p>
              Connect Buyers and Sellers Worldwide
            </p>
            <p>
              Import • Export • Global Wholesale
            </p>
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

            <p>
              Grow your business with DRONA SAJIVANI
            </p>

            <button
              style={buttonStyle}
              onClick={() =>
                alert(
                  "Seller registration coming soon"
                )
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
          { name: "Cart", icon: "🛒" },
          { name: "Account", icon: "👤" },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name === "Account") {
                alert(
                  "Customer account coming soon"
                );
              } else if (
                item.name === "Categories"
              ) {
                setTab("Home");
                setTimeout(() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 50);
              } else {
                setTab(item.name);

                if (item.name === "Home") {
                  setCategory("All");
                }

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
            style={{
              border: "none",
              background: "white",
              color:
                tab === item.name
                  ? green
                  : "#666",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 22 }}>
              {item.icon}
            </div>

            {item.name}

            {item.name === "Cart" &&
              ` (${cartCount})`}
          </button>
        ))}
      </nav>
    </main>
  );
}
