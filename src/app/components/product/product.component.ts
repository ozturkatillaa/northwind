import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products: Product[] = []
  dataLoadded=false;


  // productResponseModel:ProductResponseModel={
  //   data:this.products,
  //   message:"",
  //   success:true
  // };

  //dependency injection için constractır
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // console.log("init çalıştı");
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }
      else{
        this.getProducts()
      }
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(resonse=>{
      this.products=resonse.data
      this.dataLoadded=true;
      //subscribe senkon hale getirir, kod sıraı halde çalışır.alta eklersek a senkron çalışır önce alttaki metod çalışı sonra burası çalışır.
    });
  }
  getProductsByCategory(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe(resonse=>{
      this.products=resonse.data
      this.dataLoadded=true;
    });

  }
}


// product1={
//   productId:1,
//   productName:'Bardak1',
//   categoryId:1,
//   unitPrice:5,
//   unitsInStock:5}

// product2={
//   productId:2,
//   productName:'Bardak2',
//   categoryId:1,
//   unitPrice:5,
//   unitsInStock:5}

// product3={productId:3,
//   productName:'Bardak3',
//   categoryId:1,
//   unitPrice:5,
//   unitsInStock:5}

// product4={productId:4,
//   productName:'Bardak4',
//   categoryId:1,
//   unitPrice:5,
//   unitsInStock:5}

// product5={productId:5,
//    productName:'Bardak5',
//    categoryId:1,
//    unitPrice:5,
//    unitsInStock:5}

// products:Product[] = [this.product1,
//   this.product2,
//   this.product3,
//   this.product4,
//   this.product5]
