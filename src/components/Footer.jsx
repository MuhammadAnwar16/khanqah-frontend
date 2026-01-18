import React from "react";
import { useLanguage } from "../context/LanguageContext";

// Full list of quotes
const quotes = [
  {
    ur: "اللَّهُمَّ اجعلني من الذاکرین – اے اللہ! مجھے اپنا ذکر کرنے والوں میں شامل فرما۔",
    en: "O Allah, make me among those who remember You often.",
  },
  {
    ur: "اللَّهُمَّ اغفر لي ولوالدي – اے اللہ! مجھے اور میرے والدین کو بخش دے۔",
    en: "O Allah, forgive me and my parents.",
  },
  {
    ur: "رَبِّ زِدْنِي عِلْمًا – اے میرے رب! میرے علم میں اضافہ فرما۔",
    en: "My Lord, increase me in knowledge.",
  },
  {
    ur: "يا حي يا قيوم برحمتك أستغيث – اے زندہ، قائم رہنے والے! میں تیری رحمت سے فریاد کرتا ہوں۔",
    en: "O Ever-Living, O Sustainer, I seek help through Your mercy.",
  },
  {
    ur: "أَفْضَلُ الذِّكْرِ: لا إِلَهَ إِلَّا الله – سب سے افضل ذکر: لا إِلَهَ إِلَّا الله",
    en: "The best remembrance is: La ilaha illallah. (Tirmidhi)",
  },
  {
    ur: "إنما الأعمال بالنيات – اعمال کا دارومدار نیتوں پر ہے۔",
    en: "Actions are judged by intentions. (Bukhari & Muslim)",
  },
  {
    ur: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ – سب سے بہتر انسان وہ ہے جو لوگوں کو نفع پہنچائے۔",
    en: "The best of people are those who benefit others. (Daraqutni)",
  },
  {
    ur: "لا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا – غم نہ کرو، بے شک اللہ ہمارے ساتھ ہے۔",
    en: "Do not grieve; indeed, Allah is with us. (Qur’an 9:40)",
  },
  {
    ur: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ – اور وہ تمہارے ساتھ ہے جہاں کہیں تم ہو۔",
    en: "And He is with you wherever you are. (Qur’an 57:4)",
  },
  {
    ur: "مَنْ صَمَتَ نَجَا – جو خاموش رہا وہ نجات پا گیا۔",
    en: "Whoever remains silent is saved. (Tirmidhi)",
  },
  {
    ur: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الجَنَّةَ – اے اللہ! میں تجھ سے جنت کا سوال کرتا ہوں۔",
    en: "O Allah, I ask You for Paradise. (Abu Dawood)",
  },
  {
    ur: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ – اے اللہ! مجھے جہنم کی آگ سے بچا۔",
    en: "O Allah, save me from the Fire. (Abu Dawood)",
  },
  {
    ur: "رَبَّنَا تَقَبَّلْ مِنَّا – اے ہمارے رب! ہماری طرف سے قبول فرما۔",
    en: "Our Lord, accept from us. (Qur’an 2:127)",
  },
  {
    ur: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ – اللہ میرے لیے کافی ہے، اس کے سوا کوئی معبود نہیں۔",
    en: "Allah is Sufficient for me; there is no deity but Him. (Qur’an 9:129)",
  },
  {
    ur: "اللَّهُمَّ ثَبِّتْنِي عَلَى دِينِكَ – اے اللہ! مجھے اپنے دین پر ثابت قدم رکھ۔",
    en: "O Allah, keep me firm on Your religion.",
  },
  {
    ur: "رَبِّ اشْرَحْ لِي صَدْرِي – اے میرے رب! میرے لیے میرا سینہ کھول دے۔",
    en: "My Lord, expand my chest for me. (Qur’an 20:25)",
  },
  {
    ur: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ – اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔",
    en: "O Allah, You are my Lord; there is no deity but You.",
  },
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const Footer = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    // px-0 for mobile view, px-4 for larger screens
    <div dir={language === "urdu" ? "rtl" : "ltr"} className="bg-[#faf9f6] pt-12 px-0 md:px-4">
      <footer className="bg-[#0C0C0C] text-white pt-20 pb-12 px-6 md:px-16 rounded-t-[80px] font-sans">
        
        {/* --- Hero Section (Title + Quote) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-24">
          
          {/* Typography */}
          <div className="flex-1">
            <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none ${language === 'urdu' ? 'font-heading' : ''}`}>
              {language === "urdu" ? "خانقاہ" : "KHANQAH"}
              <br />
              {/* Added text-white/70 class here */}
              <span className="text-white/70">
                {language === "urdu" ? "یٰسین زئی" : "YASEEN ZAI"}
              </span>
            </h1>
          </div>

          {/* Random Quote */}
          <div className="max-w-md text-lg md:text-xl leading-relaxed font-light text-gray-300">
             <span className="block opacity-60 text-sm mb-2">
                {language === "urdu" ? "آج کا پیغام" : "Quote of the Day"}
             </span>
             "{language === "urdu" ? randomQuote.ur : randomQuote.en}"
          </div>
        </div>

        {/* --- 4-Column Grid Section --- */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 ${language === "urdu" ? "text-right" : "text-left"}`}>
          
          {/* Column 1: Contact */}
          <div>
            <h4 className="text-lg font-normal mb-6 text-white border-b border-gray-800 pb-2 inline-block">
              {language === "urdu" ? "رابطہ" : "Contact"}
            </h4>
            <ul className="space-y-3 text-gray-400 font-light text-sm md:text-base">
              <li dir="ltr">+92 300 1234567</li>
              <li>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    WhatsApp: +92 300 1234567
                  </a>
              </li>
              <li>
                  {language === "urdu" ? "پوسٹ کوڈ: 29110" : "Postal Code: 29110"}
              </li>
              <li>
                {language === "urdu"
                  ? "خانقاہ یٰسین زئی، پنیالہ، ڈیرہ اسماعیل خان، خیبر پختونخوا"
                  : "Khanqah Yaseen Zai, Panyala, D.I. Khan, KPK"}
              </li>
            </ul>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-lg font-normal mb-6 text-white border-b border-gray-800 pb-2 inline-block">
              {language === "urdu" ? "لنکس" : "Links"}
            </h4>
            <ul className="space-y-3 text-gray-400 font-light text-sm md:text-base">
              <li><a href="#about" className="hover:text-white transition-colors">{language === "urdu" ? "تعارف" : "About"}</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">{language === "urdu" ? "تقریبات" : "Events"}</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">{language === "urdu" ? "گیلری" : "Gallery"}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{language === "urdu" ? "رابطہ" : "Contact"}</a></li>
            </ul>
          </div>

          {/* Column 3: Socials (Icons Removed) */}
          <div>
            <h4 className="text-lg font-normal mb-6 text-white border-b border-gray-800 pb-2 inline-block">
              {language === "urdu" ? "سوشل" : "Socials"}
            </h4>
            <ul className="space-y-3 text-gray-400 font-light text-sm md:text-base">
              <li>
                <a href="https://www.facebook.com/people/Khanqah-Yasin-Zai-Panyala-DIKhan-Offical/61579090561505/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Facebook
                </a>
              </li>
              <li>
                <a href="https://whatsapp.com/channel/0029VbBTJSUE50UaJtR4Y300" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    WhatsApp Channel
                </a>
              </li>
              <li>
                <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                   YouTube
                </a>
              </li>
              <li className="pt-4">
                 <button 
                    onClick={toggleLanguage} 
                    className="text-white border border-gray-600 rounded-full px-4 py-1 text-xs uppercase hover:bg-[#faf9f6] hover:text-black transition-colors"
                 >
                    {language === "urdu" ? "English" : "اردو"}
                 </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Donation */}
          <div>
            <h4 className="text-lg font-normal mb-6 text-white border-b border-gray-800 pb-2 inline-block">
              {language === "urdu" ? "عطیات" : "Donation"}
            </h4>
            <ul className="space-y-3 text-gray-400 font-light text-sm md:text-base">
              <li>
                <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">{language === "urdu" ? "بینک" : "Bank"}</span>
                Meezan Bank
              </li>
              <li>
                <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">{language === "urdu" ? "اکاؤنٹ کا نام" : "Account Name"}</span>
                Khanqah Yaseen Zai Welfare Trust
              </li>
              <li>
                 <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">{language === "urdu" ? "اکاؤنٹ نمبر" : "Account No"}</span>
                 <span dir="ltr">0123-4567890-1</span>
              </li>
              <li>
                 <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">IBAN</span>
                 <span dir="ltr" className="font-mono text-xs">PK67MEZN00012345678901</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-20 pt-6 border-t border-gray-900 text-gray-500 text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
           <span>© {new Date().getFullYear()} Khanqah Yaseen Zai</span>
           <span>{language === "urdu" ? "تمام حقوق محفوظ ہیں۔" : "All rights reserved."}</span>
        </div>

      </footer>
    </div>
  );
};

export default Footer;