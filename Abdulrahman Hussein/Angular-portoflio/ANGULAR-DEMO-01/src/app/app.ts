import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Portoflio } from "./component/portoflio/portoflio";

@Component({
  selector: 'app-root',
  imports: [Portoflio],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('ANGULAR-DEMO-01');
}
