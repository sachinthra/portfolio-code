import type { Experience, Project, SkillGroup, SocialLink, Education, Certification, Achievement } from '@/types';

export const SITE_TITLE = 'Sachinthra N V';
export const SITE_DESCRIPTION = 'Portfolio of Sachinthra N V — SDE-2 at HPE specializing in cloud solutions, backend development, and IoT projects.';

export const hero = {
  tagline: 'Engineering Cloud-Native Solutions at Scale.',
  subtitle: 'SDE-2 at Hewlett Packard Enterprise',
  bio: `I'm Sachinthra — a software engineer with 3+ years of experience building cloud solutions 
and backend systems at HPE. I specialize in distributed systems, containerized deployments, 
and enterprise-grade platform engineering. Beyond work, I love bridging software and hardware — 
from self-hosted infrastructure on Raspberry Pi to IoT automation systems.`,
  resumePath: '/resume/sachinthra-resume.pdf',
};

export const experiences: Experience[] = [
  {
    id: 'hpe',
    company: 'Hewlett Packard Enterprise',
    role: 'Software Development Engineer II',
    duration: 'Aug 2022 — Present',
    description: [
      'Engineered Disconnected Management Solutions for HPE, enabling seamless cloud experiences in environments without internet connectivity.',
      'Key contributions include system security implementations, Kubernetes cluster management, deployment tooling integration (Helm, Mayastor), and secure authentication features.',
      'Collaborated with Private Cloud and Storage teams to onboard business-critical projects.',
    ],
    tech: ['Go', 'Python', 'Docker', 'Kubernetes', 'Helm', 'Cloud'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    role: 'Project Intern',
    duration: 'Feb 2022 — Jun 2022',
    description: [
      'Built Real Estate Management System backend with Java/Spring Boot.',
      'Implemented OAuth 2.0 and JWT-based authentication flows.',
      'Designed RESTful APIs for property management workflows.',
    ],
    tech: ['Java', 'Spring Boot', 'OAuth 2.0', 'JWT', 'REST'],
  },
  {
    id: 'seaportai',
    company: 'SeaportAI',
    role: 'SDE Intern',
    duration: 'May 2020 — Jul 2020',
    description: [
      'Built OCR processing pipelines for document digitization.',
      'Developed frontend interfaces with React and backend services with Flask.',
    ],
    tech: ['React', 'Flask', 'Python', 'OCR'],
  },
];

export const projects: Project[] = [
  {
    id: 'file-locker',
    title: 'File Locker',
    description:
      'Self-hosted encrypted file storage system with AES-256-GCM encryption, encrypted video streaming with seek support, and a CLI tool with 38 commands. Running on Raspberry Pi.',
    tech: ['Go', 'PostgreSQL', 'Redis', 'MinIO', 'Preact', 'Docker'],
    github: 'https://github.com/sachinthra/file-locker',
    blogSlug: 'file-locker',
    image: '/images/blog/file-locker/file-locker.png',
  },
  {
    id: 'home-server',
    title: 'The Hub — Home Server',
    description:
      'Raspberry Pi 4 home server running NAS, Plex media center, GitHub Actions runner, and various Docker containers for self-hosted services.',
    tech: ['Raspberry Pi', 'Docker', 'Nginx', 'Linux', 'OpenMediaVault'],
    blogSlug: 'home-server',
    image: '/images/blog/home-server/home-server-cover.png',
  },
  {
    id: 'nas-project',
    title: 'Network Attached Storage',
    description:
      'Full NAS setup on Raspberry Pi 4 with SMB, NFS, FTP protocols, Plex integration, and remote access via SSH. Foundation for self-hosted cloud.',
    tech: ['OpenMediaVault', 'SMB', 'NFS', 'Linux', 'Raspberry Pi'],
    blogSlug: 'nas-project',
    image: '/images/blog/nas/nas-cover.png',
  },
  {
    id: 'docker-blog',
    title: 'Dockerized Blog Platform',
    description:
      'Containerized blog platform deployed on Raspberry Pi with automated CI/CD via GitHub Actions and Nginx reverse proxy.',
    tech: ['Raspberry Pi', 'Docker', 'GitHub Actions', 'Nginx'],
  },
  {
    id: 'drone-system',
    title: 'Disaster Management Drone',
    description:
      'Autonomous drone system for disaster zone assessment using computer vision and edge inference on Raspberry Pi.',
    tech: ['Python', 'TensorFlow', 'Raspberry Pi', 'Computer Vision'],
  },
  {
    id: 'iot-home',
    title: 'IoT Home Automation Core',
    description:
      'IoT home automation system with cloud logging, sensor data aggregation, and ThingSpeak integration for monitoring.',
    tech: ['C++', 'IoT', 'ESP32', 'ThingSpeak', 'Cloud Logging'],
  },
  {
    id: 'smart-garden',
    title: 'Smart Garden Monitor',
    description:
      'Automated plant monitoring system using ESP32 with soil moisture, temperature, and light sensors. Sends alerts via MQTT and logs data to a self-hosted Grafana dashboard.',
    tech: ['ESP32', 'MQTT', 'Grafana', 'C++', 'Sensors'],
  },
  {
    id: 'pi-cluster',
    title: 'Raspberry Pi Cluster',
    description:
      'Multi-node Raspberry Pi cluster for learning distributed computing, running Docker Swarm workloads and experimenting with container orchestration at the edge.',
    tech: ['Raspberry Pi', 'Docker Swarm', 'Linux', 'Networking', 'Shell'],
  },
  {
    id: 'robot-arm',
    title: 'Servo Robot Arm Controller',
    description:
      'Programmable 4-DOF robot arm controlled via ESP32 with a web-based interface. Supports pre-recorded motion sequences and real-time joystick control.',
    tech: ['ESP32', 'Servo Motors', 'WebSocket', 'C++', '3D Printing'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Go' },
      { name: 'Python' },
      { name: 'C++' },
      { name: 'Java' },
      { name: 'TypeScript' },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    skills: [
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'Linux' },
      { name: 'Nginx' },
      { name: 'GitHub Actions' },
    ],
  },
  {
    category: 'Databases & Storage',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'SQL' },
      { name: 'MinIO' },
    ],
  },
  {
    category: 'Web & Frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Preact' },
      { name: 'TailwindCSS' },
    ],
  },
  {
    category: 'Hardware & Embedded',
    skills: [
      { name: 'Raspberry Pi' },
      { name: 'ESP32' },
      { name: 'Arduino' },
      { name: 'IoT Protocols' },
      { name: 'MicroPython' },
      { name: 'MQTT' },
      { name: 'Servo/Motor Control' },
      { name: 'Sensor Integration' },
    ],
  },
  {
    category: 'System Design',
    skills: [
      { name: 'Distributed Systems' },
      { name: 'Microservices' },
      { name: 'REST APIs' },
      { name: 'Edge Computing' },
    ],
  },
];

