"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Filter,
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { programs as initialPrograms, faculties, students } from "@/lib/mock-data";
import type { Program } from "@/lib/types";

const modalityColors = {
  presencial: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  virtual: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  hybrid: "bg-green-500/10 text-green-500 border-green-500/20",
};

const modalityLabels = {
  presencial: "Presencial",
  virtual: "Virtual",
  hybrid: "Híbrido",
};

export default function ProgramsPage() {
  const [programsList, setProgramsList] = useState(initialPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState<Partial<Program>>({
    name: "",
    code: "",
    facultyId: "",
    credits: 0,
    modality: "presencial",
    qualifiedRegistry: "",
    duration: 10,
  });

  const filteredPrograms = useMemo(() => {
    return programsList.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFaculty =
        facultyFilter === "all" || program.facultyId === facultyFilter;

      return matchesSearch && matchesFaculty;
    });
  }, [programsList, searchTerm, facultyFilter]);

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setFormData(program);
    setIsModalOpen(true);
  };

  const handleDelete = (programId: string) => {
    setProgramsList((prev) => prev.filter((p) => p.id !== programId));
  };

  const handleSave = () => {
    if (selectedProgram) {
      setProgramsList((prev) =>
        prev.map((p) =>
          p.id === selectedProgram.id
            ? { ...p, ...formData, updatedAt: new Date() }
            : p
        )
      );
    } else {
      const newProgram: Program = {
        ...formData,
        id: String(programsList.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Program;
      setProgramsList((prev) => [...prev, newProgram]);
    }
    setIsModalOpen(false);
    setSelectedProgram(null);
    setFormData({
      name: "",
      code: "",
      facultyId: "",
      credits: 0,
      modality: "presencial",
      qualifiedRegistry: "",
      duration: 10,
    });
  };

  const handleOpenModal = () => {
    setSelectedProgram(null);
    setFormData({
      name: "",
      code: "",
      facultyId: "",
      credits: 0,
      modality: "presencial",
      qualifiedRegistry: "",
      duration: 10,
    });
    setIsModalOpen(true);
  };

  const getFacultyName = (facultyId: string) => {
    return faculties.find((f) => f.id === facultyId)?.name || "N/A";
  };

  const getStudentCount = (programId: string) => {
    return students.filter((s) => s.programId === programId).length;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Programas Académicos</h1>
            <p className="text-muted-foreground mt-1">
              Gestión de programas de pregrado y posgrado
            </p>
          </div>
          <Button className="gap-2" onClick={handleOpenModal}>
            <Plus className="h-4 w-4" />
            Nuevo Programa
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Programas</CardDescription>
              <CardTitle className="text-3xl">{programsList.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Presencial</CardDescription>
              <CardTitle className="text-3xl text-blue-500">
                {programsList.filter((p) => p.modality === "presencial").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Virtual</CardDescription>
              <CardTitle className="text-3xl text-purple-500">
                {programsList.filter((p) => p.modality === "virtual").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Híbrido</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {programsList.filter((p) => p.modality === "hybrid").length}
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
                  placeholder="Buscar por nombre o código..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={facultyFilter} onValueChange={setFacultyFilter}>
                <SelectTrigger className="w-[200px]">
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
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Programa</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Facultad</TableHead>
                  <TableHead>Créditos</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Modalidad</TableHead>
                  <TableHead>Estudiantes</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredPrograms.map((program, index) => (
                    <motion.tr
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell className="font-mono text-sm">{program.code}</TableCell>
                      <TableCell>{getFacultyName(program.facultyId)}</TableCell>
                      <TableCell>{program.credits}</TableCell>
                      <TableCell>{program.duration} sem.</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={modalityColors[program.modality]}>
                          {modalityLabels[program.modality]}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStudentCount(program.id)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEdit(program)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(program.id)}
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
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProgram ? "Editar Programa" : "Nuevo Programa"}
            </DialogTitle>
            <DialogDescription>
              Complete la información del programa académico
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Programa</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Facultad</Label>
                <Select
                  value={formData.facultyId}
                  onValueChange={(value) => setFormData({ ...formData, facultyId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar facultad" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Modalidad</Label>
                <Select
                  value={formData.modality}
                  onValueChange={(value) =>
                    setFormData({ ...formData, modality: value as Program["modality"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="credits">Créditos</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) =>
                    setFormData({ ...formData, credits: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (semestres)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registry">Registro Calificado</Label>
                <Input
                  id="registry"
                  value={formData.qualifiedRegistry}
                  onChange={(e) =>
                    setFormData({ ...formData, qualifiedRegistry: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {selectedProgram ? "Guardar Cambios" : "Crear Programa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
