import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private baseApiUrl = 'https://flowservetlaxauditorias.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  getForm(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseApiUrl + '/api/forms/');
  }

  getFormByYear(request: any): Observable<any[]>{
    const body:any = {
      id: request.id,
      year: request.year
    }
    return this.httpClient.get<any[]>(this.baseApiUrl + '/api/forms/'+body.id+'/results?year='+body.year);
  }

  getFormByYearandFiltered(request: any): Observable<any[]>{
    const body:any = {
      year: request.year,
      resultsIds: request.resultsIds
    }
    return this.httpClient.post<any[]>(this.baseApiUrl + '/api/forms/'+request.formId+'/results-grouped',body);
  }

}
