import { Component } from '@angular/core';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {FooterComponent} from '../components/footer/footer.component';
import {MainComponent} from '../components/main/main.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    FooterComponent,
    MainComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
