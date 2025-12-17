import { MemorialData } from "./types";

export const MEMORIAL_DATA: MemorialData = {
  name: "TODD JAMES SAN AGUSTIN",
  dob: "March 16, 1965",
  dod: "November 16, 2025",
  serviceDate: "December 19th, 2025",
  photoUrl: "/todd-marines-smaller.jpg",
  burial: {
    title: "Military Honors Burial",
    time: "11:00 AM Arrival • 11:30 AM Service",
    location: {
      name: "Miramar National Cemetery",
      address: "5795 Nobel Dr.",
      cityStateZip: "San Diego, CA 92122",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=5795+Nobel+Dr,+San+Diego,+CA+92122",
    },
    parkingInfo:
      "Arrive as early as 11:00 AM and no later than 11:15 AM. Turn right from Nobel onto Ave of Flags then take an immediate right after entering the cemetery gates. Park in lane #3, which is the far-right lane. Please pull to the front of the lane and have each vehicle parked directly behind one another in the lane. If you arrive earlier than 11:00 AM, we ask that you park outside of the turnout for the administration building or you may be led to a different service using lane #3. Wait in your car and an attendant will escort all cars to the service area. The service will start promptly at 11:30 AM and lasts only for 30 minutes.",
    parkingMapImages: ["/cemetery-map-lane-3.png"],
    notes: [],
  },
  service: {
    title: "Memorial Service",
    time: "12:45 PM",
    location: {
      name: "First Presbyterian Church",
      address: "1735 4th Ave.",
      cityStateZip: "San Diego, CA 92101",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=1735+4th+Ave,+San+Diego,+CA+92101",
    },
    parkingInfo:
      "In addition to metered street parking there are dedicated parking lots available on both the north east and south west corners of 3rd and Elm. Enter Lot A going north on 3rd Ave. Enter Lot B going west on Elm St. Both lots are a short walk to the chapel entrance on 4th Ave.",
    parkingMapImages: ["/first-pres-map.png"],
    notes: [
      "Reception with light fare to follow immediately after the service in the foyer.",
    ],
  },
  program: {
    acknowledgements: {
      text: "The family of Todd James San Agustin wishes to express our sincere appreciation for all the prayers, phone calls, visits, and many other acts of kindness shown during the time of this loss.",
      signature: "– The San Agustins",
    },
    inLieuOfFlowers: {
      title: "In Lieu of Flowers",
      description:
        "The family encourages supporting Todd's daughter Stephanie and his grandchildren Zion & Zuriel whom he loved and faithfully supported.",
      qrCodeUrl:
        "https://www.givesendgo.com/SupportSanAgustinFamily?utm_source=sharelink&utm_medium=copy_link&utm_campaign=SupportSanAgustinFamily",
      qrCodeLabel: "Scan to Support",
      buttonLabel: "Support the San Agustin Family",
    },
    parkingAndReception: {
      title: "Parking & Reception",
      text: "Parking is available in the lot at the corner of 3rd and Elm.\nReception with light fare immediately following the service.",
    },
    obituary: {
      title: "Todd James San Agustin",
      subtitle: "March 16, 1965 – November 16, 2025",
      paragraphs: [
        "Today, we gather to honor the life of Todd James San Agustin — a devoted son, brother, Marine, father, grandfather, and a man whose faith in Christ guided every chapter of his life.",
        "Born in Honolulu, Hawaii, to Priscilla and Daniel San Agustin, Todd was the youngest of three children, raised alongside his siblings Mark and Lois in a proud military household. After years of relocating as a military family, the San Agustins settled in San Diego, where Todd grew up in Chula Vista.",
        "As a young adult, Todd married Leah Venegas, and together they began their life and family. Their marriage brought forth two children, Jason and Stephanie, who remained among Todd's greatest blessings.",
        "Todd chose to serve his country. He joined the United States Marine Corps and served honorably through multiple deployments, including the Gulf War and Desert Storm. His leadership, discipline, and sense of duty reflected the values instilled in him from childhood.",
        "Todd pursued higher education and earned his Bachelor of Science from the University of Illinois, becoming the first in his family to attain an advanced degree. He went on to build a successful career in engineering and systems leadership, including serving as Vice President of Engineering and Systems at Sony. Throughout his life, Todd remained committed to supporting veterans, offering understanding and compassion shaped by his own experiences.",
        "Todd's faith was the constant thread of his life. His relationship with Christ grounded him, shaped his character, and provided enduring peace. His love for gospel, especially the music of Andraé Crouch, reflected the quiet devotion he carried throughout his life.",
        "Todd's life held both triumph and hardship. Like many who have lived greatly, he faced battles seen and unseen. But what Todd should be remembered for is the way he continued to love, to serve, and to rise. He gave generously — to his family, to his community, to his Marine brothers, and to all who crossed his path.",
        "Todd is survived by his children, Jason and Stephanie; his daughter-in-law, Mary San Agustin; and his grandchildren, Jasmine (10), twins Zion and Zuriel (10), and Titus (1). He is also survived by his brother and sister-in-law, Mark and Shari San Agustin; his sister and brother-in-law, Lois and Ed Garbett; his mother, Priscilla San Agustin; and many nieces, nephews, great-nieces, and great-nephews who adored him.",
        "Each of us carries a different memory of Todd — but all reflect the same truth. He was a fighter. A giver. A protector. A man who lived many lives, touched many hearts, and whose legacy endures in the people he loved.",
        "As we honor his life, we honor the faith that sustained him, guided him, and now brings him home. May we carry forward his courage, his kindness, his humor, and his unwavering love.",
        "May the memory of Todd James San Agustin be a lasting blessing, and may he rest in peace. Amen.",
      ],
    },
    orderOfService: {
      title: "Order of Service",
      items: [
        { title: "Musical Prelude", performedBy: "Janet Blair" },
        { title: "Opening Prayer", performedBy: "Pastor Rob Novak" },
        { title: "Scripture Reading", performedBy: "Family & Friends" },
        { title: "Words of Remembrance", performedBy: "Family & Friends" },
        { title: "Musical Selection", performedBy: "Shari San Agustin" },
        { title: "Eulogy", performedBy: "Jason San Agustin" },
        { title: "Video Tribute", performedBy: "--" },
        { title: "Homily", performedBy: "Pastor Rob Novak" },
        { title: "Musical Selection", performedBy: "Janet Blair" },
      ],
    },
    prayer: {
      title: "Prayer",
      paragraphs: [
        "Heavenly Father, we thank You for the life of Your servant, Todd. Thank You for the years he spent loving, serving, protecting, and leading. We ask that You surround his familywith Your comfort and peace.",
        "As we remember Todd today, may we also remember Your promises: that You are near to the brokenhearted, and that those who trust in You will dwell in Your house forever.",
        "Lord, receive Todd into Your eternal rest. May his legacy of faith, courage, and love continue to shine through the lives of all who knew him.",
      ],
      closing: "In Jesus' name we pray, Amen.",
    },
  },
};
