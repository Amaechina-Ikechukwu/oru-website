/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnnouncementCategory, Course } from "./types";

export const INSTITUTION_INFO = {
  name: "ORAL ROBERTS UNIVERSITY, TULSA OKLAHOMA",
  nigerianAffiliate: "Peace land University Enugu",
  centerName: "Port Harcourt Study Center, Nigeria",
  address: "Methodist Church Premises, Mbonu/Ohaeto Street, D/Line, Port Harcourt, Rivers State, Nigeria.",
  emails: {
    general: "info@oruphstudycampus.org",
    admissions: "admissions@oruphstudycampus.org",
    registrar: "registrar@oruphstudycampus.org",
    support: "support@oruphstudycampus.org",
    director: "director@oruphstudycampus.org",
    academics: "academics@oruphstudycampus.org",
    finance: "finance@oruphstudycampus.org"
  },
  phones: [
    "+234 810 408 9817"
  ],
  whatsapp: "2348104089817",
  domains: [
    "oruphstudycampus.org",
    "orunigeria.org",
    "oruportharcourt.edu.ng"
  ],
  bankDetails: {
    bankName: "Monie point",
    accountName: "Southern bible college",
    accountNumber: "5216024388",
    paymentTerms: "Payment can be done in installments, two or three times during the course duration."
  },
  registrationRequirements: "Registration includes past certificates, two passport photos, etc."
};

export const PROGRAMS = [
  {
    id: "theology",
    title: "Theology & Ministry",
    duration: "4 Years (Degree) / 2 Years (Diploma)",
    description: "Deep theological foundations, Biblical hermeneutics, and pastoral leadership training to prepare you for global ministerial impact.",
    requirements: "5 O'Level credits including English Language and Christian Religious Studies (CRS).",
    careerPaths: ["Pastor", "Missionary", "Theological Educator", "Parachurch Director"]
  },
  {
    id: "leadership",
    title: "Leadership Studies",
    duration: "4 Years (Degree) / 1 Year (Cert)",
    description: "Equipping change-makers with core organizational strategy, ethical frameworks, and public sector stewardship grounded in Christian integrity.",
    requirements: "5 O'Level credits including English Language and Mathematics.",
    careerPaths: ["Corporate Executive", "NGO Director", "Public Administrator", "Community Organizer"]
  },
  {
    id: "business",
    title: "Business Administration & Philosophy",
    duration: "Available at all levels",
    description: "Modern commerce, financial management, business ethics, and philosophical foundations taught through a lens of biblical stewardship.",
    requirements: "5 O'Level credits including English Language, Mathematics, and Economics.",
    careerPaths: ["Business Consultant", "Financial Analyst", "Operations Manager", "Entrepreneur"]
  },
  {
    id: "education",
    title: "Education (Peace land University Approved)",
    duration: "Varies depending on programme",
    description: "Approved by Peace land University Enugu, our programmes include Bachelor of Education (B.Ed.), Master of Education (M.Ed.) in Guidance and Counselling, Master of Education (M.Ed.) in Educational Management, Postgraduate Diploma in Education (PGDE), and Professional Diploma in Education (PDE).",
    requirements: "Relevant degrees/O'Level credits based on PG, Masters or Bachelor entry.",
    careerPaths: ["School Administrator", "Curriculum Designer", "Educational Consultant", "Classroom Educator"]
  },
  {
    id: "management",
    title: "Management Courses",
    duration: "Available at all levels",
    description: "Comprehensive management training bridging strategic leadership and effective administration.",
    requirements: "5 O'Level credits including English and Mathematics.",
    careerPaths: ["Project Manager", "General Manager", "Administrative Officer"]
  },
  {
    id: "computer-science",
    title: "Computer Science",
    duration: "4 Years (Degree)",
    description: "Software engineering, networking, systems analysis, and technological leadership to architect future digital solutions with moral clarity.",
    requirements: "5 O'Level credits including English, Mathematics, Physics, and Chemistry.",
    careerPaths: ["Software Developer", "Web Architect", "Database Administrator", "Tech Lead"]
  },
  {
    id: "counseling",
    title: "Guidance & Counseling / Christian Studies",
    duration: "4 Years (Degree)",
    description: "Human development knowledge integrated with biblical Counseling protocols to guide families and individuals through life transformations.",
    requirements: "5 O'Level credits including English Language and relevant arts/sciences.",
    careerPaths: ["Christian Counselor", "Guidance Counselor", "Mental Health Guide", "Youth Mentor"]
  },
  {
    id: "peace-conflict",
    title: "Conflict Resolution & Peace Studies",
    duration: "4 Years (Degree) / Postgraduate",
    description: "Specialized training in resolving disputes, peacebuilding, and Christian conflict mediation.",
    requirements: "5 O'Level credits including English Language and Government/History.",
    careerPaths: ["Strategic Conflict Mediator", "Diplomat", "Policy Analyst", "NGO Coordinator"]
  },
  {
    id: "certifications",
    title: "Professional Certification Programs",
    duration: "3 to 6 Months",
    description: "Short-term targeted professional advancements in executive ministry development, Christian conflict resolution, and strategic leadership.",
    requirements: "Tertiary school certificate or letter of recommendation from your local assembly.",
    careerPaths: ["Certified Church Administrator", "Strategic Conflict Mediator", "Executive Church Coordinator"]
  }
];

