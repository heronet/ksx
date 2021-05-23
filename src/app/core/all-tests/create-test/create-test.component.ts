import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Exam, Question } from 'src/app/models/Exam';
import { QuestionOption } from 'src/app/models/QuestionOption';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  // UI Stuff
  isLoading = false;
  
  // LogicStuff
  subjects = [
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Math",
    "ICT",
    "Bangla",
    "Multiple"
  ];
  durations = {
    "5 minutes": 5 * 60,
    "10 minutes": 10 * 60,
    "15 minutes": 15 * 60,
    "30 minutes": 30 * 60,
    "45 minutes": 45 * 60,
    "60 minutes": 60 * 60,
    "120 minutes": 120 * 60
  };
  duration_keys = [];
  questions = {
    0 : {
      0: {text: '',hasMath: false},
      1: {text: '',hasMath: false},
      2: {text: '',hasMath: false},
      3: {text: '',hasMath: false},
      hasMath: false
    }
  };
  questions_keys = [];
  ca_indexes = [1, 2, 3, 4];

  constructor(private examService: ExamService, private router: Router) { }

  ngOnInit(): void {
    this.duration_keys = Object.keys(this.durations);
    this.questions_keys = Object.keys(this.questions);
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const exam = this.buildExam(form.value);
    this.examService.createExam(exam).subscribe(res => {
      this.isLoading = false;
      this.router.navigateByUrl("all-tests");
    }, err => {
      console.log(err);
      
      this.isLoading = false;
    })
  }
  addQuestion() {
    let index = this.questions_keys.length
    this.questions[index] = {
      0: {text: '',hasMath: false},
      1: {text: '',hasMath: false},
      2: {text: '',hasMath: false},
      3: {text: '',hasMath: false},
      hasMath: false
    };
    this.questions_keys = Object.keys(this.questions);
  }
  removeQuestion() {
    let index = this.questions_keys.length - 1;
    if(index >= 1) {
      delete this.questions[index];
      this.questions_keys = Object.keys(this.questions);
    }
  }
  increaseOne(num: any): number {
    return Number(num) + 1;
  }
  buildExam(value: any) {
    let title = value.title;
    let duration = this.durations[value.duration];
    let subject = value.subject;
    let valid_questions: Partial<Question>[] = [];
    this.questions_keys.forEach(index => {
      const temp_question = this.questions[index];
      const options: QuestionOption[] = [
        temp_question[0],
        temp_question[1],
        temp_question[2],
        temp_question[3]
      ];
      const question: Partial<Question> =  {
        title: temp_question.title,
        correctAnswer: temp_question[temp_question.ca_index],
        options: options,
        marks: temp_question.marks,
        hasMath: temp_question.hasMath
      }
      valid_questions.push(question);
    });
    const exam: Partial<Exam> = {
        title,
        duration,
        subject,
        questions: valid_questions
    }
    return exam;
  }

  // Checkboxes
  questionCheck() {
    console.log(this.questions);
    
  }

}
