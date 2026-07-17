export type LeadershipProfile = {
  initials: string;
  name: string;
  role: string;
  bio: string;
  credential: string;
  proof: string;
};

export type TeamProfile = {
  initials: string;
  name: string;
  role: string;
  bio: string;
};

export const leadershipProfiles: LeadershipProfile[] = [
  {
    initials: "SD",
    name: "Dr. Santanu Das",
    role: "Chairman of the Board",
    bio: "Founded and led TranSwitch Corporation from inception to a NASDAQ listing. Brings semiconductor, systems, and public-company operating depth to the sovereign AI thesis.",
    credential: "PhD in Electrical Engineering, Washington University.",
    proof: "NASDAQ FOUNDER · SEMICONDUCTOR",
  },
  {
    initials: "JG",
    name: "John Gillotte",
    role: "Co-Founder & CTO",
    bio: "Twenty-two years building enterprise infrastructure and AI systems, including foundation-model and healthcare-imaging architecture.",
    credential: "BS in Computer Science, University of Michigan.",
    proof: "FOUNDATION MODELS · ENTERPRISE · 22 YEARS",
  },
  {
    initials: "NA",
    name: "Nishan Ali",
    role: "Founder & CEO",
    bio: "M.Tech in AI; formerly UnitedHealth Group. Nine years in core data science, 27+ production projects, and two US patents.",
    credential: "M.Tech in Artificial Intelligence, IIT Jodhpur.",
    proof: "AI · HEALTHCARE · ENTERPRISE",
  },
];

export const deliveryTeam: TeamProfile[] = [
  {initials:"IM",name:"Ishan Mishra",role:"Data Scientist",bio:"M.Tech (CSE), PhD (CSE), IIT Jodhpur."},
  {initials:"PD",name:"Pranta Das",role:"Lead Data Scientist",bio:"M.Tech in Computer Science, ISI Kolkata; M.Sc. in Mathematics, IIT Kanpur."},
  {initials:"YH",name:"Yaswanth H",role:"Data Scientist",bio:"B.Tech in Electrical Engineering, IIT Kharagpur."},
  {initials:"HS",name:"Harshad Shinde",role:"Data Scientist",bio:"M.Tech in Computer Science, IIT Kharagpur."},
  {initials:"AS",name:"Abhishek Selokar",role:"Data Scientist",bio:"M.Tech in Biomedical Engineering, IIT Kharagpur."},
  {initials:"HK",name:"Himanshu Kale",role:"Associate Data Scientist",bio:"M.Tech in Biomedical Engineering, IIT Kharagpur."},
  {initials:"AP",name:"Akash Pal",role:"Associate Software Engineer",bio:"Master of Computer Applications, Academy of Technology."},
  {initials:"SU",name:"Sujan",role:"Senior Data Scientist",bio:"M.Tech in Computer Science, ISI Kolkata; M.Sc. in Mathematics, IIT Bombay."},
  {initials:"SM",name:"Soulina Mondal",role:"Associate ML Engineer",bio:"B.Tech in Computer Science and Engineering, Academy of Technology."},
  {initials:"SS",name:"Someshwar Srimany",role:"Associate Software Engineer",bio:"B.Tech in Electrical and Electronics Engineering, Academy of Technology."},
  {initials:"YK",name:"Yedla Anil Kumar",role:"Associate Software Engineer",bio:"Dual degree (B.Tech + M.Tech) in Chemical Engineering, IIT Kharagpur."},
  {initials:"SD",name:"Samiran Dolui",role:"Senior Software Engineer",bio:"IIT Madras."},
  {initials:"SB",name:"Shouryadeep Bera",role:"AI Engineer",bio:"IIEST Shibpur."},
  {initials:"AG",name:"Aparup Ghosh",role:"AI Engineer",bio:"IIEST Shibpur."},
];

export const companyTeam: TeamProfile[] = [
  ...leadershipProfiles.map(({initials,name,role,credential}) => ({initials,name,role,bio:credential})),
  ...deliveryTeam,
];
