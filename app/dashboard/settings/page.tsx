'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Globe,
  Key,
  Lock,
  Mail,
  Monitor,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
  User,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    grades: true,
    events: false,
    news: true,
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground mt-1">
            Administra las preferencias del sistema y tu cuenta
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="general" className="gap-2">
              <Monitor className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Cuenta
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-2">
              <Users className="h-4 w-4" />
              Roles
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Apariencia
                    </CardTitle>
                    <CardDescription>
                      Personaliza el aspecto visual del sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={theme === 'light' ? 'default' : 'outline'}
                          className="flex-1 gap-2"
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-4 w-4" />
                          Claro
                        </Button>
                        <Button
                          variant={theme === 'dark' ? 'default' : 'outline'}
                          className="flex-1 gap-2"
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-4 w-4" />
                          Oscuro
                        </Button>
                        <Button
                          variant={theme === 'system' ? 'default' : 'outline'}
                          className="flex-1 gap-2"
                          onClick={() => setTheme('system')}
                        >
                          <Monitor className="h-4 w-4" />
                          Sistema
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Idioma y Región
                    </CardTitle>
                    <CardDescription>
                      Configura el idioma y formato regional
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <Select defaultValue="es">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Zona Horaria</Label>
                      <Select defaultValue="america_bogota">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar zona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_bogota">América/Bogotá (UTC-5)</SelectItem>
                          <SelectItem value="america_mexico">América/México (UTC-6)</SelectItem>
                          <SelectItem value="america_lima">América/Lima (UTC-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Información de la Cuenta
                  </CardTitle>
                  <CardDescription>
                    Actualiza tu información personal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Cambiar foto</Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG o GIF. Máximo 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Nombre completo</Label>
                      <Input defaultValue="Administrador Sistema" />
                    </div>
                    <div className="space-y-2">
                      <Label>Correo electrónico</Label>
                      <Input defaultValue="admin@unicoc.edu.co" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input defaultValue="+57 300 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cargo</Label>
                      <Input defaultValue="Administrador del Sistema" disabled />
                    </div>
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Guardar cambios
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Preferencias de Notificación
                  </CardTitle>
                  <CardDescription>
                    Configura cómo y cuándo recibir notificaciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notificaciones por correo</p>
                          <p className="text-sm text-muted-foreground">
                            Recibir actualizaciones por email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, email: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notificaciones push</p>
                          <p className="text-sm text-muted-foreground">
                            Alertas en tiempo real en el navegador
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, push: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 flex items-center justify-center text-muted-foreground font-bold text-sm">
                          A+
                        </div>
                        <div>
                          <p className="font-medium">Alertas de calificaciones</p>
                          <p className="text-sm text-muted-foreground">
                            Notificar cuando se publiquen nuevas notas
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.grades}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, grades: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Eventos y actividades</p>
                          <p className="text-sm text-muted-foreground">
                            Recordatorios de eventos académicos
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.events}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, events: checked })
                        }
                      />
                    </div>
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Guardar preferencias
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      Cambiar Contraseña
                    </CardTitle>
                    <CardDescription>
                      Actualiza tu contraseña de acceso
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Contraseña actual</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Nueva contraseña</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirmar nueva contraseña</Label>
                      <Input type="password" />
                    </div>
                    <Button className="w-full gap-2">
                      <Lock className="h-4 w-4" />
                      Actualizar contraseña
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Autenticación de Dos Factores
                    </CardTitle>
                    <CardDescription>
                      Añade una capa extra de seguridad
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Estado 2FA</p>
                          <p className="text-sm text-muted-foreground">
                            Actualmente desactivado
                          </p>
                        </div>
                        <div className="h-3 w-3 bg-destructive rounded-full" />
                      </div>
                      <Button variant="outline" className="w-full">
                        Activar 2FA
                      </Button>
                    </div>

                    <div className="p-4 border border-dashed rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        La autenticación de dos factores protege tu cuenta
                        requiriendo un código adicional al iniciar sesión.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Roles Settings */}
          <TabsContent value="roles">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Gestión de Roles y Permisos
                  </CardTitle>
                  <CardDescription>
                    Configura los niveles de acceso del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        role: 'Administrador',
                        description: 'Acceso total al sistema',
                        permissions: ['Todo'],
                        color: 'bg-primary',
                      },
                      {
                        role: 'Coordinador',
                        description: 'Gestión de facultad y programas',
                        permissions: ['Estudiantes', 'Docentes', 'Notas', 'Horarios'],
                        color: 'bg-accent',
                      },
                      {
                        role: 'Docente',
                        description: 'Gestión de cursos asignados',
                        permissions: ['Notas', 'Asistencia', 'Horarios'],
                        color: 'bg-chart-1',
                      },
                      {
                        role: 'Estudiante',
                        description: 'Consulta de información personal',
                        permissions: ['Ver notas', 'Ver horario', 'Biblioteca'],
                        color: 'bg-chart-2',
                      },
                    ].map((item) => (
                      <div
                        key={item.role}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-3 w-3 rounded-full ${item.color}`} />
                          <div>
                            <p className="font-medium">{item.role}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.permissions.slice(0, 3).map((perm) => (
                            <span
                              key={perm}
                              className="text-xs bg-background px-2 py-1 rounded"
                            >
                              {perm}
                            </span>
                          ))}
                          {item.permissions.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{item.permissions.length - 3}
                            </span>
                          )}
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
