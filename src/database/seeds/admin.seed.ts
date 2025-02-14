import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import * as bcrypt from 'bcrypt';

export const seedAdmin = async (connection: Connection) => {
  const userRepository = connection.getRepository(User);
  const roleRepository = connection.getRepository(Role);

  const adminRole = await roleRepository.findOne({ where: { name: 'admin' } });
  
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@educonnect.com' }
  });

  if (!existingAdmin && adminRole) {
    const admin = userRepository.create({
      email: 'admin@educonnect.com',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'Admin User',
      roles: [adminRole],
    });

    await userRepository.save(admin);
  }
};

