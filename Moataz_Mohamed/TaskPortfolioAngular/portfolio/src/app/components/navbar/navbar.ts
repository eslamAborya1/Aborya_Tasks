import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
crolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.crolled = window.scrollY > 100;
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if(this.crolled) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}
