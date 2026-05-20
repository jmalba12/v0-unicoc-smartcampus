"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Calculator,
  GraduationCap,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  {
    icon: Calculator,
    title: "Calcular promedio",
    prompt: "Cual es mi promedio academico actual y como puedo mejorarlo?",
  },
  {
    icon: BookOpen,
    title: "Horarios de clase",
    prompt: "Muestrame mi horario de clases de esta semana",
  },
  {
    icon: Lightbulb,
    title: "Consejos de estudio",
    prompt: "Dame consejos para mejorar mi rendimiento en Calculo Diferencial",
  },
  {
    icon: GraduationCap,
    title: "Requisitos de grado",
    prompt: "Cuantos creditos me faltan para graduarme?",
  },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (prompt?: string) => {
    const messageText = prompt || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simular respuesta de IA
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let response = "";

    if (messageText.toLowerCase().includes("promedio")) {
      response = `Basado en tu historial academico, tu promedio acumulado actual es de **4.2/5.0**, lo cual te posiciona en el 15% superior de tu programa.

**Desglose por semestre:**
- Semestre 1: 4.0
- Semestre 2: 4.1
- Semestre 3: 4.3
- Semestre 4: 4.2
- Semestre 5: 4.3
- Semestre 6: 4.2

**Recomendaciones para mejorar:**
1. Enfocate en las materias de mayor peso crediticio
2. Participa activamente en clase (algunos docentes dan puntos extra)
3. Aprovecha las monitorias gratuitas de la universidad
4. Forma grupos de estudio con companeros de alto rendimiento`;
    } else if (messageText.toLowerCase().includes("horario")) {
      response = `Aqui esta tu horario de clases para esta semana:

**Lunes:**
- 08:00 - 10:00: Programacion II (Lab 101)
- 10:00 - 12:00: Calculo Diferencial (Aula 203)

**Martes:**
- 10:00 - 12:00: Estructuras de Datos (Lab 102)
- 14:00 - 16:00: Fisica I (Aula 301)

**Miercoles:**
- 08:00 - 10:00: Programacion II (Lab 101)
- 16:00 - 18:00: Ingles IV (Aula 105)

**Jueves:**
- 10:00 - 12:00: Estructuras de Datos (Lab 102)
- 14:00 - 16:00: Bases de Datos (Lab 103)

**Viernes:**
- 08:00 - 10:00: Calculo Diferencial (Aula 203)
- 10:00 - 12:00: Fisica I (Aula 301)`;
    } else if (messageText.toLowerCase().includes("consejos") || messageText.toLowerCase().includes("estudio")) {
      response = `Aqui te comparto algunas estrategias de estudio efectivas:

**Tecnicas de aprendizaje activo:**
1. **Pomodoro**: Estudia 25 minutos, descansa 5. Repite 4 veces y toma un descanso largo.
2. **Feynman**: Explica el tema como si le ensenares a alguien mas
3. **Practica espaciada**: Repasa el material en intervalos crecientes

**Recursos disponibles en UNICOC:**
- Monitorias gratuitas (Lunes a Viernes 4-8 PM)
- Biblioteca con cubiculos de estudio
- Plataforma virtual con ejercicios practicos
- Grupos de estudio organizados por el CACE

**Tip adicional:** Los docentes tienen horarios de atencion. No dudes en consultarles directamente!`;
    } else if (messageText.toLowerCase().includes("creditos") || messageText.toLowerCase().includes("graduar")) {
      response = `**Estado de tu avance academico:**

Has completado **96 creditos** de los **160 creditos** requeridos para tu programa de Ingenieria de Sistemas.

**Progreso:** 60% completado

**Creditos restantes por area:**
- Formacion Basica: 0 (completado)
- Formacion Profesional: 48 creditos
- Electivas Profesionales: 12 creditos
- Formacion Complementaria: 4 creditos

**Materias pendientes obligatorias:**
1. Ingenieria de Software
2. Redes de Computadores
3. Sistemas Operativos
4. Proyecto de Grado I y II

**Estimacion de graduacion:** Diciembre 2025 (si mantienes carga normal de 16 creditos/semestre)`;
    } else {
      response = `Entiendo tu consulta. Como asistente academico de UNICOC SmartCampus, puedo ayudarte con:

1. **Consultas academicas:** Promedios, creditos, horarios, notas
2. **Tramites:** Certificados, constancias, solicitudes
3. **Bienestar:** Eventos, servicios psicologicos, deportes
4. **Biblioteca:** Disponibilidad de libros, prestamos
5. **Financiero:** Estado de cuenta, fechas de pago

Por favor, especifica tu consulta para darte informacion mas precisa.`;
    }

    const assistantMessage: Message = {
      id: String(Date.now() + 1),
      role: "assistant",
      content: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">IA Academica</h1>
              <p className="text-sm text-muted-foreground">
                Tu asistente inteligente para consultas academicas
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Hola! Soy tu Asistente Academico</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Puedo ayudarte con consultas sobre tu promedio, horarios, creditos, 
                  tramites y mucho mas. Preguntame lo que necesites!
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSend(suggestion.prompt)}
                      className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <suggestion.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{suggestion.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {suggestion.prompt}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Messages */
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.content.split("\n").map((line, i) => (
                          <p key={i} className={cn(
                            "mb-1 last:mb-0",
                            line.startsWith("**") && "font-semibold"
                          )}>
                            {line.replace(/\*\*/g, "")}
                          </p>
                        ))}
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => copyToClipboard(message.content)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copiar
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Pensando...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="max-w-3xl mx-auto flex gap-2">
              <Textarea
                placeholder="Escribe tu pregunta aqui..."
                className="min-h-[50px] max-h-[200px] resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                size="icon"
                className="h-[50px] w-[50px]"
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              La IA puede cometer errores. Verifica la informacion importante.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
