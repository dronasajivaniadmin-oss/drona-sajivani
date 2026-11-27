"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

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

export default function SellerRegistration() {
  const [language, setLanguage] = useState<"HI" | "EN">("HI");
  const [form, setForm] = useState<SellerForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
      const supabaseUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase configuration is missing.");
      }

      const url =
        supabaseUrl.replace(/\/$/, "") +
        "/rest/v1/seller_registration";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          business_name: form.businessName.trim(),
          owner_name: form.ownerName.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim().toLowerCase(),
          business_type: form.businessType,
          gst: form.gst.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          country: form.country.trim(),
          selling_type: form.sellingType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        if (errorData?.code === "23505") {
          throw new Error(
            t(
              "Your mobile number or email is already registered.",
              "आपका मोबाइल नंबर या ईमेल पहले से रजिस्टर्ड है।"
            )
          );
        }

        console.error("Seller registration error:", errorData);

        throw new Error(
          t(
            "Registration failed. Please try again.",
            "रजिस्ट्रेशन असफल रहा। कृपया दोबारा प्रयास करें।"
          )
        );
      }

      setSuccess(true);

      setMessage(
        t(
          "Seller registration submitted successfully!",
          "सेलर रजिस्ट्रेशन सफलतापूर्वक जमा हो गया!"
        )
      );

      setForm({ ...initialForm });

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : t(
              "Registration failed.",
              "रजिस्ट्रेशन असफल रहा।"
            )
      );
    } finally {
      setLoading(false);
    }
  }

  const fields: {
    name: keyof SellerForm;
    en: string;
    hi: string;
    required?: boolean;
  }[] = [
    {
      name: "businessName",
      en: "Business Name",
      hi: "व्यवसाय का नाम",
      required: true,
    },
    {
      name: "ownerName",
      en: "Owner Name",
      hi: "मालिक का नाम",
      required: true,
    },
    {
      name: "mobile",
      en: "Mobile Number",
      hi: "मोबाइल नंबर",
      required: true,
    },
    {
      name: "email",
      en: "Email Address",
      hi: "ईमेल पता",
      required: true,
    },
    {
      name: "gst",
      en: "GST Number (Optional)",
      hi: "GST नंबर (वैकल्पिक)",
    },
    {
      name: "address",
      en: "Business Address",
      hi: "व्यवसाय का पता",
      required: true,
    },
    {
      name: "city",
      en: "City",
      hi: "शहर",
      required: true,
    },
    {
      name: "state",
      en: "State",
      hi: "राज्य",
      required: true,
    },
    {
      name: "country",
      en: "Country",
      hi: "देश",
      required: true,
    },
  ];

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Link href="/">
          {t("Back to Home", "होम पेज पर जाएँ")}
        </Link>

        <button
          type="button"
          onClick={() =>
            setLanguage(language === "HI" ? "EN" : "HI")
          }
          style={{
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {language === "HI" ? "English" : "हिंदी"}
        </button>
      </div>

      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        DRONA SAJIVANI
      </h1>

      <h2 style={{ textAlign: "center" }}>
        {t("Seller Registration", "सेलर रजिस्ट्रेशन")}
      </h2>

      <p style={{ textAlign: "center" }}>
        {t(
          "Register your business to sell products online.",
          "ऑनलाइन सामान बेचने के लिए अपना व्यवसाय रजिस्टर करें।"
        )}
      </p>

      <form onSubmit={submit}>
        {fields.map((field) => (
          <div
            key={field.name}
            style={{ marginBottom: "18px" }}
          >
            <label
              htmlFor={field.name}
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              {t(field.en, field.hi)}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={
                field.name === "email"
                  ? "email"
                  : field.name === "mobile"
                  ? "tel"
                  : "text"
              }
              value={form[field.name]}
              onChange={update}
              required={field.required}
              maxLength={
                field.name === "mobile" ? 15 : undefined
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "18px" }}>
          <label
            htmlFor="businessType"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            {t("Business Type", "व्यवसाय का प्रकार")}
          </label>

          <select
            id="businessType"
            name="businessType"
            value={form.businessType}
            onChange={update}
            required
            style={{
              width: "100%",
              padding: "12px",
            }}
          >
            <option value="">
              {t("Select Business Type", "व्यवसाय चुनें")}
            </option>

            <option value="Individual">
              {t("Individual", "व्यक्तिगत")}
            </option>

            <option value="Proprietorship">
              {t("Proprietorship", "प्रोपराइटरशिप")}
            </option>

            <option value="Partnership">
              {t("Partnership", "पार्टनरशिप")}
            </option>

            <option value="LLP">LLP</option>

            <option value="Private Limited">
              Private Limited
            </option>

            <option value="Other">
              {t("Other", "अन्य")}
            </option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="sellingType"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            {t("Selling Type", "बिक्री का प्रकार")}
          </label>

          <select
            id="sellingType"
            name="sellingType"
            value={form.sellingType}
            onChange={update}
            style={{
              width: "100%",
              padding: "12px",
            }}
          >
            <option value="Retail">
              {t("Retail", "रिटेल")}
            </option>

            <option value="Wholesale">
              {t("Wholesale", "होलसेल")}
            </option>

            <option value="Both">
              {t("Both", "दोनों")}
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "17px",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? t("Submitting...", "जमा हो रहा है...")
            : t("Register as Seller", "सेलर रजिस्टर करें")}
        </button>

        {message && (
          <p
            role="status"
            style={{
              marginTop: "18px",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: success
                ? "#dcfce7"
                : "#fee2e2",
              color: success ? "#166534" : "#991b1b",
              overflowWrap: "anywhere",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
