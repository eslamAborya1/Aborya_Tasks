import { Component, signal } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Footer, Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('Angular-Portfolio');
}



export const routes: Routes = [];
