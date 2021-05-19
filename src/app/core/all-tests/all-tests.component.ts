import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exam } from 'src/app/models/Exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-all-tests',
  templateUrl: './all-tests.component.html',
  styleUrls: ['./all-tests.component.scss']
})
export class AllTestsComponent implements OnInit {
  isLoading: boolean;
  showObtainedMarks = false;

  exams: Partial<Exam>[] = [];
  myRoles = {
    'All': null, 
    'Participated By Me': 'participient', 
    'Created By Me': 'creator'
  };
  myRoleKeys: string[] = [];
  
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.fetchExams(null);
    this.myRoleKeys = Object.keys(this.myRoles);
  }
  onSubmit(form: NgForm) {
    const myRole = this.myRoles[form.value.myRole];
    if(myRole == 'participient')
      this.showObtainedMarks = true;
    else
      this.showObtainedMarks = false;
    this.fetchExams(myRole); 
  }

  fetchExams(query: string | null) {
    this.isLoading = true;
    this.examService.getAllExam(query).subscribe(res => {
      this.exams = res;
      this.isLoading = false;
    });
  }
}
