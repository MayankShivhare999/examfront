import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions;

  isSubmit=false;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  timer:any;


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
      this.timer = this.questions.length*1*60;
      this.questions.forEach((q)=> {
        q['givenAnswer'] = '';
      })
      this.startTimer();
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

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info'
    }).then((e)=> {
      if(e.isConfirmed) {

        this.evalQuiz();
        
      }
    })
  }

  startTimer() {
    let t = window.setInterval(()=> {
      if(this.timer<=0) {
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    }, 1000)
  }

  getFormatterTime() {
    let mm = Math.floor(this.timer/60)
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`; 
  }

  evalQuiz() {

    // calculations

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=> {
        //console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      error => {
        console.log(error);
        
      }
    )
    // this.isSubmit = true;

    //     this.questions.forEach((q)=> {
    //       if(q.givenAnswer==q.answer) {
    //         this.correctAnswers++;
    //         let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
    //         this.marksGot+= marksSingle;
    //       }

    //       if(q.givenAnswer.trim()!='') {
    //         this.attempted++;
    //       }

    //     })
  }

  printPage() {
    window.print();
  }

}
