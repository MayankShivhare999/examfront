import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId=0;
  quiz:any;
  categories;

  constructor(private _router:ActivatedRoute, private _quiz:QuizService, private _cat:CategoryService, private router:Router) { }

  ngOnInit(): void {
    this.qId = this._router.snapshot.params.qid;

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=> {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=> {
        Swal.fire('Error!!!','Error while loading Quiz','error');
      }
    )

    this._cat.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        
      }
    )
  }

  // update form submit
  updateQuiz() {

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire("Updated!!!",'Quiz Updated...','success').then((e) => {
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error','Not updated...','error');
      }
    )
  }

}
