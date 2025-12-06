import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Portfolio } from './components/portfolio/portfolio';
import { Skills } from './components/skills/skills';

@Component({
  selector: 'app-root',
  imports: [About,Contact,Footer,Hero,Navbar,Portfolio,Skills],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
