"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Image as ImageIcon,
  Smile,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  initials: string;
}

interface Message {
  id: string;
  content: string;
  sender: "me" | "them";
  time: string;
  read: boolean;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Dr. Roberto Sanchez",
    role: "Docente - Ing. Sistemas",
    lastMessage: "Perfecto, nos vemos en clase",
    time: "10:30",
    unread: 2,
    online: true,
    initials: "RS",
  },
  {
    id: "2",
    name: "Coordinacion Academica",
    role: "Facultad de Ingenieria",
    lastMessage: "Su solicitud ha sido aprobada",
    time: "09:15",
    unread: 0,
    online: true,
    initials: "CA",
  },
  {
    id: "3",
    name: "Maria Garcia",
    role: "Estudiante - Semestre 6",
    lastMessage: "Gracias por la informacion!",
    time: "Ayer",
    unread: 0,
    online: false,
    initials: "MG",
  },
  {
    id: "4",
    name: "Bienestar Universitario",
    role: "Departamento",
    lastMessage: "El evento se realizara el viernes",
    time: "Ayer",
    unread: 1,
    online: true,
    initials: "BU",
  },
  {
    id: "5",
    name: "Dra. Patricia Fernandez",
    role: "Docente - Medicina",
    lastMessage: "Los resultados estan disponibles",
    time: "Lun",
    unread: 0,
    online: false,
    initials: "PF",
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Buenos dias Dr. Sanchez, tengo una pregunta sobre el proyecto final",
    sender: "me",
    time: "10:00",
    read: true,
  },
  {
    id: "2",
    content: "Buenos dias! Claro, digame en que puedo ayudarle",
    sender: "them",
    time: "10:05",
    read: true,
  },
  {
    id: "3",
    content: "Queria saber si podemos usar cualquier framework para el desarrollo o hay alguna restriccion",
    sender: "me",
    time: "10:10",
    read: true,
  },
  {
    id: "4",
    content: "Pueden usar el framework que prefieran, lo importante es que cumplan con los requisitos funcionales. React, Vue, Angular, cualquiera esta bien.",
    sender: "them",
    time: "10:15",
    read: true,
  },
  {
    id: "5",
    content: "Excelente, muchas gracias por la aclaracion!",
    sender: "me",
    time: "10:20",
    read: true,
  },
  {
    id: "6",
    content: "Perfecto, nos vemos en clase",
    sender: "them",
    time: "10:30",
    read: true,
  },
];

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: String(messages.length + 1),
      content: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex rounded-xl border overflow-hidden bg-card">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversacion..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <motion.button
                  key={contact.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedContact(contact)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                    selectedContact.id === contact.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {contact.initials}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      <span className="text-xs text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="ml-2">{contact.unread}</Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedContact.initials}
                  </AvatarFallback>
                </Avatar>
                {selectedContact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div>
                <p className="font-medium">{selectedContact.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedContact.online ? "En linea" : "Desconectado"} • {selectedContact.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex",
                    message.sender === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2",
                      message.sender === "me"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={cn(
                        "flex items-center justify-end gap-1 mt-1",
                        message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      <span className="text-xs">{message.time}</span>
                      {message.sender === "me" && (
                        message.read ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : (
                          <Check className="h-3 w-3" />
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Escribe un mensaje..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
