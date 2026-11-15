"use client";

import { useState } from "react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [review, setReview] = useState(false);

  const green = "#087b42";
  const gold = "#d4a62c";

  const inputStyle = {
    width: "100%",
    padding: 13,
    marginBottom: 15,
    border: "1px solid #ddd",
    borderRadius: 9,
    boxSizing: "border-box" as const,
    fontSize: 16,
  };

  const buttonStyle = {
    background: green,
    color: "white",
    padding: 15,
    border: "none",
    borderRadius: 10,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold" as const,
    cursor: "pointer",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      alert("Enter a valid 6-digit Indian PIN code.");
      return;
    }

    setReview(true);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f5",
        fontFamily: "Arial, sans-serif",
        color: "#173b27",
        paddingBottom: 40,
      }}
    >
      <header
        style={{
          background: green,
          color: "white",
          padding: 22,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            border: `2px solid ${gold}`,
            borderRadius: "50%",
            padding: 12,
            color: gold,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          DS
        </div>

        <h1 style={{ fontSize: 24 }}>
          DRONA SAJIVANI
        </h1>

        <p>Secure Guest Checkout Demo</p>
      </header>

      <section
        style={{
          maxWidth: 600,
          margin: "20px auto",
          padding: 20,
          background: "white",
          borderRadius: 15,
        }}
      >
        <a href="/" style={{ color: green }}>
          ← Continue Shopping
        </a>

        <h2>🛒 Guest Checkout</h2>

        <p>
          No account required. This is a demo.
          No real order or payment will be processed.
        </p>

        {!review ? (
          <form onSubmit={handleSubmit}>
            <h3>👤 Customer Details</h3>

            <input
              style={inputStyle}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="email"
              placeholder="Email (Optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3>🏠 Delivery Address</h3>

            <textarea
              style={inputStyle}
              placeholder="House No., Street, Area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
            />

            <input
              style={inputStyle}
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              placeholder="6-Digit PIN Code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />

            <h3>💳 Payment Method</h3>

            <select
              style={inputStyle}
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Card">
                Debit / Credit Card
              </option>
              <option value="Net Banking">
                Net Banking
              </option>
              <option value="COD">
                Cash on Delivery
              </option>
              <option value="International">
                International Payment
              </option>
            </select>

            <div
              style={{
                background: "#fff8e5",
                border: `1px solid ${gold}`,
                borderRadius: 10,
                padding: 15,
                marginBottom: 20,
              }}
            >
              <h3>📦 Order Summary</h3>
              <p>
                Cart integration is coming next.
              </p>
              <p>
                No payment will be collected.
              </p>
            </div>

            <button type="submit" style={buttonStyle}>
              Review Details
            </button>
          </form>
        ) : (
          <div>
            <h3>✅ Review Your Details</h3>

            <p><strong>Name:</strong> {name}</p>
            <p><strong>Mobile:</strong> {mobile}</p>
            <p><strong>Email:</strong> {email || "Not provided"}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>City:</strong> {city}</p>
            <p><strong>State:</strong> {state}</p>
            <p><strong>PIN:</strong> {pincode}</p>
            <p><strong>Payment:</strong> {payment}</p>

            <div
              style={{
                background: "#fff8e5",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              This is a checkout preview only.
              No order has been placed.
            </div>

            <button
              type="button"
              style={buttonStyle}
              onClick={() => setReview(false)}
            >
              Edit Details
            </button>
          </div>
        )}
      </section>
    </main>
  );
              }
