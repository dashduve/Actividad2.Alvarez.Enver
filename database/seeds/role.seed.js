"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = void 0;
const role_entity_1 = require("../../entities/role.entity");
const seedRoles = async (connection) => {
    const roleRepository = connection.getRepository(role_entity_1.Role);
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
exports.seedRoles = seedRoles;
//# sourceMappingURL=role.seed.js.map