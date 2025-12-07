import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'home-component.html',
  styleUrls: ['home-component.css']
})
export class HomeComponent implements OnInit {
  private service = inject(ProductService);

  // Signals for state management
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  // Search State
  searchId: number | null = null;
  singleProduct: Product | null = null;
  isSearching = false;

  ngOnInit() {
    this.fetchAll();
  }

  fetchAll() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  search() {
    if (!this.searchId) return;

    this.isSearching = true;
    this.loading.set(true);
    this.products.set([]);
    this.singleProduct = null;

    this.service.getById(this.searchId).subscribe({
      next: (data) => {
        this.singleProduct = data;
        this.loading.set(false);
      },
      error: () => {
        alert('Product not found!');
        this.loading.set(false);
        this.reset();
      }
    });
  }

  reset() {
    this.searchId = null;
    this.singleProduct = null;
    this.isSearching = false;
    this.fetchAll();
  }
}
