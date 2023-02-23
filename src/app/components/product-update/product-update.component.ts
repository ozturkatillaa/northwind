import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup , FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';



@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  @Input() product:Product
  products: Product[] = []
  productUpdateForm:FormGroup;
  selectedProduct:Product;
  productId:number;
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createProductUpdateFrom();
    console.log(this.activatedRoute.snapshot.paramMap.get('productId'))
    let ok = this.productService.getByProductId( Number(this.activatedRoute.snapshot.paramMap.get('productId'))).subscribe((result:any)=>{
      this.productUpdateForm =new FormGroup({
        productId:new FormControl(result.data["productId"], Validators.required),
        productName:new FormControl(result.data["productName"], Validators.required),
        categoryId:new FormControl(result.data["categoryId"], Validators.required),
        unitsInStock:new FormControl(result.data["unitsInStock"], Validators.required),
        unitPrice:new FormControl(result.data["unitPrice"], Validators.required),
      });
    });
  }
  cole(){
    console.warn(this.productUpdateForm.value)
  }


  // this.carService.getCarsById( Number(this.router.snapshot.paramMap.get('id'))).subscribe((result:any)=>{
  //     this.car =new FormGroup({
  //       brandId:new FormControl(result.data["brandId"], Validators.required),
  //       colorId:new FormControl(result.data["colorId"], Validators.required),
  //       modelYear:new FormControl(result.data["modelYear"], Validators.required),
  //       dailyPrice:new FormControl(result.data["dailyPrice"], Validators.required),
  //       description:new FormControl(result.data["description"], Validators.required),
  //     });
  //   });
  // }

  createProductUpdateFrom(){
    this.productUpdateForm=this.formBuilder.group({
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
