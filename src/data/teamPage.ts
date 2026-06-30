import { resolveLegacyAsset } from "@/lib/assets";

const asset = (path: string) => resolveLegacyAsset(path);

export type TeamMember = {
  name: string;
  title: string;
  image: string;
  tagline?: string;
  visitLink?: string;
  linkedIn?: string;
};

export type TeamPageMeta = {
  groupPhoto: string;
  title: string;
  subtitle: string;
  description: string;
  memberCountLabel: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Syed Junaid Ahmed",
    title: "Technical Manager, A-Hub",
    image: asset("/src/assets/team/syed junaid ahmed(technical manager,a-hub).jpg"),
    tagline: "Driving technical strategy and innovation at A-Hub",
    visitLink: "https://linkedin.com/in/syed-junaid-ahmed",
  },
  {
    name: "Akilesh Kumar",
    title: "Incubation Manager, A-Hub",
    image: asset("/src/assets/team/akilesh kumar(incubation manager,a-hub).jpg"),
    tagline: "Empowering startups through incubation and mentorship",
    visitLink: "https://linkedin.com/in/akilesh-kumar",
  },
  {
    name: "Sivashankar Pilla",
    title: "Skill Development Lab Manager",
    image: asset("/src/assets/team/sivashankar pilla(skill development lab manager).jpg"),
    tagline: "Building hands-on learning experiences for innovators",
    visitLink: "https://linkedin.com/in/sivashankar-pilla",
  },
  {
    name: "Ganesh Chilla",
    title: "Sr Engineer - Automation",
    image: asset("/src/assets/team/ganesh chilla(skill development-sr.engineer automation).jpg"),
    tagline: "Automating solutions for next-gen industrial challenges",
    visitLink: "https://linkedin.com/in/ganesh-chilla",
  },
  {
    name: "Karthik Varma Kopanathi",
    title: "Sr Engineer - Robotics",
    image: asset("/src/assets/team/Karthik Varma Kopanathi(skill development-sr engineer-robotics).jpg"),
    tagline: "Pioneering robotics and intelligent systems",
    visitLink: "https://linkedin.com/in/karthik-varma-kopanathi",
  },
  {
    name: "Pavan Kumar Kasturi",
    title: "Sr Engineer - CAD/CAM",
    image: asset("/src/assets/team/pavan kumar kasturi(skill devlopment-sr enginner cad-cam).jpg"),
    tagline: "Transforming designs into precision-engineered products",
    visitLink: "https://linkedin.com/in/pavan-kumar-kasturi",
  },
  {
    name: "Poojith Siva Rama Krishna Aravapalli",
    title: "Sr Engineer - Mechatronics",
    image: asset("/src/assets/team/poojith siva rama krishna aravapalli(skill development-sr engineer mechatronics).jpg"),
    tagline: "Integrating mechanics, electronics, and computing",
    visitLink: "https://linkedin.com/in/poojith-aravapalli",
  },
  {
    name: "G S VV Vamsi Krishna",
    title: "Sr Engineer - Data Science",
    image: asset("/src/assets/team/G S VV Vamsi krishna(skill developement-sr engineer data cience).jpg"),
    tagline: "Unlocking insights through data-driven innovation",
    visitLink: "https://linkedin.com/in/vamsi-krishna",
  },
  {
    name: "Hemasri Vuritla",
    title: "IoT Lab Assistant",
    image: asset("/src/assets/team/hemasri vuritla(IOt lab assistant).jpg"),
    tagline: "Connecting the physical and digital worlds",
    visitLink: "https://linkedin.com/in/hemasri-vuritla",
  },
  {
    name: "Sindhu Chinnala",
    title: "Facilities Executive",
    image: asset("/src/assets/team/sindhu chinnala(facilities-executive).jpg"),
    tagline: "Ensuring a seamless and productive work environment",
    visitLink: "https://linkedin.com/in/sindhu-chinnala",
  },
  {
    name: "Pramila Rani Sahu",
    title: "Office Executive",
    image: asset("/src/assets/team/pramila Rani sahu(office executive).png"),
    tagline: "Keeping operations running smoothly every day",
    visitLink: "https://linkedin.com/in/pramila-rani-sahu",
  },
  {
    name: "Somayajula Venkata Saujanya Sudeeksha",
    title: "Intern",
    image: asset("/src/assets/team/Somayajula Venkata Saujanya Sudeeksha(intern).jpg"),
    tagline: "Eager to learn and contribute to the ecosystem",
    visitLink: "https://linkedin.com/in/svs-sudeeksha",
  },
  {
    name: "Ragvendra Varma",
    title: "Intern",
    image: asset("/src/assets/team/ragvendra varma(intern).png"),
    tagline: "Bringing fresh perspectives to the team",
    visitLink: "https://linkedin.com/in/ragvendra-varma",
  },
  {
    name: "Vinay Kumar Tadla",
    title: "Intern",
    image: asset("/src/assets/team/vinay kumar tadla(intern).png"),
    tagline: "Passionate about technology and innovation",
    visitLink: "https://linkedin.com/in/vinay-kumar-tadla",
  },
];

export const groupPhoto = asset("/src/assets/team/group photo of team members.png");

export const teamPageData: TeamPageMeta = {
  groupPhoto,
  title: "The A-Hub Family",
  subtitle: "14 Members · One Mission",
  description: "Building Andhra Pradesh's premier startup incubation ecosystem",
  memberCountLabel: "Team Members",
};
