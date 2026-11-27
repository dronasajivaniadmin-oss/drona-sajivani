"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function SellerLogin() {
  const [language, setLanguage] = useState<"HI" | "EN">("HI");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const hindi = language === "HI";

  function t(en: string, hi: string) {
    return hindi ? hi : en;
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

      const baseUrl = supabaseUrl.replace(/\/$/, "");

      const redirectUrl =
        window.location.origin + "/seller/login";

      const endpoint =
        mode === "signup"
          ? "/auth/v1/signup?redirect_to=" +
            encodeURIComponent(redirectUrl)
          : "/auth/v1/token?grant_type=password";

      const response = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorCode = data.error_code || data.code;

        if (errorCode === "email_not_confirmed") {
          throw new Error(
            t(
              "Please verify your email first.",
              "कृपया पहले अपना ईमेल सत्यापित करें।"
            )
          );
        }

        if (errorCode === "invalid_credentials") {
          throw new Error(
            t(
              "Incorrect email or password.",
              "ईमेल या पासवर्ड गलत है।"
            )
          );
        }

        throw new Error(
          t(
            "Request failed. Please try again.",
            "अनुरोध असफल रहा। कृपया दोबारा प्रयास करें।"
          )
        );
      }

      setSuccess(true);

      if (mode === "signup") {
        setMessage(
          t(
            "Please check your email for a verification link.",
            "कृपया ईमेल सत्यापन के लिए अपना ईमेल चेक करें।"
          )
        );

        setMode("login");
      } else {
        setMessage(
          t(
            "Login credentials verified successfully!",
            "आपके लॉगिन की जानकारी सफलतापूर्वक सत्यापित हो गई है!"
          )
        );
      }

      setPassword("");

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : t("Request failed.", "अनुरोध असफल रहा।")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: "450px",
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
        }}
      >
        <Link href="/">
          {t("Home", "होम पेज")}
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
          {hindi ? "English" : "हिंदी"}
        </button>
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "#166534",
          marginTop: "35px",
        }}
      >
        DRONA SAJIVANI
      </h1>

      <h2 style={{ textAlign: "center" }}>
        {mode === "login"
          ? t("Seller Login", "सेलर लॉगिन")
          : t("Create Login Account", "लॉगिन अकाउंट बनाएँ")}
      </h2>

      <p style={{ textAlign: "center" }}>
        {t(
          "Global Retail & Wholesale Marketplace",
          "ग्लोबल रिटेल और होलसेल मार्केटप्लेस"
        )}
      </p>

      <form onSubmit={submit}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          {t("Email Address", "ईमेल पता")}
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          placeholder={t(
            "Enter your email",
            "अपना ईमेल डालें"
          )}
          style={{
            width: "100%",
            padding: "13px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          {t("Password", "पासवर्ड")}
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={
            mode === "signup"
              ? "new-password"
              : "current-password"
          }
          minLength={mode === "signup" ? 8 : undefined}
          required
          placeholder={t(
            "Enter your password",
            "अपना पासवर्ड डालें"
          )}
          style={{
            width: "100%",
            padding: "13px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

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
            ? t("Please wait...", "कृपया प्रतीक्षा करें...")
            : mode === "login"
            ? t("Login", "लॉगिन करें")
            : t("Create Account", "अकाउंट बनाएँ")}
        </button>
      </form>

      {message && (
        <p
          role="status"
          style={{
            padding: "14px",
            marginTop: "20px",
            borderRadius: "8px",
            backgroundColor: success
              ? "#dcfce7"
              : "#fee2e2",
            color: success
              ? "#166534"
              : "#991b1b",
            overflowWrap: "anywhere",
          }}
        >
          {message}
        </p>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setMessage("");
          setPassword("");
        }}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          backgroundColor: "white",
          color: "#166534",
          border: "1px solid #166534",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {mode === "login"
          ? t(
              "Create New Login Account",
              "नया लॉगिन अकाउंट बनाएँ"
            )
          : t(
              "Already have an account? Login",
              "पहले से अकाउंट है? लॉगिन करें"
            )}
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        <Link href="/seller/registration">
          {t(
            "Register Your Business",
            "अपना व्यवसाय रजिस्टर करें"
          )}
        </Link>
      </p>
    </main>
  );
}
