"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Search,
  Plus,
  BookOpen,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BookMarked,
  Filter,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { libraryBooks, bookLoans, students } from "@/lib/mock-data";

const loanStatusColors = {
  active: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  returned: "bg-green-500/10 text-green-500 border-green-500/20",
  overdue: "bg-red-500/10 text-red-500 border-red-500/20",
};

const loanStatusLabels = {
  active: "Activo",
  returned: "Devuelto",
  overdue: "Vencido",
};

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [loanFormData, setLoanFormData] = useState({
    bookId: "",
    studentId: "",
  });

  const categories = [...new Set(libraryBooks.map((b) => b.category))];

  const filteredBooks = useMemo(() => {
    return libraryBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || book.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const getBookTitle = (bookId: string) => {
    return libraryBooks.find((b) => b.id === bookId)?.title || "N/A";
  };

  const getStudentName = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.fullName || "N/A";
  };

  const availableBooks = libraryBooks.filter((b) => b.available).length;
  const activeLoans = bookLoans.filter((l) => l.status === "active").length;
  const overdueLoans = bookLoans.filter((l) => l.status === "overdue").length;

  const handleCreateLoan = () => {
    // In a real app, this would create a new loan
    console.log("Creating loan:", loanFormData);
    setIsLoanModalOpen(false);
    setLoanFormData({ bookId: "", studentId: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Biblioteca</h1>
            <p className="text-muted-foreground mt-1">
              Sistema de préstamos y gestión bibliográfica
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsLoanModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Préstamo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Libros</CardDescription>
              <CardTitle className="text-3xl">{libraryBooks.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                En el catálogo
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Disponibles</CardDescription>
              <CardTitle className="text-3xl text-green-500">{availableBooks}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Listos para préstamo
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Préstamos Activos</CardDescription>
              <CardTitle className="text-3xl text-blue-500">{activeLoans}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-4 w-4 text-blue-500" />
                En circulación
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Vencidos</CardDescription>
              <CardTitle className="text-3xl text-red-500">{overdueLoans}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Requieren seguimiento
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="books" className="w-full">
          <TabsList>
            <TabsTrigger value="books">Catálogo de Libros</TabsTrigger>
            <TabsTrigger value="loans">Préstamos</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="mt-4 space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por título, autor o ISBN..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las Categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Books Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-1">
                              {book.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {book.author}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={book.available ? "default" : "secondary"}
                            className={
                              book.available
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {book.available ? "Disponible" : "Prestado"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">ISBN:</span>
                            <span className="font-mono text-xs">{book.isbn}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Categoría:</span>
                            <Badge variant="outline">{book.category}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Ubicación:</span>
                            <span>{book.location}</span>
                          </div>
                        </div>
                        {book.available && (
                          <Button
                            className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            size="sm"
                            onClick={() => {
                              setLoanFormData({ ...loanFormData, bookId: book.id });
                              setIsLoanModalOpen(true);
                            }}
                          >
                            <BookMarked className="mr-2 h-4 w-4" />
                            Realizar Préstamo
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="loans" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {bookLoans.map((loan, index) => (
                    <motion.div
                      key={loan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{getBookTitle(loan.bookId)}</p>
                          <p className="text-sm text-muted-foreground">
                            {getStudentName(loan.studentId)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={loanStatusColors[loan.status]}
                        >
                          {loanStatusLabels[loan.status]}
                        </Badge>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Vence: {format(loan.dueDate, "dd MMM yyyy", { locale: es })}
                        </div>
                        {loan.fine && loan.fine > 0 && (
                          <p className="text-xs text-red-500 mt-1">
                            Multa: ${loan.fine.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Loan Modal */}
      <Dialog open={isLoanModalOpen} onOpenChange={setIsLoanModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Préstamo</DialogTitle>
            <DialogDescription>
              Registre un nuevo préstamo de libro
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Libro</Label>
              <Select
                value={loanFormData.bookId}
                onValueChange={(value) =>
                  setLoanFormData({ ...loanFormData, bookId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar libro" />
                </SelectTrigger>
                <SelectContent>
                  {libraryBooks
                    .filter((b) => b.available)
                    .map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title} - {book.author}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estudiante</Label>
              <Select
                value={loanFormData.studentId}
                onValueChange={(value) =>
                  setLoanFormData({ ...loanFormData, studentId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estudiante" />
                </SelectTrigger>
                <SelectContent>
                  {students
                    .filter((s) => s.status === "active")
                    .map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.fullName} ({student.code})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoanModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateLoan}>Crear Préstamo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
