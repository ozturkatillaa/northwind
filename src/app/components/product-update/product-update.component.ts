import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup , FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';



@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productUpdateForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductUpdateFrom();
  }

  createProductUpdateFrom(){
    this.productUpdateForm=this.formBuilder.group({
      productId:["",Validators.required],
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }
  update(){
    if(this.productUpdateForm.valid){
      let productModel=Object.assign({},this.productUpdateForm.value)
      this.productService.update(productModel).subscribe(response=>{
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
