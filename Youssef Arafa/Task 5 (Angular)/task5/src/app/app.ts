import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Portofolio } from "./components/portofolio/portofolio";

@Component({
  selector: 'app-root',
  imports: [Portofolio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task5');
}
