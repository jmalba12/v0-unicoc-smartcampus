// UNICOC SmartCampus - Type Definitions

export interface Student {
  id: string;
  code: string;
  fullName: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  facultyId: string;
  programId: string;
  semester: number;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  gpa: number;
  approvedCredits: number;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  code: string;
  fullName: string;
  specialty: string;
  facultyId: string;
  email: string;
  phone: string;
  schedule: string;
  contractType: 'full-time' | 'part-time' | 'hourly';
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  coordinatorId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  credits: number;
  modality: 'presencial' | 'virtual' | 'hybrid';
  qualifiedRegistry: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  period: string;
  cut1: number;
  cut2: number;
  cut3: number;
  finalExam: number;
  finalGrade: number;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  programId: string;
  semester: number;
  teacherId?: string;
}

export interface Schedule {
  id: string;
  subjectId: string;
  teacherId: string;
  classroom: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  period: string;
}

export interface Payment {
  id: string;
  studentId: string;
  concept: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
  invoiceNumber: string;
  createdAt: Date;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  location: string;
}

export interface BookLoan {
  id: string;
  bookId: string;
  studentId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fine?: number;
  status: 'active' | 'returned' | 'overdue';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'sports' | 'culture' | 'academic' | 'psychology' | 'other';
  date: Date;
  location: string;
  capacity?: number;
  registrations: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coordinator' | 'teacher' | 'student' | 'finance';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalFaculties: number;
  totalPrograms: number;
  monthlyRevenue: number;
  activeStudents: number;
  academicAlerts: number;
}
