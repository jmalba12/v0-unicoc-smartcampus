"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  GraduationCap,
  CreditCard,
  FileText,
  Library,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentActivity, academicCalendar } from "@/lib/mock-data";

const activityIcons = {
  student: GraduationCap,
  payment: CreditCard,
  grades: FileText,
  library: Library,
  event: CalendarDays,
};

const activityColors = {
  student: "bg-blue-500/10 text-blue-500",
  payment: "bg-green-500/10 text-green-500",
  grades: "bg-yellow-500/10 text-yellow-500",
  library: "bg-purple-500/10 text-purple-500",
  event: "bg-pink-500/10 text-pink-500",
};

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activityIcons[activity.type as keyof typeof activityIcons];
              const colorClass = activityColors[activity.type as keyof typeof activityColors];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const calendarTypeColors = {
  academic: "default",
  grades: "secondary",
  break: "outline",
  exams: "destructive",
} as const;

export function AcademicCalendar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Calendario Académico</CardTitle>
          <CardDescription>Próximos eventos importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicCalendar.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-xs font-medium">
                      {format(event.date, "MMM", { locale: es }).toUpperCase()}
                    </span>
                    <span className="text-lg font-bold">
                      {format(event.date, "d")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(event.date, "EEEE", { locale: es })}
                    </p>
                  </div>
                </div>
                <Badge variant={calendarTypeColors[event.type as keyof typeof calendarTypeColors]}>
                  {event.type === "academic" && "Académico"}
                  {event.type === "grades" && "Notas"}
                  {event.type === "break" && "Receso"}
                  {event.type === "exams" && "Exámenes"}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
