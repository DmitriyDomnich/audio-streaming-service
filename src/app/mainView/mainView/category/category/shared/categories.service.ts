import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const httpOptions = {
      headers: heads,
      params: {
        limit: '40',
        locale: 'en_US'
      },
    };
    return this.http
      .get('https://api.spotify.com/v1/browse/categories', httpOptions)
      .pipe(
        map((data: any) => {
          const itemsLit = 'items';
          const categoriesLit = 'categories';
          const items = data[categoriesLit];
          const catagories = items[itemsLit];
          return catagories.map((category: any) => {
            return {
              id: category.id,
              name: category.name,
              image: category.icons[0].url,
            };
          });
        })
      );
  }
}
