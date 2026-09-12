"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const user_routes_1 = __importDefault(require("../users/user.routes"));
const role_routes_1 = __importDefault(require("../roles/role.routes"));
const company_routes_1 = __importDefault(require("../company/company.routes"));
const lead_routes_1 = __importDefault(require("../leads/lead.routes"));
const task_routes_1 = __importDefault(require("../tasks/task.routes"));
const workflow_routes_1 = __importDefault(require("../workflows/workflow.routes"));
router.use("/auth", auth_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/role", role_routes_1.default);
router.use("/company", company_routes_1.default);
router.use("/leads", lead_routes_1.default);
router.use("/task", task_routes_1.default);
router.use("/workflow", workflow_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map