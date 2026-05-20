"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  AlertTriangle,
  TrendingUp,
  Award,
  FileText,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { grades as initialGrades, students, subjects, teachers } from "@/lib/mock-data";
import type { Grade } from "@/lib/types";

export default function GradesPage() {
  const [gradesList, setGradesList] = useState(initialGrades);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Grade>>({
    studentId: "",
    subjectId: "",
    period: "2024-2",
    cut1: 0,
    cut2: 0,
    cut3: 0,
    finalExam: 0,
    teacherId: "",
  });

  const filteredGrades = useMemo(() => {
    return gradesList.filter((grade) => {
      const student = students.find((s) => s.id === grade.studentId);
      const subject = subjects.find((s) => s.id === grade.subjectId);

      const matchesSearch =
        student?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student?.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject?.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject =
        subjectFilter === "all" || grade.subjectId === subjectFilter;

      const matchesPeriod =
        periodFilter === "all" || grade.period === periodFilter;

      return matchesSearch && matchesSubject && matchesPeriod;
    });
  }, [gradesList, searchTerm, subjectFilter, periodFilter]);

  const calculateFinalGrade = (cut1: number, cut2: number, cut3: number, finalExam: number) => {
    return cut1 * 0.25 + cut2 * 0.25 + cut3 * 0.25 + finalExam * 0.25;
  };

  const handleSave = () => {
    const finalGrade = calculateFinalGrade(
      formData.cut1 || 0,
      formData.cut2 || 0,
      formData.cut3 || 0,
      formData.finalExam || 0
    );

    const newGrade: Grade = {
      ...formData,
      id: String(gradesList.length + 1),
      finalGrade,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Grade;

    setGradesList((prev) => [...prev, newGrade]);
    setIsModalOpen(false);
    setFormData({
      studentId: "",
      subjectId: "",
      period: "2024-2",
      cut1: 0,
      cut2: 0,
      cut3: 0,
      finalExam: 0,
      teacherId: "",
    });
  };

  const getStudentName = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.fullName || "N/A";
  };

  const getStudentCode = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.code || "N/A";
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId)?.name || "N/A";
  };

  const getTeacherName = (teacherId: string) => {
    return teachers.find((t) => t.id === teacherId)?.fullName || "N/A";
  };

  const averageGrade =
    gradesList.length > 0
      ? gradesList.reduce((acc, g) => acc + g.finalGrade, 0) / gradesList.length
      : 0;

  const lowPerformanceCount = gradesList.filter((g) => g.finalGrade < 3.0).length;
  const excellentCount = gradesList.filter((g) => g.finalGrade >= 4.5).length;

  const periods = [...new Set(gradesList.map((g) => g.period))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Notas</h1>
            <p className="text-muted-foreground mt-1">
              Registro y seguimiento del rendimiento académico
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Registrar Notas
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Registros Totales</CardDescription>
              <CardTitle className="text-3xl">{gradesList.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="h-4 w-4" />
                Notas registradas
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Promedio General</CardDescription>
              <CardTitle className="text-3xl">{averageGrade.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Todas las materias
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Bajo Rendimiento</CardDescription>
              <CardTitle className="text-3xl text-red-500">{lowPerformanceCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                Promedio menor a 3.0
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Excelencia</CardDescription>
              <CardTitle className="text-3xl text-green-500">{excellentCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Award className="h-4 w-4" />
                Promedio mayor a 4.5
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por estudiante o materia..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las Materias</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {periods.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
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
                  <TableHead>Materia</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="text-center">Corte 1</TableHead>
                  <TableHead className="text-center">Corte 2</TableHead>
                  <TableHead className="text-center">Corte 3</TableHead>
                  <TableHead className="text-center">Final</TableHead>
                  <TableHead className="text-center">Definitiva</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredGrades.map((grade, index) => (
                    <motion.tr
                      key={grade.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{getStudentName(grade.studentId)}</p>
                          <p className="text-xs text-muted-foreground">
                            {getStudentCode(grade.studentId)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{getSubjectName(grade.subjectId)}</p>
                          <p className="text-xs text-muted-foreground">
                            {getTeacherName(grade.teacherId)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{grade.period}</TableCell>
                      <TableCell className="text-center">{grade.cut1.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{grade.cut2.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{grade.cut3.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{grade.finalExam.toFixed(1)}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-bold text-lg ${
                            grade.finalGrade >= 4.0
                              ? "text-green-500"
                              : grade.finalGrade >= 3.0
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {grade.finalGrade.toFixed(2)}
                        </span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>

            {filteredGrades.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No se encontraron registros</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registrar Notas</DialogTitle>
            <DialogDescription>
              Ingrese las notas del estudiante para la materia seleccionada
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Estudiante</Label>
                <Select
                  value={formData.studentId}
                  onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.filter((s) => s.status === "active").map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.fullName} ({student.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Materia</Label>
                <Select
                  value={formData.subjectId}
                  onValueChange={(value) => {
                    const subject = subjects.find((s) => s.id === value);
                    setFormData({
                      ...formData,
                      subjectId: value,
                      teacherId: subject?.teacherId || "",
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="cut1">Corte 1 (25%)</Label>
                <Input
                  id="cut1"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.cut1}
                  onChange={(e) =>
                    setFormData({ ...formData, cut1: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cut2">Corte 2 (25%)</Label>
                <Input
                  id="cut2"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.cut2}
                  onChange={(e) =>
                    setFormData({ ...formData, cut2: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cut3">Corte 3 (25%)</Label>
                <Input
                  id="cut3"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.cut3}
                  onChange={(e) =>
                    setFormData({ ...formData, cut3: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalExam">Examen Final (25%)</Label>
                <Input
                  id="finalExam"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.finalExam}
                  onChange={(e) =>
                    setFormData({ ...formData, finalExam: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            {/* Preview */}
            <Card className="bg-secondary/50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nota Definitiva Calculada:</span>
                  <span
                    className={`text-2xl font-bold ${
                      calculateFinalGrade(
                        formData.cut1 || 0,
                        formData.cut2 || 0,
                        formData.cut3 || 0,
                        formData.finalExam || 0
                      ) >= 3.0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {calculateFinalGrade(
                      formData.cut1 || 0,
                      formData.cut2 || 0,
                      formData.cut3 || 0,
                      formData.finalExam || 0
                    ).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar Notas</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
