"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase";

export default function SellerDashboard() {
  const router = useRouter();

  const [language, setLanguage] =
    useState<"HI" | "EN">("HI");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const hindi = language === "HI";

  function t(en: string, hi: string) {
    return hindi ? hi : en;
  }

  useEffect(() => {
    let active = true;

    async function checkLogin() {
      try {
        const supabase = createClient();

        const { data, error } =
          await supabase.auth.getUser();

        if (!active) return;

        if (error || !data.user) {
          router.replace("/seller/login");
          return;
        }

        setEmail(data.user.email || "");
        setAuthorized(true);
        setLoading(false);

      } catch {
        if (active) {
          router.replace("/seller/login");
        }
      }
    }

    checkLogin();

    return () => {
      active = false;
    };
  }, [router]);

  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { error } =
        await supabase.auth.signOut();

      if (error) throw error;

      setAuthorized(false);
      router.replace("/seller/login");
      router.refresh();

    } catch {
      setMessage(
        t(
          "Logout failed. Please try again.",
          "लॉगआउट असफल रहा। दोबारा प्रयास करें।"
        )
      );
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading || !authorized) {
    return (
      <main
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#166534",
        }}
      >
        <h2>DRONA SAJIVANI</h2>

        <p>
          {t(
            "Checking login session...",
            "लॉगिन सेशन की जाँच हो रही है..."
          )}
        </p>
      </main>
    );
  }

  const sections = [
    {
      icon: "👤",
      title: t("Seller Profile", "सेलर प्रोफाइल"),
    },
    {
      icon: "🏢",
      title: t(
        "Business Status",
        "व्यवसाय की स्थिति"
      ),
    },
    {
      icon: "🛡️",
      title: t(
        "Admin Approval",
        "एडमिन की मंजूरी"
      ),
    },
    {
      icon: "➕",
      title: t("Add Product", "नया प्रोडक्ट जोड़ें"),
    },
    {
      icon: "📦",
      title: t("My Products", "मेरे प्रोडक्ट"),
    },
    {
      icon: "🛒",
      title: t("Orders", "ऑर्डर"),
    },
    {
      icon: "📊",
      title: t("Sales Report", "बिक्री रिपोर्ट"),
    },
    {
      icon: "💳",
      title: t("Payments", "भुगतान"),
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0fdf4",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <header
        style={{
          backgroundColor: "#166534",
          color: "white",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <h1 style={{ margin: "0" }}>
          DRONA SAJIVANI
        </h1>

        <p>
          Global Retail & Wholesale Marketplace
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "white",
              padding: "10px",
            }}
          >
            {t("Home", "होम पेज")}
          </Link>

          <button
            onClick={() =>
              setLanguage(hindi ? "EN" : "HI")
            }
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {hindi ? "English" : "हिंदी"}
          </button>

          <button
            onClick={logout}
            disabled={loggingOut}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loggingOut
              ? t("Please wait...", "प्रतीक्षा करें...")
              : t("Logout", "लॉगआउट")}
          </button>
        </div>
      </header>

      <section
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "14px",
          marginTop: "20px",
          border: "1px solid #bbf7d0",
        }}
      >
        <h2 style={{ color: "#166534" }}>
          {t("Seller Dashboard", "सेलर डैशबोर्ड")}
        </h2>

        <p>
          {t("Welcome to", "आपका स्वागत है")}{" "}
          DRONA SAJIVANI
        </p>

        <p style={{ overflowWrap: "anywhere" }}>
          <strong>Email:</strong> {email}
        </p>

        <p style={{ color: "#166534" }}>
          ✅ {t("Login verified", "लॉगिन सत्यापित")}
        </p>

        <p style={{ color: "#92400e" }}>
          {t(
            "Seller approval status is not yet available.",
            "सेलर अप्रूवल की स्थिति अभी उपलब्ध नहीं है।"
          )}
        </p>

        {message && (
          <p role="alert" style={{ color: "#991b1b" }}>
            {message}
          </p>
        )}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "20px 12px",
              textAlign: "center",
              borderRadius: "14px",
              border: "1px solid #bbf7d0",
              boxShadow:
                "0 3px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "35px" }}>
              {section.icon}
            </div>

            <h3 style={{ color: "#166534" }}>
              {section.title}
            </h3>

            <p style={{ color: "#64748b" }}>
              {t("Coming Soon", "जल्द उपलब्ध होगा")}
            </p>
          </div>
        ))}
      </section>

      <footer
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#166534",
        }}
      >
        <strong>DRONA SAJIVANI</strong>

        <p>
          Your Gateway to Global Trade
        </p>

        <p>दुनिया का सामान, एक ही बाजार</p>
      </footer>
    </main>
  );
          }
