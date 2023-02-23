import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  products: Product[] = []
  deleteProductForm:FormGroup;
  selectedProduct:Product;
  productId:number;
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createProductDeleteFrom();
    console.log(this.activatedRoute.snapshot.paramMap.get('productId'))
    let ok = this.productService.getByProductId( Number(this.activatedRoute.snapshot.paramMap.get('productId'))).subscribe((result:any)=>{
      this.deleteProductForm =new FormGroup({
        productId:new FormControl(result.data["productId"], Validators.required),
        productName:new FormControl(result.data["productName"], Validators.required),
        categoryId:new FormControl(result.data["categoryId"], Validators.required),
        unitsInStock:new FormControl(result.data["unitsInStock"], Validators.required),
        unitPrice:new FormControl(result.data["unitPrice"]-1, Validators.required),
      });
    });
  }
  cole(){
    console.warn(this.deleteProductForm.value)
  }


  createProductDeleteFrom(){
    this.deleteProductForm=this.formBuilder.group({
      productId:["",Validators.required],
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  getSelectedCar(productId : number) {
    if(this.productId == productId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  delete(){
    if(this.deleteProductForm.valid){
      let productModel=Object.assign({},this.deleteProductForm.value)
      this.productService.delete(productModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatasi")
          }
        }
      })

    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }

  }


}
