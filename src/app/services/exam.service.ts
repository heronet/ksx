import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/Exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getAllExam() {
    return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all`);
  }
  createExam(exam: Partial<Exam>) {
    return this.http.post(`${this.BASE_URL}/exam/create`, exam);
  }
}
