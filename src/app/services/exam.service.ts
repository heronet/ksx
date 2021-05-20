import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/Exam';
import { SearchQuery } from '../models/SearchQuery';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getAllExam(query: SearchQuery | null) {
    if(query == null)
      return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all`);
    if(query.testId)
      return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all?testId=${query.testId}`);
    if(query.date) {
      if(query.myRole)
        return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all?myRole=${query.myRole}&date=${query.date}`);
      return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all?date=${query.date}`);
    }
    if(query.myRole) {
      return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all?myRole=${query.myRole}`);
    }
    return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all`);
  }
  getExam(id: string) {
    return this.http.get<Partial<Exam>>(`${this.BASE_URL}/exam/${id}`);
  }
  createExam(exam: Partial<Exam>) {
    return this.http.post(`${this.BASE_URL}/exam/create`, exam);
  }
  submitExam(exam: Partial<Exam>) {
    return this.http.post<Partial<Exam>>(`${this.BASE_URL}/exam/submit`, exam);
  }
}
