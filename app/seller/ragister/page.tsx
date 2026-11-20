"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function SellerRegistration() {
  const [language, setLanguage] = useState<"HI" | "EN">("HI");

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    mobile: "",
    email: "",
    businessType: "",
    gst: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    sellingType: "Both",
  });

  const hindi = language === "HI";

  const t = (en: string, hi: string) =>
    hindi ? hi : en;

  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert(
      t(
        "Demo registration completed. Your information has NOT been submitted or saved.",
        "डेमो रजिस्ट्रेशन पूरा हुआ। आपकी जानकारी अभी जमा या सेव नहीं हुई है।"
      )
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "13px",
    border: "1px solid #ccc",
    borderRadius: "9px",
    fontSize: "15px",
    background: "white",
    color: "#173b2b",
    marginTop: "7px",
    marginBottom: "18px",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontWeight: "bold" as const,
    fontSize: "14px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f8f5",
        fontFamily: "Arial, sans-serif",
        color: "#173b2b",
      }}
    >
      <header
        style={{
          background: "#087544",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>
          DRONA SAJIVANI
        </h1>

        <p>Global Retail & Wholesale Marketplace</p>

        <button
          type="button"
          onClick={() =>
            setLanguage(hindi ? "EN" : "HI")
          }
          style={{
            background: "#d4af37",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {hindi ? "English" : "हिन्दी"}
        </button>
      </header>

      <section
        style={{
          maxWidth: "650px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#087544",
            fontWeight: "bold",
          }}
        >
          ← {t("Back to Home", "होम पर वापस जाएँ")}
        </Link>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            {t(
              "Seller Registration",
              "सेलर रजिस्ट्रेशन"
            )}
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "25px",
            }}
          >
            {t(
              "Register your business with DRONA SAJIVANI",
              "DRONA SAJIVANI के साथ अपना व्यापार जोड़ें"
            )}
          </p>

          <form onSubmit={submit}>
            <label style={labelStyle}>
              {t("Business Name", "कंपनी / फर्म का नाम")}
            </label>
            <input
              required
              name="businessName"
              value={form.businessName}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Owner Name", "मालिक का नाम")}
            </label>
            <input
              required
              name="ownerName"
              value={form.ownerName}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Mobile Number", "मोबाइल नंबर")}
            </label>
            <input
              required
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Email Address", "ईमेल पता")}
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Business Type", "व्यापार का प्रकार")}
            </label>
            <select
              required
              name="businessType"
              value={form.businessType}
              onChange={update}
              style={inputStyle}
            >
              <option value="">
                {t("Select Business Type", "व्यापार चुनें")}
              </option>
              <option value="Individual">
                Individual
              </option>
              <option value="Proprietorship">
                Proprietorship
              </option>
              <option value="Partnership">
                Partnership Firm
              </option>
              <option value="LLP">LLP</option>
              <option value="Private Limited">
                Private Limited
              </option>
              <option value="Other">Other</option>
            </select>

            <label style={labelStyle}>
              {t("GST Number (if applicable)", "GST नंबर (यदि लागू हो)")}
            </label>
            <input
              name="gst"
              value={form.gst}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Business Address", "व्यापार का पता")}
            </label>
            <textarea
              required
              name="address"
              value={form.address}
              onChange={update}
              rows={3}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("City", "शहर")}
            </label>
            <input
              required
              name="city"
              value={form.city}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("State / Province", "राज्य")}
            </label>
            <input
              required
              name="state"
              value={form.state}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Country", "देश")}
            </label>
            <input
              required
              name="country"
              value={form.country}
              onChange={update}
              style={inputStyle}
            />

            <label style={labelStyle}>
              {t("Selling Type", "बिक्री का प्रकार")}
            </label>
            <select
              name="sellingType"
              value={form.sellingType}
              onChange={update}
              style={inputStyle}
            >
              <option value="Retail">
                Retail
              </option>
              <option value="Wholesale">
                Wholesale
              </option>
              <option value="Both">
                Retail & Wholesale
              </option>
            </select>

            <p style={{ fontSize: 12, color: "#666" }}>
              {t(
                "Demo form only. No information will be saved or sent.",
                "यह डेमो फॉर्म है। जानकारी अभी सेव या भेजी नहीं जाएगी।"
              )}
            </p>

            <button
              type="submit"
              style={{
                background: "#087544",
                color: "white",
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "15px",
              }}
            >
              {t(
                "Submit Registration",
                "रजिस्ट्रेशन जमा करें"
              )}
            </button>
          </form>
        </div>
      </section>

      <footer
        style={{
          background: "#06452b",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        © {new Date().getFullYear()} DRONA SAJIVANI
      </footer>
    </main>
  );
}
