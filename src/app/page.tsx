'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart } from 'lucide-react';
import { Mascota, RegistroDiario } from '@/types/database';
import { HeaderMascota } from '@/components/HeaderMascota';
import { FormularioRegistro } from '@/components/FormularioRegistro';
import { BitacoraHistorial } from '@/components/BitacoraHistorial';

export default function Home() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [registros, setRegistros] = useState<RegistroDiario[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    setLoading(true);

    const { data: pet } = await supabase
      .from('mascotas')
      .select('*')
      .eq('nombre_actual', 'Anita')
      .single();

    if (pet) {
      setMascota(pet as Mascota);
      const { data: logs } = await supabase
        .from('registros_diarios')
        .select('*')
        .eq('mascota_id', pet.id)
        .order('created_at', { ascending: false });

      setRegistros((logs as RegistroDiario[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarRegistro = async (datos: {
    racionManana: boolean;
    racionTarde: boolean;
    consistenciaHeces: string;
    tuvoMalestar: boolean;
    descripcionMalestar: string;
  }) => {
    if (!mascota) return;

    const { error } = await supabase.from('registros_diarios').insert([
      {
        mascota_id: mascota.id,
        racion_manana_cumplida: datos.racionManana,
        racion_tarde_cumplida: datos.racionTarde,
        consistencia_heces: datos.consistenciaHeces,
        tuvo_descompostura_malestar: datos.tuvoMalestar,
        descripcion_malestar: datos.tuvoMalestar ? datos.descripcionMalestar : null,
        tipo_autor: 'tutor'
      }
    ]);

    if (!error) {
      cargarDatos();
    } else {
      console.error('Error al guardar registro:', error.message);
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
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black tracking-wider text-slate-900 uppercase flex items-center gap-2">
            <Heart className="text-emerald-600 fill-emerald-600" size={20} /> Wolf Pet
          </h1>
          <p className="text-xs text-slate-400 font-medium">by WolfDevStudio</p>
        </div>
      </div>

      {mascota && <HeaderMascota mascota={mascota} />}
      <FormularioRegistro onGuardar={guardarRegistro} />
      <BitacoraHistorial registros={registros} />
    </main>
  );
}