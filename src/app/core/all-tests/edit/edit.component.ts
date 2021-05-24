import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/Exam';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userId: string;
  isLoading = false;
  isCreator = false;
  exam: Partial<Exam> = null;
  
  subjects = [
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Math",
    "ICT",
    "Bangla",
    "Bangla Shahitto",
    "English Literature",
    "Geography",
    "Critical Reasoning",
    "Math Reasoning",
    "Noitikota O Mullobodh",
    "Science",
    "Sushasan",
    "Bangladesh Affairs",
    "International Affairs",
    "Mental Efficiency",
    "Computer And IT",
    "Multiple Subjects"
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
  negativeMarks = [0.25, 0.5, 0.75, 1];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.authenticatedUser$.subscribe(authData => {
      if(authData != null) {
        this.userId = authData.id;
      } else {
        this.userId = null;
      }
    });
    this.duration_keys = Object.keys(this.durations);
    this.getExam(this.route.snapshot.params['id']);
  }
  getExam(id: string) {
      this.isLoading = true;
      this.examService.getExam(id).subscribe((exam) => {
      this.exam = exam;
      if(exam.creatorId === this.userId)
        this.isCreator = true;
      else
        this.isCreator = false;
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    })
  }
  onSave(form: NgForm) {
    this.isLoading = true;

    this.exam.title = form.value.title.trim();
    this.exam.subject = form.value.subject.trim();
    this.exam.duration = this.durations[form.value.duration];
    this.exam.negativeMarks = +form.value.negative;
    
    this.examService.updateExam(this.exam.id, this.exam).subscribe(res => {
      this.isLoading = false;
      this.router.navigateByUrl('/all-tests');
    }, err => {
      this.isLoading = false;
      console.log(err);
      
    })
  }

}
