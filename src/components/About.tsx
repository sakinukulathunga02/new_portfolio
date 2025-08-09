// components/About.tsx
"use client";

import React, { useEffect, useState } from "react";

// Type definitions
type Personal = {
  id?: string;
  name: string;
  passion?: string;
  address?: string;
  phone?: string;
  email: string;
  linkedin?: string;
  github?: string;
  birthdate?: string;
};

type Education = {
  id?: string;
  school: string;
  degree: string;
  institution?: string;
  field?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

type Experience = {
  id?: string;
  Company_name: string;
  position: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

type Project = {
  id?: string;
  name: string;
  description?: string;
  technologies?: string;
  repository_url?: string;
};

type Skill = {
  id?: string;
  name: string;
  image_filename: string;
  content_type?: string;
  image_data?: string; // Base64 encoded image
};

type Certificate = {
  id?: string;
  title: string;
  issuer?: string;
  issue_date?: string;
  expiration_date?: string;
  certificate_url?: string;
};

// Hardcoded data arrays
const personalData: Personal = {
  id: '1',
  name: 'Sakinu Kulathunga',
  passion: 'AI/ML Engineer',
  address: '156/B Jaya Sri Uyana\nPallekale, Sri Lanka',
  phone: '+94768426584',
  email: 'sakinukulathunga@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sakinu-kulathunga-01a0762a8/',
  github: 'https://github.com/sakinukulathunga02?tab=repositories',
  birthdate: '2002-11-26'
};

const educationsData: Education[] = [
  {
    id: '1',
    school: 'University Of Moratuwa',
    degree: 'BSC(hons) in Artificial Intelligence',
    institution: '',
    field: 'Artificial Intelligence',
    start_date: '2023-03-01',
    end_date: '2027-06-30',
    description: ''
  },
  {
    id: '2',
    school: 'SLIIT',
    degree: 'High School Diploma in IT',
    institution: '',
    field: 'IT',
    start_date: '2022-01-01',
    end_date: '2024-12-31',
    description: ''
  }
];

const experiencesData: Experience[] = [
  {
    id: '1',
    Company_name: 'Epic Lanka (Pvt) Ltd',
    position: 'Artificial Intelligence & Bussiness Intelligence Intern',
    start_date: '2025-04-28',
    end_date: '2025-10-27',
    description: 'Developed and implemented machine learning models for predictive analytics. Worked on natural language processing projects and contributed to the development of AI-powered solutions.'
  },
  {
    id: '2',
    Company_name: 'Hatton National Bank PLC',
    position: 'Banking Intern',
    start_date: '2022-03-01',
    end_date: '2023-02-01',
    description: 'Helped with banking operations, customer service, and data analysis.'
  }
];

const projectsData: Project[] = [
  {
    id: '1',
    name: 'Portfolio Website',
    description: 'A responsive portfolio website built with React and TypeScript.',
    technologies: 'React, TypeScript, Tailwind CSS, Next.js',
    repository_url: 'https://github.com/yourusername/portfolio'
  },
  {
    id: '2',
    name: 'Horus The Frictionless Tracking System',
    description: 'AI-powered platform for real-time construction safety, attendance, and asset tracking with CV, analytics, and a modern web UI.',
    technologies: 'Farm stack, Computer Vision, RAG technology',
    repository_url: 'https://github.com/sakinukulathunga02/HORUS---Frictionless-Object-Tracking-System-In-Construction'
  },
  {
    id: '3',
    name: 'Personal Chat Bot',
    description: 'Chatbot built with Python, Streamlit, LlamaCPP, and LangChain Schema, leveraging Hugging Face for detailed, well-structured responses.',
    technologies: 'Python, LlamaCPP,Streamlit, LangChain, RAG technology',
    repository_url: 'https://github.com/sakinukulathunga02/First-Personal-Chat-Bot'
  },
  {
    id: '4',
    name: 'Multi Stage Churn Prediction System view',
    description: 'Project to predict potential user churn at different stages of the customer journey, enabling businesses to take timely action.',
    technologies: 'Python, Scikit-learn, Pandas, ML algorithms, Clustering (DB-Scan, K-Means), XGBoost, Random Forest,LSTMs',
    repository_url: 'https://github.com/sakinukulathunga02/Multi-Stage-Churn-Prediction-System'
  },
  {
    id: '5',
    name: 'C&S Auto Care (Online Vehicle Service Management System)',
    description: 'Online system for C&S Auto Care (PVT) LTD enabling customers to book services and purchase vehicle spare parts, bridging physical and digital offerings.',
    technologies: ' React, Tailwind CSS, MongoDB, Express,js, Node.js ',
    repository_url: 'https://github.com/sakinukulathunga02/C-S-Auto-Care---Vehicle-Service-Management-System-'
  },
  {
    id: '6',
    name: 'Smart Serve(Smart Chafing Dish)',
    description: 'Hardware project using Arduino to create a smart chafing dish that controls temperature, auto-opens, monitors water level, sends alerts, measures weight, and detects food availability.',
    technologies: 'Arduino',
    repository_url: 'https://github.com/sakinukulathunga02/smart-serve---smart-chafing-dish'
  }
];

const skillsData: Skill[] = [
  // AI/ML Skills
  

  // Programming Languages
  {
    id: '7',
    name: 'JavaScript',
    image_filename: 'javascript.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0Y3REYxRSIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMDAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMzIzMzMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5KUzwvdGV4dD4KPC9zdmc+'
  },
  {
    id: '8',
    name: 'Java',
    image_filename: 'java.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iamF2YUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0VEOEIwMDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY2RjAwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjaml2YUdyYWRpZW50KSIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+SmF2YTwvdGV4dD4KPC9zdmc+'
  },
  {
    id: '9',
    name: 'C++',
    image_filename: 'cpp.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzAwNTk5QyIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNDAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+QysrPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '10',
    name: 'HTML',
    image_filename: 'html.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0UzNEYyNiIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+SFRNTDU8L3RleHQ+Cjwvc3ZnPg=='
  },
  {
    id: '11',
    name: 'CSS',
    image_filename: 'css.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzE1NzJCNiIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNDAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+Q1NTMzwvdGV4dD4KPC9zdmc+'
  },

  // Frameworks
  {
    id: '12',
    name: 'React',
    image_filename: 'react.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzIwMjMyQSIgcng9IjQwIi8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIzMCIgZmlsbD0iIzYxREFGQiIvPgogIDxnIHN0cm9rZT0iIzYxREFGQiIgc3Ryb2tlLXdpZHRoPSI4IiBmaWxsPSJub25lIj4KICAgIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIyMDAiIHJ4PSIxMTAiIHJ5PSI0NSIvPgogICAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjIwMCIgcng9IjExMCIgcnk9IjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAyMDAgMjAwKSIvPgogICAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjIwMCIgcng9IjExMCIgcnk9IjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMjAwIDIwMCkiLz4KICA8L2c+Cjwvc3ZnPg=='
  },
  {
    id: '13',
    name: 'Next.js',
    image_filename: 'nextjs.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzAwMDAwMCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5OZXh0LmpzPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSI+REI8L3RleHQ+Cjwvc3ZnPg=='
  },
  {
    id: '14',
    name: 'Tailwind CSS',
    image_filename: 'tailwind.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idHdHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNzU2MDA7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMzMlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmYzMzMzO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjY2JSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYWFmZjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBmZjJhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZmlnbWFHcmFkaWVudCkiIHJ4PSI0MCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+Q1NTPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '15',
    name: 'FastAPI',
    image_filename: 'fastapi.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzAwOTY4OCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5GYXN0PC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+QVBJPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '16',
    name: 'Node.js',
    image_filename: 'nodejs.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzMzOTkzMyIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3NSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Ob2RlPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzUiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+SlM8L3RleHQ+Cjwvc3ZnPg=='
  },

  // Databases
  {
    id: '17',
    name: 'MySQL',
    image_filename: 'mysql.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzAwNzU4RiIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMDAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjRkY5NTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5NeVNRTDwvdGV4dD4KPC9zdmc+'
  },
  {
    id: '18',
    name: 'MongoDB',
    image_filename: 'mongodb.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzQ3QTI0OCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Nb25nbzwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjY1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjcwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkRCPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '19',
    name: 'Vector DB',
    image_filename: 'vectordb.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idmRiR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOGI1Y2Y2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNhNzhmZmY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCN2ZGJHcmFkaWVudCkiIHJ4PSI0MCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+VmVjdG9yPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+REI8L3RleHQ+Cjwvc3ZnPg=='
  },

  // Tools & Others
  {
    id: '20',
    name: 'Git',
    image_filename: 'git.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0Y5NTIxMCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+R2l0PC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '21',
    name: 'GitHub',
    image_filename: 'github.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzE4MWIyMyIgcng9IjQwIi8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIxMDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRzZSI+R2l0SHViPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '22',
    name: 'Figma',
    image_filename: 'figma.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmlnbWFHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNzU2MDA7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMzMlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmYzMzMzO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjY2JSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYWFmZjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBmZjJhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZmlnbWFHcmFkaWVudCkiIHJ4PSI0MCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkZpZ21hPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '23',
    name: 'Postman',
    image_filename: 'postman.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0ZGNjEzMyIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI5MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Qb3N0bWFuPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '24',
    name: 'Arduino',
    image_filename: 'arduino.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzAwOTc5QyIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI5MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5BcmR1aW5vPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '25',
    name: 'MVC',
    image_filename: 'mvc.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibXZjR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNGY0NmU1O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3Yzc5ZmY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNtdmNHcmFkaWVudCkiIHJ4PSI0MCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk1WQzwvdGV4dD4KPC9zdmc+'
  },
  {
    id: '26',
    name: 'Web Scraping',
    image_filename: 'webscraping.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzI1NGE0YSIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2NSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPldlYjwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjY1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjY1IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRzZSI+U2NyYXBpbmc8L3RleHQ+Cjwvc3ZnPg=='
  },
  {
    id: '1',
    name: 'Python',
    image_filename: 'python.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icHlHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzNzc2YWI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZDQzYjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI3B5R3JhZGllbnQpIiByeD0iNDAiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5QeTwvdGV4dD4KPC9zdmc+'
  },
  {
    id: '2',
    name: 'TensorFlow',
    image_filename: 'tensorflow.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0ZGNkYwMCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5UZW5zb3I8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5GbG93PC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: '3',
    name: 'Scikit-learn',
    image_filename: 'sklearn.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0Y3OTMxRSIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI1NSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5zY2lraXQ8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI1NSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5sZWFybjwvdGV4dD4KPC9zdmc+'
  },
  {
    id: '4',
    name: 'Pandas',
    image_filename: 'pandas.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzE1MDQ1OCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMDAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjRTcwNDg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5wYW5kYXM8L3RleHQ+Cjwvc3ZnPg=='
  },
  {
    id: '5',
    name: 'NLP',
    image_filename: 'nlp.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibmxwR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY2NmZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5OTMzZmY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNubHBHcmFkaWVudCkiIHJ4PSI0MCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5MUDU8L3RleHQ+Cjwvc3ZnPg=='
  },
  {
    id: '6',
    name: 'Langchain',
    image_filename: 'langchain.png',
    content_type: 'image/png',
    image_data: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzJEMzc0OCIgcng9IjQwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2NSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRkQ3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkxhbmc8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2NSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRkQ3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkNoYWluPC90ZXh0Pgo8L3N2Zz4='
  }
];
const certificatesData: Certificate[] = [
  {
    id: '1',
    title: 'Pretraining LLMS',
    issuer: 'DeepLearning.AI',
    issue_date: '2024-08-15',
    expiration_date: '2030-06-15',
    certificate_url: 'https://learn.deeplearning.ai/accomplishments/4e0eae54-f560-4d93-b7f7-%E2%80%A6'
  },
  {
    id: '2',
    title: 'AI/ML Engineer Stage 1',
    issuer: 'SLIIT',
    issue_date: '2023-03-20',
    expiration_date: '2025-03-20',
    certificate_url: 'https://code.sliit.org/certificates/bwyclvqptv'
  },
  {
    id: '3',
    title: 'Introduction to vector databases ',
    issuer: 'MongoDB university',
    issue_date: '2024-12-10',
    expiration_date: '2024-12-10',
    certificate_url: 'https://learn.mongodb.com/c/4_OX6Z7GRdu8fBVvWArHdA'
  }
];

export default function About() {
  const [personal, setPersonal] = useState<Personal | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for Contact Form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        // Simulate loading delay
        setTimeout(() => {
          setPersonal(personalData);
          setEducations(educationsData);
          
          // Sort experiences by date (same logic as original)
          const sortedExperiences = [...experiencesData].sort((a: Experience, b: Experience) => {
            const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
            const dateB = b.start_date ? new Date(b.start_date).getTime() : (new Date()).getTime();
            
            if (a.end_date === 'Present' && b.end_date !== 'Present') return -1;
            if (a.end_date !== 'Present' && b.end_date === 'Present') return 1;
            if (a.end_date === 'Present' && b.end_date === 'Present') {
                const startDateA = a.start_date ? new Date(a.start_date).getTime() : 0;
                const startDateB = b.start_date ? new Date(b.start_date).getTime() : 0;
                return startDateB - startDateA;
            }

            if (isNaN(dateA) && isNaN(dateB)) return 0;
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            return dateB - dateA;
          });
          setExperiences(sortedExperiences);
          
          setProjects(projectsData);
          setSkills(skillsData);
          setCertificates(certificatesData);
          setLoading(false);
        }, 500); // 500ms delay to simulate loading
      } catch (err) {
        let message = 'Unknown error';
        if (err instanceof Error) message = err.message;
        setError(message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/Desk.png)', backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/Desk.png)', backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat' }}>
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-red-200">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!personal) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/Desk.png)', backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat' }}>
        <div className="text-slate-400 text-lg">No personal information found</div>
      </div>
    );
  }

  const formatDateForExperience = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (dateString === 'Present' || date.getTime() > new Date('2025-07-28').getTime()) {
      return 'Present';
    }
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long' });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage(null);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, contactEmail, message }),
      });

      if (response.ok) {
        setFormMessage('Your message has been sent successfully!');
        setFirstName('');
        setLastName('');
        setContactEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        setFormError(data.error || 'Failed to send message');
      }
    } catch (err) {
      let message = 'Unknown error';
      if (err instanceof Error) message = err.message;
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/Desk.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mobile-only profile image */}
      <div className="flex w-full justify-center lg:hidden mt-8 mb-2">
        <img
          src="/profile.png"
          alt="Profile"
          className="rounded-full border-4 border-blue-500 shadow-lg w-32 h-32 sm:w-40 sm:h-40 object-cover bg-[#222] animate-float"
        />
      </div>

      {/* Main Content */}
      <div
        id="about-me"
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-20"
        style={{
          // On mobile, show left side of background image
          backgroundPosition: 'left',
        }}
      >
        {/* Left Side - Content */}
        <div className="flex-1 max-w-2xl lg:pr-10 mb-10 lg:mb-0">
          {/* Large Name */}
          <h1 className="animate-fade-in-down-about mt-15 text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-2 leading-tight px-4 py-2 md:px-20">
            {personal.name}
          </h1>

          {personal.passion && (
            <h2 className="animate-fade-in-left text-2xl md:text-3xl lg:text-4xl text-blue-300 mb-2 font-light px-4 md:px-20">
              {personal.passion}
            </h2>
          )}

          <p className="animate-fade-in-up text-xl text-slate-400 mb-2 px-4 md:px-20">
            Welcome to my portfolio
          </p>

          <div className="animate-fade-in-up flex items-center space-x-4 px-4 md:px-20" style={{ animationDelay: '0.8s' }}>
            <a
              href="#contact-me"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact Me
            </a>

            <a
              href="/Sakinu Kulathunga_cv_new_new.pdf" // Replace with your CV file name
              download
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Download CV
            </a>
          </div>

          {/* Education Cards */}
          <div className="mt-12 space-y-4 max-w-md mx-auto lg:mx-0 px-4 md:px-20">
            <h2 className="animate-slide-in-up-education text-3xl font-bold text-white mb-6">Education</h2>
            {educations.map((education, index) => (
              <div
                key={education.id || index}
                className={`education-card-animation hover-lift group bg-slate-800/30 backdrop-blur-md rounded-2xl px-6 py-4 border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 cursor-pointer relative overflow-hidden stagger-${index + 1}`}
              >
                {/* Default visible content */}
                <div className="text-sm text-slate-400 mb-1">{education.degree}</div>
                <div className="text-white font-medium text-lg">{education.school}</div>
                {education.institution && (
                  <div className="text-sm text-slate-300 mt-1">{education.institution}</div>
                )}

                {/* Expanded content on hover */}
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-300 ease-in-out">
                  <div className="pt-3 border-t border-slate-600/30 mt-3">
                    {education.field && (
                      <div className="text-sm text-slate-300 mb-2">
                        <span className="text-slate-500">Field:</span> {education.field}
                      </div>
                    )}
                    {(education.start_date || education.end_date) && (
                      <div className="text-xs text-slate-400 mb-2">
                        <span className="text-slate-500">Duration:</span>
                        {education.start_date && ` ${new Date(education.start_date).getFullYear()}`}
                        {education.start_date && education.end_date && " - "}
                        {education.end_date && new Date(education.end_date).getFullYear()}
                      </div>
                    )}
                    {education.description && (
                      <div className="text-xs text-slate-300 mt-2">
                        <span className="text-slate-500">Description:</span> {education.description}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="hidden lg:flex items-center justify-center flex-1 pr-10">
          <div className="relative">
            {/* Profile Image Placeholder */}
            

            {/* Floating Stats Card */}
            <div className="animate-fade-in-right absolute -bottom-8 -right-75 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl hover-lift">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2 ">10+</div>
                <div className="text-sm text-slate-400">Completed Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Experience Section */}
      <div id="experience" className="relative z-10 py-20 px-6">
        <h2 className="animate-fade-in-up text-5xl font-bold text-center text-white mb-16">My Experience</h2>
        <div className="flex flex-wrap justify-center items-stretch gap-x-8 gap-y-12">
          {experiences.map((exp, index) => (
            <React.Fragment key={exp.id || index}>
              <div
                className={`experience-card hover-lift group bg-slate-800/30 backdrop-blur-md rounded-2xl px-6 py-4 border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center max-w-xs text-center stagger-${(index % 4) + 1}`}
                style={{ minWidth: '250px' }}
              >
                {/* Default visible content */}
                <div className="text-xl md:text-2xl font-semibold text-white mb-1">
                  {exp.Company_name}
                </div>
                {exp.position && (
                  <div className="text-lg text-slate-300 mb-1">
                    {exp.position}
                  </div>
                )}
                <div className="text-slate-400 text-sm mb-4">
                  ({formatDateForExperience(exp.start_date)} - {exp.end_date ? formatDateForExperience(exp.end_date) : 'Present'})
                </div>

                {/* Expanded content on hover for description */}
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-300 ease-in-out">
                  {exp.description && (
                    <div className="pt-3 border-t border-slate-600/30 mt-3 text-slate-300 text-sm italic">
                      <span className="text-slate-500 not-italic">Description: </span> {exp.description}
                    </div>
                  )}
                </div>

                {/* Hover indicator (down arrow) */}
                {exp.description && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Timeline dot and connecting line between items */}
              {index < experiences.length - 1 && (
                <div className="flex items-center flex-shrink-0">
                  <div className="experience-timeline-dot w-3 h-3 bg-white rounded-full border border-slate-500"></div>
                  <div className="h-0.5 bg-slate-600 w-20 md:w-40"></div>
                  <div className="experience-timeline-dot w-3 h-3 bg-white rounded-full border border-slate-500"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="relative z-10 py-20 px-6">
        <h2 className="animate-fade-in-up text-5xl font-bold text-center text-white mb-16">Projects</h2>
        <p className="text-center text-slate-400 mb-12">
          Here are some of my notable projects. Click on any project to view its repository.</p>
        {/* Scrollable row container */}
        <div
          className="flex overflow-x-auto scrollbar-custom gap-6 px-2"
          style={{
            scrollSnapType: 'x mandatory',
          }}
        >
          {projects.map((project, index) => (
            <a
              key={project.id || index}
              href={project.repository_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card hover-lift group bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 cursor-pointer flex-shrink-0"
              style={{
                minWidth: 'calc(33.333% - 1rem)', // 3 cards per view
                maxWidth: 'calc(33.333% - 1rem)',
                height: '260px',
                scrollSnapAlign: 'start',
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{project.name}</h3>
                  {project.description && (
                    <p className="text-slate-300 text-sm mb-4">{project.description}</p>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-slate-400 text-xs pt-3 border-t border-slate-600/30 mt-auto">
                    <span className="text-slate-500">Tech Stacks:</span> {project.technologies}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Skills and Certificates Section - Two Column Layout */}
      <div className="relative z-10 py-20 px-6">
        <div className="flex flex-col md:flex-row justify-center gap-12">

          {/* Skills Section (Left Column) */}
          <div id="skills" className="w-full md:w-1/2 flex flex-col items-center">
            <h2 className="animate-fade-in-up text-5xl font-bold text-white mb-12">My Skills</h2>
            
            <div
              className="scrollbar-custom flex flex-wrap justify-start gap-6 max-w-2xl overflow-y-auto pr-2"
              style={{ maxHeight: '400px' }} // control scroll height
            >
              {skills.length > 0 ? (
                [...skills].reverse().map((skill, index) => (
                  <div
                    key={skill.id || index}
                    className={`skill-card hover-lift bg-slate-800/30 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 cursor-pointer text-center flex flex-col items-center stagger-${(index % 6) + 1}`}
                    style={{ minWidth: '120px', maxWidth: '150px' }}
                  >
                    {skill.image_data ? (
                      <img
                        src={skill.image_data}
                        alt={skill.name}
                        className="w-16 h-16 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-700 rounded-md mb-2 text-gray-400">
                        No Icon
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  </div>
                ))
              ) : (
                <p className="text-white">No skills to display. Please add some using the backend API.</p>
              )}
            </div>
          </div>

        {/* Certificates Section (Right Column) - All in one card */}
        <div id="certificates" className="w-full md:w-1/2 flex flex-col items-center">
          {/* Title outside the scroll container */}
          <h2 className="animate-fade-in-up text-5xl font-bold text-white mb-12">Certificates</h2>

          {/* Scrollable container only for certificate list */}
          <div
            className="scrollbar-custom flex flex-wrap justify-start gap-6 max-w-2xl overflow-y-auto pr-2"
            style={{ maxHeight: '600px' }}
          >
            <div className="certificate-card hover-lift bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 max-w-2xl w-full shadow-xl">
              {certificates.length === 0 && (
                <p className="text-slate-400 text-center">No certificates found.</p>
              )}
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.id || index}
                  className="mb-6 pb-6 last:mb-0 last:pb-0 border-b last:border-b-0 border-slate-700/50"
                >
                  <h3 className="text-xl font-semibold text-white mb-1">{certificate.title}</h3>

                  {certificate.issuer && (
                    <p className="text-slate-300 text-sm">{certificate.issuer}</p>
                  )}

                  {certificate.certificate_url && (
                    <a
                      href={certificate.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm mt-2 inline-flex items-center hover:underline hover:text-blue-300 transition-colors"
                    >
                      Access Certificate
                      <svg
                        className="inline-block w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* Contact Me Section */}
      <div id="contact-me" className="relative z-10 py-20 px-6">
        <h2 className="animate-fade-in-up text-5xl font-bold text-center text-white mb-16">Contact Me</h2>
        <div className="flex justify-center">
          <form onSubmit={handleContactSubmit} className="contact-form hover-lift bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 max-w-lg w-full shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="animate-fade-in-up stagger-1">
                <label htmlFor="firstName" className="block text-slate-300 text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="animate-fade-in-up stagger-2">
                <label htmlFor="lastName" className="block text-slate-300 text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="animate-fade-in-up stagger-3 mb-6">
              <label htmlFor="contactEmail" className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="contactEmail"
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="you@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>
            <div className="animate-fade-in-up stagger-4 mb-6">
              <label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            {formLoading && (
              <div className="animate-fade-in flex justify-center items-center mb-4 text-blue-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <p className="ml-3">Sending message...</p>
              </div>
            )}
            {formMessage && (
              <div className="animate-fade-in bg-green-500/20 border border-green-500 rounded-lg p-3 text-green-200 text-center mb-4">
                {formMessage}
              </div>
            )}
            {formError && (
              <div className="animate-fade-in bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-center mb-4">
                Error: {formError}
              </div>
            )}

            <button
              type="submit"
              className="animate-fade-in-up stagger-5 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg transform hover:scale-105"
              disabled={formLoading}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}