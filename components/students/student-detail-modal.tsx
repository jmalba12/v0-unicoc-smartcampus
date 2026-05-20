"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { faculties, programs, grades, subjects } from "@/lib/mock-data";
import type { Student } from "@/lib/types";

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

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

export function StudentDetailModal({
  isOpen,
  onClose,
  student,
}: StudentDetailModalProps) {
  if (!student) return null;

  const faculty = faculties.find((f) => f.id === student.facultyId);
  const program = programs.find((p) => p.id === student.programId);
  const studentGrades = grades.filter((g) => g.studentId === student.id);

  const progressPercentage = program
    ? (student.approvedCredits / program.credits) * 100
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-xl border shadow-lg"
          >
            {/* Header */}
            <div className="relative h-32 bg-gradient-to-r from-primary to-primary/80 rounded-t-xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="px-6 pb-6">
              {/* Profile Section */}
              <div className="flex flex-col md:flex-row gap-6 -mt-16">
                <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                  <AvatarImage src={student.photoUrl} alt={student.fullName} />
                  <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                    {student.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 pt-4 md:pt-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">{student.fullName}</h2>
                    <Badge variant="outline" className={statusColors[student.status]}>
                      {statusLabels[student.status]}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {program?.name} - {faculty?.name}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {student.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {student.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {student.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4 mt-8">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Código</p>
                        <p className="font-semibold">{student.code}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Promedio</p>
                        <p className="font-semibold">{student.gpa.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Semestre</p>
                        <p className="font-semibold">{student.semester}°</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ingreso</p>
                        <p className="font-semibold">
                          {format(student.createdAt, "MMM yyyy", { locale: es })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Progreso Académico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Créditos Aprobados</span>
                        <span className="font-medium">
                          {student.approvedCredits} / {program?.credits || 0}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {progressPercentage.toFixed(1)}% completado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Grades */}
              {studentGrades.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Últimas Notas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {studentGrades.map((grade) => {
                        const subject = subjects.find(
                          (s) => s.id === grade.subjectId
                        );
                        return (
                          <div
                            key={grade.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                          >
                            <div>
                              <p className="font-medium">{subject?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {grade.period}
                              </p>
                            </div>
                            <div className="text-right">
                              <p
                                className={`text-lg font-bold ${
                                  grade.finalGrade >= 4.0
                                    ? "text-green-500"
                                    : grade.finalGrade >= 3.0
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`}
                              >
                                {grade.finalGrade.toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Nota Final
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
