// UNICOC SmartCampus - Mock Data

import type { Student, Teacher, Faculty, Program, Grade, Subject, Schedule, Payment, LibraryBook, BookLoan, Event, User, Notification, DashboardStats } from './types';

export const faculties: Faculty[] = [
  { id: '1', name: 'Facultad de Ingeniería', code: 'FI', coordinatorId: '1', description: 'Formación de profesionales en áreas de ingeniería', createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '2', name: 'Facultad de Ciencias de la Salud', code: 'FCS', coordinatorId: '2', description: 'Formación integral en ciencias de la salud', createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '3', name: 'Facultad de Ciencias Económicas', code: 'FCE', coordinatorId: '3', description: 'Líderes en gestión empresarial y finanzas', createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '4', name: 'Facultad de Derecho', code: 'FD', coordinatorId: '4', description: 'Profesionales en derecho y justicia', createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '5', name: 'Facultad de Humanidades', code: 'FH', coordinatorId: '5', description: 'Arte, comunicación y ciencias sociales', createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
];

export const programs: Program[] = [
  { id: '1', code: 'ISI', name: 'Ingeniería de Sistemas', facultyId: '1', credits: 160, modality: 'presencial', qualifiedRegistry: 'SNIES-12345', duration: 10, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '2', code: 'ICI', name: 'Ingeniería Civil', facultyId: '1', credits: 170, modality: 'presencial', qualifiedRegistry: 'SNIES-12346', duration: 10, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '3', code: 'MED', name: 'Medicina', facultyId: '2', credits: 280, modality: 'presencial', qualifiedRegistry: 'SNIES-12347', duration: 12, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '4', code: 'ODO', name: 'Odontología', facultyId: '2', credits: 220, modality: 'presencial', qualifiedRegistry: 'SNIES-12348', duration: 10, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '5', code: 'ADM', name: 'Administración de Empresas', facultyId: '3', credits: 140, modality: 'hybrid', qualifiedRegistry: 'SNIES-12349', duration: 9, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '6', code: 'CON', name: 'Contaduría Pública', facultyId: '3', credits: 145, modality: 'presencial', qualifiedRegistry: 'SNIES-12350', duration: 9, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '7', code: 'DER', name: 'Derecho', facultyId: '4', credits: 160, modality: 'presencial', qualifiedRegistry: 'SNIES-12351', duration: 10, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '8', code: 'PSI', name: 'Psicología', facultyId: '5', credits: 150, modality: 'presencial', qualifiedRegistry: 'SNIES-12352', duration: 10, createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
];

export const students: Student[] = [
  { id: '1', code: '2024001', fullName: 'María García López', document: '1098765432', email: 'maria.garcia@unicoc.edu.co', phone: '3001234567', address: 'Calle 45 #23-12, Bogotá', facultyId: '1', programId: '1', semester: 6, status: 'active', gpa: 4.2, approvedCredits: 96, photoUrl: '/avatars/student-1.jpg', createdAt: new Date('2021-01-15'), updatedAt: new Date('2024-01-01') },
  { id: '2', code: '2024002', fullName: 'Carlos Rodríguez Martínez', document: '1087654321', email: 'carlos.rodriguez@unicoc.edu.co', phone: '3012345678', address: 'Carrera 50 #30-45, Medellín', facultyId: '1', programId: '2', semester: 4, status: 'active', gpa: 3.8, approvedCredits: 64, photoUrl: '/avatars/student-2.jpg', createdAt: new Date('2022-01-15'), updatedAt: new Date('2024-01-01') },
  { id: '3', code: '2024003', fullName: 'Ana Sofía Ramírez', document: '1076543210', email: 'ana.ramirez@unicoc.edu.co', phone: '3023456789', address: 'Avenida 68 #45-30, Cali', facultyId: '2', programId: '3', semester: 8, status: 'active', gpa: 4.5, approvedCredits: 192, photoUrl: '/avatars/student-3.jpg', createdAt: new Date('2020-01-15'), updatedAt: new Date('2024-01-01') },
  { id: '4', code: '2024004', fullName: 'Juan Pablo Torres', document: '1065432109', email: 'juan.torres@unicoc.edu.co', phone: '3034567890', address: 'Calle 72 #15-20, Barranquilla', facultyId: '3', programId: '5', semester: 5, status: 'active', gpa: 3.5, approvedCredits: 70, photoUrl: '/avatars/student-4.jpg', createdAt: new Date('2022-07-15'), updatedAt: new Date('2024-01-01') },
  { id: '5', code: '2024005', fullName: 'Valentina Herrera Díaz', document: '1054321098', email: 'valentina.herrera@unicoc.edu.co', phone: '3045678901', address: 'Carrera 30 #50-15, Bucaramanga', facultyId: '4', programId: '7', semester: 3, status: 'active', gpa: 4.0, approvedCredits: 48, photoUrl: '/avatars/student-5.jpg', createdAt: new Date('2023-01-15'), updatedAt: new Date('2024-01-01') },
  { id: '6', code: '2024006', fullName: 'Santiago Mendoza Cruz', document: '1043210987', email: 'santiago.mendoza@unicoc.edu.co', phone: '3056789012', address: 'Diagonal 25 #80-45, Pereira', facultyId: '1', programId: '1', semester: 7, status: 'active', gpa: 3.9, approvedCredits: 112, createdAt: new Date('2021-07-15'), updatedAt: new Date('2024-01-01') },
  { id: '7', code: '2024007', fullName: 'Isabella Moreno Vargas', document: '1032109876', email: 'isabella.moreno@unicoc.edu.co', phone: '3067890123', address: 'Transversal 40 #22-18, Cartagena', facultyId: '2', programId: '4', semester: 6, status: 'suspended', gpa: 2.8, approvedCredits: 90, createdAt: new Date('2021-01-15'), updatedAt: new Date('2024-01-01') },
  { id: '8', code: '2024008', fullName: 'Mateo Castillo Jiménez', document: '1021098765', email: 'mateo.castillo@unicoc.edu.co', phone: '3078901234', address: 'Calle 100 #35-60, Bogotá', facultyId: '5', programId: '8', semester: 9, status: 'active', gpa: 4.3, approvedCredits: 135, createdAt: new Date('2020-07-15'), updatedAt: new Date('2024-01-01') },
  { id: '9', code: '2024009', fullName: 'Camila Ortiz Peña', document: '1010987654', email: 'camila.ortiz@unicoc.edu.co', phone: '3089012345', address: 'Carrera 15 #82-30, Bogotá', facultyId: '3', programId: '6', semester: 4, status: 'active', gpa: 3.7, approvedCredits: 58, createdAt: new Date('2023-01-15'), updatedAt: new Date('2024-01-01') },
  { id: '10', code: '2024010', fullName: 'Daniel Suárez Ríos', document: '1009876543', email: 'daniel.suarez@unicoc.edu.co', phone: '3090123456', address: 'Avenida Suba #140-25, Bogotá', facultyId: '1', programId: '2', semester: 10, status: 'graduated', gpa: 4.1, approvedCredits: 170, createdAt: new Date('2019-01-15'), updatedAt: new Date('2024-01-01') },
];

export const teachers: Teacher[] = [
  { id: '1', code: 'DOC001', fullName: 'Dr. Roberto Sánchez González', specialty: 'Desarrollo de Software', facultyId: '1', email: 'roberto.sanchez@unicoc.edu.co', phone: '3101234567', schedule: 'Lunes a Viernes 8:00-16:00', contractType: 'full-time', photoUrl: '/avatars/teacher-1.jpg', createdAt: new Date('2018-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '2', code: 'DOC002', fullName: 'Dra. Patricia Fernández Luna', specialty: 'Anatomía Humana', facultyId: '2', email: 'patricia.fernandez@unicoc.edu.co', phone: '3112345678', schedule: 'Lunes a Viernes 7:00-15:00', contractType: 'full-time', photoUrl: '/avatars/teacher-2.jpg', createdAt: new Date('2017-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '3', code: 'DOC003', fullName: 'Mg. Fernando Castro Reyes', specialty: 'Finanzas Corporativas', facultyId: '3', email: 'fernando.castro@unicoc.edu.co', phone: '3123456789', schedule: 'Martes y Jueves 18:00-21:00', contractType: 'part-time', photoUrl: '/avatars/teacher-3.jpg', createdAt: new Date('2019-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '4', code: 'DOC004', fullName: 'Dra. Lucia Martínez Vega', specialty: 'Derecho Constitucional', facultyId: '4', email: 'lucia.martinez@unicoc.edu.co', phone: '3134567890', schedule: 'Lunes a Viernes 9:00-17:00', contractType: 'full-time', photoUrl: '/avatars/teacher-4.jpg', createdAt: new Date('2016-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '5', code: 'DOC005', fullName: 'Dr. Andrés Mejía Ríos', specialty: 'Psicología Clínica', facultyId: '5', email: 'andres.mejia@unicoc.edu.co', phone: '3145678901', schedule: 'Lunes, Miércoles y Viernes 8:00-14:00', contractType: 'part-time', photoUrl: '/avatars/teacher-5.jpg', createdAt: new Date('2020-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '6', code: 'DOC006', fullName: 'Mg. Carolina Ruiz Ospina', specialty: 'Bases de Datos', facultyId: '1', email: 'carolina.ruiz@unicoc.edu.co', phone: '3156789012', schedule: 'Lunes a Viernes 10:00-18:00', contractType: 'full-time', createdAt: new Date('2021-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '7', code: 'DOC007', fullName: 'Dr. Miguel Ángel Parra', specialty: 'Cirugía General', facultyId: '2', email: 'miguel.parra@unicoc.edu.co', phone: '3167890123', schedule: 'Lunes a Sábado 6:00-12:00', contractType: 'full-time', createdAt: new Date('2015-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '8', code: 'DOC008', fullName: 'Esp. Diana Contreras Mora', specialty: 'Marketing Digital', facultyId: '3', email: 'diana.contreras@unicoc.edu.co', phone: '3178901234', schedule: 'Sábados 8:00-16:00', contractType: 'hourly', createdAt: new Date('2022-01-01'), updatedAt: new Date('2024-01-01') },
];

export const subjects: Subject[] = [
  { id: '1', code: 'ISI101', name: 'Programación I', credits: 4, programId: '1', semester: 1, teacherId: '1' },
  { id: '2', code: 'ISI201', name: 'Estructuras de Datos', credits: 4, programId: '1', semester: 2, teacherId: '1' },
  { id: '3', code: 'ISI301', name: 'Bases de Datos', credits: 3, programId: '1', semester: 3, teacherId: '6' },
  { id: '4', code: 'ISI401', name: 'Ingeniería de Software', credits: 4, programId: '1', semester: 4, teacherId: '1' },
  { id: '5', code: 'MED101', name: 'Anatomía I', credits: 6, programId: '3', semester: 1, teacherId: '2' },
  { id: '6', code: 'MED201', name: 'Fisiología', credits: 5, programId: '3', semester: 2, teacherId: '2' },
  { id: '7', code: 'ADM101', name: 'Fundamentos de Administración', credits: 3, programId: '5', semester: 1, teacherId: '3' },
  { id: '8', code: 'DER101', name: 'Derecho Constitucional', credits: 4, programId: '7', semester: 1, teacherId: '4' },
  { id: '9', code: 'PSI101', name: 'Psicología General', credits: 3, programId: '8', semester: 1, teacherId: '5' },
  { id: '10', code: 'ADM301', name: 'Marketing', credits: 3, programId: '5', semester: 3, teacherId: '8' },
];

export const grades: Grade[] = [
  { id: '1', studentId: '1', subjectId: '1', period: '2024-1', cut1: 4.5, cut2: 4.2, cut3: 4.0, finalExam: 4.3, finalGrade: 4.25, teacherId: '1', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-01') },
  { id: '2', studentId: '1', subjectId: '2', period: '2024-1', cut1: 4.0, cut2: 4.5, cut3: 4.2, finalExam: 4.1, finalGrade: 4.2, teacherId: '1', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-01') },
  { id: '3', studentId: '3', subjectId: '5', period: '2024-1', cut1: 4.8, cut2: 4.6, cut3: 4.5, finalExam: 4.7, finalGrade: 4.65, teacherId: '2', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-01') },
  { id: '4', studentId: '4', subjectId: '7', period: '2024-1', cut1: 3.5, cut2: 3.8, cut3: 3.2, finalExam: 3.6, finalGrade: 3.52, teacherId: '3', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-01') },
  { id: '5', studentId: '5', subjectId: '8', period: '2024-1', cut1: 4.0, cut2: 4.2, cut3: 3.9, finalExam: 4.0, finalGrade: 4.02, teacherId: '4', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-01') },
];

export const schedules: Schedule[] = [
  { id: '1', subjectId: '1', teacherId: '1', classroom: 'Lab 101', dayOfWeek: 1, startTime: '08:00', endTime: '10:00', period: '2024-2' },
  { id: '2', subjectId: '1', teacherId: '1', classroom: 'Lab 101', dayOfWeek: 3, startTime: '08:00', endTime: '10:00', period: '2024-2' },
  { id: '3', subjectId: '2', teacherId: '1', classroom: 'Lab 102', dayOfWeek: 2, startTime: '10:00', endTime: '12:00', period: '2024-2' },
  { id: '4', subjectId: '3', teacherId: '6', classroom: 'Lab 103', dayOfWeek: 4, startTime: '14:00', endTime: '16:00', period: '2024-2' },
  { id: '5', subjectId: '5', teacherId: '2', classroom: 'Anfiteatro A', dayOfWeek: 1, startTime: '07:00', endTime: '10:00', period: '2024-2' },
  { id: '6', subjectId: '5', teacherId: '2', classroom: 'Anfiteatro A', dayOfWeek: 3, startTime: '07:00', endTime: '10:00', period: '2024-2' },
  { id: '7', subjectId: '7', teacherId: '3', classroom: 'Aula 301', dayOfWeek: 2, startTime: '18:00', endTime: '21:00', period: '2024-2' },
  { id: '8', subjectId: '8', teacherId: '4', classroom: 'Aula 401', dayOfWeek: 1, startTime: '09:00', endTime: '11:00', period: '2024-2' },
];

export const payments: Payment[] = [
  { id: '1', studentId: '1', concept: 'Matrícula Semestre 2024-2', amount: 4500000, status: 'paid', dueDate: new Date('2024-07-15'), paidDate: new Date('2024-07-10'), invoiceNumber: 'FAC-2024-001', createdAt: new Date('2024-06-01') },
  { id: '2', studentId: '2', concept: 'Matrícula Semestre 2024-2', amount: 4800000, status: 'pending', dueDate: new Date('2024-07-30'), invoiceNumber: 'FAC-2024-002', createdAt: new Date('2024-06-01') },
  { id: '3', studentId: '3', concept: 'Matrícula Semestre 2024-2', amount: 8500000, status: 'paid', dueDate: new Date('2024-07-15'), paidDate: new Date('2024-07-01'), invoiceNumber: 'FAC-2024-003', createdAt: new Date('2024-06-01') },
  { id: '4', studentId: '4', concept: 'Matrícula Semestre 2024-2', amount: 3800000, status: 'overdue', dueDate: new Date('2024-07-01'), invoiceNumber: 'FAC-2024-004', createdAt: new Date('2024-06-01') },
  { id: '5', studentId: '5', concept: 'Matrícula Semestre 2024-2', amount: 4200000, status: 'paid', dueDate: new Date('2024-07-15'), paidDate: new Date('2024-07-14'), invoiceNumber: 'FAC-2024-005', createdAt: new Date('2024-06-01') },
  { id: '6', studentId: '1', concept: 'Certificado de Notas', amount: 25000, status: 'paid', dueDate: new Date('2024-08-01'), paidDate: new Date('2024-08-01'), invoiceNumber: 'FAC-2024-100', createdAt: new Date('2024-08-01') },
];

export const libraryBooks: LibraryBook[] = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Ingeniería', available: true, location: 'Estante A-12' },
  { id: '2', title: 'Design Patterns', author: 'Gang of Four', isbn: '978-0201633610', category: 'Ingeniería', available: false, location: 'Estante A-15' },
  { id: '3', title: 'Gray\'s Anatomy', author: 'Henry Gray', isbn: '978-0702052309', category: 'Medicina', available: true, location: 'Estante B-01' },
  { id: '4', title: 'Principles of Economics', author: 'N. Gregory Mankiw', isbn: '978-1305585126', category: 'Economía', available: true, location: 'Estante C-05' },
  { id: '5', title: 'Constitución Política de Colombia', author: 'República de Colombia', isbn: '978-9587101201', category: 'Derecho', available: true, location: 'Estante D-01' },
  { id: '6', title: 'DSM-5', author: 'APA', isbn: '978-0890425558', category: 'Psicología', available: false, location: 'Estante E-03' },
];

export const bookLoans: BookLoan[] = [
  { id: '1', bookId: '2', studentId: '1', loanDate: new Date('2024-08-01'), dueDate: new Date('2024-08-15'), status: 'active' },
  { id: '2', bookId: '6', studentId: '8', loanDate: new Date('2024-07-20'), dueDate: new Date('2024-08-03'), status: 'overdue', fine: 15000 },
  { id: '3', bookId: '1', studentId: '6', loanDate: new Date('2024-07-15'), dueDate: new Date('2024-07-29'), returnDate: new Date('2024-07-28'), status: 'returned' },
];

export const events: Event[] = [
  { id: '1', title: 'Torneo Interfacultades de Fútbol', description: 'Competencia deportiva entre todas las facultades', category: 'sports', date: new Date('2024-09-15'), location: 'Cancha Principal', capacity: 500, registrations: 320 },
  { id: '2', title: 'Semana Cultural UNICOC', description: 'Festival de arte, música y danza', category: 'culture', date: new Date('2024-10-01'), location: 'Auditorio Central', capacity: 1000, registrations: 750 },
  { id: '3', title: 'Feria de Empleo 2024', description: 'Conexión con empresas y oportunidades laborales', category: 'academic', date: new Date('2024-09-20'), location: 'Plaza Central', capacity: 2000, registrations: 1200 },
  { id: '4', title: 'Taller de Manejo del Estrés', description: 'Técnicas de relajación y bienestar emocional', category: 'psychology', date: new Date('2024-08-25'), location: 'Sala de Bienestar', capacity: 50, registrations: 45 },
  { id: '5', title: 'Hackathon UNICOC 2024', description: 'Competencia de programación 48 horas', category: 'academic', date: new Date('2024-11-10'), location: 'Edificio de Ingeniería', capacity: 200, registrations: 180 },
];

export const users: User[] = [
  { id: '1', email: 'admin@unicoc.edu.co', name: 'Administrador General', role: 'admin', avatar: '/avatars/admin.jpg', createdAt: new Date('2020-01-01'), lastLogin: new Date('2024-08-10') },
  { id: '2', email: 'coord.ingenieria@unicoc.edu.co', name: 'Coordinador Ingeniería', role: 'coordinator', createdAt: new Date('2020-01-01'), lastLogin: new Date('2024-08-09') },
  { id: '3', email: 'roberto.sanchez@unicoc.edu.co', name: 'Dr. Roberto Sánchez González', role: 'teacher', avatar: '/avatars/teacher-1.jpg', createdAt: new Date('2018-01-01'), lastLogin: new Date('2024-08-10') },
  { id: '4', email: 'maria.garcia@unicoc.edu.co', name: 'María García López', role: 'student', avatar: '/avatars/student-1.jpg', createdAt: new Date('2021-01-15'), lastLogin: new Date('2024-08-10') },
  { id: '5', email: 'finanzas@unicoc.edu.co', name: 'Departamento Financiero', role: 'finance', createdAt: new Date('2020-01-01'), lastLogin: new Date('2024-08-08') },
];

export const notifications: Notification[] = [
  { id: '1', userId: '1', title: 'Nuevo estudiante registrado', message: 'Se ha registrado un nuevo estudiante en Ingeniería de Sistemas', type: 'info', read: false, createdAt: new Date('2024-08-10T10:30:00') },
  { id: '2', userId: '1', title: 'Alerta de bajo rendimiento', message: '5 estudiantes tienen promedio inferior a 3.0', type: 'warning', read: false, createdAt: new Date('2024-08-10T09:15:00') },
  { id: '3', userId: '1', title: 'Pago confirmado', message: 'Se ha recibido el pago de matrícula de María García', type: 'success', read: true, createdAt: new Date('2024-08-09T14:20:00') },
  { id: '4', userId: '1', title: 'Libro vencido', message: 'El préstamo del libro DSM-5 está vencido', type: 'error', read: false, createdAt: new Date('2024-08-08T08:00:00') },
];

export const dashboardStats: DashboardStats = {
  totalStudents: 3245,
  totalTeachers: 187,
  totalFaculties: 5,
  totalPrograms: 23,
  monthlyRevenue: 1250000000,
  activeStudents: 2980,
  academicAlerts: 45,
};

export const monthlyRevenueData = [
  { month: 'Ene', revenue: 980000000, students: 2800 },
  { month: 'Feb', revenue: 1050000000, students: 2900 },
  { month: 'Mar', revenue: 1120000000, students: 2950 },
  { month: 'Abr', revenue: 1080000000, students: 2920 },
  { month: 'May', revenue: 1150000000, students: 2980 },
  { month: 'Jun', revenue: 1200000000, students: 3000 },
  { month: 'Jul', revenue: 1250000000, students: 3100 },
  { month: 'Ago', revenue: 1300000000, students: 3245 },
];

export const studentsByFaculty = [
  { name: 'Ingeniería', value: 850, color: 'var(--chart-1)' },
  { name: 'Salud', value: 720, color: 'var(--chart-2)' },
  { name: 'Económicas', value: 680, color: 'var(--chart-3)' },
  { name: 'Derecho', value: 520, color: 'var(--chart-4)' },
  { name: 'Humanidades', value: 475, color: 'var(--chart-5)' },
];

export const recentActivity = [
  { id: '1', action: 'Nuevo estudiante registrado', user: 'María García López', time: 'Hace 5 minutos', type: 'student' },
  { id: '2', action: 'Pago de matrícula recibido', user: 'Carlos Rodríguez', time: 'Hace 15 minutos', type: 'payment' },
  { id: '3', action: 'Notas actualizadas', user: 'Dr. Roberto Sánchez', time: 'Hace 30 minutos', type: 'grades' },
  { id: '4', action: 'Préstamo de libro', user: 'Ana Sofía Ramírez', time: 'Hace 1 hora', type: 'library' },
  { id: '5', action: 'Inscripción a evento', user: 'Juan Pablo Torres', time: 'Hace 2 horas', type: 'event' },
];

export const academicCalendar = [
  { id: '1', title: 'Inicio de Clases', date: new Date('2024-08-05'), type: 'academic' },
  { id: '2', title: 'Primer Corte', date: new Date('2024-09-15'), type: 'grades' },
  { id: '3', title: 'Semana de Receso', date: new Date('2024-10-07'), type: 'break' },
  { id: '4', title: 'Segundo Corte', date: new Date('2024-10-25'), type: 'grades' },
  { id: '5', title: 'Exámenes Finales', date: new Date('2024-11-25'), type: 'exams' },
  { id: '6', title: 'Fin de Semestre', date: new Date('2024-12-06'), type: 'academic' },
];
