import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Patient } from './models/Patient';
@Injectable({
  providedIn: 'root'
})
export class DicomService {
  private patientsUrl = '/patients?expand';
  constructor(private http: HttpClient) {}

  /** GET all Patients from the server */
  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(this.patientsUrl)
      .pipe(catchError(this.handleError<Patient[]>('getHeroes', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
