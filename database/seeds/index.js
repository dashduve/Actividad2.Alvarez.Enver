"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeds = void 0;
const role_seed_1 = require("./role.seed");
const admin_seed_1 = require("./admin.seed");
const runSeeds = async (connection) => {
    await (0, role_seed_1.seedRoles)(connection);
    await (0, admin_seed_1.seedAdmin)(connection);
};
exports.runSeeds = runSeeds;
//# sourceMappingURL=index.js.map