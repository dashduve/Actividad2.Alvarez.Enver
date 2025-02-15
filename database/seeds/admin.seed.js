"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const user_entity_1 = require("../../entities/user.entity");
const role_entity_1 = require("../../entities/role.entity");
const bcrypt = require("bcrypt");
const seedAdmin = async (connection) => {
    const userRepository = connection.getRepository(user_entity_1.User);
    const roleRepository = connection.getRepository(role_entity_1.Role);
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
exports.seedAdmin = seedAdmin;
//# sourceMappingURL=admin.seed.js.map