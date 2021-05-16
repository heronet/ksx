import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  subjects = [
    "Select a subject",
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
    0 : {}
  };
  questions_keys = [];

  constructor() { }

  ngOnInit(): void {
    this.duration_keys = Object.keys(this.durations);
    this.questions_keys = Object.keys(this.questions);
  }
  onSubmit(form: NgForm) {
    
  }
  addQuestion() {
    let index = this.questions_keys.length
    this.questions[index] = {};
    this.questions_keys = Object.keys(this.questions);
    console.log(this.questions);
    console.log(this.questions_keys);
    
  }
  increaseOne(num: any): number {
    return Number(num) + 1;
  }

}
