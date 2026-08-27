import React from 'react';
import { Activity, AlertCircle } from 'lucide-react';
import { RegistroDiario } from '@/types/database';

interface Props {
  registros: RegistroDiario[];
}

export const BitacoraHistorial: React.FC<Props> = ({ registros }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900">
        <Activity className="text-indigo-600" size={20} /> Bitácora de Registros
      </h3>

      <div className="space-y-3">
        {registros.map((reg) => (
          <div key={reg.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Fecha: <b>{reg.created_at ? new Date(reg.created_at).toLocaleDateString('es-AR') : new Date(reg.fecha).toLocaleDateString('es-AR')}</b></span>
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
  );
};