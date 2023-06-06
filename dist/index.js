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
        tasks: [
            {
                id: '1',
                title: 'example title',
                description: 'example description',
                completed: false
            }
        ]
    }
];
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const findUser = (userId, res) => {
    const user = users.find((currentUser) => currentUser.id === userId);
    if (!user)
        res.send({ 'status': 404, 'message': 'User not found' });
    return user;
};
// Tasks
app.get(tasksUrl, (req, res) => {
    const userId = req.params.id;
    const tasks = findUser(userId, res).tasks;
    res.send({ 'status': 200, 'tasks': tasks });
});
app.post(tasksUrl, (req, res) => {
    const userId = req.params.id;
    const user = findUser(userId, res);
    if (req.body) {
        const task = req.body;
        user.tasks.push(task);
        res.send({ 'status': 201, 'task': task });
    }
    res.send({ 'status': 400, 'message': 'Empty request body' });
});
// Task by id
// app.get(taskUrl, null);
// app.patch(taskUrl, null);
// app.delete(taskUrl, null);
// Users
// app.post(usersUrl, null);
// User by id
// app.get(userUrl, null);
app.listen(port, null);
//# sourceMappingURL=index.js.map