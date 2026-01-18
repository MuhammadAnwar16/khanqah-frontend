import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { apiUrl } from "../config/api";
import SEO from "./SEO";
import { seoData, getBreadcrumbSchema } from "../utils/seoData";

// --- Components ---

const AccordionItem = ({
  title,
  urduTitle,
  children,
  language,
  defaultOpen = false,
}) => {
  const isUrdu = language === "urdu";
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        dir={isUrdu ? "rtl" : "ltr"}
        className={`w-full py-6 flex items-center justify-between group transition-colors duration-300
          ${isUrdu ? "text-right font-urdu" : "text-left font-sans"}
        `}
      >
        <span className={`text-xl md:text-3xl font-serif text-[#0C0C0C] group-hover:text-gray-600 transition-colors
            ${isUrdu ? 'font-heading leading-tight' : ''}
        `}>
          {isUrdu ? urduTitle : title}
        </span>
        
        {/* Icon Wrapper */}
        <span className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-400 group-hover:border-black group-hover:text-black transition-all duration-300
            ${isOpen ? "rotate-180 bg-black text-white border-black" : ""}
        `}>
            {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div 
              dir={isUrdu ? "rtl" : "ltr"}
              className={`pb-10 pt-2 text-gray-600 leading-relaxed text-lg font-light
                ${isUrdu ? "text-right font-urdu leading-[2.2]" : "text-left font-sans"}
            `}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SubHeading = ({ title, urduTitle, children, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isUrdu = language === "urdu";

  return (
    <div className={`py-4 border-t border-gray-100 first:border-none ${isUrdu ? "text-right" : "text-left"}`}>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        dir={isUrdu ? "rtl" : "ltr"}
        className="w-full flex items-center justify-between group py-2"
      >
        <h4 className={`text-lg font-medium text-black group-hover:text-gray-600 transition-colors 
            ${isUrdu ? 'font-urdu' : 'font-sans'}
        `}>
          {isUrdu ? urduTitle : title}
        </h4>
        <span className="text-gray-400 text-lg group-hover:text-black transition-colors">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div 
                dir={isUrdu ? "rtl" : "ltr"}
                className={`pt-2 pb-4 text-gray-500 text-base
                ${isUrdu ? "font-urdu leading-[2] text-right" : "leading-relaxed text-left"}
            `}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Section ---

const AboutSection = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const seo = seoData.about[isUrdu ? "ur" : "en"];
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isUrdu ? "سرورق" : "Home", url: "/" },
    { name: isUrdu ? "تعارف" : "About", url: "/about" },
  ]);

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch About sections from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchSections = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl("/api/about/sections/"));
        
        if (!response.ok) {
          throw new Error("Failed to fetch about sections");
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setSections(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching about sections:", err);
        if (isMounted) {
          setError(err.message);
          setSections([]); // Fallback to empty array
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSections();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div dir={language === "urdu" ? "rtl" : "ltr"}>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={breadcrumbSchema}
      />
      
      <section
        id="about"
        className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-[#0C0C0C] font-sans min-h-screen ${isUrdu ? "font-urdu" : ""}`}
      >
        {/* Watermark Background Logo */}
      <div className="fixed top-1/2 left-1/2 z-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
<img
  src="/images/khanqah logo.png"
  alt={isUrdu ? "خانقاہ یٰسین زئی کا لوگو" : "Khanqah Yaseen Zai Logo"}
  aria-hidden="true"
  className="w-full max-w-5xl opacity-10 grayscale filter transform-gpu will-change-transform translate-y-12"
