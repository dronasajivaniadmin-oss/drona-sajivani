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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase environment variables are missing.");
      }

      const url =
        supabaseUrl.replace(/\/$/, "") +
        "/rest/v1/seller_registration";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          business_name: form.businessName.trim(),
          owner_name: form.ownerName.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim(),
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
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed.");
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
      setMessage(
        error instanceof Error
          ? error.message
          : "Registration failed."
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
    { name: "businessName", en: "Business Name", hi: "व्यवसाय का नाम", required: true },
    { name: "ownerName", en: "Owner Name", hi: "मालिक का नाम", required: true },
    { name: "mobile", en: "Mobile Number", hi: "मोबाइल नंबर
