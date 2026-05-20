'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, GraduationCap, Lock, Mail, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulación de autenticación
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (email === 'admin@unicoc.edu.co' && password === 'admin123') {
      localStorage.setItem('unicoc_user', JSON.stringify({
        id: '1',
        name: 'Administrador',
        email: 'admin@unicoc.edu.co',
        role: 'admin',
        avatar: '/avatars/admin.jpg'
      }))
      router.push('/dashboard')
    } else if (email === 'docente@unicoc.edu.co' && password === 'docente123') {
      localStorage.setItem('unicoc_user', JSON.stringify({
        id: '2',
        name: 'Dr. Carlos Rodríguez',
        email: 'docente@unicoc.edu.co',
        role: 'teacher',
        avatar: '/avatars/teacher.jpg'
      }))
      router.push('/dashboard')
    } else if (email === 'estudiante@unicoc.edu.co' && password === 'estudiante123') {
      localStorage.setItem('unicoc_user', JSON.stringify({
        id: '3',
        name: 'María García',
        email: 'estudiante@unicoc.edu.co',
        role: 'student',
        avatar: '/avatars/student.jpg'
      }))
      router.push('/dashboard')
    } else {
      setError('Credenciales inválidas. Intente de nuevo.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Panel izquierdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-4 bg-accent/20 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="h-16 w-16 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">UNICOC</h1>
            <h2 className="text-2xl font-semibold mb-2 text-accent">SmartCampus</h2>
            <p className="text-lg opacity-80 max-w-md">
              Sistema Integrado de Gestión Académica Universitaria
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-6 text-center"
          >
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-accent">15,000+</p>
              <p className="text-sm opacity-80">Estudiantes Activos</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-accent">850+</p>
              <p className="text-sm opacity-80">Docentes</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-accent">45</p>
              <p className="text-sm opacity-80">Programas</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-3xl font-bold text-accent">98%</p>
              <p className="text-sm opacity-80">Satisfacción</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Panel derecho - Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="p-3 bg-primary rounded-xl">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">UNICOC</h1>
              <p className="text-xs text-muted-foreground">SmartCampus</p>
            </div>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">
                Bienvenido de nuevo
              </CardTitle>
              <CardDescription className="text-center">
                Ingrese sus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Institucional</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuario@unicoc.edu.co"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive text-center bg-destructive/10 py-2 px-3 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span className="text-muted-foreground">Recordarme</span>
                  </label>
                  <button type="button" className="text-primary hover:underline">
                    Olvidé mi contraseña
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Credenciales de prueba:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span className="text-muted-foreground">Admin:</span>
                    <span className="font-mono">admin@unicoc.edu.co / admin123</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span className="text-muted-foreground">Docente:</span>
                    <span className="font-mono">docente@unicoc.edu.co / docente123</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span className="text-muted-foreground">Estudiante:</span>
                    <span className="font-mono">estudiante@unicoc.edu.co / estudiante123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © 2024 UNICOC SmartCampus. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
