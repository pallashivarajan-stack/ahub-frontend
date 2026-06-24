import rajaSekharImg from "@/assets/board/Prof.G.P.Raja Sekhar.jpeg";
import rambabuImg from "@/assets/board/prof.K.Rambabu.png";
import valliKumariImg from "@/assets/board/prof.Valli kumari vatsavayi.png";

export type BoardMember = {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedIn?: string;
};

export const boardMembers: BoardMember[] = [
  {
    name: "Prof. G.P. Raja Sekhar",
    title: "Vice Chancellor, Andhra University",
    bio: "Distinguished academic leader with decades of experience in engineering education and research. Driving strategic vision and governance excellence at AHub Incubation Council.",
    image: rajaSekharImg,
    linkedIn: "https://linkedin.com/in/prof-gp-raja-sekhar",
  },
  {
    name: "Prof. K. Rambabu",
    title: "Registrar",
    bio: "Eminent professor and researcher contributing deep expertise in technology innovation and academic-industry collaboration. Championing startup incubation and research-driven entrepreneurship.",
    image: rambabuImg,
    linkedIn: "https://linkedin.com/in/prof-k-rambabu",
  },
  {
    name: "Prof. Valli Kumari Vatsavayi",
    title: "Dean, Research & Development",
    bio: "Seasoned academician and thought leader bringing strategic insight into technology education, research policy, and innovation ecosystem development across the region.",
    image: valliKumariImg,
    linkedIn: "https://linkedin.com/in/prof-vallikumari-vatsavayi",
  },
];
