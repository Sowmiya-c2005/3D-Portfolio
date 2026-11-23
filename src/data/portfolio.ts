// ============================================================
//  SOWMIYA – BEYOND THE CODE | Portfolio Data
//  Source: Resume (all data extracted verbatim — no fabrication)
// ============================================================

export const personal = {
  name: "Sowmiya C",
  title: "Aspiring Full Stack Developer",
  titleVariants: [
    "Aspiring Full Stack Developer",
    "React & FastAPI Engineer",
    "Cloud Deployment Enthusiast",
    "AI/ML Enthusiast",
  ],
  location: "Nagercoil, Tamil Nadu",
  email: "csowmiya204@gmail.com",
  phone: "+91 9842535611",
  linkedin: "https://linkedin.com/in/sowmiya-c-aa6b442a0",
  github: "https://github.com/Sowmiya-c2005",
  summary:
    "Aspiring Full-Stack Developer with hands-on experience in React.js, FastAPI, PostgreSQL, JavaScript, and cloud deployment. Developed web applications with JWT authentication, database management, role-based access control and cloud deployment. Interested in building scalable, user-friendly and reliable web applications.",
};

export const education = [
  {
    degree: "Bachelor of Engineering – Computer Science and Engineering",
    institution: "University College of Engineering Nagercoil",
    period: "Aug 2023 – July 2027",
    cgpa: "8.62 / 10",
    cgpaNotes: "(till 6th semester)",
    status: "Pursuing",
  },
];

export const experience = [
  {
    role: "Software Testing Intern",
    company: "NovelX Technologies",
    period: "Jun 2026 – July 2026",
    type: "Internship",
    points: [
      "Performed functional and QA testing for internal web applications.",
      "Identified, documented and tracked software defects during testing.",
      "Assisted in validating application functionality and user interface behaviour.",
      "Worked with the development team to support bug fixing and application quality.",
    ],
  },
  {
    role: "Software Developer",
    company: "Cosmic Compliance Test Lab",
    period: "Jun 2026 – July 2026",
    type: "Internship",
    points: [
      "Assisted the development team in building and testing internal web tools using HTML, CSS, and JavaScript.",
      "Documented software bugs and performed QA testing.",
      "Contributed to reducing reported issues by 30% within the internship period.",
    ],
    highlight: "30% reduction in reported issues",
  },
];

export const skills = [
  {
    category: "Languages",
    icon: "code",
    color: "#00c8ff",
    items: ["Python", "Java", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    icon: "monitor",
    color: "#7c3aed",
    items: ["React.js", "Angular.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    icon: "server",
    color: "#00c8ff",
    items: ["FastAPI", "Node.js", "Python", "REST APIs", "JWT & RBAC"],
  },
  {
    category: "Databases",
    icon: "database",
    color: "#7c3aed",
    items: ["PostgreSQL", "MySQL", "SQLAlchemy ORM"],
  },
  {
    category: "Tools & Tech",
    icon: "tool",
    color: "#00c8ff",
    items: ["Jenkins CI/CD", "Git", "GitHub", "Vite"],
  },
  {
    category: "Deployment",
    icon: "cloud",
    color: "#7c3aed",
    items: ["Render Cloud", "Zero-Downtime Deployments"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Automatic TRF Folder Creation & Management System",
    period: "Jun 2026 – July 2026",
    description:
      "Full-stack web application to automate TRF management, project assignment, document handling, and automatic folder creation. Implemented JWT-based authentication, RBAC, notifications, and dashboard analytics.",
    tech: ["React.js", "Vite", "Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "RBAC", "Render"],
    github: "https://github.com/Sowmiya-c2005/TRF-Management-System",
    live: null,
    featured: true,
    color: "#00c8ff",
  },
  {
    id: 2,
    title: "Smart Attendance System",
    period: "April 2026 – May 2026",
    description:
      "Web-based attendance management system to record and manage student attendance efficiently. Integrated Jenkins for automated build and deployment workflows, improving project reliability and streamlining development.",
    tech: ["HTML", "CSS", "JavaScript", "Jenkins"],
    github: "https://github.com/Sowmiya-c2005/jenkins-smart-attenance",
    live: null,
    featured: false,
    color: "#7c3aed",
  },
  {
    id: 3,
    title: "Dynamic Image Slider",
    period: "July 2025 – Aug 2025",
    description:
      "Responsive and interactive image slider featuring smooth transitions, navigation controls, and dynamic image switching. Designed a user-friendly interface with responsive styling.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Sowmiya-c2005/Dynamic-Image-Slider",
    live: null,
    featured: false,
    color: "#00c8ff",
  },
];

export const certifications = [
  {
    title: "TCS iON Career Edge – Young Professional",
    issuer: "TCS iON",
    color: "#00c8ff",
    icon: "🏆",
  },
  {
    title: "Innovating with Google Cloud AI",
    issuer: "Simplilearn SkillUp",
    color: "#7c3aed",
    icon: "☁️",
  },
  {
    title: "Trends in Cybersecurity",
    issuer: "Infosys Springboard",
    color: "#00c8ff",
    icon: "🔐",
  },
  {
    title: "CSS3, Angular, JavaScript, TypeScript",
    issuer: "Infosys Springboard",
    color: "#7c3aed",
    icon: "💻",
  },
];

export const achievements = [
  {
    title: "TCS iON Career Edge – Young Professional",
    description:
      "Successfully completed the TCS iON Career Edge course, covering communication, presentation, soft skills, resume writing, group discussion, interview skills, business etiquette, problem-solving, and IT foundational skills.",
    org: "TCS iON",
    icon: "🎓",
  },
  {
    title: "Prompt Engineering & Canva Editing Workshop",
    description:
      "Participated in a workshop on Prompt Engineering and Canva Editing, organized by Tamil Nadu Government and ALO Infotech.",
    org: "Tamil Nadu Government & ALO Infotech",
    icon: "🤖",
  },
];

export const stats = [
  { label: "Internships", value: 2, suffix: "" },
  { label: "Projects", value: 3, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
  { label: "CGPA", value: 8.62, suffix: "", decimals: 2 },
];
