import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/Exam';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';
import { PromptComponent } from '../../prompt/prompt.component';

@Component({
  selector: 'app-test-board',
  templateUrl: './test-board.component.html',
  styleUrls: ['./test-board.component.scss']
})
export class TestBoardComponent implements OnInit, OnDestroy {
  // UI Stuff
  isLoading = false;
  isAuthenticated = false;
  isAdmin = false;
  examRunning = false;
  errorMessage = "";
  timeout: any;
  timer: any;
  time: number;
  timeString: string;
  examSubmitted = false;
  newSubmission = false;
  isCreator = false;
  error: string;
  // Logic
  exam: Partial<Exam> = null;
  answers: string[] = [];
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.authenticatedUser$.subscribe(authData => {
      if(authData != null) {
        this.isAuthenticated = true;
        this.userId = authData.id;
        if(authData.roles[0] === 'Admin')
          this.isAdmin = true;
        else
          this.isAdmin = false;
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
      this.error = null;
      if(exam.creatorId === this.userId)
        this.isCreator = true;
      this.isLoading = false;
    }, err => {
      this.error = err.error;
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
      localStorage.removeItem("examTimeRemaining");
    }, err => {
      this.isLoading = false;
      this.errorMessage = err.error;
      localStorage.removeItem("examTimeRemaining");
    });
  }
  onStart() {
    this.examRunning = true;
    const localExamId = localStorage.getItem('examId');
    if(localExamId != this.exam.id)
      localStorage.removeItem("examTimeRemaining");
    const timeRemaining = localStorage.getItem('examTimeRemaining');
    if(timeRemaining) {
      this.time = parseInt(timeRemaining);
    } else {
      this.time = this.exam.duration;
      localStorage.setItem('examId', this.exam.id);
    }
    this.timer = setInterval(() => {
      --this.time;
      localStorage.setItem('examTimeRemaining', this.time.toString());
      this.setTime();
    }, 1000)
    this.timeout = setTimeout(() => {
      this.onSubmit();
    }, this.time * 1000);
  }
  onDelete() {
    const dialogRef = this.dialog.open(PromptComponent, {data: this.exam.title});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isLoading = true;
        this.examService.deleteExam(this.exam.id).subscribe(() => {
          this.isLoading = false;
          this.router.navigateByUrl('/all-tests');
        }, err => {
          console.log(err);
          this.isLoading = false;
        });
      }
    });
  }
  onChangeSubmission() {
    this.examService.toggleSubmission(this.exam.id).subscribe(res => {
      this.exam.submissionEnabled = res;
    })
  }
  setTime() {
    let minutes: string | number = Math.floor(this.time / 60);
    let seconds: string | number = Math.floor(this.time % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    this.timeString = minutes + ":" + seconds;
  }
  ngOnDestroy() {
    clearTimeout(this.timeout);
    clearInterval(this.timer);
  }

}
