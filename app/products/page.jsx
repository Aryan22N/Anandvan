"use client";

import React, { useState, useEffect, useCallback } from "react";

// ─── Product Data ──────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Shopping Bag",
    images: [
      "/products/shop_bag1.png",
      "/products/shop_bag.png",
    ],
    description:
      "Sturdy and stylish shopping bag hand-crafted by artisans at Anandwan. Spacious, eco-friendly, and built to last.",
    longDescription:
      "This shopping bag is lovingly handcrafted by skilled artisans at Anandwan using durable, eco-friendly materials. The bag features strong stitching, comfortable handles, and a roomy interior perfect for daily errands or groceries. Each bag is unique and carries the pride of the Anandwan community. A purposeful purchase — durable for you, meaningful for them.",
    price: 850,
    originalPrice: 1050,
    category: "Handicrafts",
    sku: "ANW-TC-001",
    inStock: true,
    highlights: ["Handcrafted by Anandwan artisans", "Eco-friendly & durable material", "Spacious interior", "Comfortable handles"],
    reviews: [
      { id: 1, name: "Priya Sharma", rating: 5, date: "12 Mar 2025", comment: "Absolutely love this bag! Sturdy, spacious, and great quality. Proud to support Anandwan with every purchase." },
      { id: 2, name: "Rahul Desai", rating: 4, date: "28 Feb 2025", comment: "Very well made and holds a lot. A perfect everyday bag that also supports a good cause." },
      { id: 3, name: "Meena Joshi", rating: 5, date: "5 Jan 2025", comment: "Gifted this to my sister and she uses it every day. Excellent craftsmanship from the Anandwan artisans." },
    ],
  },
  {
    id: 2,
    name: "Handmade Shawl",
    images: [
      "/products/shawl.png",
      "/products/shawl1.png",
    ],
    description:
      "Warm and elegant shawl hand-woven by skilled artisans at Anandwan. A perfect blend of comfort and craftsmanship.",
    longDescription:
      "Woven with extra-fine yarn on traditional handlooms, the Anandwan shawl is both lightweight and beautifully warm. The intricate border patterns are a signature style of weavers trained within the community. Soft against the skin and versatile for any season, it makes an ideal personal accessory or thoughtful gift. Each shawl takes approximately 3–4 hours of dedicated skilled work to complete.",
    price: 630,
    originalPrice: 900,
    category: "Textiles & Clothing",
    sku: "ANW-TC-002",
    inStock: true,
    highlights: ["Extra-fine yarn weave", "Unique handcrafted border patterns", "Warm yet lightweight", "Perfect as a gift"],
    reviews: [
      { id: 1, name: "Sunita Patel", rating: 5, date: "20 Mar 2025", comment: "Gifted to my mother-in-law and she was overjoyed. The weave is exquisite — clearly handmade with care." },
      { id: 2, name: "Vikram Nair", rating: 4, date: "14 Feb 2025", comment: "Good quality shawl, very warm. The colours are rich and the texture feels premium." },
    ],
  },
  {
    id: 3,
    name: "Folding Pouch",
    description:
      "Compact and foldable pouch handcrafted at Anandwan. Handy for travel, storage, or everyday carry.",
    longDescription:
      "This clever folding pouch is neatly stitched by artisans at Anandwan using sturdy fabric. When folded, it fits neatly in a pocket or purse; when open, it provides ample space for essentials. Ideal for toiletries, stationery, chargers, or small personal items. Available in earthy, hand-dyed colour tones. Durable, functional, and sustainably made.",
    price: 160,
    originalPrice: 220,
    category: "Handicrafts",
    sku: "ANW-HT-001",
    inStock: true,
    images: [
      "/products/pouch.png",
      "/products/pouch1.png",
    ],
    highlights: ["Foldable & compact design", "Sturdy hand-stitched fabric", "Multiple colour options", "Perfect for travel or daily use"],
    reviews: [
      { id: 1, name: "Anjali Mehta", rating: 5, date: "10 Apr 2025", comment: "Super handy little pouch! I use it for my chargers when travelling. Well-made and cute." },
      { id: 2, name: "Deepak Rao", rating: 4, date: "22 Mar 2025", comment: "Good quality and folds up nicely. Packaging was eco-friendly too — a nice touch." },
    ],
  },
  {
    id: 4,
    name: "Purse",
    description:
      "A charming handcrafted purse made by artisans at Anandwan. Compact, stylish, and built with purpose.",
    longDescription:
      "This handcrafted purse is carefully stitched by residents at Anandwan using quality fabric and traditional techniques. Compact enough for daily essentials — cards, cash, and keys — yet beautifully detailed in finish. The intricate stitching reflects the skill and patience of the artisans behind it. A meaningful accessory that directly supports the Anandwan community.",
    price: 125,
    originalPrice: 300,
    category: "Handicrafts",
    sku: "ANW-HT-002",
    inStock: false,
    images: [
      "/products/purse.png",
    ],
    highlights: ["Hand-stitched by Anandwan artisans", "Compact & stylish design", "Quality fabric & finish", "Supports community rehabilitation"],
    reviews: [
      { id: 1, name: "Kavita Kulkarni", rating: 5, date: "8 Feb 2025", comment: "Beautiful little purse! The stitching detail is incredible and it feels premium. Would love to buy more." },
    ],
  },
  {
    id: 5,
    name: "School Bag",
    description:
      "Durable and spacious school bag handcrafted at Anandwan. Designed to support students with comfort and quality.",
    longDescription:
      "Built with care by artisans at Anandwan, this school bag is crafted from sturdy, long-lasting material. It features multiple compartments for books, stationery, and a water bottle — everything a student needs. The padded straps ensure comfortable wear throughout the day. A practical, purposeful bag that also represents the self-reliance and skill of the Anandwan community.",
    price: 750,
    originalPrice: 900,
    category: "Handicrafts",
    sku: "ANW-HC-001",
    inStock: true,
    images: [
      "/products/school_bag.png",
    ],
    highlights: ["Multiple compartments", "Padded shoulder straps", "Durable & long-lasting material", "Handcrafted by Anandwan artisans"],
    reviews: [
      { id: 1, name: "Rohan Pawar", rating: 5, date: "3 Apr 2025", comment: "Bought for my son and he loves it! Very sturdy and fits all his school books. Great quality." },
      { id: 2, name: "Nisha Goswami", rating: 5, date: "18 Mar 2025", comment: "Excellent bag — bought two for both my kids. Both are well-made and arrived nicely packed." },
      { id: 3, name: "Arjun Singh", rating: 4, date: "2 Feb 2025", comment: "Very durable and well-crafted. Delivery took a little longer than expected but the product is worth it." },
    ],
  },
  {
    id: 6,
    name: "Clay Pot Set",
    description:
      "Set of hand-thrown clay pots crafted by pottery artisans at Anandwan. Ideal for plants, décor, or gifting.",
    longDescription:
      "Wheel-thrown and hand-finished by pottery artisans at Anandwan, each clay pot showcases the natural earthy beauty of the craft. The unglazed natural finish keeps the pots breathable — perfect for succulents and herbs. Each pot has a drainage hole and comes with a matching saucer. A grounding, beautiful addition to any home that carries the story of Anandwan artistry.",
    price: 480,
    originalPrice: 580,
    category: "Handicrafts",
    sku: "ANW-HC-002",
    inStock: true,
    images: [
      "/products/pot.png",
    ],
    highlights: ["Hand-thrown on pottery wheel", "Natural unglazed clay finish", "Drainage hole + saucer included", "Ideal for plants or home décor"],
    reviews: [
      { id: 1, name: "Smita Deshpande", rating: 4, date: "7 Apr 2025", comment: "Lovely earthy texture. My succulents look perfect in these pots. Good quality for the price." },
    ],
  },
  {
    id: 7,
    name: "Organic Rice Pack (5 kg)",
    description:
      "Pesticide-free rice harvested from Anandwan's own farms. Nutritious, natural, and sustainably grown.",
    longDescription:
      "Grown on the fertile lands of Anandwan using traditional, pesticide-free farming methods, this rice is rich in natural nutrients. The variety is a regional heirloom strain suited to Vidarbha's climate. Sun-dried and hand-cleaned before packing. Each 5 kg pack is sealed in a recyclable bag to preserve freshness.",
    price: 320,
    originalPrice: 380,
    category: "Agricultural Products",
    sku: "ANW-AG-001",
    inStock: true,
    images: [
      "/products/rice.png",

    ],
    highlights: ["Pesticide-free heirloom variety", "Grown on Anandwan farms", "Sun-dried & hand-cleaned", "Recyclable packaging"],
    reviews: [
      { id: 1, name: "Suresh Kulkarni", rating: 5, date: "5 Apr 2025", comment: "Excellent quality rice — cooks beautifully and tastes so much better than supermarket brands." },
      { id: 2, name: "Latha Rao", rating: 5, date: "20 Mar 2025", comment: "Bought a second pack already. Wholesome and clean — you can taste the difference with organic farming." },
    ],
  },
  {
    id: 8,
    name: "Wild Forest Honey (500 g)",
    images: [
      "/products/honey.png",

    ],
    description:
      "Pure raw honey collected from Anandwan's forest beehives. Unprocessed and rich in natural goodness.",
    longDescription:
      "Harvested from beehives kept within Anandwan's forest, this honey is completely raw and unfiltered. It retains all natural enzymes, pollen, and antioxidants. The colour and flavour vary slightly by season — a hallmark of genuine wild honey. Free from any additives, preservatives, or heat treatment. Best consumed at room temperature.",
    price: 280,
    originalPrice: 340,
    category: "Agricultural Products",
    sku: "ANW-AG-002",
    inStock: true,
    highlights: ["Raw & unfiltered", "Zero additives or heat treatment", "Natural enzymes preserved", "Forest multi-floral variety"],
    reviews: [
      { id: 1, name: "Geeta Bhosale", rating: 5, date: "1 Apr 2025", comment: "Thick, rich, and absolutely delicious. You can immediately taste the difference from store honey." },
      { id: 2, name: "Aditya Wagh", rating: 4, date: "12 Mar 2025", comment: "Very authentic wild honey. Slightly crystallised on arrival which is normal for raw honey — good sign!" },
    ],
  },
  {
    id: 9,
    name: "Anandwan – A Story of Hope",
    images: [
      "/products/book.png",

    ],
    description:
      "The inspiring story of Baba Amte and the founding of Anandwan. Essential reading for believers in human potential.",
    longDescription:
      "This book traces the remarkable journey of Murlidhar Devidas Amte — known as Baba Amte — from a privileged background to a life dedicated to the rehabilitation of leprosy patients and the environment. It documents the creation of Anandwan ('Forest of Joy') and its evolution into a self-reliant community of thousands. A deeply inspiring read for anyone interested in social change, Gandhian philosophy, or human resilience.",
    price: 195,
    originalPrice: 250,
    category: "Books",
    sku: "ANW-BK-001",
    inStock: true,
    highlights: ["English & Marathi editions available", "Softcover, 240 pages", "Foreword by Dr. Vikas Amte", "International award-winning narrative"],
    reviews: [
      { id: 1, name: "Prof. Vasant Kale", rating: 5, date: "25 Mar 2025", comment: "One of the most moving books I have ever read. Baba Amte's story changed how I see service and sacrifice." },
      { id: 2, name: "Ritu Sharma", rating: 5, date: "10 Feb 2025", comment: "Bought for my students. They were all deeply impacted. Highly recommend for young people especially." },
      { id: 3, name: "Mohan Joshi", rating: 4, date: "28 Jan 2025", comment: "Excellent narrative. Could have gone deeper into the later years, but overall a wonderful tribute." },
    ],
  },

];

