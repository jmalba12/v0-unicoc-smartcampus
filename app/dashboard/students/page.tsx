"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  FileText,
  CreditCard,
  QrCode,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { students, faculties, programs } from "@/lib/mock-data";
import { StudentModal } from "@/components/students/student-modal";
import { StudentDetailModal } from "@/components/students/student-detail-modal";
import { StudentCardModal } from "@/components/students/student-card-modal";
import type { Student } from "@/lib/types";

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  graduated: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  suspended: "bg-red-500/10 text-red-500 border-red-500/20",
};

const statusLabels = {
  active: "Activo",
  inactive: "Inactivo",
  graduated: "Graduado",
  suspended: "Suspendido",
};

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentsList, setStudentsList] = useState(students);

  const filteredStudents = useMemo(() => {
    return studentsList.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.document.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFaculty =
        facultyFilter === "all" || student.facultyId === facultyFilter;

      const matchesStatus =
        statusFilter === "all" || student.status === statusFilter;

      return matchesSearch && matchesFaculty && matchesStatus;
    });
  }, [studentsList, searchTerm, facultyFilter, statusFilter]);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleCard = (student: Student) => {
    setSelectedStudent(student);
    setIsCardModalOpen(true);
  };

  const handleDelete = (studentId: string) => {
    setStudentsList((prev) => prev.filter((s) => s.id !== studentId));
  };

  const handleSave = (student: Student) => {
    if (selectedStudent) {
      setStudentsList((prev) =>
        prev.map((s) => (s.id === student.id ? student : s))
      );
    } else {
      setStudentsList((prev) => [...prev, { ...student, id: String(prev.length + 1) }]);
    }
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const getFacultyName = (facultyId: string) => {
    return faculties.find((f) => f.id === facultyId)?.name || "N/A";
  };

  const getProgramName = (programId: string) => {
    return programs.find((p) => p.id === programId)?.name || "N/A";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Estudiantes</h1>
            <p className="text-muted-foreground mt-1">
              Gestión completa del registro estudiantil
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button
              className="gap-2"
              onClick={() => {
                setSelectedStudent(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Nuevo Estudiante
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Estudiantes</CardDescription>
              <CardTitle className="text-3xl">{studentsList.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Activos</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {studentsList.filter((s) => s.status === "active").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Graduados</CardDescription>
              <CardTitle className="text-3xl text-blue-500">
                {studentsList.filter((s) => s.status === "graduated").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Promedio General</CardDescription>
              <CardTitle className="text-3xl">
                {(
                  studentsList.reduce((acc, s) => acc + s.gpa, 0) / studentsList.length
                ).toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, código, documento o email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={facultyFilter} onValueChange={setFacultyFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Facultad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las Facultades</SelectItem>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Estados</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="graduated">Graduado</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Programa</TableHead>
                  <TableHead>Semestre</TableHead>
                  <TableHead>Promedio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.photoUrl} alt={student.fullName} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {student.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.fullName}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{student.code}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{getProgramName(student.programId)}</p>
                          <p className="text-xs text-muted-foreground">
                            {getFacultyName(student.facultyId)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{student.semester}°</TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            student.gpa >= 4.0
                              ? "text-green-500"
                              : student.gpa >= 3.0
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {student.gpa.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[student.status]}
                        >
                          {statusLabels[student.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleView(student)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(student)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCard(student)}>
                              <QrCode className="mr-2 h-4 w-4" />
                              Carnet Digital
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Historial Académico
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Estado Financiero
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(student.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>

            {filteredStudents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No se encontraron estudiantes</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSave={handleSave}
      />

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      <StudentCardModal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </DashboardLayout>
  );
}
