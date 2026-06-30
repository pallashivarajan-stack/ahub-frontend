import { resolveLegacyAsset } from "@/lib/assets";

const asset = (path: string) => resolveLegacyAsset(path);

export type Mentor = {
  name: string;
  title: string;
  organization: string;
  image: string;
  linkedIn?: string;
};

export const mentorsData: Mentor[] = [
  {
    name: "Deepak S. Madala",
    title: "Strategy & Operations Expert",
    organization: "Incubation Council",
    image: asset("/src/assets/mentors/Deepak_S_Madala.png"),
    linkedIn: "https://linkedin.com/in/deepak-madala",
  },
  {
    name: "Dr. Diwakar K Vadapalli",
    title: "Technology Innovation Lead",
    organization: "Incubation Council",
    image: asset("/src/assets/mentors/Dr_Diwakar_K_Vadapalli.jpg"),
    linkedIn: "https://linkedin.com/in/diwakar-vadapalli",
  },
  {
    name: "Kiran Korivi",
    title: "Product & Growth Strategist",
    organization: "Incubation Council",
    image: asset("/src/assets/mentors/Kiran_Korivi.png"),
    linkedIn: "https://linkedin.com/in/kiran-korivi",
  },
  {
    name: "Peter Schneberger",
    title: "International Venture Advisor",
    organization: "Incubation Council",
    image: asset("/src/assets/mentors/Peter_Schneeberger.png"),
    linkedIn: "https://linkedin.com/in/peter-schneberger",
  },
  {
    name: "Ravi Eswarapu",
    title: "Finance & Investment Strategist",
    organization: "Incubation Council",
    image: asset("/src/assets/mentors/Ravi_Eswwarapu.jpg"),
    linkedIn: "https://linkedin.com/in/ravi-eswarapu",
  },
  {
    name: "Srinivas Savaram",
    title: "Ecosystem & Partnership Lead",
    organization: "Incubation Council",
    image: asset("/src/assets/mentors/Srinivas_Savaram.png"),
    linkedIn: "https://linkedin.com/in/srinivas-savaram",
  },
];
