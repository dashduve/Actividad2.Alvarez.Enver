import { Connection } from 'typeorm';
import { seedRoles } from './role.seed';
import { seedAdmin } from './admin.seed';

export const runSeeds = async (connection: Connection) => {
  await seedRoles(connection);
  await seedAdmin(connection);
};