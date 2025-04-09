import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Backend URL

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all-properties`);
  };
  addNewCourse(data:any): Observable<any> {
    const url = `${this.apiUrl}/add-new-property`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url,data, { headers });
  }

  editPropertyDetails(id: number, updatedData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(`${this.apiUrl}/edit-property-details/${id}`, updatedData, {headers});
  }

  deleteProperty(id:number) {
    return this.http.get<any>(`${this.apiUrl}/delete-property/${id}`)
  }


}
