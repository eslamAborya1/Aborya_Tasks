import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'manage-component.html',
  styleUrls: ['manage-component.css']
})
export class ManageComponent implements OnInit {
  private service = inject(ProductService);

  products = signal<Product[]>([]);
  isSubmitting = false;

  productObj: Product = {
    title: '',
    price: 0,
    description: '',
    category: 'electronic',
    image: 'https://i.pravatar.cc/150?img=1'
  };

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getAll().subscribe(data => this.products.set(data));
  }

  saveProduct() {
    // validation بسيط يدوي
    if (!this.productObj.title || !this.productObj.price) {
      alert('برجاء إدخال البيانات الأساسية (الاسم والسعر)');
      return;
    }

    this.isSubmitting = true;

    if (this.productObj.id) {
      // --- Update Logic ---
      this.service.update(this.productObj.id, this.productObj).subscribe({
        next: () => {
          this.products.update(list =>
            list.map(p => p.id === this.productObj.id ? { ...this.productObj } : p)
          );
          alert('تم التحديث!');
          this.resetForm();
          this.isSubmitting = false;
        },
        error: () => this.isSubmitting = false
      });
    } else {
      // --- Create Logic ---
      this.service.create(this.productObj).subscribe({
        next: (res) => {
          const newProduct = { ...this.productObj, id: res.id || Math.floor(Math.random() * 1000) };
          this.products.update(list => [newProduct, ...list]);
          alert('تمت الإضافة!');
          this.resetForm();
          this.isSubmitting = false;
        },
        error: () => this.isSubmitting = false
      });
    }
  }

  onEdit(item: Product) {
    this.productObj = { ...item };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm() {
    this.productObj = {
      id: undefined,
      title: '',
      price: 0,
      description: '',
      category: 'electronic',
      image: 'https://i.pravatar.cc/150?img=1'
    };
  }

  onDelete(id: number) {
    if (confirm('حذف المنتج؟')) {
      this.service.delete(id).subscribe(() => {
        this.products.update(list => list.filter(p => p.id !== id));
      });
    }
  }
}
