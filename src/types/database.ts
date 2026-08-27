export interface Mascota {
  id: string;
  nombre_actual: string;
  peso_actual: number;
  alergias_medicamentos_adversos?: string;
  created_at?: string;
}

export interface RegistroDiario {
  id: string;
  mascota_id: string;
  fecha: string;
  racion_manana_cumplida: boolean;
  racion_tarde_cumplida: boolean;
  consistencia_heces: string;
  sintomas_observaciones?: string;
  tuvo_descompostura_malestar: boolean;
  descripcion_malestar?: string | null;
  tipo_autor: string;
  created_at?: string;
}