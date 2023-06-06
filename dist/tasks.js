"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const tasksUrl = '/users/:id/tasks';
const taskUrl = '/users/:user_id/tasks/:task_id';
const usersUrl = '/users';
const userUrl = '/users/:id';
const users = [
    {
        id: '1',
        username: 'joel',
        password: '1234',
        tasks: []
    }
];
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Tasks
app.get(tasksUrl, (req, res) => {
    const userId = req.params.id;
    const tasks = users.find((user) => user.id === userId).tasks;
    res.send(tasks);
});
// app.post(tasksUrl, (req, res) => {
// });
// Task by id
// app.get(taskUrl, () => {
// });
// app.patch(taskUrl, () => {
// });
// app.delete(taskUrl, () => {
// });
// Users
// app.post(usersUrl, () => {
// });
// User by id
// app.get(userUrl, () => {
// });
app.listen(port, null);
//# sourceMappingURL=tasks.js.map