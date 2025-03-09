import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

export const resetDatabase = () => {
  execSync('npx prisma migrate reset --force --schema=prisma/schema.prisma', {
    stdio: 'inherit',
  });
};

export default prisma;
