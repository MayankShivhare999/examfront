import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions;

  constructor(private locationSt:LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBack();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getActiveQuestionsOfQuiz(this.qid).subscribe(
    (data) => {
      this.questions = data;
    },
    (error) => {
      console.log(error);
      
    })
  }

  preventBack() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(()=> {
      history.pushState(null, null, location.href);
    })
  }

}
