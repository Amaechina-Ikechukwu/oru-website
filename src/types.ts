/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ApplicationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  ENROLLED = "enrolled",
}

export enum StudentStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  GRADUATED = "graduated",
}

export enum AnnouncementCategory {
  NEWS = "News",
  EVENT = "Event",
  SEMINAR = "Seminar",
  ACADEMIC = "Academic",
  GENERAL = "General",
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  academicBackground: string;
  status: ApplicationStatus;
  createdAt: any; // Firestore serverTimestamp or Date
  updatedAt: any;
  amountPaid: number;
  paymentReference: string;
  gender: string;
  address: string;
  birthDate: string;
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
  matricNumber: string;
  program: string;
  status: StudentStatus;
  createdAt: any;
  updatedAt: any;
  enrolledCourses: string[];
  paidTuition: number;
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  text: string;
  recipient?: string;
  createdAt: any;
  isReply?: boolean;
  parentMessageId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  dateString: string;
  image?: string;
  createdAt: any;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: string;
  program: string;
}
