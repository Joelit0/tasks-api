import { Task } from './interfaces/task'
import { User } from './interfaces/user'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

const tasksUrl = '/users/:id/tasks';
const taskUrl = '/users/:user_id/tasks/:task_id';
const usersUrl = '/users';
const userUrl = '/users/:id';

const users: User[] = [
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

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const findUser = (userId: string, res: any) => {
  const user: User = users.find((currentUser) => currentUser.id === userId);

  if (!user) res.send({ 'status': 404, 'message': 'User not found'});

  return user;
};

// Tasks

app.get(tasksUrl, (req, res) => {
  const userId: string = req.params.id;
  const tasks: Task[] = findUser(userId, res).tasks;

  res.send({ 'status': 200, 'tasks': tasks });
});

app.post(tasksUrl, (req, res) => {
  const userId: string = req.params.id;
  const user = findUser(userId, res);

  if (req.body) {
    const task: Task = req.body;

    user.tasks.push(task);

    res.send({ 'status': 201, 'task': task });
  }

  res.send({ 'status': 400, 'message': 'Empty request body' })
});

// Task by id

// app.get(taskUrl, null);

app.get(taskUrl, (req, res) => {
  const userId: string = req.params.user_id;
  const taskId: string = req.params.task_id;
  const tasks: Task[] = findUser(userId, res).tasks;
  const taskById: Task = tasks.find((task: Task) => task.id === taskId);

  res.send({ 'status': 200, 'task': taskById });
});


// app.patch(taskUrl, null);

// app.delete(taskUrl, null);

// Users

// app.post(usersUrl, null);

app.post(usersUrl, (req, res) => {
  if (req.body) {
    const user: User = {
      id: "",
      username: "",
      password: "",
      tasks: [],
    };

    user.id = req.body.id;
    user.username = req.body.username;
    user.password = req.body.password;
    user.tasks = req.body.tasks;

    users.push(user);

    res.send({ 'status': 201, 'user': user });
  }
  res.send({ 'status': 400, 'message': 'Empty request body' })
});

// User by id

app.get(userUrl, (req, res) => {
  const userId: string = req.params.id;
  const user: User = findUser(userId, res);

  res.send({ 'status': 200, 'user': user });
});

app.listen(port, null);
