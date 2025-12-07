import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  copyEmail() {
    navigator.clipboard.writeText('madel25810@gmail.com');
    alert('Email copied: madel25810@gmail.com');
  }
}