/>
</div>

        {/* --- Header Section (Editorial Style) --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-16 border-b border-gray-200 pb-8">
            <span className={`block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 ${isUrdu ? 'text-right' : 'text-left'}`}>
                {isUrdu ? "تعارف" : "About Us"}
            </span>
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter text-[#0C0C0C] 
                ${isUrdu ? ' py-2 text-right' : 'text-left'}
            `}>
                {language === "urdu" ? "خانقاہ کا تعارف" : "About the Khanqah"}
            </h2>
            <p className={`mt-3 text-gray-500 max-w-2xl text-lg font-light 
                ${isUrdu ? 'leading-[2.2] text-right font-urdu ml-auto' : 'leading-relaxed text-left mr-auto'}
            `}>
                {language === "urdu" 
                    ? "خانقاہ یٰسین زئی کی تاریخ، مقاصد اور روحانی خدمات کا تفصیلی جائزہ۔"
                    : "A detailed overview of the history, objectives, and spiritual services of Khanqah Yaseen Zai."}
            </p>
        </div>

        {/* --- Content Area --- */}
        <div className="relative z-10 max-w-5xl mx-auto">
          
          {loading && (
            <div className="flex justify-center items-center h-64 opacity-50">
              <p className="text-xs uppercase tracking-widest animate-pulse">
                {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col justify-center items-center h-64 text-red-500 opacity-80">
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-2 text-gray-500">
                {isUrdu ? "براہ کرم دوبارہ کوشش کریں۔" : "Please try again."}
              </p>
            </div>
          )}

          {!loading && !error && sections.length === 0 && (
            <div className="flex flex-col justify-center items-center h-64 text-gray-400">
              <p className="text-sm">
                {isUrdu ? "کوئی مواد دستیاب نہیں ہے۔" : "No content available."}
              </p>
            </div>
          )}

          {!loading && !error && sections.map((section) => (
            <AccordionItem
              key={section.id}
              title={section.title_en}
              urduTitle={section.title_ur}
              language={language}
              defaultOpen={section.default_open}
            >
              {section.subsections && section.subsections.length > 0 ? (
                <div className={`pl-0 ${isUrdu ? 'pr-0' : 'md:pl-4'}`}>
                  {section.subsections.map((subsection) => (
                    <SubHeading
                      key={subsection.id}
                      title={subsection.title_en}
                      urduTitle={subsection.title_ur}
                      language={language}
                    >
                      <div className={subsection.content_en.includes('\n') || subsection.content_ur.includes('\n') ? 'whitespace-pre-line' : ''}>
                        {isUrdu ? subsection.content_ur : subsection.content_en}
                      </div>
                    </SubHeading>
                  ))}
                </div>
              ) : (
                <div className={section.content_en?.includes('\n') || section.content_ur?.includes('\n') ? 'whitespace-pre-line' : ''}>
                  {isUrdu ? section.content_ur : section.content_en}
                </div>
              )}
            </AccordionItem>
          ))}

        </div>
      </section>
    </div>
  );
};

