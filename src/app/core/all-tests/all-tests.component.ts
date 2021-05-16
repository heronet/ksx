import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/Exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-all-tests',
  templateUrl: './all-tests.component.html',
  styleUrls: ['./all-tests.component.scss']
})
export class AllTestsComponent implements OnInit {
  isLoading: boolean;
  exams: Partial<Exam>[];

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.examService.getAllExam().subscribe(res => {
      setTimeout(() => {
        this.exams = res;
        this.isLoading = false;
      }, 1000);
    });
  }

}
