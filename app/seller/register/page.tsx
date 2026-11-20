"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

type Language = "HI" | "EN";

type SellerForm = {
  businessName: string;
  ownerName: string;
  mobile: string;
  email: string;
  businessType: string;
  gst: string;
  address: string;
  city: string;
  state: string;
  country: string;
  sellingType: string;
};

export default function SellerRegistration() {
  const [language, setLanguage] = useState<Language>("HI");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const initialForm: SellerForm = {
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
  };

  const [form, setForm] = useState<SellerForm>(initialForm);

  const hindi = language === "HI";

  function t(en: string, hi: string) {
    return hindi ? hi : en;
  }

  function update(
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setSuccess(true);

      setMessage(
        t(
          "Seller registration submitted successfully!",
          "सेलर रजिस्ट्रेशन सफलतापूर्वक जमा हो गया!"
        )
      );

      setForm(initialForm);
    } catch (error) {
      console.error("Registration error:", error);

      setSuccess(false);

      setMessage(
        t(
          "Registration failed. Please try again.",
          "रजिस्ट्रेशन नहीं हुआ। कृपया दोबारा कोशिश करें।"
        )
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: "14px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f6fa",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "auto",
          background: "white",
          padding: "25px",
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link href="/" style={{ color: "#174ea6" }}>
            {t("Home", "होम")}
          </Link>

          <button
            type="button"
            onClick={() =>
              setLanguage(language === "HI" ? "EN" : "HI")
            }
            style={{
              padding: "9px 15px",
              background: "#174ea6",
              color: "white",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
            }}
          >
            {language === "HI" ? "English" : "हिन्दी"}
          </button>
        </div>

        <h1
          style={{
            textAlign: "center",
            color: "#174ea6",
            marginTop: "25px",
          }}
        >
          DRONA SAJIVANI
        </h1>

        <h2 style={{ textAlign: "center" }}>
          {t("Seller Registration", "सेलर रजिस्ट्रेशन")}
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          {t(
            "Register your business to sell products.",
            "अपने उत्पाद बेचने के लिए अपना व्यवसाय रजिस्टर करें।"
          )}
        </p>

        <form onSubmit={submit}>
          <label style={labelStyle}>
            {t("Business Name", "व्यवसाय का नाम")} *
          </label>

          <input
            name="businessName"
            value={form.businessName}
            onChange={update}
            required
            maxLength={150}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("Owner Name", "मालिक का नाम")} *
          </label>

          <input
            name="ownerName"
            value={form.ownerName}
            onChange={update}
            required
            maxLength={150}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("Mobile Number", "मोबाइल नंबर")} *
          </label>

          <input
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={update}
            required
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="9876543210"
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("Email Address", "ईमेल पता")} *
          </label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            required
            maxLength={254}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("Business Type", "व्यवसाय का प्रकार")}
          </label>

          <select
            name="businessType"
            value={form.businessType}
            onChange={update}
            style={inputStyle}
          >
            <option value="">
              {t("Select Business Type", "व्यवसाय चुनें")}
            </option>

            <option value="Manufacturer">
              {t("Manufacturer", "निर्माता")}
            </option>

            <option value="Wholesaler">
              {t("Wholesaler", "थोक विक्रेता")}
            </option>

            <option value="Retailer">
              {t("Retailer", "खुदरा विक्रेता")}
            </option>

            <option value="Distributor">
              {t("Distributor", "डिस्ट्रीब्यूटर")}
            </option>

            <option value="Exporter">
              {t("Exporter", "निर्यातक")}
            </option>

            <option value="Importer">
              {t("Importer", "आयातक")}
            </option>

            <option value="Other">
              {t("Other", "अन्य")}
            </option>
          </select>

          <label style={labelStyle}>
            {t("GST Number (Optional)", "GST नंबर (वैकल्पिक)")}
          </label>

          <input
            name="gst"
            value={form.gst}
            onChange={update}
            maxLength={15}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("Business Address", "व्यवसाय का पता")}
          </label>

          <textarea
            name="address"
            value={form.address}
            onChange={update}
            rows={3}
            maxLength={500}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("City", "शहर")}
          </label>

          <input
            name="city"
            value={form.city}
            onChange={update}
            maxLength={100}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("State", "राज्य")}
          </label>

          <input
            name="state"
            value={form.state}
            onChange={update}
            maxLength={100}
            style={inputStyle}
          />

          <label style={labelStyle}>
            {t("Country", "देश")}
          </label>

          <input
            name="country"
            value={form.country}
            onChange={update}
            required
            maxLength={100}
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
              {t("Retail", "खुदरा")}
            </option>

            <option value="Wholesale">
              {t("Wholesale", "थोक")}
            </option>

            <option value="Both">
              {t("Both", "दोनों")}
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: loading ? "#888" : "#16803c",
              color: "white",
              border: "none",
              borderRadius: "9px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading
              ? t("Submitting...", "जमा हो रहा है...")
              : t("Register as Seller", "सेलर रजिस्ट्रेशन करें")}
          </button>

          {message && (
            <p
              role="status"
              style={{
                marginTop: "18px",
                textAlign: "center",
                padding: "12px",
                borderRadius: "8px",
                background: success ? "#e5f7e9" : "#fde8e8",
                color: success ? "#166534" : "#b91c1c",
              }}
            >
              {message}
            </p>
          )}
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#777",
          }}
        >
          © DRONA SAJIVANI
        </p>
      </div>
    </main>
  );
}