// --- Description Content (Unchanged Content, Wrapped for styling) ---
const AboutDescription = () => {
  const { language } = useLanguage();
  return (
    <>
      {language === "urdu" ? (
        <div className="space-y-6">
            <p>
              یٰسین زئی سادات کا مشہور قبیلہ ہے جس کا بنیادی تعلق ضلع{" "}
              <strong>پشین</strong> صوبہ <strong>بلوچستان</strong> سے ہے۔{" "}
              <strong>سید محمد یاسین</strong> ولد <strong>سید محمد شادی</strong>{" "}
              کے والد <strong>سید درجمال</strong> تھے، جو بخارہ سے اپنے دوسرے
              بھائیوں <strong>سید درجلال</strong>، <strong>سید دربلال</strong>{" "}
              وغیرہ سمیت ہجرت کر کے موجودہ پاکستان منتقل ہو گئے۔ ان کے بھائیوں
              میں <strong>درجلال بخاری</strong>، جو کہ{" "}
              <strong>جلال الدین سرخ پوش</strong> سے مشہور ہوئے، آج{" "}
              <strong>خریف ضلع بہاولپور</strong> منتقل ہو گئے، جہاں سے یہ خاندان
              سارے پاکستان میں پھیل گیا۔ <strong>سید محمد درجمال</strong> کی
              اولاد <strong>شادی زئی</strong>، <strong>یٰسین زئی</strong>،{" "}
              <strong>حیدر زئی</strong>، <strong>ابراہیم زئی</strong> اور ان کی
              زیلی شاخوں پر مشتمل ہے جو کہ صوبہ بلوچستان کے طول و عرض میں آباد
              ہے۔ <strong>سید محمد یاسین</strong> کی قبر اپنے والد کی قبر کے
              ساتھ <strong>زیارت</strong> نامی گاؤں میں ہے جو کہ{" "}
              <strong>زرند</strong> نامی گاؤں کے قریب واقع ہے۔
            </p>

            <p>
              <strong>سید محمد یاسین</strong> کی اولاد میں ایک صاحب، جن کا نام{" "}
              <strong>سید شمس الدین</strong> تھا، اپنے گاؤں سے نکل مکانی کر کے
              خانہ بدوشی کی زندگی گزارنے لگے۔ چلتے چلتے وہ{" "}
              <strong>افغانستان</strong> منتقل ہو گئے، جہاں سے ان کا خاندان سارے
              افغانستان میں پھیل گیا۔ ماضی بعید سے یہ لوگ سردیوں کے موسم میں
              افغانستان سے نکل کر، پرانے زمانے کے دستور کے مطابق،{" "}
              <strong>رهلة الشتاء والصيف</strong> اختیار کرتے ہوئے{" "}
              <strong>گپی</strong> کے اور <strong>پنجاب</strong> کے گرم علاقوں
              کی طرف کوچ کرتے۔ اسی وجہ سے ان کی قبریں <strong>صوبہ قدمی</strong>
              ، <strong>کلات</strong>، <strong>کندہار</strong>،{" "}
              <strong>پشین</strong>، <strong>لورالائی</strong>،{" "}
              <strong>ایجوب</strong>، <strong>جنوبی وزیرستان</strong>،{" "}
              <strong>درہ گومل</strong>، <strong>ضلع میانوالی</strong>،{" "}
              <strong>پنیالہ</strong>، <strong>ضلع ڈیرہ اسماعیل خان</strong> کے
              قبرستانوں میں پھیلی ہوئی ہیں۔
            </p>

            <p>
              <strong>سید محمد علیم</strong> دہلی تشریف لے گئے اور{" "}
              <strong>شاہ عبد الرحیم دہلوی</strong> سے علوم و معرفت حاصل کی۔ ان
              کے صاحبزادے <strong>سید خواجہ محمد</strong> نے یہ علوم{" "}
              <strong> سید مہتر موسیٰ</strong> منتقل کیے جہاں وہ اپنے قبیلے کے
              ماوا بنے۔ <strong>سید مہتر موسیٰ</strong> پہلے{" "}
              <strong>خواجہ احمد سعید دہلوی</strong> کے مرید ہوئے، پھر ان کے بعد{" "}
              <strong>خواجہ دوست محمد</strong> کے حلقہ ارادت میں شامل ہو گئے۔
            </p>

            <p>
              <strong>سید مہتر موسیٰ</strong> (المعروف <strong>فقیر ابا</strong>
              ) کا وصال سن 1871ء میں <strong>غزنی</strong> میں ہوا۔ ان کا مزار
              وہیں ہے۔ ان کے تین فرزندوں میں <strong>سید احمد گل</strong> نے ان
              کی گدی سنبھالی، <strong>سید عبد الکریم</strong> قوم کے سردار بنے
              اور <strong>والی افغانستان</strong> سے{" "}
              <strong>تحصیل باباونی</strong> میں زمین حاصل کی۔{" "}
              <strong>سید محمد حسن</strong> ان کے بیٹے تھے جو جوانی میں فوت
              ہوئے، اور ان کے بیٹے <strong>سید محمد</strong> کی نسل اب پاکستان و
              بیرون ملک خدمت دین کر رہی ہے۔
            </p>

            <p>
              تیسرے فرزند <strong>سید فیض اللہ</strong> اپنے بھائی{" "}
              <strong>سید احمد گل</strong> کے مجاز تھے۔ ان کے صاحبزادے{" "}
              <strong>سید میر حیدر شاہ</strong> پشتو کے ممتاز شاعر و مورخ تھے۔
              ان کی نسل آج بھی پاکستان اور افغانستان میں پھیلی ہوئی ہے۔
            </p>

            <p>
              <strong>سید احمد گل</strong> سردیوں میں{" "}
              <strong>خانقاہ یٰسین زئی</strong> آتے تھے، اور 1898ء کے بعد مستقل
              طور پر وہاں قیام پذیر ہو گئے۔ وہ <strong>تجوید</strong> اور{" "}
              <strong>علومِ دینیہ</strong> کے ماہر تھے۔ ان کے نو فرزند تھے، جن
              میں سے چار <strong>لاہور</strong> چلے گئے اور پانچ یہیں مقیم ہو
              گئے۔
            </p>

            <p>
              بعد ازاں، ان کے بڑے بیٹے <strong>صاحبزادہ عبد الحلیم</strong>{" "}
              سجادہ نشین بنے۔ ان کے چار بیٹے تھے: <strong>سید احمد شاہ</strong>{" "}
              (جو بعد میں سجادہ نشین بنے)، <strong>صاحبزادہ محمود شاہ</strong>{" "}
              (فارغ التحصیل رامپور انڈیا و دیوبند، خوش فکر فارسی شاعر)،{" "}
              <strong>سید محمد شاہ</strong>، اور{" "}
              <strong>سید عبد الحمید شاہ</strong>۔
            </p>

            <p>
              آج ان کے فرزند <strong>ڈاکٹر رشید احمد</strong>، جو{" "}
              <strong>دارالعلوم حقانیہ</strong> سے فارغ التحصیل ہیں،{" "}
              <strong>خانقاہ</strong> کی خدمت سر انجام دے رہے ہیں۔{" "}
              <strong>یٰسین زئی سادات</strong> کی مکمل تفصیل{" "}
              <strong>کتاب "شجرہ سادات یٰسین زئی"</strong> میں محفوظ ہے۔
            </p>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            <strong>Yaseen Zai Sadaat</strong> is a prominent tribe originally
            from the district of <strong>Pishin</strong> in the province of{" "}
            <strong>Balochistan</strong>. <strong>Syed Muhammad Yaseen</strong>,
            son of <strong>Syed Muhammad Shadi</strong>, was the grandson of{" "}
            <strong>Syed Darjamal</strong>, who migrated from Bukhara along with
            his brothers <strong>Syed Darjalal</strong>,{" "}
            <strong>Syed Darbalal</strong>, and others to what is now Pakistan.
            Among his brothers, <strong>Darjalal Bukhari</strong>, also known as{" "}
            <strong>Jalaluddin Surkh Posh</strong>, migrated to{" "}
            <strong>Khareef in Bahawalpur</strong>, from where the family spread
            across Pakistan. <strong>Syed Darjamal’s</strong> descendants
            include <strong>Shadi Zai</strong>, <strong>Yaseen Zai</strong>,{" "}
            <strong>Haider Zai</strong>, <strong>Ibrahim Zai</strong>, and other
            sub-branches now settled across Balochistan.{" "}
            <strong>Syed Muhammad Yaseen</strong> is buried beside his father in
            the village of <strong>Ziarat</strong>, near <strong>Zarand</strong>.
          </p>

          <p>
            Among <strong>Syed Muhammad Yaseen’s</strong> descendants was a
            figure named <strong>Syed Shamsuddin</strong>, who migrated from his
            village and adopted a nomadic lifestyle. He eventually settled in{" "}
            <strong>Afghanistan</strong>, from where his family spread
            throughout the region. Historically, the family followed the ancient
            tradition of <strong>“Rihlat al-Shita’ wa al-Saif”</strong> —
            migrating seasonally during winter from Afghanistan to warmer
            regions like <strong>Guppi</strong> and <strong>Punjab</strong>. As
            a result, their graves are found in various graveyards across{" "}
            <strong>Qadmi Province</strong>, <strong>Kalat</strong>,{" "}
            <strong>Kandahar</strong>, <strong>Pishin</strong>,{" "}
            <strong>Loralai</strong>, <strong>Ejub</strong>,{" "}
            <strong>South Waziristan</strong>, <strong>Darra Gomel</strong>,{" "}
            <strong>Mianwali</strong>, <strong>Pinyala</strong>, and{" "}
            <strong>Dera Ismail Khan</strong>.
          </p>

          <p>
            Among his descendants was the noble{" "}
            <strong>Syed Muhammad Aleem</strong>, who traveled to Delhi and
            studied spiritual knowledge under{" "}
            <strong>Shah Abdul Rahim Dehlvi</strong>. His son,{" "}
            <strong>Syed Khwaja Muhammad</strong>, transferred this knowledge to
            the settlement of <strong>Syed Mehtar Musa</strong>, who became a
            central spiritual figure of the tribe. <strong>Mehtar Musa</strong>{" "}
            first became a disciple of{" "}
            <strong>Khawaja Ahmad Saeed Dehlvi</strong>, and later joined the
            spiritual lineage of <strong>Khawaja Dost Muhammad</strong>.
          </p>

          <p>
            <strong>Syed Mehtar Musa</strong>, also known as{" "}
            <strong>Faqir Aba</strong>, passed away in the year 1871 in{" "}
            <strong>Ghazni</strong>, where his shrine still stands. Of his three
            sons, <strong>Syed Ahmad Gul</strong> inherited his spiritual seat,
            while <strong>Syed Abdul Kareem</strong> became the chief of the
            tribe. He secured a tract of land in <strong>Tehsil Babaoni</strong>{" "}
            near <strong>Kandahar</strong> from the ruler of Afghanistan,{" "}
            <strong>Amir Habibullah Khan</strong>. His son{" "}
            <strong>Syed Muhammad Hasan</strong> died young, leaving behind a
            son, <strong>Syed Muhammad</strong>, whose descendants continue to
            serve Islam both in Pakistan and abroad.
          </p>

          <p>
            The third son, <strong>Syed Faizullah</strong>, was spiritually
            authorized by his brother <strong>Syed Ahmad Gul</strong>. His son,{" "}
            <strong>Syed Mir Haider Shah</strong>, was a prominent Pashto poet
            and historian. His descendants are also spread across Afghanistan
            and Pakistan.
          </p>

          <p>
            <strong>Syed Ahmad Gul</strong> would travel during winters to
            reside at the current location of{" "}
            <strong>Khanqah Yaseen Zai</strong>. After the year 1898, he
            permanently settled there with the hospitality of the Marwat tribe.
            He was an expert in <strong>Qur’anic recitation (Tajweed)</strong>{" "}
            and <strong>Islamic sciences</strong>. He had nine sons — four of
            whom moved to <strong>Lahore</strong>, while the remaining five
            stayed and served at the Khanqah.
          </p>

          <p>
            After him, his eldest son <strong>Sahibzada Abdul Haleem</strong>{" "}
            became the Sajjada Nasheen (spiritual successor). He had four sons:{" "}
            <strong>Syed Ahmad Shah</strong> (who later became the Sajjada
            Nasheen), <strong>Sahibzada Mahmood Shah</strong> (a graduate of
            Rampur, India and Deoband, and a thoughtful Persian poet),{" "}
            <strong>Syed Muhammad Shah</strong>, and{" "}
            <strong>Syed Abdul Hameed Shah</strong>.
          </p>

          <p>
            Today, his son <strong>Dr. Rasheed Ahmad</strong>, a graduate of{" "}
            <strong>Darul Uloom Haqqania</strong>, continues to serve the{" "}
            <strong>Khanqah</strong>. The detailed history of the{" "}
            <strong>Yaseen Zai Sadaat</strong> is preserved in the book titled{" "}
            <strong>“Shajra-e-Sadaat Yaseen Zai”</strong>.
          </p>
        </div>
      )}
    </>
  );
};

export default AboutSection;