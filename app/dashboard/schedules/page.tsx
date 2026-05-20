"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Clock, MapPin } from "lucide-react";
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
import { schedules as initialSchedules, subjects, teachers } from "@/lib/mock-data";
import type { Schedule } from "@/lib/types";

const daysOfWeek = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00",
];

const colors = [
  "bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300",
  "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300",
  "bg-purple-500/20 border-purple-500 text-purple-700 dark:text-purple-300",
  "bg-orange-500/20 border-orange-500 text-orange-700 dark:text-orange-300",
  "bg-pink-500/20 border-pink-500 text-pink-700 dark:text-pink-300",
  "bg-cyan-500/20 border-cyan-500 text-cyan-700 dark:text-cyan-300",
];

export default function SchedulesPage() {
  const [schedulesList, setSchedulesList] = useState(initialSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Schedule>>({
    subjectId: "",
    teacherId: "",
    classroom: "",
    dayOfWeek: 1,
    startTime: "08:00",
    endTime: "10:00",
    period: "2024-2",
  });

  const handleSave = () => {
    const newSchedule: Schedule = {
      ...formData,
      id: String(schedulesList.length + 1),
    } as Schedule;
    setSchedulesList((prev) => [...prev, newSchedule]);
    setIsModalOpen(false);
    setFormData({
      subjectId: "",
      teacherId: "",
      classroom: "",
      dayOfWeek: 1,
      startTime: "08:00",
      endTime: "10:00",
      period: "2024-2",
    });
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId)?.name || "N/A";
  };

  const getTeacherName = (teacherId: string) => {
    return teachers.find((t) => t.id === teacherId)?.fullName || "N/A";
  };

  const getScheduleColor = (subjectId: string) => {
    const index = subjects.findIndex((s) => s.id === subjectId);
    return colors[index % colors.length];
  };

  const getScheduleForSlot = (day: number, time: string) => {
    return schedulesList.filter(
      (s) =>
        s.dayOfWeek === day &&
        s.startTime <= time &&
        s.endTime > time
    );
  };

  const getScheduleHeight = (startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);
    return (end - start) * 60;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Horarios</h1>
            <p className="text-muted-foreground mt-1">
              Gestión de horarios de clases y aulas
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Horario
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Horarios</CardDescription>
              <CardTitle className="text-3xl">{schedulesList.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Clases programadas
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Materias Activas</CardDescription>
              <CardTitle className="text-3xl">
                {new Set(schedulesList.map((s) => s.subjectId)).size}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4" />
                Este período
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Aulas Utilizadas</CardDescription>
              <CardTitle className="text-3xl">
                {new Set(schedulesList.map((s) => s.classroom)).size}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Espacios activos
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Views */}
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar">Vista Calendario</TabsTrigger>
            <TabsTrigger value="list">Vista Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Calendar Header */}
                  <div className="grid grid-cols-7 border-b">
                    <div className="p-3 text-sm font-medium text-muted-foreground border-r">
                      Hora
                    </div>
                    {daysOfWeek.map((day) => (
                      <div
                        key={day.value}
                        className="p-3 text-sm font-medium text-center border-r last:border-r-0"
                      >
                        {day.label}
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  {timeSlots.slice(0, -1).map((time) => (
                    <div key={time} className="grid grid-cols-7 border-b last:border-b-0">
                      <div className="p-3 text-xs text-muted-foreground border-r bg-muted/30">
                        {time}
                      </div>
                      {daysOfWeek.map((day) => {
                        const schedulesForSlot = getScheduleForSlot(day.value, time);
                        const isFirstSlot = schedulesForSlot.some(
                          (s) => s.startTime === time
                        );

                        return (
                          <div
                            key={`${day.value}-${time}`}
                            className="relative p-1 border-r last:border-r-0 min-h-[60px]"
                          >
                            {schedulesForSlot.map(
                              (schedule) =>
                                schedule.startTime === time && (
                                  <motion.div
                                    key={schedule.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`absolute inset-1 rounded-lg border-l-4 p-2 ${getScheduleColor(
                                      schedule.subjectId
                                    )}`}
                                    style={{
                                      height: getScheduleHeight(
                                        schedule.startTime,
                                        schedule.endTime
                                      ),
                                      zIndex: 10,
                                    }}
                                  >
                                    <p className="text-xs font-semibold truncate">
                                      {getSubjectName(schedule.subjectId)}
                                    </p>
                                    <p className="text-[10px] truncate opacity-80">
                                      {schedule.classroom}
                                    </p>
                                    <p className="text-[10px] truncate opacity-70">
                                      {schedule.startTime} - {schedule.endTime}
                                    </p>
                                  </motion.div>
                                )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {schedulesList.map((schedule, index) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border-l-4 ${getScheduleColor(schedule.subjectId)}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {getSubjectName(schedule.subjectId)}
                      </CardTitle>
                      <CardDescription>
                        {getTeacherName(schedule.teacherId)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {daysOfWeek.find((d) => d.value === schedule.dayOfWeek)?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.classroom}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo Horario</DialogTitle>
            <DialogDescription>
              Programe una nueva clase en el calendario
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Materia</Label>
              <Select
                value={formData.subjectId}
                onValueChange={(value) => {
                  const subject = subjects.find((s) => s.id === value);
                  setFormData({
                    ...formData,
                    subjectId: value,
                    teacherId: subject?.teacherId || "",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Día</Label>
                <Select
                  value={String(formData.dayOfWeek)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, dayOfWeek: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day.value} value={String(day.value)}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="classroom">Aula</Label>
                <Input
                  id="classroom"
                  value={formData.classroom}
                  onChange={(e) =>
                    setFormData({ ...formData, classroom: e.target.value })
                  }
                  placeholder="Ej: Lab 101"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Hora Inicio</Label>
                <Select
                  value={formData.startTime}
                  onValueChange={(value) =>
                    setFormData({ ...formData, startTime: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Hora Fin</Label>
                <Select
                  value={formData.endTime}
                  onValueChange={(value) =>
                    setFormData({ ...formData, endTime: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Crear Horario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
