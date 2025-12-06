import { Component } from '@angular/core';
import { Section1 } from "../section1/section1";
import { Section2 } from "../section2/section2";
import { Section3 } from "../section3/section3";
import { Footer } from "../footer/footer";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-portofolio',
  imports: [Section1, Section2, Section3, Footer, Navbar],
  templateUrl: './portofolio.html',
  styleUrl: './portofolio.css',
})
export class Portofolio {

}
