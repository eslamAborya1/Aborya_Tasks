import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-component',
  imports: [],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css',
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
