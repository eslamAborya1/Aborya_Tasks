import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header-component/header-component';
import { FooterComponent } from '../components/footer-component/footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

}
