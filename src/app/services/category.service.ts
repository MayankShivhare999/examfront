import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //load all categories
  public categories():Observable<any> {
    return this.http.get(`${baseUrl}/category/`);
  }

  //add category
  public addCategory(category) {
    return this.http.post(`${baseUrl}/category/`, category);
  }

}
