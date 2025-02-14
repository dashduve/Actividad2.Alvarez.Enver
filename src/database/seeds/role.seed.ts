import { Connection } from 'typeorm';
import { Role } from '../../entities/role.entity';

export const seedRoles = async (connection: Connection) => {
  const roleRepository = connection.getRepository(Role);

  const roles = [
    {
      name: 'admin',
      description: 'Administrador del sistema',
    },
    {
      name: 'publisher',
      description: 'Usuario que puede publicar contenido',
    },
  ];

  for (const role of roles) {
    const existingRole = await roleRepository.findOne({ where: { name: role.name } });
    if (!existingRole) {
      await roleRepository.save(role);
    }
  }
};

