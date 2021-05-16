import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/Exam';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllExam() {
    return this.http.get<Partial<Exam>[]>(`${this.BASE_URL}/exam/all`);
  }
}
