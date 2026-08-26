'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Activity, AlertCircle, PlusCircle, ShieldAlert, Heart } from 'lucide-react';

export default function Home() {
  const [mascota, setMascota] = useState<any>(null);
  const [registros, setRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado del formulario diario
  const [racionManana, setRacionManana] = useState(false);
  const [racionTarde, setRacionTarde] = useState(false);
  const [consistenciaHeces, setConsistenciaHeces] = useState('normal');
  const [tuvoMalestar, setTuvoMalestar] = useState(false);
  const [descripcionMalestar, setDescripcionMalestar] = useState('');

  // Cargar datos de Anita y sus registros
  const cargarDatos = async () => {
    setLoading(true);
    
    // 1. Obtener datos de Anita
    const { data: pet } = await supabase
      .from('mascotas')
      .select('*')
      .eq('nombre_actual', 'Anita')
      .single();

    if (pet) {
      setMascota(pet);
      // 2. Obtener historial diario
      const { data: logs } = await supabase
        .from('registros_diarios')
        .select('*')
        .eq('mascota_id', pet.id)
        .order('fecha', { ascending: false });
      
      setRegistros(logs || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Guardar un nuevo registro diario
  const guardarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mascota) return;

    const { error } = await supabase.from('registros_diarios').insert([
      {
        mascota_id: mascota.id,
        racion_manana_cumplida: racionManana,
        racion_tarde_cumplida: racionTarde,
        consistencia_heces: consistenciaHeces,
        tuvo_descompostura_malestar: tuvoMalestar,
        descripcion_malestar: tuvoMalestar ? descripcionMalestar : null,
        tipo_autor: 'tutor'
      }
    ]);

    if (!error) {
      setDescripcionMalestar('');
      setTuvoMalestar(false);
      cargarDatos();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 font-sans">
        Cargando datos de Wolf Pet...
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* BRANDING HEADER */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black tracking-wider text-slate-900 uppercase flex items-center gap-2">
            <Heart className="text-emerald-600 fill-emerald-600" size={20} /> Wolf Pet
          </h1>
          <p className="text-xs text-slate-400 font-medium">by WolfDevStudio</p>
        </div>
      </div>

      {/* HEADER MASCOTA */}
      {mascota && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{mascota.nombre_actual}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mestiza • Peso actual: <b className="text-emerald-700">{mascota.peso_actual} kg</b>
              </p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              En Tránsito
            </span>
          </div>

          {/* BANNER ALERTA */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Advertencias Médicas:</span> {mascota.alergias_medicamentos_adversos}
            </div>
          </div>
        </div>
      )}

      {/* FORMULARIO DE REGISTRO RÁPIDO */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900">
          <PlusCircle className="text-emerald-600" size={20} /> Registrar Estado de Hoy
        </h3>

        <form onSubmit={guardarRegistro} className="space-y-4">
          
          {/* RACIONES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
              <input 
                type="checkbox" 
                checked={racionManana} 
                onChange={(e) => setRacionManana(e.target.checked)} 
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-sm font-medium">Ración Mañana</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
              <input 
                type="checkbox" 
                checked={racionTarde} 
                onChange={(e) => setRacionTarde(e.target.checked)} 
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-sm font-medium">Ración Tarde</span>
            </label>
          </div>

          {/* HECES */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Consistencia de Heces</label>
            <select 
              value={consistenciaHeces} 
              onChange={(e) => setConsistenciaHeces(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="normal">Normal / Formada</option>
              <option value="blanda">Blanda</option>
              <option value="diarrea">Diarrea</option>
              <option value="con_sangre">Con sangre / Mucosidad</option>
            </select>
          </div>

          {/* DESCOMPOSTURA / MALESTAR */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={tuvoMalestar} 
                onChange={(e) => setTuvoMalestar(e.target.checked)} 
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="text-sm font-bold text-amber-900">¿Tuvo vómito o descompostura hoy?</span>
            </label>

            {tuvoMalestar && (
              <textarea 
                placeholder="Describí el episodio (ej. vómito de bilis a la mañana, decaída...)"
                value={descripcionMalestar}
                onChange={(e) => setDescripcionMalestar(e.target.value)}
                className="w-full bg-amber-50 border border-amber-200 p-3 rounded-xl text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                rows={2}
              />
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-sm text-sm"
          >
            Guardar Registro Diario
          </button>
        </form>
      </div>

      {/* HISTORIAL RECIENTE */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900">
          <Activity className="text-indigo-600" size={20} /> Bitácora de Registros
        </h3>

        <div className="space-y-3">
          {registros.map((reg) => (
            <div key={reg.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Fecha: <b>{new Date(reg.fecha).toLocaleDateString()}</b></span>
                <span className="capitalize bg-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">{reg.tipo_autor}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                <span>Heces: <b className="uppercase text-slate-900">{reg.consistencia_heces}</b></span>
                <span>Ración Mañana: {reg.racion_manana_cumplida ? '✅' : '❌'}</span>
                <span>Ración Tarde: {reg.racion_tarde_cumplida ? '✅' : '❌'}</span>
              </div>
              {reg.sintomas_observaciones && (
                <p className="text-xs text-slate-600 italic">"{reg.sintomas_observaciones}"</p>
              )}
              {reg.tuvo_descompostura_malestar && (
                <div className="p-2.5 bg-amber-100 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-start gap-2">
                  <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
                  <span><b>Malestar:</b> {reg.descripcion_malestar}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}