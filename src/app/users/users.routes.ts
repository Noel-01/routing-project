import { Routes } from "@angular/router"
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component"
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component"

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        runGuardsAndResolvers: "always", // para que ejecute las Guards y los resolves siempre aunque no haya cambios
        resolve: {
            userTasks: resolveUserTasks
        }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent, // <your-domain>/users/<uid>/tasks/new
        canDeactivate: [canLeaveEditPage]
    }
]