import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService)
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute)

  onComplete() {
    this.tasksService.removeTask(this.task().id);
    this.router.navigate(['./'], { // para decirle a angular que quiero ir a la ruta que stoy actualmente
      relativeTo: this.activatedRoute, // esto es para que sepa que es la ruta acitivada 
      onSameUrlNavigation: 'reload', // si lo pongo como 'reload' es que quireo que relance los Guards y los Resolvers
      queryParamsHandling: 'preserve' // esto hace que cuando recargue la pagina no se pierdan los parametros de la query con 'desc' o 'asc' por ejemplo
    });
  }
}
