"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/DonatePage.module.css";

export default function DonatePage() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = Number(params.get("amount")) || 0;
    setAmount(value);
    if (value === 0) {
      router.push("/fundraiser");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in name, email and phone.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount,
          category: "Donation",
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to submit donation");

      router.push("/fundraiser");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Donate</h1>
      <p>Submit your details and contribution amount below.</p>
      <div className={styles.amountCard}>
        <strong>Amount:</strong> ₹{amount || 0}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.formLabel}>
          Name
          <input
            className={styles.formInput}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.formLabel}>
          Email
          <input
            className={styles.formInput}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.formLabel}>
          Phone
          <input
            className={styles.formInput}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.formLabel}>
          Message
          <textarea
            className={styles.formTextarea}
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : `Donate ₹${amount || 0}`}
        </button>
      </form>
    </div>
  );
}
