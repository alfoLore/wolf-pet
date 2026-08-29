import React from 'react';
import { Heart, Activity, ShieldAlert, Scale } from 'lucide-react';
import { Mascota } from '@/types/database';

interface Props {
  mascota: Mascota;
}

export const HeaderMascota: React.FC<Props> = ({ mascota }) => {
  return (
    <div className="space-y-4">
      {/* Tarjeta Principal de Perfil */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-4xl shadow-inner">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {mascota.nombre_actual}
                </h1>
                <span className="bg-emerald-400/20 text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-300/30">
                  En Tránsito
                </span>
              </div>
              <p className="text-emerald-100 text-sm mt-1 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-300 fill-pink-300" /> Mascota monitoreada
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-200" />
              <div>
                <p className="text-xs text-emerald-100">Especie</p>
                <p className="text-sm font-semibold capitalize">{mascota.especie || 'Mestiza'}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center gap-3">
              <Scale className="w-5 h-5 text-teal-200" />
              <div>
                <p className="text-xs text-emerald-100">Peso Actual</p>
                <p className="text-sm font-semibold">{mascota.peso_actual ? `${mascota.peso_actual} kg` : 'Sin registrar'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta Médica Destacada (Si existen alergias registrados) */}
      {mascota.alergias_medicamentos_adversos && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl shadow-sm text-sm text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-amber-900">Advertencias Médicas:</span>
            <p className="text-amber-800 text-xs mt-0.5">{mascota.alergias_medicamentos_adversos}</p>
          </div>
        </div>
      )}
    </div>
  );
};