"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Plus,
  Heart,
  Trophy,
  Brain,
  Music,
  Users,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { events as initialEvents } from "@/lib/mock-data";
import type { Event } from "@/lib/types";

const categoryIcons = {
  sports: Trophy,
  culture: Music,
  academic: Brain,
  psychology: Heart,
  other: Users,
};

const categoryColors = {
  sports: "bg-green-500/10 text-green-500 border-green-500/20",
  culture: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  academic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  psychology: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const categoryLabels = {
  sports: "Deportes",
  culture: "Cultura",
  academic: "Académico",
  psychology: "Psicología",
  other: "Otros",
};

export default function WelfarePage() {
  const [eventsList, setEventsList] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    category: "other",
    date: new Date(),
    location: "",
    capacity: 100,
    registrations: 0,
  });

  const handleSave = () => {
    const newEvent: Event = {
      ...formData,
      id: String(eventsList.length + 1),
    } as Event;
    setEventsList((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      category: "other",
      date: new Date(),
      location: "",
      capacity: 100,
      registrations: 0,
    });
  };

  const sportsEvents = eventsList.filter((e) => e.category === "sports");
  const cultureEvents = eventsList.filter((e) => e.category === "culture");
  const psychologyEvents = eventsList.filter((e) => e.category === "psychology");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bienestar Universitario</h1>
            <p className="text-muted-foreground mt-1">
              Eventos, deportes, psicología y actividades culturales
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Evento
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Eventos Activos</CardDescription>
              <CardTitle className="text-3xl">{eventsList.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Este semestre
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Eventos Deportivos</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {sportsEvents.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Trophy className="h-4 w-4 text-green-500" />
                Torneos y competencias
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Eventos Culturales</CardDescription>
              <CardTitle className="text-3xl text-purple-500">
                {cultureEvents.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Music className="h-4 w-4 text-purple-500" />
                Arte y música
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Apoyo Psicológico</CardDescription>
              <CardTitle className="text-3xl text-pink-500">
                {psychologyEvents.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Heart className="h-4 w-4 text-pink-500" />
                Talleres y citas
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Todos los Eventos</TabsTrigger>
            <TabsTrigger value="sports">Deportes</TabsTrigger>
            <TabsTrigger value="culture">Cultura</TabsTrigger>
            <TabsTrigger value="psychology">Psicología</TabsTrigger>
          </TabsList>

          {["all", "sports", "culture", "psychology"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {eventsList
                  .filter((e) => tab === "all" || e.category === tab)
                  .map((event, index) => {
                    const Icon = categoryIcons[event.category];
                    const occupancy = event.capacity
                      ? (event.registrations / event.capacity) * 100
                      : 0;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
                          <div
                            className={`h-2 ${
                              event.category === "sports"
                                ? "bg-green-500"
                                : event.category === "culture"
                                ? "bg-purple-500"
                                : event.category === "psychology"
                                ? "bg-pink-500"
                                : event.category === "academic"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                            }`}
                          />
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg ${categoryColors[event.category]}`}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">
                                    {event.title}
                                  </CardTitle>
                                  <Badge
                                    variant="outline"
                                    className={categoryColors[event.category]}
                                  >
                                    {categoryLabels[event.category]}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {event.description}
                            </p>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {format(event.date, "EEEE, d MMMM yyyy", {
                                    locale: es,
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                              {event.capacity && (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4 text-muted-foreground" />
                                      <span>Inscritos</span>
                                    </div>
                                    <span className="font-medium">
                                      {event.registrations} / {event.capacity}
                                    </span>
                                  </div>
                                  <Progress value={occupancy} className="h-2" />
                                </div>
                              )}
                            </div>

                            <Button
                              className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                              size="sm"
                            >
                              Inscribirse
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo Evento</DialogTitle>
            <DialogDescription>
              Cree un nuevo evento de bienestar universitario
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Evento</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as Event["category"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sports">Deportes</SelectItem>
                    <SelectItem value="culture">Cultura</SelectItem>
                    <SelectItem value="psychology">Psicología</SelectItem>
                    <SelectItem value="academic">Académico</SelectItem>
                    <SelectItem value="other">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Crear Evento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
