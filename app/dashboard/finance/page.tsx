"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Search,
  Filter,
  DollarSign,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Download,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { payments, students } from "@/lib/mock-data";

const statusColors = {
  paid: "bg-green-500/10 text-green-500 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  overdue: "bg-red-500/10 text-red-500 border-red-500/20",
};

const statusLabels = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
};

const statusIcons = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertTriangle,
};

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const student = students.find((s) => s.id === payment.studentId);

      const matchesSearch =
        student?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student?.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.concept.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStudentName = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.fullName || "N/A";
  };

  const getStudentCode = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.code || "N/A";
  };

  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + p.amount, 0);

  const overdueAmount = payments
    .filter((p) => p.status === "overdue")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Módulo Financiero</h1>
            <p className="text-muted-foreground mt-1">
              Gestión de pagos, matrículas y facturación
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ingresos Recibidos</CardDescription>
              <CardTitle className="text-2xl text-green-500">
                {formatCurrency(totalRevenue)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Pagos confirmados
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Por Cobrar</CardDescription>
              <CardTitle className="text-2xl text-yellow-500">
                {formatCurrency(pendingAmount)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-yellow-500" />
                Pagos pendientes
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Cartera Vencida</CardDescription>
              <CardTitle className="text-2xl text-red-500">
                {formatCurrency(overdueAmount)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Requiere atención
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Transacciones</CardDescription>
              <CardTitle className="text-2xl">{payments.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Este período
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
                  placeholder="Buscar por estudiante, factura o concepto..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Estados</SelectItem>
                  <SelectItem value="paid">Pagado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="overdue">Vencido</SelectItem>
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
                  <TableHead>Factura</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredPayments.map((payment, index) => {
                    const StatusIcon = statusIcons[payment.status];
                    return (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <TableCell className="font-mono text-sm">
                          {payment.invoiceNumber}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {getStudentName(payment.studentId)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {getStudentCode(payment.studentId)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{payment.concept}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </TableCell>
                        <TableCell>
                          {format(payment.dueDate, "dd MMM yyyy", { locale: es })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`gap-1 ${statusColors[payment.status]}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusLabels[payment.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FileText className="h-4 w-4" />
                            Ver Factura
                          </Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>

            {filteredPayments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No se encontraron pagos</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
