import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Portfolio } from "./portfolio/portfolio";

@Component({
  selector: 'app-root',
  imports: [Portfolio],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('angular-demo');
}
