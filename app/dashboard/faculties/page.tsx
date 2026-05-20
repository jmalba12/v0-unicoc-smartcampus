"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faculties as initialFaculties, programs, students, teachers } from "@/lib/mock-data";
import type { Faculty } from "@/lib/types";

export default function FacultiesPage() {
  const [facultiesList, setFacultiesList] = useState(initialFaculties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState<Partial<Faculty>>({
    name: "",
    code: "",
    description: "",
  });

  const handleEdit = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setFormData(faculty);
    setIsModalOpen(true);
  };

  const handleDelete = (facultyId: string) => {
    setFacultiesList((prev) => prev.filter((f) => f.id !== facultyId));
  };

  const handleSave = () => {
    if (selectedFaculty) {
      setFacultiesList((prev) =>
        prev.map((f) =>
          f.id === selectedFaculty.id
            ? { ...f, ...formData, updatedAt: new Date() }
            : f
        )
      );
    } else {
      const newFaculty: Faculty = {
        ...formData,
        id: String(facultiesList.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Faculty;
      setFacultiesList((prev) => [...prev, newFaculty]);
    }
    setIsModalOpen(false);
    setSelectedFaculty(null);
    setFormData({ name: "", code: "", description: "" });
  };

  const handleOpenModal = () => {
    setSelectedFaculty(null);
    setFormData({ name: "", code: "", description: "" });
    setIsModalOpen(true);
  };

  const getStudentCount = (facultyId: string) => {
    return students.filter((s) => s.facultyId === facultyId).length;
  };

  const getTeacherCount = (facultyId: string) => {
    return teachers.filter((t) => t.facultyId === facultyId).length;
  };

  const getProgramCount = (facultyId: string) => {
    return programs.filter((p) => p.facultyId === facultyId).length;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Facultades</h1>
            <p className="text-muted-foreground mt-1">
              Gestión de las facultades universitarias
            </p>
          </div>
          <Button className="gap-2" onClick={handleOpenModal}>
            <Plus className="h-4 w-4" />
            Nueva Facultad
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Facultades</CardDescription>
              <CardTitle className="text-3xl">{facultiesList.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Programas</CardDescription>
              <CardTitle className="text-3xl">{programs.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Estudiantes</CardDescription>
              <CardTitle className="text-3xl">{students.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Faculties Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {facultiesList.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{faculty.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Código: {faculty.code}
                        </CardDescription>
                      </div>
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
                          <DropdownMenuItem onClick={() => handleEdit(faculty)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(faculty.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {faculty.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {faculty.description}
                      </p>
                    )}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50">
                        <Users className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-2xl font-bold">
                          {getStudentCount(faculty.id)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Estudiantes
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50">
                        <Users className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-2xl font-bold">
                          {getTeacherCount(faculty.id)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Docentes
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50">
                        <BookOpen className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-2xl font-bold">
                          {getProgramCount(faculty.id)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Programas
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedFaculty ? "Editar Facultad" : "Nueva Facultad"}
            </DialogTitle>
            <DialogDescription>
              Complete la información de la facultad
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {selectedFaculty ? "Guardar Cambios" : "Crear Facultad"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
