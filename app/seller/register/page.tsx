"use client";

import { useState, type FormEvent } from "react";
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
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
        throw new Error(
          "Supabase environment variables are missing."
        );
      }

      const url =
        `${supabaseUrl.replace(/\/$/, "")}` +
        "/rest/v1/seller_ragistration";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