export const STUDY_CENTER_INFO = {
  title: "Port Harcourt Study Center Environment",
  description: "Located within the serene and easily accessible D/Line district inside the historic Methodist Church Premises, our Port Harcourt center is tailored to fit the schedules of working professionals, ministers, and full-time aspirants.",
  features: [
    {
      title: "Flexible Scheduling",
      desc: "Weekend face-to-face modules and hybrid evening learning tracks designed to balance ministry, career, and university education seamlessly."
    },
    {
      title: "Interactive Classroom",
      desc: "High-speed Wi-Fi, modern audio-visual learning equipment, and expansive research resources available for every enrolled fellow."
    },
    {
      title: "Spiritual Worship Space",
      desc: "Daily morning devotionals and weekly corporate fellowships in partnership with local church assemblies inside the Methodist Premises."
    },
    {
      title: "Affiliate Collaboration",
      desc: "Local administrative frameworks powered by Peace land University Enugu to guarantee swift credential evaluations and domestic academic support."
    }
  ],
  lectureSchedule: {
    modes: "Mode of study: Online, Class room, Executives Classes etc.",
    weekday: "Evening Classes: Tuesday & Thursday (5:00 PM - 8:00 PM)",
    weekend: "Weekend Block Lectures: Friday (4:00 PM - 8:00 PM) & Saturday (9:00 AM - 6:00 PM)",
    online: "Virtual Modules: Accessible 24/7 via the ORU Global Learning Management Portal"
  }
};

export const COURSES: Course[] = [
  // Theology & Ministry
  { id: "THE-101", code: "THE-101", title: "Introduction to Biblical Theology", credits: 3, semester: "Semester 1", program: "Theology & Ministry" },
  { id: "THE-102", code: "THE-102", title: "Hermeneutics & Biblical Interpretation", credits: 3, semester: "Semester 1", program: "Theology & Ministry" },
  { id: "THE-201", code: "THE-201", title: "Systematic Theology & Doctrine", credits: 4, semester: "Semester 2", program: "Theology & Ministry" },
  { id: "THE-203", code: "THE-203", title: "Homiletics & Effective Preaching", credits: 2, semester: "Semester 2", program: "Theology & Ministry" },

  // Leadership Studies
  { id: "LDR-101", code: "LDR-101", title: "Foundations of Servant Leadership", credits: 3, semester: "Semester 1", program: "Leadership Studies" },
  { id: "LDR-102", code: "LDR-102", title: "Ethics & Integrity in Stewardship", credits: 3, semester: "Semester 1", program: "Leadership Studies" },
  { id: "LDR-205", code: "LDR-205", title: "Organizational Culture & Strategic Planning", credits: 4, semester: "Semester 2", program: "Leadership Studies" },

  // Business Administration
  { id: "BUS-101", code: "BUS-101", title: "Principles of Christian Business Ethics", credits: 3, semester: "Semester 1", program: "Business Administration" },
  { id: "BUS-110", code: "BUS-110", title: "Financial Accounting & Stewardship", credits: 3, semester: "Semester 1", program: "Business Administration" },
  { id: "BUS-204", code: "BUS-204", title: "Marketing Strategy & Consumer Insights", credits: 3, semester: "Semester 2", program: "Business Administration" },

  // Computer Science
  { id: "CSC-101", code: "CSC-101", title: "Introduction to Algorithmic Reasoning", credits: 3, semester: "Semester 1", program: "Computer Science" },
  { id: "CSC-105", code: "CSC-105", title: "Web Technologies & UI/UX Systems", credits: 3, semester: "Semester 1", program: "Computer Science" },
  { id: "CSC-201", code: "CSC-201", title: "Object-Oriented Programming (TypeScript)", credits: 4, semester: "Semester 2", program: "Computer Science" },

  // General Educational Courses
  { id: "GEN-101", code: "GEN-101", title: "Life and Vision of Oral Roberts", credits: 2, semester: "Semester 1", program: "All Programs" },
  { id: "GEN-102", code: "GEN-102", title: "The Holy Spirit in Contemporary History", credits: 2, semester: "Semester 2", program: "All Programs" }
];

