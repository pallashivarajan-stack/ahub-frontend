import { resolveLegacyAsset } from "@/lib/assets";

export type RedesignedEventSpeaker = {
  name: string;
  role: string;
  avatar: string;
};

export type RedesignedEvent = {
  id: string;
  title: string;
  image: string;
  images?: string[];
  logo?: string;
  date: {
    month: string;
    day: string;
    year: string;
  };
  type: string;
  category: "workshops" | "webinars" | "hackathons" | "networking" | "pitch sessions" | "demo days" | "all";
  location: string;
  time: string;
  description: string;
  status: "Upcoming" | "Live" | "Completed";
  speakers?: RedesignedEventSpeaker[];
  detailedDescription?: string;
  instagramLink?: string;
  partners?: { name: string; logo: string }[];
};

const AHUB_LOGO = resolveLegacyAsset("/src/assets/AHub-Logo-1.png");
const TIE_LOGO = resolveLegacyAsset("/src/assets/partners/tie.jpg");
const ALCOVE_LOGO = resolveLegacyAsset("/src/assets/partners/alcove.jpg");
const AMTZ_LOGO = resolveLegacyAsset("/src/assets/partners/atpi.jpg");

export const EVENTS_DATA: RedesignedEvent[] = [
  {
    id: "agri-entrepreneur-1",
    title: "Agriculture Entrepreneur Seminar",
    image: resolveLegacyAsset("/src/assets/startups_events/Greetings from AAA!Were thrilled to announce that our recent seminar on Agriculture Entreprene.webp"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/Greetings from AAA!Were thrilled to announce that our recent seminar on Agriculture Entreprene.webp"),
      resolveLegacyAsset("/src/assets/startups_events/Greetings from AAA!Were thrilled to announce that our recent seminar on Agriculture Entreprene (1).webp"),
      resolveLegacyAsset("/src/assets/startups_events/Greetings from AAA!Were thrilled to announce that our recent seminar on Agriculture Entreprene (2).webp")
    ],
    date: { month: "AUG", day: "02", year: "2024" },
    type: "Seminar",
    category: "workshops",
    location: "GMR Smart Seminar Hall",
    time: "All Day",
    description: "An incredibly interactive session on agriculture start-ups and natural farming featuring Dr. E. Sankara Rao.",
    detailedDescription: "Held on 2nd August at the GMR Smart Seminar Hall, the event saw 80+ participants engaging in an incredibly interactive session. Our esteemed speakers, Shri A. Mohanarao and Shri B. Vijayaprasad, provided invaluable insights into agriculture start-ups and natural farming, highlighting current challenges and innovative techniques.\n\nThe seminar featured real-life farmers sharing their experiences, and our very own AAA Chairman, Dr. E. Sankara Rao, spoke passionately about his personal farming journey. The discussions were vibrant, addressing various farming techniques and important agricultural issues.\n\nThis event not only enriched our knowledge but also offered excellent networking opportunities for farmers, researchers, and agriculture enthusiasts. Truly an invaluable and insightful session!",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/C-M5l0SPaX-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }]
  },
  {
    id: "teck-league-2023",
    title: "Andhra Teck League 2023",
    image: resolveLegacyAsset("/src/assets/startups_events/Teck Team Solutions and āhub organised Andhra Teck League 2023, held at āhub, Andhra University.webp"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/Teck Team Solutions and āhub organised Andhra Teck League 2023, held at āhub, Andhra University (1).webp"),
      resolveLegacyAsset("/src/assets/startups_events/Teck Team Solutions and āhub organised Andhra Teck League 2023, held at āhub, Andhra University (2).webp"),
      resolveLegacyAsset("/src/assets/startups_events/Teck Team Solutions and āhub organised Andhra Teck League 2023, held at āhub, Andhra University.webp")
    ],
    date: { month: "OCT", day: "02", year: "2023" },
    type: "Hackathon",
    category: "hackathons",
    location: "āhub, Andhra University",
    time: "All Day",
    description: "Teck Team Solutions and āhub organised Andhra Teck League 2023. Over 300 students in more than 60 teams participated.",
    detailedDescription: "Teck Team Solutions and āhub organised Andhra Teck League 2023, held at āhub, Andhra University on Oct 1. Over 300 students in more than 60 teams from across Andhra Pradesh participated in six different competitions.",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/Cx4bE9yrmtf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }, { name: "TiE Vizag", logo: TIE_LOGO }]
  },
  {
    id: "hackap-arts-culture-2024",
    title: "HackAP Arts & Culture Hackathon",
    image: resolveLegacyAsset("/src/assets/startups_events/HackAP Arts & Culture Hackathon- A Success!a-hub, TiE Vizag, Alcove Partners, and Teckybot are t.jpg"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/HackAP Arts & Culture Hackathon- A Success!a-hub, TiE Vizag, Alcove Partners, and Teckybot are t.jpg"),
      resolveLegacyAsset("/src/assets/startups_events/HackAP Arts & Culture Hackathon- A Success!a-hub, TiE Vizag, Alcove Partners, and Teckybot are t (1).jpg"),
      resolveLegacyAsset("/src/assets/startups_events/HackAP Arts & Culture Hackathon- A Success!a-hub, TiE Vizag, Alcove Partners, and Teckybot are t (2).jpg"),
    ],
    date: { month: "MAR", day: "23", year: "2024" },
    type: "Hackathon",
    category: "hackathons",
    location: "Andhra University, Vizag",
    time: "Mar 23–24, All Day",
    description: "a-hub, TiE Vizag, Alcove Partners & Teckybot hosted the 9th HackAP on Arts & Culture. 22 teams competed across two days.",
    detailedDescription: "a-hub, TiE Vizag, Alcove Partners, and Teckybot are thrilled to announce the successful completion of the ninth HackAP Hackathon on March 23rd & 24th at Andhra University. Focused on Arts & Culture, it attracted 22 teams from across the region.\n\nThe event provided a platform for creative minds to showcase problem-solving skills. Teams crafted prototypes, presentations, and demos, impressing judges Jayashree Hattangadi, Dr. Suvarna Kumar Gogula, and Prof. K. Ravi.\n\n🏆 Winners:\n1st Place: Team Awwtar (NVS Seshasai, Manikanta)\n2nd Place: Team Desk Champions (Dr. Lankapalli Bullayya College)\n3rd Place: Team Art Square (Andhra University College of Engineering)\n\nJudges praised hard work, innovative thinking, and passion, with professionals competing alongside students.\n\nRavi Eswarapu, CEO of ā hub, emphasized nurturing entrepreneurship. Even a young 8th-grade visitor, Nidheesh Gogula, appreciated the innovation — particularly in combining art forms with Artificial Intelligence.\n\nThe HackAP Arts & Culture Hackathon was a resounding success, fostering collaboration and providing valuable experience.",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/C5JdYdDhwZP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }, { name: "TiE Vizag", logo: TIE_LOGO }, { name: "Alcove", logo: ALCOVE_LOGO }]
  },
  {
    id: "ignite-2026-session1",
    title: "IGNITE Program 2026 – Session 1",
    image: resolveLegacyAsset("/src/assets/startups_events/IGNITE Program 2026 – Session 1 Successfully Conducted! The first session of the IGNITE Program .jpg"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/IGNITE Program 2026 – Session 1 Successfully Conducted! The first session of the IGNITE Program .jpg"),
      resolveLegacyAsset("/src/assets/startups_events/IGNITE Program 2026 – Session 1 Successfully Conducted! The first session of the IGNITE Program  (1).jpg"),
      resolveLegacyAsset("/src/assets/startups_events/IGNITE Program 2026 – Session 1 Successfully Conducted! The first session of the IGNITE Program  (2).jpg"),
      resolveLegacyAsset("/src/assets/startups_events/IGNITE Program 2026 – Session 1 Successfully Conducted! The first session of the IGNITE Program  (3).jpg"),
    ],
    date: { month: "JUN", day: "09", year: "2026" },
    type: "Pitch Session",
    category: "pitch sessions",
    location: "āhub, Andhra University",
    time: "All Day",
    description: "Session 1 of the IGNITE Program — 'What It Takes to Be an Entrepreneur' by Kiran Korvi. 26+ students participated.",
    detailedDescription: "The first session of the IGNITE Program was successfully held on 9th June 2026, jointly organized by the Andhra University Incubation Council (AUIIC), iE-Cell and Alcove Partners.\n\nThe session was delivered by Kiran Korvi on the topic \"What It Takes to Be an Entrepreneur\", providing valuable insights into the entrepreneurial mindset, challenges, opportunities, and the journey of building successful ventures.\n\nThe session witnessed enthusiastic participation from over 26 students, who actively engaged in discussions and gained practical knowledge about entrepreneurship and innovation.\n\nWe extend our sincere gratitude to Mr. Kiran Korvi for sharing his expertise and inspiring the next generation of innovators and entrepreneurs.",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/DZZ1rJMmPdk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }, { name: "Alcove", logo: ALCOVE_LOGO }]
  },
  {
    id: "startup-saturdays-nov2",
    title: "Startup Saturdays – Energy Distribution",
    image: resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 2 November 2024 We had an electrifying session focused on electricity distri (1).jpg"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 2 November 2024 We had an electrifying session focused on electricity distri.jpg"),
      resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 2 November 2024 We had an electrifying session focused on electricity distri (1).jpg"),
      resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 2 November 2024 We had an electrifying session focused on electricity distri (2).jpg"),
    ],
    date: { month: "NOV", day: "02", year: "2024" },
    type: "Networking",
    category: "networking",
    location: "āhub Seminar Hall",
    time: "4:00 PM – 7:00 PM",
    description: "An electrifying session on electricity distribution and the upcoming HackAP Hackathon. 300+ student teams gearing up for the prize pool of Rs. 6 Lakhs.",
    detailedDescription: "We had an electrifying session focused on electricity distribution and the upcoming HackAP Hackathon.\n\nCharita shared insights into India's startup funding landscape, covering options from bootstrapping to venture capital, reminding us that understanding funding avenues is key to startup success.\n\nMr. Eswar provided an in-depth look at power distribution, from transmission to consumer delivery, along with industry challenges ripe for innovation. He also introduced the seven problem statements for HackAP, sparking engaging discussions among founders, faculty, and students.\n\n📌 Important Updates:\n1. HackAP Hackathon: Registration closes 9 PM, Nov 13! Submit entries by Nov 15. The top 25 teams will compete for a prize of Rs. 6 Lakhs.\n2. Launch and LevelUp Workshop Series: Starting January 2025, this series of six workshops will dive deep into startup essentials.\n3. Hult Prize Season: AU's journey to the million-dollar Hult Prize returns this year.\n4. TiE Global Summit in Bengaluru (Dec 9–13): A can't-miss opportunity to network with global entrepreneurs at the \"Olympics of Entrepreneurship.\"\n\nYou can watch the recording on ā hub's YouTube: https://www.youtube.com/live/Er_SgPfzS9I",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/DCBaHfuBZDk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }]
  },
  {
    id: "startup-saturdays-waste",
    title: "Startup Saturdays – Waste Management",
    image: resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 3 May 2025What do we do with our waste It is not small amounts to just ignor.jpg"),
    date: { month: "MAY", day: "03", year: "2025" },
    type: "Workshop",
    category: "networking",
    location: "āhub, Vizag",
    time: "Saturday Afternoon",
    description: "Dr. Sunil Nandipati presented innovations in C&D waste — thermal insulation bricks from tile dust aligning with UN SDG Goals.",
    detailedDescription: "What do we do with our waste? According to the Pollution Control Board of India, we generate approximately 1.7 Lakh tonnes of solid waste daily, of which around 91 thousand tonnes are treated. Construction and demolition (C&D) waste is quickly becoming a huge challenge — and therein lie opportunities.\n\nFeature Presentation:\nDr. Sunil Nandipati, an Assistant Professor of Civil Engineering at GITAM University, developed thermal insulation bricks from tile dust that save electricity and require minimal water usage. His innovation aligns with SDG Goals 7 (Affordable Energy), 9 (Industry Innovation), 11 (Sustainable Cities), and 13 (Climate Action).\n\nShow Me the Money: Charita concluded her two-part series on venture capital as a source of funding for startups.\n\nYou can watch the entire session on YouTube: https://www.youtube.com/live/oWJaLpBdPhs\n\nOur next session will be on 17 May. Aspire | Associate | Achieve",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/DJa8hDVBk4k/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }]
  },
  {
    id: "startup-saturdays-seaweed",
    title: "Startup Saturdays – Marine Biotech",
    image: resolveLegacyAsset("/src/assets/startups_events/Startup Saturdays - 6 Sep 2025Seaweed are a diverse set of macrophytic plants growing in the mar.jpg"),
    date: { month: "SEP", day: "06", year: "2025" },
    type: "Networking",
    category: "networking",
    location: "āhub, Vizag",
    time: "Saturday Afternoon",
    description: "Dr. Sekar Megarajan on seaweed cultivation, commercial applications, and a $5.6B global market growing to $11.8B by 2030.",
    detailedDescription: "Seaweed are a diverse set of macrophytic plants growing in the marine environment with considerable ecological and commercial significance. Red, green, and brown algae common in Indian waters have applications in pharmaceutical, food & nutraceutical, cosmetics, industrial, and agricultural sectors.\n\nDr. Sekar Megarajan gave us a run down of cultivation methods in various sea conditions, economics of cultivation at scale, and possible commercial products derived from seaweed. The current global market for seaweed is valued at $5.6 billion USD and is projected to grow to $11.8 billion USD by 2030.\n\nWith a long coast line, Andhra has potential, but requires technology development and research to make seaweed cultivation viable here. The goal is to boost production to 1.12 million tonnes in the next five years. We are currently at 35,000 tonnes — the opportunities for innovation and entrepreneurship are vast.\n\nYou can watch the entire session on YouTube: https://www.youtube.com/live/GGgBTZ25e40\n\nOur next session on 20 Sept will be a Demo Day. Aspire | Associate | Achieve",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/DOlFrc6kiWe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }]
  },
  {
    id: "health-bio-ideathon",
    title: "Health, Bio & Med Tech Ideathon",
    image: resolveLegacyAsset("/src/assets/startups_events/ā hub along with TiE Vizag and AMTZ held a Health - Bio - Med Tech Ideathon on 19 Aug 2023. Thir.jpg"),
    date: { month: "AUG", day: "19", year: "2023" },
    type: "Hackathon",
    category: "hackathons",
    location: "AMTZ, Vizag",
    time: "9:00 AM – 6:00 PM",
    description: "ā hub along with TiE Vizag and AMTZ held a Health / Bio / Med Tech Ideathon. 13 finalists from 4 states presented stimulating ideas.",
    detailedDescription: "ā hub along with TiE Vizag and AMTZ held a Health / Bio / Med Tech Ideathon on 19 Aug 2023. Thirteen finalists from 4 states presented stimulating and enterprising ideas.\n\nPadmashree Dr. Rajendra A Badwe, Director, Tata Institute of Medical Sciences gave away the prizes to winners.\n\nIdeas that can quickly be commercialised and those that can have a broader and deeper impact on Indian society will be mentored, incubated and funded by AMTZ and a-hub.",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/CwLZ0yCBlGc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }, { name: "TiE Vizag", logo: TIE_LOGO }, { name: "AMTZ", logo: AMTZ_LOGO }]
  },
  {
    id: "isba-cxo-connect-2025",
    title: "ISBA CXO CONNECT 2025",
    image: resolveLegacyAsset("/src/assets/startups_events/We were proud to represent a-hub at ISBA CXO CONNECT 2025, with our CEO Mr. Ravi Eswarapu leadi.webp"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/We were proud to represent a-hub at ISBA CXO CONNECT 2025, with our CEO Mr. Ravi Eswarapu leadi.webp"),
      resolveLegacyAsset("/src/assets/startups_events/We were proud to represent a-hub at ISBA CXO CONNECT 2025, with our CEO Mr. Ravi Eswarapu leadi (1).webp"),
    ],
    date: { month: "2025", day: "–", year: "" },
    type: "Workshop",
    category: "workshops",
    location: "National Conclave",
    time: "Day 2 Session",
    description: "CEO Mr. Ravi Eswarapu led a powerful live Q&A with incubation leaders across India at ISBA CXO CONNECT 2025.",
    detailedDescription: "We were proud to represent a-hub at ISBA CXO CONNECT 2025, with our CEO Mr. Ravi Eswarapu leading a powerful session on Day 2 of the conclave, featuring a live Q&A with fellow incubation leaders.\n\nHis session spotlighted:\n✅ How A-Hub was built within a public university framework\n✅ Innovative programs & operational models that made us financially self-sustaining\n✅ Our journey toward achieving ₹1+ Cr in surplus while supporting early-stage innovation\n✅ How to reduce risk and institutional dependency during leadership transitions\n\nProbably being India's only university-based incubator to achieve operational profitability in its first year of operation, a-hub is proud to be setting a precedent — not just for what's possible, but for what's replicable at scale across the public innovation landscape.\n\nWe thank Indian STEPs and Business Incubators Association (ISBA) for curating this collaborative and thought-provoking platform.",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/DLmvWg_vXiF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }]
  },
  {
    id: "marketing-workshop-2024",
    title: "Marketing & Customer Acquisition Workshop",
    image: resolveLegacyAsset("/src/assets/startups_events/The two-day workshop on “Marketing and Customer Acquisition” conducted by ā hub and TiE Vizags .jpg"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/The two-day workshop on “Marketing and Customer Acquisition” conducted by ā hub and TiE Vizags .jpg"),
      resolveLegacyAsset("/src/assets/startups_events/The two-day workshop on “Marketing and Customer Acquisition” conducted by ā hub and TiE Vizags  (1).jpg"),
    ],
    date: { month: "MAY", day: "25", year: "2024" },
    type: "Workshop",
    category: "workshops",
    location: "āhub, Andhra University",
    time: "May 25–26, All Day",
    description: "Two-day workshop on 'Marketing and Customer Acquisition' — 4th of 8 in the Entrepreneurship Workshop Series by āhub & TiE Vizag.",
    detailedDescription: "The two-day workshop on \"Marketing and Customer Acquisition\" conducted by ā hub and TiE Vizag concluded successfully on Wednesday, 29 May 2024. This is the fourth of eight Entrepreneurship Workshop Series.\n\nAll sessions were led by entrepreneurs currently engaged in mentorship activities, drawing from their own experience:\n\n• Mr. Ravi Eswarapu, serial entrepreneur with 18 years of consulting experience, CEO of a hub\n• Mr. Kiran Korivi, entrepreneur with over two decades of experience in IT enabled services, foreign trade and infrastructure\n• Srinivas Savaram, IT professional with over 28 years of software engineering experience, Executive Director of TiE Vizag\n• Mr. Anantram Ganapati, life coach and trainer with 2 decades of training and development experience\n\nParticipants engaged in group discussions, hands-on activities, and short exercises to hone their marketing skills. Overall, this was a highly engaging learning experience.\n\nStay tuned for the next workshop on \"Financial Management and Funding\" on 25–26 June 2024.",
    status: "Completed",
    instagramLink: "https://www.instagram.com/p/C7zC48Dp6nd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    partners: [{ name: "āhub", logo: AHUB_LOGO }, { name: "TiE Vizag", logo: TIE_LOGO }]
  },
  {
    id: "ahub-ideathon",
    title: "Ideathon at āhub",
    image: resolveLegacyAsset("/src/assets/startups_events/IMG_3883.jpg"),
    images: [
      resolveLegacyAsset("/src/assets/startups_events/IMG_3883.jpg"),
      resolveLegacyAsset("/src/assets/startups_events/IMG_3884.jpg"),
      resolveLegacyAsset("/src/assets/startups_events/IMG_3899.jpg"),
      resolveLegacyAsset("/src/assets/startups_events/IMG_3902.jpg"),
    ],
    date: { month: "JUL", day: "09", year: "2026" },
    type: "Hackathon",
    category: "hackathons",
    location: "āhub, Andhra University",
    time: "All Day",
    description: "An energetic ideathon hosted at āhub bringing together students and innovators to pitch bold, disruptive ideas.",
    detailedDescription: "An energetic ideathon hosted at āhub, Andhra University, bringing together students, researchers, and aspiring entrepreneurs to pitch bold, disruptive ideas. Participants worked in teams to ideate and present solutions across multiple domains, guided by mentors from the startup ecosystem.",
    status: "Completed",
    partners: [{ name: "āhub", logo: AHUB_LOGO }]
  }
];
