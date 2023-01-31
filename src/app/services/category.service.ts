import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44350/api/categories/getall"

  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl);

     //    .subscribe(response => {
    //   this.products=response.data
    //  normanlde this.Apirulden sonra bu subscribe olarak devam ediyoor ama observeable olarka ekleme yaptık retun yok nırmalde, apiden fdönmesi için yazılacak servvis bu  })
  }
}