export const certifications: Certification[] = [
  { name: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft', year: '2021' },
  { name: 'Deep Learning Specialization', issuer: 'Coursera (deeplearning.ai)', year: '2021' },
  { name: 'Node.js — The Complete Guide', issuer: 'Udemy', year: '2020' },
  { name: 'Raspberry Pi — Certified Hardware', issuer: 'Raspberry Pi Foundation', year: '2020' },
  { name: 'ESP32 — IoT Development', issuer: 'Espressif', year: '2021' },
];

export const achievements: Achievement[] = [
  { title: 'VIT MathAthon', description: 'Competed in the university-level mathematics competition at VIT.' },
  { title: 'NCC — A & B Certificates', description: '7 years in the National Cadet Corps, earning both A and B certificates for discipline, leadership, and national service.' },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/sachinthra', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/sachinthra/', icon: 'linkedin' },
  { name: 'X', url: 'https://x.com/Sachinthra', icon: 'x' },
  { name: 'Email', url: 'mailto:sachinthranv@gmail.com', icon: 'email' },
];

export const education: Education[] = [
  {
    institution: 'Vellore Institute Of Technology',
    degree: 'B.Tech in Information Technology',
    duration: '2018 — 2022',
    grade: '',
  },
  {
    institution: 'Sainik School Amaravathinagar',
    degree: 'CBSE (XII & X)',
    duration: '2009 — 2017',
    grade: '',
  },
];

export const funFact =
  "When I'm not coding or debugging a circuit, you can find me lifting weights (PPL split!) or hunting for the perfect Tamil melody.";

export const currentFocus = [
  'Golang Ecosystem — Concurrency patterns, Microservices',
  'System Design — Storage engines, Database internals, DDIA',
  'Embedded Systems — Python & C on ESP32/Raspberry Pi',
  'Edge Computing — Local-first, distributed IoT systems',
];
