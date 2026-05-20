"use client";

import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RevenueChart, StudentsByFacultyChart, StudentsProgressChart } from "@/components/dashboard/charts";
import { RecentActivity, AcademicCalendar } from "@/components/dashboard/activity-calendar";
import { dashboardStats } from "@/lib/mock-data";

export default function DashboardPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido al Sistema Académico UNICOC SmartCampus
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Estudiantes"
            value={dashboardStats.totalStudents.toLocaleString("es-CO")}
            description="Matriculados activos"
            icon={GraduationCap}
            trend={{ value: 12, isPositive: true }}
            iconClassName="bg-blue-500/10 text-blue-500"
          />
          <StatsCard
            title="Total Docentes"
            value={dashboardStats.totalTeachers}
            description="Tiempo completo y cátedra"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
            iconClassName="bg-green-500/10 text-green-500"
          />
          <StatsCard
            title="Facultades"
            value={dashboardStats.totalFaculties}
            description={`${dashboardStats.totalPrograms} programas académicos`}
            icon={Building2}
            iconClassName="bg-purple-500/10 text-purple-500"
          />
          <StatsCard
            title="Programas"
            value={dashboardStats.totalPrograms}
            description="Pregrado y posgrado"
            icon={BookOpen}
            iconClassName="bg-orange-500/10 text-orange-500"
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Ingresos del Mes"
            value={formatCurrency(dashboardStats.monthlyRevenue)}
            description="Matrículas y servicios"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
            iconClassName="bg-emerald-500/10 text-emerald-500"
          />
          <StatsCard
            title="Estudiantes Activos"
            value={dashboardStats.activeStudents.toLocaleString("es-CO")}
            description={`${((dashboardStats.activeStudents / dashboardStats.totalStudents) * 100).toFixed(1)}% del total`}
            icon={TrendingUp}
            iconClassName="bg-cyan-500/10 text-cyan-500"
          />
          <StatsCard
            title="Alertas Académicas"
            value={dashboardStats.academicAlerts}
            description="Requieren atención"
            icon={AlertTriangle}
            iconClassName="bg-red-500/10 text-red-500"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <StudentsByFacultyChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <StudentsProgressChart />
          <RecentActivity />
          <AcademicCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
}
