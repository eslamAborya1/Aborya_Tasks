import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-portfolio',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './portfolio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {

}
