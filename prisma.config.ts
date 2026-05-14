import { defineConfig } from '@prisma/config';

export default defineConfig({
  earlyAccess: true,
  schema: "./src/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:equipo3@localhost:5432/brightview_db",
  },
});