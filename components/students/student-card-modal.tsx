"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faculties, programs } from "@/lib/mock-data";
import type { Student } from "@/lib/types";

interface StudentCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export function StudentCardModal({
  isOpen,
  onClose,
  student,
}: StudentCardModalProps) {
  if (!student) return null;

  const faculty = faculties.find((f) => f.id === student.facultyId);
  const program = programs.find((p) => p.id === student.programId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Carnet Digital</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Card */}
              <div className="p-6">
                <div className="relative aspect-[1.6/1] bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl overflow-hidden shadow-xl">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <pattern
                        id="grid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 10 0 L 0 0 0 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </pattern>
                      <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Card Content */}
                  <div className="relative h-full p-5 flex flex-col justify-between text-primary-foreground">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary-foreground/20">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">UNICOC</p>
                          <p className="text-[10px] opacity-80">SmartCampus</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] opacity-70">Código</p>
                        <p className="font-mono font-bold text-sm">{student.code}</p>
                      </div>
                    </div>

                    {/* Middle Section */}
                    <div className="flex gap-4 items-center">
                      <Avatar className="h-16 w-16 border-2 border-primary-foreground/30">
                        <AvatarImage src={student.photoUrl} alt={student.fullName} />
                        <AvatarFallback className="text-xl bg-primary-foreground/20 text-primary-foreground">
                          {student.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-sm leading-tight">
                          {student.fullName}
                        </p>
                        <p className="text-[10px] opacity-80 mt-0.5">
                          {program?.name}
                        </p>
                        <p className="text-[10px] opacity-70">{faculty?.name}</p>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex justify-between items-end">
                      <div className="grid grid-cols-3 gap-4 text-[10px]">
                        <div>
                          <p className="opacity-70">Documento</p>
                          <p className="font-medium">{student.document}</p>
                        </div>
                        <div>
                          <p className="opacity-70">Semestre</p>
                          <p className="font-medium">{student.semester}°</p>
                        </div>
                        <div>
                          <p className="opacity-70">Estado</p>
                          <p className="font-medium capitalize">
                            {student.status === "active" ? "Activo" : student.status}
                          </p>
                        </div>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="h-12 w-12 bg-primary-foreground rounded-md p-1">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect x="10" y="10" width="20" height="20" fill="currentColor" />
                          <rect x="40" y="10" width="10" height="10" fill="currentColor" />
                          <rect x="60" y="10" width="10" height="10" fill="currentColor" />
                          <rect x="70" y="10" width="20" height="20" fill="currentColor" />
                          <rect x="10" y="40" width="10" height="10" fill="currentColor" />
                          <rect x="30" y="40" width="10" height="10" fill="currentColor" />
                          <rect x="50" y="40" width="20" height="10" fill="currentColor" />
                          <rect x="10" y="60" width="10" height="10" fill="currentColor" />
                          <rect x="40" y="60" width="10" height="10" fill="currentColor" />
                          <rect x="60" y="60" width="10" height="10" fill="currentColor" />
                          <rect x="10" y="70" width="20" height="20" fill="currentColor" />
                          <rect x="40" y="70" width="10" height="10" fill="currentColor" />
                          <rect x="70" y="70" width="20" height="20" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
