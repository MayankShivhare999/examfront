import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions=[];

  constructor(private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    console.log(this.qId);
    
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any) => {
        this.questions = data;
        console.log(this.questions);
        
      }
    )
  }

  // delete question
  deleteQuestion(qid) {
    Swal.fire(
      {
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Delete',
        title:'Are you sure, want to delete this questions ?'
      }
    ).then(
      result => {
        if(result.isConfirmed) {
          this._question.deleteQuestion(qid).subscribe(
            (data)=> {
              Swal.fire('Success','Question deleted successully','success');
              this.ngOnInit();
            },
            (error) => {
              Swal.fire('Error','Could not delete','error');
              console.log(error);
              
            }
          )
        }
      }
    )
  }

}
