import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  copyEmail() {
    navigator.clipboard.writeText('medonageh00@gmail.com');
    alert('Email copied: medonageh00@gmail.com');
  }
}
