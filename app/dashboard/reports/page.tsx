'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Calendar,
  Download,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  Filter,
  PieChart,
  Printer,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from 'recharts'

const enrollmentData = [
  { year: '2020', estudiantes: 12500, egresados: 1800 },
  { year: '2021', estudiantes: 13200, egresados: 2100 },
  { year: '2022', estudiantes: 14100, egresados: 2300 },
  { year: '2023', estudiantes: 14800, egresados: 2500 },
  { year: '2024', estudiantes: 15400, egresados: 2700 },
]

const facultyDistribution = [
  { name: 'Ingeniería', value: 4200, color: '#1e3a5f' },
  { name: 'Ciencias de la Salud', value: 3800, color: '#c9a227' },
  { name: 'Ciencias Económicas', value: 2900, color: '#2563eb' },
  { name: 'Ciencias Sociales', value: 2100, color: '#16a34a' },
  { name: 'Artes y Diseño', value: 1400, color: '#dc2626' },
]

const performanceData = [
  { semester: '2023-1', promedio: 3.72, aprobados: 89 },
  { semester: '2023-2', promedio: 3.78, aprobados: 91 },
  { semester: '2024-1', promedio: 3.81, aprobados: 92 },
  { semester: '2024-2', promedio: 3.85, aprobados: 93 },
]

const monthlyRevenue = [
  { month: 'Ene', ingresos: 2800, gastos: 2200 },
  { month: 'Feb', ingresos: 3200, gastos: 2400 },
  { month: 'Mar', ingresos: 4100, gastos: 2800 },
  { month: 'Abr', ingresos: 2900, gastos: 2300 },
  { month: 'May', ingresos: 3500, gastos: 2600 },
  { month: 'Jun', ingresos: 3100, gastos: 2500 },
]

const reportTypes = [
  {
    id: 'academic',
    title: 'Reporte Académico',
    description: 'Rendimiento, notas y asistencia',
    icon: FileBarChart,
    color: 'bg-primary',
  },
  {
    id: 'enrollment',
    title: 'Reporte de Matrícula',
    description: 'Inscripciones y deserción',
    icon: Users,
    color: 'bg-accent',
  },
  {
    id: 'financial',
    title: 'Reporte Financiero',
    description: 'Ingresos, gastos y cartera',
    icon: TrendingUp,
    color: 'bg-chart-1',
  },
  {
    id: 'library',
    title: 'Reporte Biblioteca',
    description: 'Préstamos y recursos',
    icon: FileText,
    color: 'bg-chart-2',
  },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-2')
  const [selectedFaculty, setSelectedFaculty] = useState('all')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
            <p className="text-muted-foreground mt-1">
              Análisis y estadísticas del sistema académico
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2">2024-2</SelectItem>
                <SelectItem value="2024-1">2024-1</SelectItem>
                <SelectItem value="2023-2">2023-2</SelectItem>
                <SelectItem value="2023-1">2023-1</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Report Type Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${report.color}`}>
                      <report.icon className="h-6 w-6 text-white" />
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mt-4">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {report.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="enrollment" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="enrollment" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Matrícula
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Rendimiento
            </TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2">
              <PieChart className="h-4 w-4" />
              Distribución
            </TabsTrigger>
            <TabsTrigger value="financial" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Financiero
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrollment">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Evolución de Matrícula</CardTitle>
                  <CardDescription>
                    Estudiantes activos y egresados por año
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="year" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="estudiantes" name="Estudiantes" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="egresados" name="Egresados" fill="#c9a227" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Rendimiento Académico</CardTitle>
                  <CardDescription>
                    Promedio institucional y tasa de aprobación
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="semester" className="text-xs" />
                      <YAxis yAxisId="left" domain={[3.5, 4]} className="text-xs" />
                      <YAxis yAxisId="right" orientation="right" domain={[80, 100]} className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="promedio"
                        name="Promedio"
                        stroke="#1e3a5f"
                        strokeWidth={3}
                        dot={{ fill: '#1e3a5f', strokeWidth: 2 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="aprobados"
                        name="% Aprobados"
                        stroke="#c9a227"
                        strokeWidth={3}
                        dot={{ fill: '#c9a227', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Facultad</CardTitle>
                  <CardDescription>
                    Estudiantes activos por área académica
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={facultyDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {facultyDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {facultyDistribution.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-auto">
                          {item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas Clave</CardTitle>
                  <CardDescription>Indicadores del periodo actual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Tasa de Retención', value: '94.2%', trend: '+1.3%', color: 'text-green-500' },
                    { label: 'Tasa de Deserción', value: '5.8%', trend: '-0.7%', color: 'text-green-500' },
                    { label: 'Promedio Institucional', value: '3.85', trend: '+0.04', color: 'text-green-500' },
                    { label: 'Empleabilidad Egresados', value: '89%', trend: '+2%', color: 'text-green-500' },
                    { label: 'Satisfacción Estudiantil', value: '4.2/5', trend: '+0.1', color: 'text-green-500' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <span className="text-sm">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{stat.value}</span>
                        <span className={`text-xs ${stat.color}`}>{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Balance Financiero</CardTitle>
                  <CardDescription>
                    Ingresos vs gastos mensuales (millones COP)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="ingresos"
                        name="Ingresos"
                        stroke="#1e3a5f"
                        fill="#1e3a5f"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="gastos"
                        name="Gastos"
                        stroke="#dc2626"
                        fill="#dc2626"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
