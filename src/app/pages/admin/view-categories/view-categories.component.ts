import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories=[
    {
      cid:23,
    title:'Programming',
    description:"This is Programming"
  },
  {
    cid:23,
  title:'Programming',
  description:"This is Programming"
},
{
  cid:23,
title:'Programming',
description:"This is Programming"
},
{
  cid:23,
title:'Programming',
description:"This is Programming"
},
  ]

  constructor(private _categoryService:CategoryService) { }

  ngOnInit(): void {
    this._categoryService.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire("Error!!!","Something went wrong..","error");
      }
    )
  }

}
