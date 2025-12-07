import { Component, signal } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
@Component({
  selector: 'app-root',
  imports: [ UsersComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-crud');
}
