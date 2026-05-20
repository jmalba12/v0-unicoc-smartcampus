"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Trash2,
  Settings,
  Filter,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  createdAt: string;
  category: "academic" | "financial" | "system" | "social";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Nuevo estudiante registrado",
    message: "Se ha registrado un nuevo estudiante en Ingenieria de Sistemas: Juan Pablo Martinez",
    type: "info",
    read: false,
    createdAt: "Hace 5 minutos",
    category: "academic",
  },
  {
    id: "2",
    title: "Alerta de bajo rendimiento",
    message: "5 estudiantes de la Facultad de Ingenieria tienen promedio inferior a 3.0 este semestre",
    type: "warning",
    read: false,
    createdAt: "Hace 30 minutos",
    category: "academic",
  },
  {
    id: "3",
    title: "Pago de matricula confirmado",
    message: "Se ha recibido el pago de matricula de Maria Garcia Lopez por $4.500.000 COP",
    type: "success",
    read: false,
    createdAt: "Hace 1 hora",
    category: "financial",
  },
  {
    id: "4",
    title: "Libro vencido en biblioteca",
    message: "El prestamo del libro 'DSM-5' de Mateo Castillo esta vencido hace 3 dias. Multa acumulada: $15.000",
    type: "error",
    read: false,
    createdAt: "Hace 2 horas",
    category: "academic",
  },
  {
    id: "5",
    title: "Mantenimiento programado",
    message: "El sistema estara en mantenimiento el domingo de 2:00 AM a 6:00 AM",
    type: "info",
    read: true,
    createdAt: "Ayer",
    category: "system",
  },
  {
    id: "6",
    title: "Nuevo evento de bienestar",
    message: "Se ha creado el evento 'Torneo Interfacultades de Futbol' para el 15 de septiembre",
    type: "info",
    read: true,
    createdAt: "Hace 2 dias",
    category: "social",
  },
  {
    id: "7",
    title: "Pago pendiente",
    message: "Juan Pablo Torres tiene un pago de matricula pendiente. Fecha limite: 30 de julio",
    type: "warning",
    read: true,
    createdAt: "Hace 3 dias",
    category: "financial",
  },
  {
    id: "8",
    title: "Actualizacion de sistema",
    message: "Se ha actualizado el modulo de calificaciones con nuevas funcionalidades",
    type: "success",
    read: true,
    createdAt: "Hace 5 dias",
    category: "system",
  },
];

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  success: CheckCircle2,
};

const typeColors = {
  info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  error: "bg-red-500/10 text-red-500 border-red-500/20",
  success: "bg-green-500/10 text-green-500 border-green-500/20",
};

const categoryLabels = {
  academic: "Academico",
  financial: "Financiero",
  system: "Sistema",
  social: "Social",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | Notification["category"]>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(
    (n) => filter === "all" || n.category === filter
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `Tienes ${unreadCount} notificaciones sin leer` : "Todas las notificaciones leidas"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  Todas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("academic")}>
                  Academicas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("financial")}>
                  Financieras
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("system")}>
                  Sistema
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("social")}>
                  Social
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Marcar todas como leidas
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{notifications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sin leer</CardDescription>
              <CardTitle className="text-3xl text-primary">{unreadCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Alertas</CardDescription>
              <CardTitle className="text-3xl text-yellow-500">
                {notifications.filter((n) => n.type === "warning").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Errores</CardDescription>
              <CardTitle className="text-3xl text-red-500">
                {notifications.filter((n) => n.type === "error").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Notifications List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              Todas
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Sin leer
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No hay notificaciones</p>
                    <p className="text-sm text-muted-foreground">
                      Las nuevas notificaciones apareceran aqui
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications.map((notification, index) => {
                      const Icon = typeIcons[notification.type];
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors",
                            !notification.read && "bg-primary/5"
                          )}
                        >
                          <div className={cn("p-2 rounded-lg", typeColors[notification.type])}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{notification.title}</p>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {categoryLabels[notification.category]}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {notification.createdAt}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {filteredNotifications.filter((n) => !n.read).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-lg font-medium">Todo al dia!</p>
                    <p className="text-sm text-muted-foreground">
                      No tienes notificaciones pendientes
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications
                      .filter((n) => !n.read)
                      .map((notification, index) => {
                        const Icon = typeIcons[notification.type];
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-4 p-4 bg-primary/5 hover:bg-primary/10 transition-colors"
                          >
                            <div className={cn("p-2 rounded-lg", typeColors[notification.type])}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{notification.title}</p>
                                <span className="w-2 h-2 bg-primary rounded-full" />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {categoryLabels[notification.category]}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {notification.createdAt}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
