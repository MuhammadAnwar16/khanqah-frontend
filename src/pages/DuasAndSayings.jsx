"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const allEntries = [
  {
    id: 1,
    date: "6 August 2025",
    type: "dua",
    arabic: "اللّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
    english: "O Allah, I ask You for well-being",
    urdu: "اے اللہ! میں تجھ سے عافیت کا سوال کرتا ہوں"
  },
  {
    id: 2,
    date: "6 August 2025",
    type: "quote",
    arabic: "",
    english: "Patience is a virtue that leads to light.",
    urdu: "صبر ایک ایسی خوبی ہے جو روشنی کی طرف لے جاتی ہے۔"
  },
  // Add more entries...
];

const AkwalDuaPage = () => {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState("all");

  const filtered = selectedType === "all"
    ? allEntries
    : allEntries.filter((entry) => entry.type === selectedType);

  return (
    <div className="bg-[#faf9f6] min-h-screen py-12 px-4 md:px-20">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-black">
          {language === "urdu" ? "اقوال / روزانہ کی دعا" : "Akwal / Daily Duas"}
        </h1>
        <p className="text-muted mt-2">
          {language === "urdu"
            ? "ہر دن کے لیے دعا اور روحانی اقتباسات"
            : "Daily spiritual duas and quotes for reflection"}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {["all", "dua", "quote"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedType === type
                ? "bg-[#0C0C0C] text-white border-[#0C0C0C]"
                : "bg-[#F5F5F5] text-black border-gray-300"
            }`}
          >
            {language === "urdu"
              ? type === "all"
                ? "سب"
                : type === "dua"
                ? "دعائیں"
                : "اقوال"
              : type === "all"
              ? "All"
              : type === "dua"
              ? "Duas"
              : "Quotes"}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#F5F5F5] rounded-xl shadow-sm hover:shadow-md transition p-6"
          >
            <div className="text-sm text-muted mb-2">{entry.date}</div>

            {entry.arabic && (
              <p className="text-center text-xl font-semibold text-black leading-relaxed mb-3">
                {entry.arabic}
              </p>
            )}

            <p className="text-center text-base text-muted leading-relaxed">
              {language === "urdu" ? entry.urdu : entry.english}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AkwalDuaPage;
