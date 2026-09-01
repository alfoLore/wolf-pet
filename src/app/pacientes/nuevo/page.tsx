//Formulario de alta para agregar un paciente/mascota a Supabase.

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, PawPrint, Save, AlertCircle } from 'lucide-react';

export default function NuevoPacientePage() {
  const router = useRouter();
  const supabase = createClient();

  const [guardando, setGuardando] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre_actual: '',
    especie: 'Canino',
    raza: '',
    peso_actual: '',
    tutor_nombre: '',
    veterinario_cabecera: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setErrorMsg(null);

    try {
      const payload = {
        nombre_actual: formData.nombre_actual.trim(),
        especie: formData.especie,
        raza: formData.raza.trim() || null,
        peso_actual: formData.peso_actual ? parseFloat(formData.peso_actual) : null,
        tutor_nombre: formData.tutor_nombre.trim() || null,
        veterinario_cabecera: formData.veterinario_cabecera.trim() || null,
      };

      const { error } = await supabase.from('mascotas').insert([payload]);
      if (error) throw error;

      router.push('/pacientes');
      router.refresh();
    } catch (err: unknown) {
      console.error('Error al guardar:', err);
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar el registro.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/pacientes"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Panel de Pacientes
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <PawPrint className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Nuevo Paciente</h1>
              <p className="text-xs text-slate-500">Ingresá los datos iniciales para la ficha médica</p>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3 text-xs">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del Paciente *</label>
                <input
                  type="text"
                  name="nombre_actual"
                  required
                  value={formData.nombre_actual}
                  onChange={handleChange}
                  placeholder="Ej: Firulais"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Especie *</label>
                <select
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="Canino">Canino</option>
                  <option value="Felino">Felino</option>
                  <option value="Exótico">Exótico</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Raza</label>
                <input
                  type="text"
                  name="raza"
                  value={formData.raza}
                  onChange={handleChange}
                  placeholder="Ej: Labrador"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Peso Actual (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="peso_actual"
                  value={formData.peso_actual}
                  onChange={handleChange}
                  placeholder="Ej: 12.5"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del Tutor / Dueño</label>
                <input
                  type="text"
                  name="tutor_nombre"
                  value={formData.tutor_nombre}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Veterinario de Cabecera</label>
                <input
                  type="text"
                  name="veterinario_cabecera"
                  value={formData.veterinario_cabecera}
                  onChange={handleChange}
                  placeholder="Ej: Dra. García"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link
                href="/pacientes"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={guardando}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {guardando ? 'Guardando...' : 'Guardar Paciente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}