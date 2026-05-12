import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const users = await prisma.personal.findMany();
  console.log(users.map(u => ({ id: u.id_empleado, email: u.email_corporativo, pass: u.password })));
}

main().catch(console.error);