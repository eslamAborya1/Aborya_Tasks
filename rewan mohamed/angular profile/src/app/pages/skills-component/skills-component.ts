import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-component',
  imports: [],
  templateUrl: './skills-component.html',
  styleUrl: './skills-component.css',
})
export class SkillsComponent implements OnInit {
  designSkills: {name:string , percentage:number}[] = [
    { name: 'Web Design', percentage: 95 },
    { name: 'Mobile design', percentage: 75 },
    { name: 'Branding & Identity', percentage: 70 },
    { name: 'DTP', percentage: 85 }
  ];

  developingSkills: {name:string , percentage:number}[] = [
    { name: 'HTML & CSS3', percentage: 100 },
    { name: 'Javascript / Jquery', percentage: 90 },
    { name: 'PHP & MySQL', percentage: 70 },
    { name: 'WordPress', percentage: 65 }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}