import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { routes as userRoutes } from "./users/users.routes";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

// ejemplo rapido, si se cumple esto entonces entrará en el UserTaskComponente y si no lo cumple redirecciona a /unauthorized.
const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const shouldGetAcces = Math.random();
    if (shouldGetAcces < 5) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', // <your-domain>/
        component: NoTaskComponent,
        title: 'Not task selected'
    },
    {
        path: 'users/:userId', // <your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello!' //UserTaskComponent va a recibir este mensaje como input, ya que tengo tambien habilitado el "WithComponentInputBinding()"
        }, 
        resolve: {
            userName: resolveUserName // el resolver que he creado dentro de el componente UserTasksComponent, le pasa la info a la variable userName que estará creada dentro de la clase del componente.
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];