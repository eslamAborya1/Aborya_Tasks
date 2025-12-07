import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';


import { RouterLink } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {SpinnerComponent} from '../shared/components/spinner/spinner.component';
import {ProductServiceService} from '../sevices/product-service.service';


@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterLink,ReactiveFormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products:any[]=[];
  category:string[]=[];
  loading:boolean=true;
  base64:any='';
  ModalTitle:string='';
 form!:FormGroup

  constructor(private service:ProductServiceService,private build:FormBuilder){}
  ngOnInit(): void {
    this.form=this.build.group({
      title: ['',[Validators.required]],
      price: ['',[Validators.required]],
      description: ['',[Validators.required]],
      image: ['',[Validators.required]],
      category: ['',[Validators.required]]
    })
    this.getProducts();
    this.getCategories();
  }


  getProducts(){
    this.loading=false;
    this.service.getAllProducts().subscribe((res:any)=>{
         this.products=res;
         console.log(this.products.length);
         this.loading=true;
        })
      }
  getCategories(){
    this.loading=false;
    this.service.getAllCategories().subscribe((res:any)=>{
      this.category=res;
      this.loading=true;
    })
  }
  getSelectedCategory(event:any){
    let value=event.target.value;
    this.form.get('category')?.setValue(value);
  }
  getProductsCategory(key:string){
    this.loading=false;
    this.service.getProductByCategory(key).subscribe((res:any)=>{
      this.products=res;
      this.loading=true;
    })
  }
  getImagePath(event:any){
    const file=event.target.files[0];
    var reader = new FileReader();
   reader.readAsDataURL(file);

   reader.onload = ()=>{
    this.base64=reader.result;
    this.form.get('image')?.setValue("you should pass base64 but is very long text");
    // console.log(this.base64);
   };

  }
  addProduct(){
    const model=this.form.value;
    this.service.createProduct(model).subscribe(res=>{
      alert("Add Product SSuccess")
    })
  }
  changeTitleToAdd(){
    this.form.reset();
    this.ModalTitle="Add Product"
  }
  update(item:any){
    this.ModalTitle="update Product"
    this.form.get('title')?.setValue(item.title);
    this.form.get('description')?.setValue(item.description);
    this.form.get('category')?.setValue(item.category);
    this.form.get('price')?.setValue(item.price);
    this.form.get('image')?.setValue(item.image);
    this.base64=item.image;


  }
  deleteCart(id:number) {
    this.service.deleteCart(id).subscribe((res:any)=>{
      this.getProducts();
      alert("cart deleted Success");
 })
}
}
