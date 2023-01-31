import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }
  categories: Category[]=[]
  currentCategory:Category;

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response.data
      //subscribe senkon hale getirir, kod sıraı halde çalışır.alta eklersek a senkron çalışır önce alttaki metod çalışı sonra burası çalışır.
    });
  }
  setCurrentCategory(category:Category){
    this.currentCategory=category;
  }
  getCurrentCategoryClass(category:Category){
    if(category==this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
    // seçilen kategoriyi mavi yap
  }

  getAllCategoryClass(){
    if(!this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
