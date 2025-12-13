import React from "react";
import { MEMORIAL_DATA } from "../constants";
import { Printer, ArrowLeft, HeartHandshake } from "lucide-react";

interface PrintableProgramProps {
  onBack: () => void;
}

export const PrintableProgram: React.FC<PrintableProgramProps> = ({
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-200 p-8 flex flex-col items-center justify-center font-sans printable-container">
      {/* UI Controls - Hidden when printing */}
      <div className="print:hidden fixed top-0 left-0 right-0 bg-navy-900 text-white p-4 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="flex items-center text-stone-300 hover:text-white mr-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Website
          </button>
          <span className="text-sm font-medium opacity-80">
            Instructions: Click Print -{">"} Select "Save as PDF" -{">"} Layout:
            "Landscape" -{">"} Margins: "None"
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="bg-gold-500 text-navy-900 px-6 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors flex items-center"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print Program
        </button>
      </div>

      <style>
        {`
          @media print {
            @page {
              size: landscape;
              margin: 0;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background-color: white;
              margin: 0;
              padding: 0;
            }
            /* Reset root container styles */
            .printable-container {
              display: block !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
              width: 100% !important;
              height: auto !important;
              min-height: 0 !important;
            }
            .print-hidden {
              display: none !important;
            }
            .print-sheet {
              /* Exact US Letter Landscape dimensions */
              width: 11in !important;
              height: 8.5in !important;
              
              /* Ensure valid positioning */
              position: relative !important;
              
              /* Remove any spacing causing overflow */
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              
              /* Force page break */
              page-break-after: always;
              break-after: page;
              
              /* Clipping */
              overflow: hidden !important;
            }
            .print-sheet:last-child {
              page-break-after: auto !important;
              break-after: auto !important;
            }
          }
        `}
      </style>

      {/* 
        SHEET 1: OUTSIDE 
        Left Panel: Back Cover
        Right Panel: Front Cover
      */}
      <div className="print-sheet bg-white w-[11in] h-[8.5in] flex shadow-2xl overflow-hidden mb-8 relative print:mb-0">
        {/* === BACK COVER (Left Half) === */}
        <div className="w-[5.5in] h-full relative flex flex-col p-12 text-center justify-between border-r border-stone-100">
          {/* Decorative Spine on the right (fold) */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-navy-900"></div>

          <div className="mt-8">
            <h3 className="font-serif text-2xl text-navy-900 font-bold mb-6 uppercase tracking-widest">
              Acknowledgements
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed italic font-serif">
              The family of {MEMORIAL_DATA.name} wishes to express our sincere
              appreciation for all the prayers, phone calls, visits, and many
              other acts of kindness shown during the time of this loss.
            </p>
            <p className="text-navy-900 font-bold mt-4 font-serif">
              – The San Agustins
            </p>
          </div>

          {/* Donation / Support Section */}
          <div className="mb-8">
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-center">
              <h3 className="font-serif text-xl text-navy-900 font-bold mb-3">
                In Lieu of Flowers
              </h3>

              <p className="text-stone-700 text-sm mb-4 font-serif italic leading-relaxed">
                The family encourages supporting Todd’s daughter Stephanie & her
                twins Zion & Zuriel who he helped support.
              </p>

              <div className="flex justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-gold-500" />
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white p-2 border border-stone-200 shadow-sm rounded-sm">
                  {/* Placeholder QR Code - Generates a generic one */}
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://gofundme.com"
                    alt="Donation QR Code"
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-wider font-bold">
                  Scan to Support
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-widest mb-1">
              Parking & Reception
            </h4>
            <p className="text-[10px] text-stone-600 font-sans leading-relaxed">
              Parking is available in the lot at the corner of 3rd and Elm.
              <br />
              Reception with light fare immediately following the service.
            </p>
          </div>
        </div>

        {/* === FRONT COVER (Right Half) === */}
        <div className="w-[5.5in] h-full relative bg-navy-900 text-white flex flex-col items-center">
          {/* Photo Section */}
          <div className="w-full h-[60%] relative overflow-hidden">
            <img
              src={MEMORIAL_DATA.photoUrl}
              alt={MEMORIAL_DATA.name}
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
          </div>

          {/* Text Section */}
          <div className="w-full h-[40%] px-10 flex flex-col items-center justify-center relative">
            {/* Decorative Horizontal Line */}
            <div className="w-16 h-1 bg-gold-500 mb-6"></div>

            <p className="font-serif italic text-gold-500 text-lg mb-2">
              Honoring the Life of
            </p>

            <h1 className="font-serif text-3xl font-bold text-center leading-tight tracking-wide mb-3">
              {MEMORIAL_DATA.name}
            </h1>

            <div className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-stone-300 mb-6">
              <span>{MEMORIAL_DATA.dob}</span>
              <span className="text-gold-500">•</span>
              <span>{MEMORIAL_DATA.dod}</span>
            </div>

            <div className="text-center text-xs text-stone-400 font-medium uppercase tracking-wide">
              <p>{MEMORIAL_DATA.service.location.name}</p>
              <p>
                {MEMORIAL_DATA.serviceDate} at {MEMORIAL_DATA.service.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        SHEET 2: INSIDE 
        Left Panel: Obituary
        Right Panel: Order of Service & Prayer
      */}
      <div className="print-sheet bg-white w-[11in] h-[8.5in] flex shadow-2xl overflow-hidden relative print:mb-0">
        {/* === INSIDE LEFT (Obituary) === */}
        <div className="w-[5.5in] h-full p-8 flex flex-col relative bg-stone-50">
          {/* Decorative Bar Left */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-navy-900"></div>

          <div className="border-b-2 border-gold-500 pb-4 mb-4 pl-4">
            <h2 className="font-serif text-2xl text-navy-900 font-bold uppercase tracking-widest leading-none mb-1">
              Todd James
              <br />
              San Agustin
            </h2>
            <p className="font-serif text-stone-600 italic text-sm">
              March 16, 1965 – November 16, 2025
            </p>
          </div>

          <div className="flex-1 overflow-hidden text-[10px] text-stone-700 leading-relaxed text-justify pr-2 font-serif space-y-3">
            <p>
              Today, we gather to honor the life of Todd James San Agustin — a
              devoted son, brother, Marine, father, grandfather, and a man whose
              faith in Christ guided every chapter of his life.
            </p>
            <p>
              Born in Honolulu, Hawaii, to Priscilla and Daniel San Agustin,
              Todd was the youngest of three children, raised alongside his
              siblings Mark and Lois in a proud military household. After years
              of relocating as a military family, the San Agustins settled in
              San Diego, where Todd grew up in Chula Vista.
            </p>
            <p>
              As a young adult, Todd married Leah Venegas, and together they
              began their life and family. Their marriage brought forth two
              children, Jason and Stephanie, who remained among Todd’s greatest
              blessings.
            </p>
            <p>
              Todd chose to serve his country. He joined the United States
              Marine Corps and served honorably through multiple deployments,
              including the Gulf War and Desert Storm. His leadership,
              discipline, and sense of duty reflected the values instilled in
              him from childhood.
            </p>
            <p>
              Todd pursued higher education and earned his Bachelor of Science
              from the University of Illinois, becoming the first in his family
              to attain an advanced degree. He went on to build a successful
              career in engineering and systems leadership, including serving as
              Vice President of Engineering and Systems at Sony. Throughout his
              life, Todd remained committed to supporting veterans, offering
              understanding and compassion shaped by his own experiences.
            </p>
            <p>
              Todd’s faith was the constant thread of his life. His relationship
              with Christ grounded him, shaped his character, and provided
              enduring peace. His love for gospel, especially the music of
              Andraé Crouch, reflected the quiet devotion he carried throughout
              his life.
            </p>
            <p>
              Todd’s life held both triumph and hardship. Like many who have
              lived greatly, he faced battles seen and unseen. But what Todd
              should be remembered for is the way he continued to love, to
              serve, and to rise. He gave generously — to his family, to his
              community, to his Marine brothers, and to all who crossed his
              path.
            </p>
            <p>
              Todd is survived by his children, Jason and Stephanie; his
              daughter-in-law, Mary San Agustin; and his grandchildren, Jasmine
              (10), twins Zion and Zuriel (10), and Titus (1). He is also
              survived by his brother and sister-in-law, Mark and Shari San
              Agustin; his sister and brother-in-law, Lois and Ed Garbett; his
              mother, Priscilla San Agustin; and many nieces, nephews,
              great-nieces, and great-nephews who adored him.
            </p>
            <p>
              Each of us carries a different memory of Todd — but all reflect
              the same truth. He was a fighter. A giver. A protector. A man who
              lived many lives, touched many hearts, and whose legacy endures in
              the people he loved.
            </p>
            <p>
              As we honor his life, we honor the faith that sustained him,
              guided him, and now brings him home. May we carry forward his
              courage, his kindness, his humor, and his unwavering love.
            </p>
            <p className="italic font-bold text-navy-900 pt-1">
              May the memory of Todd James San Agustin be a lasting blessing,
              and may he rest in peace. Amen.
            </p>
          </div>
        </div>

        {/* === INSIDE RIGHT (Order of Service) === */}
        <div className="w-[5.5in] h-full p-10 flex flex-col relative">
          <h2 className="font-serif text-3xl text-navy-900 font-bold mb-6 text-center pb-4 border-b border-stone-200">
            Order of Service
          </h2>

          <div className="space-y-4 font-serif text-xs mb-4">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Musical Prelude
              </span>
              <span className="text-stone-500 italic">Shari San Agustin</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Opening Prayer
              </span>
              <span className="text-stone-500 italic">Pastor Rob Novak</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Scripture Reading
              </span>
              <span className="text-stone-500 italic">Zion San Agustin</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Eulogy
              </span>
              <span className="text-stone-500 italic">Jason San Agustin</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Video Tribute
              </span>
              <span className="text-stone-500 italic"></span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Homily
              </span>
              <span className="text-stone-500 italic">Pastor Rob Novak</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-navy-900 uppercase tracking-wider">
                Musical Selection
              </span>
              <span className="text-stone-500 italic">Amazing Grace</span>
            </div>
          </div>

          {/* Prayer */}
          <div className="mt-auto bg-stone-100 p-5 rounded-lg border border-stone-200">
            <h4 className="font-bold text-navy-900 uppercase tracking-widest text-xs mb-3 text-center border-b border-stone-200 pb-2">
              Prayer
            </h4>
            <p className="text-[10px] italic text-stone-600 leading-relaxed text-justify">
              Heavenly Father, We thank You for the life of Your servant, Todd.
              Thank You for the years he spent loving, serving, protecting, and
              leading. We ask that You surround his family with Your comfort and
              peace — the peace that surpasses all understanding.
            </p>
            <p className="text-[10px] italic text-stone-600 leading-relaxed text-justify mt-2">
              As we remember Todd today, may we also remember Your promises:
              that You are near to the brokenhearted, and that those who trust
              in You will dwell in Your house forever.
            </p>
            <p className="text-[10px] italic text-stone-600 leading-relaxed text-justify mt-2">
              Lord, receive Todd into Your eternal rest. May his legacy of
              faith, courage, and love continue to shine through the lives of
              all who knew him.
              <br />
              <span className="block text-right font-bold mt-1 not-italic">
                In Jesus’ name we pray, Amen.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
