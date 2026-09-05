import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'naf7d8as',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false,
});

const projects = [
  {
    _id: 'proj_pulsydrive',
    _type: 'project',
    title: 'PulsyDrive: Smart Mobility Solution',
    slug: { _type: 'slug', current: 'pulsydrive-smart-mobility-solution' },
    description:
      'PulsyDrive is a low-cost, solar-powered, foldable wheelchair with six adaptive control options (finger, voice, eye, facial, neck, muscle), offering customizable, sustainable mobility and health monitoring for people with limited mobility.',
    category: 'program',
    techStack: [
      'Arduino',
      'EMG & flex sensors',
      'IR module',
      'motors',
      'solar battery',
      'fitness APK',
      'database',
      'API',
    ],
    featured: true,
    order: 1,
  },
  {
    _id: 'proj_tagmyface',
    _type: 'project',
    title: 'TagMyFace: Detect, Recognize, and Annotate Faces',
    slug: { _type: 'slug', current: 'tagmyface-detect-recognize-annotate' },
    description:
      'A face recognition system that can detect and identify people in images or live video. It uses deep learning to match faces and automatically adds their names. One can easily train it with their own images and run it from the command line.',
    category: 'program',
    techStack: ['Python', 'dlib', 'face_recognition', 'OpenCV', 'Pillow', 'pickle'],
    githubUrl: 'https://github.com/inquaid/FaceRecognition_AttachName/blob/main/ditector.py',
    featured: true,
    order: 2,
  },
  {
    _id: 'proj_makeschedule',
    _type: 'project',
    title: 'Make_Schedule – Automated Schedule Generator',
    slug: { _type: 'slug', current: 'make-schedule-automated-generator' },
    description:
      'Make_Schedule is a C++-based application designed to automate the creation of schedules. It processes input data to generate optimized schedules, potentially for educational institutions or organizational use.',
    category: 'GUI',
    techStack: ['Cpp', 'Python', 'CMake'],
    githubUrl: 'https://github.com/inquaid/Make_Schedule',
    featured: false,
    order: 3,
  },
  {
    _id: 'proj_gymmgmt',
    _type: 'project',
    title: 'Gym Management System',
    slug: { _type: 'slug', current: 'gym-management-system' },
    description:
      'Gym Management System is a web-based application designed to streamline gym operations by providing distinct interfaces for Admins, Staff, and Members. It facilitates member management, payment tracking, and overall administrative tasks, ensuring efficient day-to-day gym management.',
    category: 'web',
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/inquaid/gym-management-system',
    featured: false,
    order: 4,
  },
  {
    _id: 'proj_animelist',
    _type: 'project',
    title: 'My Anime List – SOLID Principles Project',
    slug: { _type: 'slug', current: 'my-anime-list-solid-principles' },
    description:
      'My Anime List is a Java-based console application designed to manage and organize a personal anime collection. Built with a focus on demonstrating the SOLID principles of object-oriented design, it allows users to add, display, and filter anime entries through a structured and maintainable codebase.',
    category: 'object oriented',
    techStack: ['Java', 'OOP', 'SOLID'],
    githubUrl: 'https://github.com/inquaid/My_Anime_List',
    featured: false,
    order: 5,
  },
  {
    _id: 'proj_portfolio',
    _type: 'project',
    title: 'Portfolio Website',
    slug: { _type: 'slug', current: 'portfolio-website' },
    description:
      'A responsive portfolio website built with React and Styled Components featuring smooth animations and dark/light mode.',
    category: 'web',
    techStack: ['React', 'TypeScript', 'Styled Components'],
    githubUrl: 'https://github.com/inquaid/portfolio_',
    liveUrl: 'https://azmaininquaid.mind-byte.com/',
    featured: true,
    order: 6,
  },
  {
    _id: 'proj_dotremove',
    _type: 'project',
    title: 'Dot-Remove – Modern File Deletion Tool',
    slug: { _type: 'slug', current: 'dot-remove-modern-file-deletion-tool' },
    description:
      'Dot-Remove is a Python-based desktop application that provides a sleek and minimalistic interface for deleting files with specific extensions from a chosen folder.',
    category: 'desktop',
    techStack: ['Python', 'customtkinter', 'Tkinter', 'PyInstaller'],
    githubUrl: 'https://github.com/inquaid/Dot-Remove',
    featured: false,
    order: 7,
  },
  {
    _id: 'proj_bytewizard',
    _type: 'project',
    title: 'Byte Wizard – Simplified Development Environment Setup',
    slug: { _type: 'slug', current: 'byte-wizard-setup' },
    description:
      'Byte Wizard is a lightweight Windows application designed to automate the installation and configuration of essential development tools. It provides a user-friendly interface to install software like Python, Java, C/C++ compilers, and popular IDEs using Chocolatey, streamlining the setup process for developers.',
    category: 'desktop',
    techStack: ['Python', 'Tkinter', 'Chocolatey', 'Batch', 'PyInstaller'],
    githubUrl: 'https://github.com/inquaid/Byte_Wizard',
    featured: false,
    order: 8,
  },
  {
    _id: 'proj_bankmgmt',
    _type: 'project',
    title: 'Bank Management System – Secure Console-Based Banking Application',
    slug: { _type: 'slug', current: 'bank-management-system' },
    description:
      'Bank Management System is a C-based console application designed to manage core banking operations. It facilitates account creation, user authentication, and transaction handling, ensuring secure management of customer information. The system employs SHA-256 hashing for password security and utilizes text files for data storage.',
    category: 'CLI',
    techStack: ['C', 'CMake', 'SHA-256', 'File I/O'],
    githubUrl: 'https://github.com/inquaid/BankManagementSystem',
    featured: false,
    order: 9,
  },
  {
    _id: 'proj_tiktaktoe',
    _type: 'project',
    title: 'Tik-Tak-Toe – Classic Game with Java Swing GUI',
    slug: { _type: 'slug', current: 'tik-tak-toe-java-swing' },
    description:
      'Tik-Tak-Toe is a simple desktop application that brings the classic Tic Tac Toe game to life using Java and Swing. It features a clean 3x3 grid interface where two players take turns marking X or O.',
    category: 'GUI',
    techStack: ['Java', 'Swing'],
    githubUrl: 'https://github.com/inquaid/Tik-Tak-Toe',
    featured: false,
    order: 10,
  },
  {
    _id: 'proj_studentmgmt',
    _type: 'project',
    title: 'Student Management System – Java-Based Academic Record Manager',
    slug: { _type: 'slug', current: 'student-management-system' },
    description:
      'Student Management System is a comprehensive Java application designed to streamline the management of student records. It offers robust operations such as adding, updating, deleting, and sorting student information. The system ensures data persistence through both SQL databases and file serialization, providing flexibility in data storage.',
    category: 'GUI',
    techStack: ['Java', 'Swing', 'AWT', 'SQL', 'Java Serialization'],
    githubUrl: 'https://github.com/inquaid/Student_Management_System',
    featured: false,
    order: 11,
  },
  {
    _id: 'proj_projectcar',
    _type: 'project',
    title: 'Project Car – Interactive C Graphics Animation',
    slug: { _type: 'slug', current: 'project-car-interactive-animation' },
    description:
      'Project Car is a C-based console app that uses graphics.h to animate a car moving across the screen. Users can control its speed and direction via keyboard input. The scene includes static backgrounds like trees and rocks, ending with a "GAME OVER" screen and a beep.',
    category: 'GUI',
    techStack: ['C', 'graphics.h', 'Turbo C++', 'conio.h', 'dos.h', 'windows.h', 'math.h'],
    githubUrl: 'https://github.com/inquaid/Project_Car',
    featured: false,
    order: 12,
  },
];

async function seedProjects() {
  console.log('Seeding projects to Sanity...');
  for (const p of projects) {
    await client.createOrReplace(p);
  }
  console.log(`✅ Successfully seeded ${projects.length} projects to Sanity Content Lake!`);
}

seedProjects().catch((err) => {
  console.error('Error seeding projects:', err);
  process.exit(1);
});
