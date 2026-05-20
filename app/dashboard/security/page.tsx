"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  History,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Monitor,
  Globe,
  Trash2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const activeSessions = [
  {
    id: "1",
    device: "Chrome en Windows",
    location: "Bogota, Colombia",
    ip: "192.168.1.100",
    lastActive: "Hace 2 minutos",
    current: true,
  },
  {
    id: "2",
    device: "Safari en iPhone",
    location: "Bogota, Colombia",
    ip: "192.168.1.105",
    lastActive: "Hace 1 hora",
    current: false,
  },
  {
    id: "3",
    device: "Firefox en MacOS",
    location: "Medellin, Colombia",
    ip: "10.0.0.50",
    lastActive: "Hace 2 dias",
    current: false,
  },
];

const loginHistory = [
  {
    id: "1",
    date: "2024-08-10 10:30",
    device: "Chrome en Windows",
    location: "Bogota",
    status: "success",
  },
  {
    id: "2",
    date: "2024-08-09 15:45",
    device: "Safari en iPhone",
    location: "Bogota",
    status: "success",
  },
  {
    id: "3",
    date: "2024-08-08 09:15",
    device: "Firefox en MacOS",
    location: "Medellin",
    status: "success",
  },
  {
    id: "4",
    date: "2024-08-07 22:00",
    device: "Chrome en Android",
    location: "Cali",
    status: "failed",
  },
  {
    id: "5",
    date: "2024-08-06 08:30",
    device: "Chrome en Windows",
    location: "Bogota",
    status: "success",
  },
];

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChangePassword = () => {
    setIsPasswordModalOpen(false);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seguridad</h1>
          <p className="text-muted-foreground mt-1">
            Gestione la seguridad de su cuenta y sesiones activas
          </p>
        </div>

        {/* Security Score */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nivel de Seguridad</p>
                  <p className="text-3xl font-bold text-primary">Bueno</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Puntuacion</p>
                <p className="text-2xl font-bold">75/100</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Contrasena segura
              </Badge>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                <AlertTriangle className="h-3 w-3 mr-1" />
                2FA desactivado
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Email verificado
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="password">Contrasena</TabsTrigger>
            <TabsTrigger value="2fa">Autenticacion 2FA</TabsTrigger>
            <TabsTrigger value="sessions">Sesiones</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Cambiar Contrasena
                </CardTitle>
                <CardDescription>
                  Actualice su contrasena regularmente para mantener su cuenta segura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Ultima actualizacion</p>
                    <p className="text-sm text-muted-foreground">Hace 30 dias</p>
                  </div>
                  <Button onClick={() => setIsPasswordModalOpen(true)}>
                    <Lock className="h-4 w-4 mr-2" />
                    Cambiar Contrasena
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Minimo 8 caracteres</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Su contrasena tiene mas de 8 caracteres
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Caracteres especiales</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Incluye numeros y simbolos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2FA Tab */}
          <TabsContent value="2fa" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Autenticacion de Dos Factores
                </CardTitle>
                <CardDescription>
                  Agregue una capa adicional de seguridad a su cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${twoFactorEnabled ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                      {twoFactorEnabled ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Estado de 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        {twoFactorEnabled ? "Activado y funcionando" : "Desactivado - Se recomienda activar"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIs2FAModalOpen(true);
                      } else {
                        setTwoFactorEnabled(false);
                      }
                    }}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">App de Autenticacion</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Use Google Authenticator, Authy o similar
                        </p>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">Llave de Seguridad</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Use una llave fisica como YubiKey
                        </p>
                        <Button variant="outline" size="sm">
                          Agregar Llave
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Sesiones Activas
                    </CardTitle>
                    <CardDescription>
                      Dispositivos donde ha iniciado sesion
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cerrar Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        session.current ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          {session.device.includes("iPhone") ? (
                            <Smartphone className="h-5 w-5" />
                          ) : (
                            <Monitor className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{session.device}</p>
                            {session.current && (
                              <Badge variant="secondary" className="text-xs">
                                Sesion actual
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            <span>{session.location}</span>
                            <span>•</span>
                            <span>{session.ip}</span>
                            <span>•</span>
                            <span>{session.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Historial de Accesos
                </CardTitle>
                <CardDescription>
                  Registro de intentos de inicio de sesion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha y Hora</TableHead>
                      <TableHead>Dispositivo</TableHead>
                      <TableHead>Ubicacion</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginHistory.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.date}</TableCell>
                        <TableCell>{entry.device}</TableCell>
                        <TableCell>{entry.location}</TableCell>
                        <TableCell>
                          {entry.status === "success" ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Exitoso
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              <XCircle className="h-3 w-3 mr-1" />
                              Fallido
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Notifications Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones de Seguridad</CardTitle>
                <CardDescription>
                  Configure como desea recibir alertas de seguridad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas por Email</p>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones de accesos sospechosos
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de Nuevos Dispositivos</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar cuando se inicie sesion desde un dispositivo nuevo
                    </p>
                  </div>
                  <Switch
                    checked={loginAlerts}
                    onCheckedChange={setLoginAlerts}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Change Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contrasena</DialogTitle>
            <DialogDescription>
              Ingrese su contrasena actual y la nueva contrasena
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Contrasena Actual</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nueva Contrasena</Label>
              <Input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Confirmar Nueva Contrasena</Label>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleChangePassword}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2FA Modal */}
      <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar 2FA</DialogTitle>
            <DialogDescription>
              Escanee el codigo QR con su app de autenticacion
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-4">
            <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Smartphone className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Codigo QR</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Si no puede escanear el codigo, ingrese esta clave manualmente:
              <br />
              <code className="bg-muted px-2 py-1 rounded mt-1 inline-block">
                ABCD-EFGH-IJKL-MNOP
              </code>
            </p>
            <div className="w-full space-y-2">
              <Label>Codigo de Verificacion</Label>
              <Input placeholder="Ingrese el codigo de 6 digitos" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIs2FAModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              setTwoFactorEnabled(true);
              setIs2FAModalOpen(false);
            }}>
              Verificar y Activar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
