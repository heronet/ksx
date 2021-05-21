import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/Exam';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-test-board',
  templateUrl: './test-board.component.html',
  styleUrls: ['./test-board.component.scss']
})
export class TestBoardComponent implements OnInit {
  // UI Stuff
  isLoading = false;
  isAuthenticated = false;
  examRunning = false;
  timeout: any;
  timer: any;
  time: number;
  timeString: string;
  examSubmitted = false;
  newSubmission = false;
  // Logic
  exam: Partial<Exam> = null;
  answers: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private examService: ExamService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authenticatedUser$.subscribe(authData => {
      if(authData != null) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    this.getExam(this.route.snapshot.params['id']);
  }
  getExam(id: string) {
      this.isLoading = true;
      this.examService.getExam(id).subscribe((exam) => {
      this.exam = exam;
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    })
  }
  itemSelected(option: string, questionIndex: number) {
    this.exam.questions[questionIndex].providedAnswer.text = option.trim();
  }
  onSubmit() {
    this.isLoading = true;
    this.examRunning = false;
    clearTimeout(this.timeout);
    clearInterval(this.timer);
    this.examService.submitExam(this.exam).subscribe(res => {
      this.isLoading = false;
      this.examSubmitted = true;
      this.newSubmission = res.newSubmission;
      this.exam = res;
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }
  onStart() {
    this.examRunning = true;
    this.time = this.exam.duration;
    this.timer = setInterval(() => {
      --this.time;
      this.setTime();
    }, 1000)
    this.timeout = setTimeout(() => {
      this.onSubmit();
    }, this.exam.duration * 1000);
  }
  setTime() {
    let minutes: string | number = Math.floor(this.time / 60);
    let seconds: string | number = Math.floor(this.time % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    this.timeString = minutes + ":" + seconds;
  }
}
