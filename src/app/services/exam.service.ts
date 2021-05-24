import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam, Participant } from '../models/Exam';
import { SearchQuery } from '../models/SearchQuery';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getAllExam(query: Partial<SearchQuery>) {
    if(query.testId)
      return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?testId=${query.testId}&pageSize=${query.pageSize}&pageCount=${query.pageCount}`);
    if(query.date) {
      if(query.myRole) {
        if(query.subject)
          return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?myRole=${query.myRole}&date=${query.date}&pageSize=${query.pageSize}&pageCount=${query.pageCount}&subject=${query.subject}`);
        return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?myRole=${query.myRole}&date=${query.date}&pageSize=${query.pageSize}&pageCount=${query.pageCount}`);
      }
      if(query.subject)
        return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?date=${query.date}&pageSize=${query.pageSize}&pageCount=${query.pageCount}&subject=${query.subject}`);
      return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?date=${query.date}&pageSize=${query.pageSize}&pageCount=${query.pageCount}`);
    }
    if(query.myRole) {
      if(query.subject)
        return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?myRole=${query.myRole}&pageSize=${query.pageSize}&pageCount=${query.pageCount}&subject=${query.subject}`);
      return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?myRole=${query.myRole}&pageSize=${query.pageSize}&pageCount=${query.pageCount}`);
    }
    if(query.subject)
      return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?pageSize=${query.pageSize}&pageCount=${query.pageCount}&subject=${query.subject}`);
    return this.http.get<{exams: Partial<Exam>[], size: number}>(`${this.BASE_URL}/exam/all?pageSize=${query.pageSize}&pageCount=${query.pageCount}`);
  }
  getExam(id: string) {
    return this.http.get<Partial<Exam>>(`${this.BASE_URL}/exam/${id}`);
  }
  createExam(exam: Partial<Exam>) {
    return this.http.post(`${this.BASE_URL}/exam/create`, exam);
  }
  updateExam(id: string, exam: Partial<Exam>) {
    return this.http.put(`${this.BASE_URL}/exam/${id}`, exam);
  }
  deleteExam(id: string) {
    return this.http.delete(`${this.BASE_URL}/exam/${id}`);
  }
  submitExam(exam: Partial<Exam>) {
    return this.http.post<Partial<Exam>>(`${this.BASE_URL}/exam/submit`, exam);
  }
  toggleSubmission(id: string) {
    return this.http.patch<boolean>(`${this.BASE_URL}/exam/${id}`, {});
  }
  removeParticipant(id: string, participantId: string) {
    return this.http.delete(`${this.BASE_URL}/exam/participants/${id}?participantId=${participantId}`);
  }
  getParticipants(id: string) {
    return this.http.get<Participant[]>(`${this.BASE_URL}/exam/participants/${id}`);
  }
}
