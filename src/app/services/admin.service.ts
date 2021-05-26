import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getUsers(pageSize: number, pageCount: number) {
    return this.http.get<{data: User[], size: number}>(`${this.BASE_URL}/users/all?pageSize=${pageSize}&pageCount=${pageCount}`);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }
}
