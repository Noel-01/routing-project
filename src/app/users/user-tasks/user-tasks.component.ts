import { Component, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRouteSnapshot, 
  ResolveFn, 
  RouterLink, 
  RouterOutlet, 
  RouterStateSnapshot 
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>();
  message = input.required<string>();
}

export const resolveUserName: ResolveFn<string> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService)
  const userName = usersService.users.find(u => u.id === activatedRouteSnapshot.paramMap.get('userId'))?.name || ''; // no necesita subscription por que se hace un snapshot cada vez que se mofifica el valor de la routa
  return userName
};