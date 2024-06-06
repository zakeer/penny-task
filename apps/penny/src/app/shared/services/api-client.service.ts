import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class APIClientService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private loaderService: LoaderService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  private handleError(error: any): Observable<never> {
    console.log(error)
    this.snackBar.open(error.error.message || 'An error occurred', 'Close', {
      duration: 5000,
    });
    return throwError(error);
  }

  get<T>(endpoint: string): Observable<T> {
    this.loaderService.show();
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.loaderService.hide())
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    this.loaderService.show();
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.loaderService.hide())
    );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    this.loaderService.show();
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.loaderService.hide())
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    this.loaderService.show();
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this)),
      finalize(() => this.loaderService.hide())
    );
  }
}
