import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@admin.com',
      passwordHash: await bcrypt.hash('admin', 10),
      emailVerified: true,
      verificationToken: null,
      role: 'ADMINISTRATOR',
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@admin.com' },
    update: {},
    create: {
      username: 'staff',
      email: 'staff@admin.com',
      passwordHash: await bcrypt.hash('admin', 10),
      emailVerified: true,
      verificationToken: null,
      role: 'STAFF',
    },
  });

  console.log({ admin, staff });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
