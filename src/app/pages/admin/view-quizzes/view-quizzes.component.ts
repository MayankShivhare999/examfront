import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = []

  constructor(private _quizService:QuizService) { }

  ngOnInit(): void {
    this._quizService.quizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire("Error!!!","Something went wrong!!!",'error');
      }
    )
  }


  deleteQuiz(qId) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result)=> {
      if(result.isConfirmed) {

        //delete quiz
        
        this._quizService.deleteQuiz(qId).subscribe(
          (data) => {
            //this.quizzes = this.quizzes.filter((quiz)=> quiz.qId!=qId);
            this.ngOnInit();
            Swal.fire('Deleted',"Quiz is deleted",'success');
            
          },
          (error) => {
            Swal.fire('Error','Error Occurred while deleting quiz','error');
          }
        )
      }
    })
  }
}
