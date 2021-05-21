import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Exam } from 'src/app/models/Exam';
import { SearchQuery } from 'src/app/models/SearchQuery';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-all-tests',
  templateUrl: './all-tests.component.html',
  styleUrls: ['./all-tests.component.scss']
})
export class AllTestsComponent implements OnInit {
  // UI
  isLoading: boolean;
  showObtainedMarks = false;
  errors: string[] = [];
  examsCount: number;
  pageSize = 5;
  pageCount= 1;
  searchQuery: SearchQuery = {
    testId: "",
    date: null,
    myRole: "",
    pageSize: this.pageSize,
    pageCount: this.pageCount
  };
  
  // Logic
  exams: Partial<Exam>[] = [];
  myRoles = {
    'All': null, 
    'Participated By Me': 'participient', 
    'Created By Me': 'creator'
  };
  myRoleKeys: string[] = [];
  
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.myRoleKeys = Object.keys(this.myRoles);
    this.fetchExams(this.searchQuery);
  }
  onSubmit(form: NgForm) {
    const query: SearchQuery = {
      testId: form.value.testId.trim(),
      date: form.value.date,
      myRole: this.myRoles[form.value.myRole],
      pageSize: this.pageSize,
      pageCount: this.pageCount
    };
    this.searchQuery = query;
    const myRole = query.myRole;
    if(myRole == 'participient')
      this.showObtainedMarks = true;
    else
      this.showObtainedMarks = false;
    this.fetchExams(query); 
  }

  fetchExams(query: SearchQuery) {
    this.isLoading = true;
    this.errors = [];
    this.examService.getAllExam(query).subscribe(res => {
      this.exams = res.exams;
      this.examsCount = res.size;
      this.isLoading = false;
    }, err => {
      if(typeof(err.error) == 'string')
        this.errors.push(err.error);
      else if(typeof(err.error) == 'object' && err.error.errors) {
        const errors = Object.values(err.error.errors);
        errors.forEach((errArray: []) => {
          errArray.forEach(err => {
            this.errors.push(err);
          });
        });
      }
      this.isLoading = false;
      this.exams = [];
    });
  }
  paginatorReload(e: PageEvent) {
    this.pageCount = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.searchQuery.pageCount = this.pageCount;
    this.searchQuery.pageSize = this.pageSize;
    this.fetchExams(this.searchQuery);
  }
}
