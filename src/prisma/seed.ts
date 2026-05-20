import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@brightview.com';
  
  const existingAdmin = await prisma.personal.findUnique({
    where: { email_corporativo: adminEmail }
  });

  if (existingAdmin) {
    console.log('El administrador ya existe. Saltando semilla...');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.personal.create({
    data: {
      id_empleado: '001-ADMIN',
      nombre_completo: 'Administrador Principal',
      email_corporativo: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
      cargo: 'Director General',
      departamento: 'Administración',
      estado_laboral: 'activo',
    }
  });

  console.log('✅ Administrador creado con éxito:');
  console.log(`Email: ${admin.email_corporativo}`);
  console.log(`Contraseña: admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
