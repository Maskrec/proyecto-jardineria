import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NominaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // Get all employees and calculate their nomina based on Asistencia_nomina
    const empleados = await this.prisma.personal.findMany({
      include: {
        asistencias: true
      }
    });

    return empleados.map(emp => {
      const asistencias = emp.asistencias || [];
      const totalGanancias = asistencias.reduce((sum, a) => sum + Number(a.ganancias_dia || 0), 0);
      const totalBonos = asistencias.reduce((sum, a) => sum + Number(a.bonos_activos || 0), 0);
      const diasPagados = asistencias.length;
      
      const subtotal = totalGanancias + totalBonos;
      const isr = subtotal * 0.10;
      const imss = subtotal * 0.05;
      const descuentos = isr + imss;
      const total = subtotal - descuentos;

      return {
        id_empleado: emp.id_empleado,
        nombre_completo: emp.nombre_completo,
        departamento: emp.departamento,
        cargo: emp.cargo,
        resumen: {
          diasPagados,
          totalGanancias,
          totalBonos,
          subtotal,
          descuentos,
          total
        }
      };
    });
  }

  async findOne(id: string) {
    const emp = await this.prisma.personal.findUnique({
      where: { id_empleado: id },
      include: {
        asistencias: true
      }
    });

    if (!emp) {
      throw new NotFoundException('Empleado no encontrado');
    }

    const asistencias = emp.asistencias || [];
    const totalGanancias = asistencias.reduce((sum, a) => sum + Number(a.ganancias_dia || 0), 0);
    const totalBonos = asistencias.reduce((sum, a) => sum + Number(a.bonos_activos || 0), 0);
    const diasPagados = asistencias.length;
    
    // Asumimos 14 dias quincenales, por lo tanto faltas = 14 - diasPagados si es menor a 14
    const faltas = diasPagados < 14 ? 14 - diasPagados : 0;

    const subtotal = totalGanancias + totalBonos;
    const isr = subtotal * 0.10;
    const imss = subtotal * 0.05;
    const descuentos = isr + imss;
    const total = subtotal - descuentos;

    return {
      empleado: {
        id_empleado: emp.id_empleado,
        nombre_completo: emp.nombre_completo,
        departamento: emp.departamento,
        cargo: emp.cargo,
      },
      nomina: {
        folio: `FOL-${new Date().getFullYear()}-${emp.id_empleado.split('-').pop()}`,
        diasPagados,
        faltas,
        percepciones: {
          sueldoBase: totalGanancias,
          bonos: totalBonos
        },
        deducciones: {
          isr,
          imss,
        },
        totales: {
          subtotal,
          descuentos,
          total
        }
      }
    };
  }
}
