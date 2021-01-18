import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void{
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

}
