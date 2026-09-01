//Muestra la lista de todas las mascotas, con buscador, filtros y el botón para ir a /pacientes/nuevo.


'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Plus, Search, PawPrint, ChevronRight, User, Stethoscope } from 'lucide-react';

interface Mascota {
  id: string;
  nombre_actual: string;
  especie: string;
  raza?: string;
  tutor_nombre?: string;
  veterinario_cabecera?: string;
  created_at?: string;
}

export default function PacientesPage() {
  const supabase = createClient();
  const [pacientes, setPacientes] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function cargarPacientes() {
      setLoading(true);
      const { data, error } = await supabase
        .from('mascotas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al cargar pacientes:', error);
      } else if (data) {
        setPacientes(data);
      }
      setLoading(false);
    }

    cargarPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((p) => {
    const query = busqueda.toLowerCase();
    return (
      p.nombre_actual?.toLowerCase().includes(query) ||
      p.tutor_nombre?.toLowerCase().includes(query) ||
      p.raza?.toLowerCase().includes(query) ||
      p.especie?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <PawPrint className="w-7 h-7 text-emerald-600" />
              Gestión de Pacientes
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Listado completo de fichas clínicas y mascotas registradas
            </p>
          </div>

          <Link
            href="/pacientes/nuevo"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 shrink-0"
          >
            <Plus className="w-4 h-4" /> Nuevo Paciente
          </Link>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, tutor, raza o especie..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>

        {/* Lista de tarjetas */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Cargando lista de pacientes...
          </div>
        ) : pacientesFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <PawPrint className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No se encontraron pacientes</p>
            <p className="text-xs text-slate-400">
              {busqueda ? 'Probá con otra búsqueda' : 'Registrá el primero usando el botón de arriba'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pacientesFiltrados.map((paciente) => (
              <Link
                key={paciente.id}
                href={`/pacientes/${paciente.id}`}
                className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {paciente.nombre_actual}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {paciente.especie}
                    </span>
                  </div>

                  {paciente.raza && (
                    <p className="text-xs text-slate-500">{paciente.raza}</p>
                  )}

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
                    {paciente.tutor_nombre && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" /> {paciente.tutor_nombre}
                      </span>
                    )}
                    {paciente.veterinario_cabecera && (
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-slate-400" /> {paciente.veterinario_cabecera}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}