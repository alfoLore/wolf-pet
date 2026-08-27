import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface Props {
  onGuardar: (datos: {
    racionManana: boolean;
    racionTarde: boolean;
    consistenciaHeces: string;
    tuvoMalestar: boolean;
    descripcionMalestar: string;
  }) => Promise<void>;
}

export const FormularioRegistro: React.FC<Props> = ({ onGuardar }) => {
  const [racionManana, setRacionManana] = useState(false);
  const [racionTarde, setRacionTarde] = useState(false);
  const [consistenciaHeces, setConsistenciaHeces] = useState('normal');
  const [tuvoMalestar, setTuvoMalestar] = useState(false);
  const [descripcionMalestar, setDescripcionMalestar] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    await onGuardar({
      racionManana,
      racionTarde,
      consistenciaHeces,
      tuvoMalestar,
      descripcionMalestar
    });
    setRacionManana(false);
    setRacionTarde(false);
    setConsistenciaHeces('normal');
    setTuvoMalestar(false);
    setDescripcionMalestar('');
    setCargando(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900">
        <PlusCircle className="text-emerald-600" size={20} /> Registrar Estado de Hoy
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={cargando}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-sm text-sm disabled:opacity-50"
        >
          {cargando ? 'Guardando...' : 'Guardar Registro Diario'}
        </button>
      </form>
    </div>
  );
};