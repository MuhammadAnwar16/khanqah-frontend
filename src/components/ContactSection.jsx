import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  EnvelopeIcon,
  ArrowRightIcon, // Added for the button
  ArrowLeftIcon   // Added for the button
} from "@heroicons/react/24/outline";
import { sendContactMessage } from "../services/contact";
import SEO from "./SEO";
import { seoData, getBreadcrumbSchema } from "../utils/seoData";

const ContactSection = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const seo = seoData.contact[isUrdu ? "ur" : "en"];
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isUrdu ? "سرورق" : "Home", url: "/" },
    { name: isUrdu ? "رابطہ" : "Contact", url: "/contact" },
  ]);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-hide after 4 seconds
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
    
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone_number = e.target.phone_number.value.trim();
    const subject = e.target.subject.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone_number || !subject || !message) {
      setStatus({
        type: "error",
        message: isUrdu ? "براہ کرم تمام فیلڈز پُر کریں۔" : "Please fill out all fields.",
      });
      setIsSubmitting(false);
      return;
    }

    const formData = { name, email, phone_number, subject, message };

    try {
      const data = await sendContactMessage(formData);

      if (data.status === "success") {
        setStatus({
          type: "success",
          message: data.message || (isUrdu ? "پیغام بھیج دیا گیا۔" : "Message sent successfully."),
        });
        e.target.reset();
      } else {
        const errorMsg = data.errors 
          ? Object.values(data.errors).flat().join(", ")
          : (data.message || (isUrdu ? "ناکامی۔" : "Failed."));
        setStatus({ type: "error", message: errorMsg });
      }
    } catch (error) {
      // Handle specific error cases
      if (error.message === "TOO_MANY_REQUESTS") {
        setStatus({
          type: "error",
          message: isUrdu ? "بہت زیادہ درخواستیں۔" : "Too many requests.",
        });
      } else {
        setStatus({
          type: "error",
          message: error.message || (isUrdu ? "نیٹ ورک خرابی۔" : "Network error."),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={breadcrumbSchema}
      />
      
    <section
      id="contact"
      dir={isUrdu ? "rtl" : "ltr"}
        className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-black font-sans overflow-hidden ${isUrdu ? "font-urdu" : ""}`}
    >
        {/* --- Header Section --- */}
        <div className="max-w-7xl mx-auto mb-20">
            <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                {isUrdu ? "رابطہ" : "Get in Touch"}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0C0C0C]">
                {isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}
            </h2>
      </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- Left Column: Info & Map (Sticky) --- */}
          <div className="h-fit lg:sticky lg:top-24">
            
            {/* Contact Details */}
            <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <PhoneIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">{isUrdu ? "فون" : "Phone"}</span>
                        <span dir="ltr" className="text-lg font-medium">+92 300 1234567</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">{isUrdu ? "واٹس ایپ" : "WhatsApp"}</span>
                        <a dir="ltr" href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="text-lg font-medium hover:underline">
                    +92 300 1234567
                  </a>
                    </div>
                </div>

                <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <MapPinIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">{isUrdu ? "پتہ" : "Location"}</span>
                        <p className="text-lg font-medium leading-snug">
                            {isUrdu ? "خانقاہ یٰسین زئی، پنیالہ، ڈیرہ اسماعیل خان" : "Khanqah Yaseen Zai, Panyala, D.I. Khan"}
                </p>
                    </div>
              </div>
            </div>

            {/* Aesthetic Grayscale Map */}
            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-500 ease-out">
              <iframe
                title="Khanqah Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.0539300182913!2d70.88149371075285!3d32.25663117377645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39264b34e519578f%3A0xe839d1ce64b684b9!2sKhanqah%20Yaseen%20Zai%20(Topi%20Sahiban)!5e0!3m2!1sen!2s!4v1750505265181!5m2!1sen!2s"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-none"
              ></iframe>
            </div>
          </div>

          {/* --- Right Column: Minimal Form --- */}
          <div>
            <form method="POST" onSubmit={handleSubmit} className="space-y-12">
              
              {/* Minimal Input Fields (Underline Style) */}
              {[
                { id: "name", label: isUrdu ? "آپ کا نام" : "Your Name", type: "text" },
                { id: "email", label: isUrdu ? "ای میل ایڈریس" : "Email Address", type: "email" },
                { id: "phone_number", label: isUrdu ? "فون نمبر" : "Phone Number", type: "text" },
                { id: "subject", label: isUrdu ? "موضوع" : "Subject", type: "text" },
              ].map(({ id, label, type }) => (
                <div key={id} className="relative group">
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                  <label
                    htmlFor={id}
                    className={`absolute left-0 top-3 text-gray-400 text-lg transition-all duration-300 pointer-events-none
                      peer-focus:-top-6 peer-focus:text-xs peer-focus:text-black
                      peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-black
                      ${isUrdu ? "right-0 left-auto" : ""}`}
                  >
                    {label}
                  </label>
                </div>
              ))}

              {/* Message Field */}
              <div className="relative group">
                <textarea
                  id="id_message"
                  name="message"
                  rows="4"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                ></textarea>
                <label
                  htmlFor="id_message"
                  className={`absolute left-0 top-3 text-gray-400 text-lg transition-all duration-300 pointer-events-none
                    peer-focus:-top-6 peer-focus:text-xs peer-focus:text-black
                    peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-black
                    ${isUrdu ? "right-0 left-auto" : ""}`}
                >
                  {isUrdu ? "آپ کا پیغام" : "Your Message"}
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
              <button
                type="submit"
                  disabled={isSubmitting}
                  className={`group flex items-center gap-4 text-xl font-bold tracking-tight transition-opacity ${
                    isSubmitting 
                      ? "text-gray-400 cursor-not-allowed opacity-50" 
                      : "text-black hover:opacity-70"
                  }`}
                >
                  <span>{isSubmitting ? (isUrdu ? "بھیج رہے ہیں..." : "Sending...") : (isUrdu ? "پیغام بھیجیں" : "Send Message")}</span>
                  <div className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${
                    isSubmitting ? "" : "group-hover:border-black"
                  }`}>
                     {isUrdu ? (
                        <ArrowLeftIcon className="w-5 h-5" />
                     ) : (
                        <ArrowRightIcon className="w-5 h-5" />
                     )}
                  </div>
              </button>
              </div>

              {/* Status Message */}
              {status.message && (
                <div className={`mt-6 p-4 text-sm font-medium ${
                    status.type === "success" ? "text-green-600" : "text-red-600"
                }`}>
                  {status.message}
                </div>
              )}

            </form>
          </div>

      </div>
    </section>
    </>
  );
};

export default ContactSection;
