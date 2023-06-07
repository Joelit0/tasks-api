import { User } from './src/interfaces/user'

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

export default users;
