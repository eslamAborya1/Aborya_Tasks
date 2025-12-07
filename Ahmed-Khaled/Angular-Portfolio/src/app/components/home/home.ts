import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {
  ngAfterViewInit() {
    const elements = document.querySelectorAll('.section-content, .profile-photo');

    elements.forEach((el) => {
      setTimeout(() => el.classList.add('show'), 200);
    });
  }
}
