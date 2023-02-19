import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44350/api/"

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>> {
    let newPath  = this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath);

     //    .subscribe(response => {
    //   this.products=response.data
    //  normanlde this.Apirulden sonra bu subscribe olarak devam ediyoor ama observeable olarka ekleme yaptık retun yok nırmalde, apiden fdönmesi için yazılacak servvis bu  })
  }

  getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>> {
    let newPath  = this.apiUrl + "products/getbycategory?categoryId="+categoryId
    return this.httpClient.get<ListResponseModel<Product>>(newPath);

  }

  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/add",product)
  }

  update(product:Product): Observable<ResponseModel>{
    let newPath  = this.apiUrl + "products/update"
    return this.httpClient.post<ResponseModel>(newPath, product)}


  getByProductId(productId:number):Observable<ListResponseModel<Product>>{
    let newPath=this.apiUrl+'products/getbyid?id='+productId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getByProductId2(productId:number,data:any):Observable<ListResponseModel<Product>>{
    let newPath=this.apiUrl+'products/getbyid?id='+productId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath),data;
  }


}
