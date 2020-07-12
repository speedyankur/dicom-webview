import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Patient } from './models/Patient';
import { Study } from './models/Study';
import { Series } from './models/Series';
import { Instance } from './models/Instance';
@Injectable({
  providedIn: 'root'
})
export class DicomService {
  APIRootUrl = '/orthanc';

  constructor(private http: HttpClient) {}

  /**
   * GET all Patients
   */
  getPatients(): Observable<Patient[]> {
    const patientsUrl = `${this.APIRootUrl}/patients?expand`;
    return this.http
      .get<Patient[]>(patientsUrl)
      .pipe(catchError(this.handleError<Patient[]>('getHeroes', [])));
  }
  /**
   * GET all studies for a Patient
   * @param id Patient ID
   */
  getStudiesForPatient(id: string) {
    const studiesUrl = `${this.APIRootUrl}/patients/${id}/studies`;
    return this.http
      .get<Study[]>(studiesUrl)
      .pipe(catchError(this.handleError<Study[]>('getStudiesForPatient', [])));
  }
  /**
   * GET all seris for a study
   * @param id study ID
   */
  getSeriesForStudies(id: string) {
    const seriesUrl = `${this.APIRootUrl}/studies/${id}/series`;
    return this.http
      .get<Series[]>(seriesUrl)
      .pipe(catchError(this.handleError<Series[]>('getSeriesForStudies', [])));
  }
  /**
   * GER all instances for a series
   * @param id Series ID
   */
  getInstancesForSeries(id: string) {
    const instancesUrl = `${this.APIRootUrl}/series/${id}/instances`;
    return this.http
      .get<Instance[]>(instancesUrl)
      .pipe(catchError(this.handleError<Instance[]>('getInstancesForSeries', [])));
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
