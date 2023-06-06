TASK
    id: number
    title: string
    description: string
    completed: boolean

USER
    id: number
    username: string
    password: string
    tasks: Task[]


/users/:id/tasks
    En caso de no encontrar el usuario, ambos devolverán  {status: 404, message: "User not found"} 

    GET -> Devuelve { status: 200, tasks: Lista de tasks }
    POST -> Se debe mandar { title: string, description: string, completed: boolean } y responderá {status: 201, task: task} si lo crea correctamente

/users/:user_id/tasks/:task_id
    Si no encuentra el user devolverá {status: 404, message: "User not found"} 
    Si no encuentra la task devolverá {status: 404, message: "Task not found"} 

    URI PARAMS -> user_id: number, task_id: number

    GET -> Devuelve {status: 200, task: task} si encuentra dicha task
    PATCH -> Recibe { title: string, description: string, completed: boolean, user_id: number } y devuelve {status: 200, task: task} si actualiza correctamente
    DELETE -> Devuelve {status: 204, task: task} si borra correctamente la task.

/users
    POST ->  Recibe { username: string, password: string } Devuelve {status: 201, user: user} si creó el usuario

/users/:id
    URI PARAMS -> id: number

    GET -> Devuelve {status: 200, user: user } en caso de encotrar al usuario y {status: 404, message: "User not found"} en caso contrario.