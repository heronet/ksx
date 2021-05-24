import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Exam } from 'src/app/models/Exam';
import { SearchQuery } from 'src/app/models/SearchQuery';
import { ExamService } from 'src/app/services/exam.service';
import { PromptComponent } from '../../prompt/prompt.component';

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.scss']
})
export class ExamManagementComponent implements OnInit {
  // UI
  isLoading = false;
  isActivateLoading = false;
  isDeleteLoading = false;
  activateIndex: number;
  errors: string[] = [];
  // Logic
  exams: Partial<Exam>[] = [];
  examsCount: number;
  pageSize = 5;
  pageCount= 1;
  searchQuery: SearchQuery = {
    testId: "",
    date: null,
    myRole: "creator",
    subject: "",
    pageSize: this.pageSize,
    pageCount: this.pageCount
  };
  constructor(private examService: ExamService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchExams(this.searchQuery);
  }
  onToggleExam(id: string, index: number) {
    this.isActivateLoading = true;
    this.activateIndex = index;
    setTimeout(() => {
      this.examService.toggleSubmission(id).subscribe(res => {
      this.exams[index].submissionEnabled = res;
      this.isActivateLoading = false;
    }, err => {
      console.log(err);
      this.isActivateLoading = false;
    });
    },1000)
  }
  onDelete(id:string, index: number) {
    this.isDeleteLoading = true;
    this.activateIndex = index;
    const dialogRef = this.dialog.open(PromptComponent, {data: this.exams[index].title});
    dialogRef.afterClosed().subscribe(result => {
      this.isDeleteLoading = false;
      if(result) {
        this.examService.deleteExam(id).subscribe(() => {
          this.exams.splice(index, 1);
        }, err => {
          console.log(err);
        });
      }
    });
  }
  paginatorReload(e: PageEvent) {
    this.pageCount = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.searchQuery.pageCount = this.pageCount;
    this.searchQuery.pageSize = this.pageSize;
    this.fetchExams(this.searchQuery);
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

}
