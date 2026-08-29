'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PawPrint, User, Stethoscope, FileText, CheckCircle2 } from 'lucide-react';

export default function NuevoPacientePage() {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Perro');
  const [raza, setRaza] = useState('');
  const [peso, setPeso] = useState('');
  const [tutor, setTutor] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Inserción inicial de la historia clínica del paciente en Supabase
      const { error } = await supabase.from('mascotas').insert([
        {
          nombre_actual: nombre,
          especie,
          peso_actual: peso ? parseFloat(peso) : null,
          // Puedes adaptar estos campos según la estructura de tu base de datos
        },
      ]);

      if (error) throw error;

      alert('¡Paciente registrado con éxito en la historia clínica!');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error al guardar: ${err.message}`);
      } else {
        alert('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-xl">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Alta de Nuevo Paciente</h1>
            <p className="text-xs text-slate-500">Registro inicial de la historia clínica veterinaria</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Nombre de la Mascota *
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Luna"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Especie *
              </label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Perro">Canino (Perro)</option>
                <option value="Gato">Felino (Gato)</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Raza / Mestizaje
              </label>
              <input
                type="text"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                placeholder="Ej: Mestiza / Labrador"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Peso Actual (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ej: 15.5"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" /> Tutor / Responsable
              </label>
              <input
                type="text"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                placeholder="Nombre y Apellido del tutor"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-teal-600" /> Veterinario de Cabecera
              </label>
              <input
                type="text"
                value={veterinario}
                onChange={(e) => setVeterinario(e.target.value)}
                placeholder="Dr. / Clínica interviniente"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Guardando Registro...' : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Registrar Historia Clínica del Paciente
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}