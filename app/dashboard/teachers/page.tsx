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
  BookOpen,
  Calendar,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { teachers, faculties } from "@/lib/mock-data";
import type { Teacher } from "@/lib/types";

const contractColors = {
  "full-time": "bg-green-500/10 text-green-500 border-green-500/20",
  "part-time": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  hourly: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const contractLabels = {
  "full-time": "Tiempo Completo",
  "part-time": "Medio Tiempo",
  hourly: "Cátedra",
};

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [contractFilter, setContractFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teachersList, setTeachersList] = useState(teachers);

  const [formData, setFormData] = useState<Partial<Teacher>>({
    code: "",
    fullName: "",
    specialty: "",
    facultyId: "",
    email: "",
    phone: "",
    schedule: "",
    contractType: "full-time",
  });

  const filteredTeachers = useMemo(() => {
    return teachersList.filter((teacher) => {
      const matchesSearch =
        teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFaculty =
        facultyFilter === "all" || teacher.facultyId === facultyFilter;

      const matchesContract =
        contractFilter === "all" || teacher.contractType === contractFilter;

      return matchesSearch && matchesFaculty && matchesContract;
    });
  }, [teachersList, searchTerm, facultyFilter, contractFilter]);

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormData(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (teacherId: string) => {
    setTeachersList((prev) => prev.filter((t) => t.id !== teacherId));
  };

  const handleSave = () => {
    if (selectedTeacher) {
      setTeachersList((prev) =>
        prev.map((t) =>
          t.id === selectedTeacher.id
            ? { ...t, ...formData, updatedAt: new Date() }
            : t
        )
      );
    } else {
      const newTeacher: Teacher = {
        ...formData,
        id: String(teachersList.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Teacher;
      setTeachersList((prev) => [...prev, newTeacher]);
    }
    setIsModalOpen(false);
    setSelectedTeacher(null);
    setFormData({
      code: "",
      fullName: "",
      specialty: "",
      facultyId: "",
      email: "",
      phone: "",
      schedule: "",
      contractType: "full-time",
    });
  };

  const handleOpenModal = () => {
    setSelectedTeacher(null);
    setFormData({
      code: `DOC${String(teachersList.length + 1).padStart(3, "0")}`,
      fullName: "",
      specialty: "",
      facultyId: "",
      email: "",
      phone: "",
      schedule: "",
      contractType: "full-time",
    });
    setIsModalOpen(true);
  };

  const getFacultyName = (facultyId: string) => {
    return faculties.find((f) => f.id === facultyId)?.name || "N/A";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Docentes</h1>
            <p className="text-muted-foreground mt-1">
              Gestión del personal docente universitario
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button className="gap-2" onClick={handleOpenModal}>
              <Plus className="h-4 w-4" />
              Nuevo Docente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Docentes</CardDescription>
              <CardTitle className="text-3xl">{teachersList.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tiempo Completo</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {teachersList.filter((t) => t.contractType === "full-time").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Medio Tiempo</CardDescription>
              <CardTitle className="text-3xl text-blue-500">
                {teachersList.filter((t) => t.contractType === "part-time").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Cátedra</CardDescription>
              <CardTitle className="text-3xl text-orange-500">
                {teachersList.filter((t) => t.contractType === "hourly").length}
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
                  placeholder="Buscar por nombre, código, especialidad o email..."
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
                <Select value={contractFilter} onValueChange={setContractFilter}>
                  <SelectTrigger className="w-[170px]">
                    <SelectValue placeholder="Contrato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Contratos</SelectItem>
                    <SelectItem value="full-time">Tiempo Completo</SelectItem>
                    <SelectItem value="part-time">Medio Tiempo</SelectItem>
                    <SelectItem value="hourly">Cátedra</SelectItem>
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
                  <TableHead>Docente</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Facultad</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredTeachers.map((teacher, index) => (
                    <motion.tr
                      key={teacher.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={teacher.photoUrl} alt={teacher.fullName} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {teacher.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.fullName}</p>
                            <p className="text-xs text-muted-foreground">{teacher.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{teacher.code}</TableCell>
                      <TableCell>{teacher.specialty}</TableCell>
                      <TableCell>{getFacultyName(teacher.facultyId)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {teacher.schedule}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={contractColors[teacher.contractType]}
                        >
                          {contractLabels[teacher.contractType]}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Materias Asignadas
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Ver Horario
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(teacher.id)}
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

            {filteredTeachers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No se encontraron docentes</h3>
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
            <DialogTitle>
              {selectedTeacher ? "Editar Docente" : "Nuevo Docente"}
            </DialogTitle>
            <DialogDescription>
              Complete la información del docente
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Código Docente</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
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
                <Label>Tipo de Contrato</Label>
                <Select
                  value={formData.contractType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contractType: value as Teacher["contractType"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Tiempo Completo</SelectItem>
                    <SelectItem value="part-time">Medio Tiempo</SelectItem>
                    <SelectItem value="hourly">Cátedra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Horario</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="Ej: Lunes a Viernes 8:00-16:00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {selectedTeacher ? "Guardar Cambios" : "Crear Docente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
