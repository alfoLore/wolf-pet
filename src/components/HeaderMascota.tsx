import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Mascota } from '@/types/database';

interface Props {
  mascota: Mascota;
}

export const HeaderMascota: React.FC<Props> = ({ mascota }) => {
  return (
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

      {mascota.alergias_medicamentos_adversos && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs text-amber-900 flex items-start gap-2">
          <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Advertencias Médicas:</span> {mascota.alergias_medicamentos_adversos}
          </div>
        </div>
      )}
    </div>
  );
};