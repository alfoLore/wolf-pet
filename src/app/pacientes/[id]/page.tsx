// Ficha Clínica del Paciente/ mascota.

/*Este componente realiza dos tareas clave:

Lee el parámetro de la URL (id) usando la función use() de React (la forma estándar y requerida en las versiones recientes de Next.js).

Consulta en Supabase los datos de esa mascota específica y los muestra organizados en pestañas y tarjetas clínicas.
*/

'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { 
  ArrowLeft, 
  PawPrint, 
  User, 
  Stethoscope, 
  Weight, 
  Calendar, 
  FileText, 
  Activity,
  AlertCircle
} from 'lucide-react';

interface Mascota {
  id: string;
  nombre_actual: string;
  especie: string;
  raza?: string;
  peso_actual?: number;
  tutor_nombre?: string;
  veterinario_cabecera?: string;
  created_at?: string;
}

export default function FichaClinicaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Desenredamos la promesa de params con `use()`
  const resolvedParams = use(params);
  const pacienteId = resolvedParams.id;

  const supabase = createClient();
  const [paciente, setPaciente] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function cargarPaciente() {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from('mascotas')
        .select('*')
        .eq('id', pacienteId)
        .single();

      if (error) {
        console.error('Error al obtener la ficha del paciente:', error);
        setErrorMsg('No se pudo encontrar el paciente o no existe.');
      } else {
        setPaciente(data);
      }
      setLoading(false);
    }

    if (pacienteId) {
      cargarPaciente();
    }
  }, [pacienteId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center text-xs text-slate-400">
        Cargando ficha clínica...
      </div>
    );
  }

  if (errorMsg || !paciente) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">Error al cargar la ficha</h2>
          <p className="text-xs text-slate-500">{errorMsg || 'Paciente no encontrado.'}</p>
          <Link
            href="/pacientes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Enlace de retorno */}
        <Link
          href="/pacientes"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Pacientes
        </Link>

        {/* Header Ficha Principal */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl">
                <PawPrint className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{paciente.nombre_actual}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {paciente.especie}
                  </span>
                </div>
                {paciente.raza && (
                  <p className="text-xs text-slate-500 mt-1">Raza: {paciente.raza}</p>
                )}
              </div>
            </div>

            <div className="text-xs text-slate-400 self-start sm:self-auto">
              ID Paciente: <span className="font-mono text-slate-600">{paciente.id.slice(0, 8)}...</span>
            </div>
          </div>

          {/* Tarjetas de Datos Rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <User className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Tutor / Dueño</p>
                <p className="text-xs font-medium text-slate-800">
                  {paciente.tutor_nombre || 'No especificado'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Weight className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Peso Registrado</p>
                <p className="text-xs font-medium text-slate-800">
                  {paciente.peso_actual ? `${paciente.peso_actual} kg` : 'Sin registro'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Vet. Cabecera</p>
                <p className="text-xs font-medium text-slate-800">
                  {paciente.veterinario_cabecera || 'No asignado'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Clínico e Historial */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            Historial de Consultas y Atenciones
          </h2>
          
          <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-600">Sin consultas registradas aún</p>
            <p className="text-[11px] text-slate-400">
              Próximamente podrás agregar evoluciones, estudios complementarios y planes de vacunación.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}