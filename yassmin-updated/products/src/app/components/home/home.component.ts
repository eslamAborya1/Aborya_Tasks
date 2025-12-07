import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Iproduct } from '../../model/iproduct';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
    products: Iproduct[] = [];
  loading = true;
  error = '';
constructor(private productService: ProductService) {} 
  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

}
