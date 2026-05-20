import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { StorageService } from './storage.service';

// Configuración
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 30000;

// Tipos de respuesta
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email_corporativo: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    id_empleado: string;
    nombre_completo: string;
    email_corporativo: string;
    role: string;
  };
}

export interface OnboardingRequest {
  id_empleado?: string;
  nombre_completo: string;
  email_corporativo: string;
  password: string;
  telefono?: string;
  cargo: string;
  departamento: string;
  direccion?: string;
  fecha_nacimiento?: string;
  role?: string;
}

export interface CreateEmployeeRequest {
  nombre_completo: string;
  email_corporativo: string;
  password: string;
  telefono?: string;
  cargo: string;
  departamento: string;
  direccion?: string;
  fecha_nacimiento?: string;
}

export interface EmpleadoResponse {
  id: number;
  id_empleado: string;
  nombre_completo: string;
  email_corporativo: string;
  role: string;
  telefono: string;
  cargo: string;
  departamento: string;
  direccion: string;
  fecha_nacimiento: string;
  estado_laboral: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface AsistenciaRequest {
  id_personal: number;
  fecha: string;
  hora_entrada: string;
  hora_salida?: string;
  tipo_asistencia: 'PRESENTE' | 'AUSENTE' | 'PERMISO' | 'LICENCIA';
  notas?: string;
}

export interface AsistenciaResponse {
  id: number;
  id_personal: number;
  fecha: string;
  hora_entrada: string;
  hora_salida?: string;
  tipo_asistencia: string;
  notas?: string;
  fecha_creacion: string;
}

export interface PermisoRequest {
  id_personal: number;
  tipo_permiso: 'VACACIONES' | 'LICENCIA_MEDICA' | 'PERMISO_PERSONAL' | 'OTROS';
  fecha_inicio: string;
  fecha_fin: string;
  motivo: string;
}

export interface PermisoResponse {
  id: number;
  id_personal: number;
  tipo_permiso: string;
  fecha_inicio: string;
  fecha_fin: string;
  motivo: string;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
  fecha_creacion: string;
}

export interface NominaResumenResponse {
  id_empleado: string;
  nombre_completo: string;
  departamento: string;
  cargo: string;
  resumen: {
    diasPagados: number;
    totalGanancias: number;
    totalBonos: number;
    subtotal: number;
    descuentos: number;
    total: number;
  };
}

export interface NominaDetalleResponse {
  empleado: {
    id_empleado: string;
    nombre_completo: string;
    departamento: string;
    cargo: string;
  };
  nomina: {
    folio: string;
    diasPagados: number;
    faltas: number;
    percepciones: {
      sueldoBase: number;
      bonos: number;
    };
    deducciones: {
      isr: number;
      imss: number;
    };
    totales: {
      subtotal: number;
      descuentos: number;
      total: number;
    };
  };
}

export class ApiService {
  private static instance: AxiosInstance;

  /**
   * Inicializar la instancia de axios
   */
  private static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: API_TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Interceptor para agregar token a todas las solicitudes
      this.instance.interceptors.request.use(
        async (config) => {
          try {
            const token = await StorageService.getToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error al obtener token:', error);
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // Interceptor para manejar respuestas
      this.instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          // Si el token expiró (401), limpiar sesión
          if (error.response?.status === 401) {
            await StorageService.clearAll();
          }
          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }

  /**
   * Login
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.getInstance().post<LoginResponse>(
        '/auth/login',
        credentials
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Crear primer admin (onboarding inicial)
   */
  static async createFirstAdmin(
    data: OnboardingRequest
  ): Promise<EmpleadoResponse> {
    try {
      const response = await this.getInstance().post<EmpleadoResponse>(
        '/personal/onboarding/init',
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Auto-registro de empleado (sin protección)
   * POST /personal
   */
  static async registerEmployee(
    data: CreateEmployeeRequest
  ): Promise<EmpleadoResponse> {
    try {
      const response = await this.getInstance().post<EmpleadoResponse>(
        '/personal',
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Admin/RH agrega empleado (con protección JWT)
   * POST /personal/onboarding
   */
  static async createEmployee(
    data: CreateEmployeeRequest
  ): Promise<EmpleadoResponse> {
    try {
      const response = await this.getInstance().post<EmpleadoResponse>(
        '/personal/onboarding',
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener empleado por ID
   */
  static async getEmployee(id_empleado: string): Promise<EmpleadoResponse> {
    try {
      const response = await this.getInstance().get<EmpleadoResponse>(
        `/personal/${id_empleado}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Listar todos los empleados
   */
  static async listEmployees(): Promise<EmpleadoResponse[]> {
    try {
      const response = await this.getInstance().get<EmpleadoResponse[]>(
        '/personal'
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Crear asistencia
   */
  static async createAsistencia(
    data: AsistenciaRequest
  ): Promise<AsistenciaResponse> {
    try {
      const response = await this.getInstance().post<AsistenciaResponse>(
        '/asistencia',
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Actualizar asistencia
   */
  static async updateAsistencia(
    id: number,
    data: Partial<AsistenciaRequest>
  ): Promise<AsistenciaResponse> {
    try {
      const response = await this.getInstance().patch<AsistenciaResponse>(
        `/asistencia/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener asistencias de un empleado
   */
  static async getAsistencias(
    id_empleado: string
  ): Promise<AsistenciaResponse[]> {
    try {
      const response = await this.getInstance().get<AsistenciaResponse[]>(
        `/asistencia?id_empleado=${id_empleado}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Crear permiso
   */
  static async createPermiso(data: PermisoRequest): Promise<PermisoResponse> {
    try {
      const response = await this.getInstance().post<PermisoResponse>(
        '/permisos',
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Actualizar estado de permiso
   */
  static async updatePermisoEstado(
    id: number,
    estado: 'APROBADA' | 'RECHAZADA'
  ): Promise<PermisoResponse> {
    try {
      const response = await this.getInstance().patch<PermisoResponse>(
        `/permisos/${id}/estado`,
        { estado }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener permisos de un empleado
   */
  static async getPermisos(id_empleado: string): Promise<PermisoResponse[]> {
    try {
      const response = await this.getInstance().get<PermisoResponse[]>(
        `/permisos?id_empleado=${id_empleado}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Listar nominas de todos los empleados
   */
  static async listNominas(): Promise<NominaResumenResponse[]> {
    try {
      const response = await this.getInstance().get<NominaResumenResponse[]>('/nomina');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtener detalle de nomina de un empleado especifico
   */
  static async getNominaDetalle(id_empleado: string): Promise<NominaDetalleResponse> {
    try {
      const response = await this.getInstance().get<NominaDetalleResponse>(`/nomina/${id_empleado}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Manejo centralizado de errores
   */
  private static handleError(error: any): Error {
    if (error.response) {
      // Error de respuesta del servidor
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Error ${error.response.status}`;
      return new Error(message);
    } else if (error.request) {
      // Error de solicitud
      return new Error('No se pudo conectar con el servidor');
    } else {
      // Error desconocido
      return new Error(error.message || 'Error desconocido');
    }
  }
}