export const EMAIL_INTRO_TEMPLATE = {
  subject: "Welcome to Oral Roberts University Port Harcourt Study Center",
  body: `Dear Sir/Madam,

Greetings from Oral Roberts University Tulsa Oklahoma, affiliated in Nigeria with Peace land University Enugu.

We are pleased to introduce our Port Harcourt Study Center located at the Methodist Church Premises, Mbonu/Ohaeto Street, D/Line, Port Harcourt, Rivers State, Nigeria.

Our institution is committed to providing quality education rooted in academic excellence, leadership development, integrity, and Christian values. We offer flexible and globally relevant programs designed to prepare students for impactful careers and transformational leadership.

Admissions are currently ongoing for qualified candidates into various academic and professional programs.

For inquiries and admissions assistance, kindly contact us through:
Email: admissions@oruphstudycampus.org
Phone: +234 803 123 4567

We look forward to welcoming you into our academic community.

Yours faithfully,
Management, Oral Roberts University Port Harcourt Study Center`
};

export const SAMPLE_ANNOUNCEMENTS = [
  {
    id: "ann-000",
    title: "Honorary Doctorate/Professorship Award & Matriculation",
    content: "Christ-Centered School of Theology & Dynamic School of Arts and Social Sciences successfully hosted a historic Matriculation and Honorary Doctorate/Professorship Award Ceremony. The event celebrated our matriculating scholars and honored distinguished individuals shaping the community and global ministry.",
    category: AnnouncementCategory.EVENT,
    dateString: "May 15, 2026",
    createdAt: new Date("2026-05-15T09:00:00Z")
  },
  {
    id: "ann-001",
    title: "Admissions Opened for 2026/2027 Session",
    content: "Oral Roberts University Tulsa Oklahoma, Port Harcourt Study Center is pleased to announce that application portals are officially open for dynamic candidates seeking quality Christian-centered undergraduate education and professional certifications. Apply online or visit our Center today for personalized counseling.",
    category: AnnouncementCategory.NEWS,
    dateString: "June 05, 2026",
    createdAt: new Date("2026-06-05T08:00:00Z")
  },
  {
    id: "ann-002",
    title: "Joint Academic Seminar with Coal City University",
    content: "We are hosting an executive academic seminar on 'Integrity-Centered Leadership in a Tech-Driven World' on July 20th. Keynotes will be delivered by professors from Coal City University Enugu and guest coordinators from ORU Tulsa Oklahoma. Enrolled students and ministers of the gospel are highly encouraged to attend.",
    category: AnnouncementCategory.SEMINAR,
    dateString: "June 12, 2026",
    createdAt: new Date("2026-06-12T09:30:00Z")
  },
  {
    id: "ann-003",
    title: "Flexible Weekend Cohort Induction Ceremony",
    content: "The matriculatory orientation for our newborn weekend Computer Science and Theology cohorts will take place at the Methodist Church Premises, Port Harcourt. This interactive reception is designed to set clear goals, distribute schedules, and network with leading lecturers.",
    category: AnnouncementCategory.EVENT,
    dateString: "June 25, 2026",
    createdAt: new Date("2026-06-25T14:00:00Z")
  }
];

export const FAQ = [
  {
    question: "Is the degree or certificate separate from ORU Tulsa Oklahoma?",
    answer: "The academic standards, curricula, and final assessments align with ORU Tulsa standards. Our Port Harcourt center is partnered locally under an academic affiliation with Peace land University Enugu to fulfill professional learning compliance."
  },
  {
    question: "How flexible are the courses for active workers & pastors?",
    answer: "Extremely flexible! Our mode of study includes Online, Class room, Executives Classes etc. Weekend block classes occur mostly on Fridays (evenings) and Saturdays (all day) to ensure you don't miss work hours. We also have high-speed hybrid virtual resources available for remote revisions."
  },
  {
    question: "What is the fee structure?",
    answer: "Payments can be done in installments, two or three times during the course duration. Payments are to be made into our official bank account (Monie point: Southern bible college, Acc No: 5216024388)."
  },
  {
    question: "What are the registration requirements?",
    answer: "Registration requirements include your past certificates, two passport-sized photographs, and other relevant documents."
  }
];
