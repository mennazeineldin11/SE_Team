// src/data.js

// 1) Initial list of companies
export const initialCompanies = [
  { id:  1, name: 'Tech Innovators',       contact: 'tech@innovators.com',          industry: 'Technology',    description: 'A cutting-edge R&D firm focused on AI and IoT solutions.',              status: 'Pending' },
  { id:  2, name: 'AI Nexus',              contact: 'contact@ainexus.com',           industry: 'Technology',    description: 'Provides machine learning platforms for enterprise.',                        status: 'Pending' },
  { id:  3, name: 'CodeWorks',             contact: 'hello@codeworks.com',           industry: 'Technology',    description: 'Custom software development and consulting services.',                      status: 'Pending' },
  { id:  4, name: 'Green Earth Solutions', contact: 'contact@greenearth.com',        industry: 'Environmental', description: 'Sustainable waste-management and recycling services.',                       status: 'Pending' },
  { id:  5, name: 'EcoGuard Systems',      contact: 'info@ecoguard.com',             industry: 'Environmental', description: 'Air and water quality monitoring technology.',                               status: 'Pending' },
  { id:  6, name: 'Blue Ocean Recycling',  contact: 'support@blueoceanrecycle.com',  industry: 'Environmental', description: 'Ocean cleanup and plastics upcycling programs.',                             status: 'Pending' },
  { id:  7, name: 'Smart Robotics Inc.',   contact: 'info@smartrobotics.com',        industry: 'Manufacturing', description: 'Designs and manufactures autonomous industrial robots.',                    status: 'Pending' },
  { id:  8, name: 'Precision Automation',  contact: 'sales@precisionauto.com',      industry: 'Manufacturing', description: 'High-precision CNC machining and automation.',                               status: 'Pending' },
  { id:  9, name: 'MetalForge Ltd.',       contact: 'contact@metalforge.com',        industry: 'Manufacturing', description: 'Custom metal fabrication and prototyping services.',                         status: 'Pending' },
  { id: 10, name: 'EduTech Hub',           contact: 'support@edutech.com',          industry: 'Education',    description: 'Creates e-learning platforms and virtual classrooms.',                        status: 'Pending' },
  { id: 11, name: 'Learnify',              contact: 'info@learnify.com',            industry: 'Education',    description: 'Adaptive learning software for K–12 students.',                              status: 'Pending' },
  { id: 12, name: 'CodeCampus',            contact: 'hello@codecampus.com',         industry: 'Education',    description: 'Bootcamp-style coding courses and certifications.',                          status: 'Pending' },
];

// 2) Dummy users for fake login
export const USERS = [
  { email: 'student@guc.com',    password: 'pass', role: 'Student'        },
  { email: 'prostudent@guc.com', password: 'pass', role: 'PRO Student'    },
  { email: 'scad@guc.com',       password: 'pass', role: 'SCAD Office'    },
  { email: 'faculty@guc.com',    password: 'pass', role: 'Faculty Member' },
];

// src/data.js

export const initialInternships = [
  {
    id: 1,
    company:   'Tech Innovators',
    title:     'Frontend Developer',
    industry:  'Technology',
    duration:  '3 months',
    paid:      true,
    salary:    '1200 USD/month',
    skills:    ['React', 'CSS', 'HTML'],
    description:
      'Implement and maintain user-facing features using React and modern CSS techniques.',
  },
  {
    id: 2,
    company:   'Green Earth',
    title:     'Environmental Analyst',
    industry:  'Environmental',
    duration:  '6 months',
    paid:      false,
    salary:    'N/A',
    skills:    ['Data Analysis', 'GIS', 'Reporting'],
    description:
      'Collect and analyze environmental data to support sustainability initiatives.',
  },
  {
    id: 3,
    company:   'Smart Robotics Inc.',
    title:     'Embedded Engineer',
    industry:  'Manufacturing',
    duration:  '4 months',
    paid:      true,
    salary:    '1500 USD/month',
    skills:    ['C/C++', 'Microcontrollers', 'Debugging'],
    description:
      'Design and test embedded firmware for industrial robotic systems.',
  },
  {
    id: 4,
    company:   'EduTech Hub',
    title:     'Instructional Designer',
    industry:  'Education',
    duration:  '2 months',
    paid:      false,
    salary:    'N/A',
    skills:    ['Curriculum Design', 'eLearning', 'Storyboarding'],
    description:
      'Develop engaging online course materials and interactive learning modules.',
  },
  // …more entries…
];


// 3) Dummy documents for download
export const documents = [
  { id: 1, name: 'Internship_Report_TechCorp.pdf',    url: '/docs/sample.pdf' },
  { id: 2, name: 'Evaluation_HealthPlus.pdf',        url: '/docs/sample.pdf' },
  { id: 3, name: 'Final_Report_SmartRobotics.pdf',   url: '/docs/sample.pdf' },
 
];