const CATEGORIES = [
  "All",
  "Textiles & Clothing",
  "Home Textiles",
  "Handicrafts",
  "Agricultural Products",
  "Books",
];

const CATEGORY_BADGE = {
  "Textiles & Clothing": { bg: "#fff3e0", color: "#e65100" },
  "Home Textiles": { bg: "#e3f2fd", color: "#1565c0" },
  Handicrafts: { bg: "#fce4ec", color: "#c62828" },
  "Agricultural Products": { bg: "#e8f5e9", color: "#1a472a" },
  Books: { bg: "#ede7f6", color: "#4527a0" },
};

// ─── Star Rating Helper ────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ color: "#f39c12", fontSize: "1rem", letterSpacing: "1px" }}>
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? "★" : "☆"
      ).join("")}
    </span>
  );
}

function avgRating(reviews) {
  if (!reviews.length) return 0;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

// ─── Product Detail Modal ──────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const badge = CATEGORY_BADGE[product.category] || { bg: "#f5f5f5", color: "#333" };
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const avg = avgRating(product.reviews);
  const images = product.images || [];

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    /* Backdrop */
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(3px)",
      }}
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          maxWidth: "960px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          position: "relative",
          animation: "modalIn 0.25s ease",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "sticky", top: "16px", float: "right",
            marginRight: "16px", marginTop: "16px",
            background: "#f0f0f0", border: "none",
            borderRadius: "50%", width: "36px", height: "36px",
            fontSize: "1.1rem", cursor: "pointer", zIndex: 10,
            color: "#555", lineHeight: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#e74c3c"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.color = "#555"; }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* ── Two-column layout ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
        }}>
          {/* LEFT — Image panel */}
          <div style={{
            background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
            borderRadius: "18px 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "380px",
            padding: "30px 24px",
            gap: "14px",
          }}>
            {/* Main image */}
            <div style={{
              width: "100%",
              aspectRatio: "4/3",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              background: "#fff",
            }}>
              {images.length > 0 ? (
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.6)", border: "2px dashed #c8e6c9" }}>
                  <span style={{ fontSize: "3rem" }}>📦</span>
                  <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>Photo coming soon</span>
                </div>
              )}
            </div>

            {/* Thumbnail strip — only if 2+ images */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                {images.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: "60px", height: "60px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: i === activeImg ? "2px solid #1a472a" : "2px solid transparent",
                      cursor: "pointer",
                      boxShadow: i === activeImg ? "0 0 0 2px rgba(26,71,42,0.2)" : "none",
                      transition: "border 0.2s",
                    }}
                  >
                    <img src={src} alt={`View ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product info */}
          <div style={{ padding: "40px 36px 32px", overflowY: "auto" }}>
            {/* Category badge */}
            <span style={{
              display: "inline-block", padding: "3px 14px",
              borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600,
              marginBottom: "14px",
              background: badge.bg, color: badge.color,
            }}>
              {product.category}
            </span>

            {/* Title */}
            <h2 style={{ fontSize: "1.7rem", fontWeight: 700, color: "#2c3e50", marginBottom: "10px", lineHeight: 1.25 }}>
              {product.name}
            </h2>

            {/* Rating row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Stars rating={Math.round(avg)} />
              <span style={{ color: "#1a472a", fontWeight: 700 }}>{avg}</span>
              <span style={{ color: "#999", fontSize: "0.85rem" }}>({product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""})</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "18px" }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: "#1a472a" }}>₹{product.price}</span>
              <span style={{ fontSize: "1.1rem", color: "#aaa", textDecoration: "line-through" }}>₹{product.originalPrice}</span>
              <span style={{
                background: "#e8f5e9", color: "#1a472a",
                fontSize: "0.8rem", fontWeight: 700,
                padding: "2px 10px", borderRadius: "20px",
              }}>{discount}% off</span>
            </div>

            {/* Short description */}
            <p style={{ color: "#555", lineHeight: 1.75, marginBottom: "16px", fontSize: "0.95rem" }}>
              {product.description}
            </p>

            {/* Long description */}
            <p style={{ color: "#777", lineHeight: 1.75, marginBottom: "20px", fontSize: "0.88rem" }}>
              {product.longDescription}
            </p>

            {/* Highlights */}
            <div style={{ marginBottom: "22px" }}>
              <p style={{ fontWeight: 700, color: "#2c3e50", marginBottom: "8px", fontSize: "0.9rem" }}>Highlights</p>
              <ul style={{ paddingLeft: "18px", margin: 0, color: "#555", fontSize: "0.88rem", lineHeight: 2 }}>
                {product.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>

            {/* SKU + Stock */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "22px", fontSize: "0.83rem", color: "#999" }}>
              <span>SKU: <strong style={{ color: "#555" }}>{product.sku}</strong></span>
              <span>
                {product.inStock
                  ? <span style={{ color: "#1a472a", fontWeight: 600 }}>● In Stock</span>
                  : <span style={{ color: "#e74c3c", fontWeight: 600 }}>● Out of Stock</span>}
              </span>
            </div>

            {/* Quantity + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              {/* Qty stepper */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0",
                border: "1px solid #ddd", borderRadius: "25px", overflow: "hidden",
              }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#555" }}
                >−</button>
                <span style={{ padding: "8px 10px", fontWeight: 700, color: "#2c3e50", minWidth: "32px", textAlign: "center" }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#555" }}
                >+</button>
              </div>

              {/* Contact to order button */}
              <a
                href="/contact"
                style={{
                  flex: 1, display: "inline-block", textAlign: "center",
                  padding: "11px 24px",
                  background: product.inStock ? "#e74c3c" : "#ccc",
                  color: "#fff", textDecoration: "none",
                  fontWeight: 700, fontSize: "0.95rem",
                  borderRadius: "25px",
                  pointerEvents: product.inStock ? "auto" : "none",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={e => { if (product.inStock) e.currentTarget.style.background = "#c0392b"; }}
                onMouseLeave={e => { if (product.inStock) e.currentTarget.style.background = "#e74c3c"; }}
              >
                {product.inStock ? "Contact to Order" : "Out of Stock"}
              </a>
            </div>
          </div>
        </div>

        {/* ── Reviews Section ── */}
        <div style={{ padding: "32px 40px 40px", borderTop: "1px solid #f0f0f0" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a472a", marginBottom: "6px", paddingBottom: "14px", borderBottom: "3px solid #1a472a", display: "inline-block" }}>
            Customer Reviews
          </h3>

          {/* Aggregate */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0 28px" }}>
            <span style={{ fontSize: "3.5rem", fontWeight: 800, color: "#2c3e50", lineHeight: 1 }}>{avg}</span>
            <div>
              <Stars rating={Math.round(avg)} />
              <p style={{ color: "#888", fontSize: "0.85rem", marginTop: "4px" }}>Based on {product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Individual reviews */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {product.reviews.map(r => (
              <div key={r.id} style={{
                background: "#f8f9fa", borderRadius: "12px",
                padding: "20px 24px",
                borderLeft: "4px solid #1a472a",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                  <div>
                    <p style={{ fontWeight: 700, color: "#2c3e50", margin: 0, fontSize: "0.95rem" }}>{r.name}</p>
                    <Stars rating={r.rating} />
                  </div>
                  <span style={{ color: "#aaa", fontSize: "0.8rem" }}>{r.date}</span>
                </div>
                <p style={{ color: "#555", lineHeight: 1.7, margin: 0, fontSize: "0.9rem" }}>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal animation */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @media (max-width: 700px) {
          .modal-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onViewDetails }) {
  const badge = CATEGORY_BADGE[product.category] || { bg: "#f5f5f5", color: "#333" };
  const avg = avgRating(product.reviews);

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
      }}
    >
      {/* Image */}
      <div style={imagePlaceholderStyle}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <span style={{ opacity: 0.35, fontSize: "0.85rem", fontStyle: "italic" }}>📦 Photo coming soon</span>
        )}
      </div>

      <div style={cardBodyStyle}>
        {/* Badge */}
        <span style={{
          display: "inline-block", padding: "3px 12px",
          borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600,
          marginBottom: "10px", background: badge.bg, color: badge.color,
        }}>
          {product.category}
        </span>

        {/* Name */}
        <h3 style={cardTitleStyle}>{product.name}</h3>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
          <Stars rating={Math.round(avg)} />
          <span style={{ fontSize: "0.78rem", color: "#888" }}>({product.reviews.length})</span>
        </div>

        {/* Description */}
        <p style={cardDescStyle}>{product.description}</p>

        {/* Price + button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1a472a" }}>₹{product.price}</span>
            <span style={{ fontSize: "0.8rem", color: "#bbb", textDecoration: "line-through", marginLeft: "6px" }}>₹{product.originalPrice}</span>
          </div>
          <button
            style={btnStyle}
            onClick={() => onViewDetails(product)}
            onMouseEnter={e => { e.currentTarget.style.background = "#c0392b"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#e74c3c"; }}
            suppressHydrationWarning
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered =
    activeCategory === "All"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleClose = useCallback(() => setSelectedProduct(null), []);

  return (
    <div style={{ lineHeight: 1.6, color: "#333", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={heroStyle}>
        <div style={heroOverlayStyle} />
        <div style={heroContentStyle}>
          <p style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "12px" }}>
            Anandwan Marketplace
          </p>
          <h1 style={heroH1Style}>Handcrafted Products from Anandwan</h1>
          <p style={heroSubStyle}>
            Empowering lives through creativity and self-reliance.
            Every purchase directly supports the residents and artisans of Anandwan.
          </p>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <section style={filterBarStyle}>
        <div style={containerStyle}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 22px", borderRadius: "25px",
                    border: "2px solid",
                    borderColor: active ? "#1a472a" : "#ddd",
                    background: active ? "#1a472a" : "#fff",
                    color: active ? "#fff" : "#555",
                    fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
                    transition: "all 0.25s ease",
                    transform: active ? "translateY(-2px)" : "none",
                    boxShadow: active ? "0 4px 12px rgba(26,71,42,0.25)" : "none",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "#1a472a"; e.currentTarget.style.color = "#1a472a"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#555"; } }}
                  suppressHydrationWarning
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section style={{ padding: "60px 0", background: "#f8f9fa" }}>
        <div style={containerStyle}>
          <h2 style={sectionTitleStyle}>
            {activeCategory === "All" ? "All Products" : activeCategory}
            <span style={titleUnderlineStyle} />
          </h2>

          <p style={{ textAlign: "center", color: "#777", marginBottom: "40px", marginTop: "-20px", fontSize: "0.95rem" }}>
            Showing <strong style={{ color: "#333" }}>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
          </p>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
              <p style={{ fontSize: "3rem", marginBottom: "12px" }}>🛍️</p>
              <p style={{ fontSize: "1.1rem" }}>No products found.</p>
            </div>
          ) : (
            <div style={gridStyle}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={ctaStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>Want to support directly?</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Besides purchasing our handcrafted products, you can donate to fund
            rehabilitation, education, and community programs at Anandwan.
          </p>
          <a
            href="/donate/daan"
            style={{
              display: "inline-block", padding: "12px 35px",
              background: "#e74c3c", color: "#fff", textDecoration: "none",
              fontSize: "1.1rem", fontWeight: 600, borderRadius: "25px",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c0392b"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#e74c3c"; }}
          >
            Donate Now
          </a>
        </div>
      </section>

      {/* ── Modal ── */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleClose} />
      )}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const heroStyle = {
  position: "relative", minHeight: "420px",
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "linear-gradient(135deg, #1a472a 0%, #2d5a3f 100%)",
  paddingTop: "80px", overflow: "hidden",
};
const heroOverlayStyle = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" };
const heroContentStyle = { position: "relative", zIndex: 2, textAlign: "center", color: "#fff", maxWidth: "760px", padding: "40px 20px" };
const heroH1Style = { fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.25, textShadow: "2px 2px 4px rgba(0,0,0,0.4)" };
const heroSubStyle = { fontSize: "clamp(1rem,2vw,1.25rem)", opacity: 0.9, lineHeight: 1.7 };
const filterBarStyle = { background: "#fff", padding: "28px 20px", borderBottom: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 100 };
const containerStyle = { maxWidth: "1200px", margin: "0 auto", padding: "0 20px" };
const sectionTitleStyle = { fontSize: "2.2rem", textAlign: "center", color: "#1a472a", marginBottom: "3.5rem", paddingBottom: "20px", position: "relative" };
const titleUnderlineStyle = { display: "block", position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "80px", height: "3px", background: "#1a472a" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "28px" };
const cardStyle = { background: "#fff", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.3s ease, box-shadow 0.3s ease" };
const imagePlaceholderStyle = { width: "100%", height: "180px", background: "linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", userSelect: "none" };
const cardBodyStyle = { padding: "22px", display: "flex", flexDirection: "column", flex: 1 };
const cardTitleStyle = { fontSize: "1.1rem", fontWeight: 700, color: "#2c3e50", marginBottom: "6px", lineHeight: 1.3 };
const cardDescStyle = { fontSize: "0.88rem", color: "#666", lineHeight: 1.7, flex: 1, marginBottom: "16px" };
const btnStyle = { padding: "8px 20px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "25px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", transition: "background 0.3s ease" };
const ctaStyle = { padding: "80px 20px", background: "#2c3e50", color: "#fff", textAlign: "center" };
