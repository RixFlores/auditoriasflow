import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseApiUrl = 'https://flowservetlaxauditorias.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  getEmployees(): Observable<employee[]>{
    return this.httpClient.get<employee[]>(this.baseApiUrl + '/api/employees/');
  }

  getEmployeeLogged(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/employees/logged');
  }

  getEmployee(id:string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/employees/'+id);
  }

  getAdministrator():Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/administrators/logged');
  }

  getAllAdministrators():Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/administrators');
  }

  addEmployees(employeeRequest: employee): Observable<employee>{
    const body: employee={
      firstName: employeeRequest.firstName,
      lastName: employeeRequest.lastName,
      officialId: employeeRequest.officialId
    };
    return this.httpClient.post<employee>(this.baseApiUrl+'/api/authentication/register-employee',body);
  }

  addAdmin(adminRequest: any): Observable<any>{
    const body: any={
      firstName: adminRequest.firstName,
      lastName: adminRequest.lastName,
      email: adminRequest.email,
      password: adminRequest.password,
      profileImage: '',
      phoneNumber: adminRequest.phoneNumber
    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/authentication/register-administrator',body);
  }

  updateEmployee(id:string, employeeRequest: any): Observable<any>{
    const body: any={
      firstName: employeeRequest.firstName,
      lastName: employeeRequest.lastName,
      officialId: employeeRequest.officialId,
      profileImage: employeeRequest.profileImage
    };
    return this.httpClient.put<any>(this.baseApiUrl+'/api/employees/'+id,body);
  }

  updateAdminPicture(id:string, request: any): Observable<any>{
    const body: any={
      firstName: request.firstName,
      lastName: request.lastName,
      profileImage: request.profileImage
    };
    return this.httpClient.put<any>(this.baseApiUrl+'/api/administrators/'+id,body);
  }

  updateUserPicture(id:string, request: any): Observable<any>{
    const body: any={
      firstName: request.firstName,
      lastName: request.lastName,
      profileImage: request.profileImage
    };
    return this.httpClient.put<any>(this.baseApiUrl+'/api/employees/'+id,body);
  }

  deleteEmployee(id:string){
    return this.httpClient.delete<employee>(this.baseApiUrl + '/api/employees/'+id);
  }

  deleteAdmin(id:string){
    return this.httpClient.delete<employee>(this.baseApiUrl + '/api/administrators/'+id);
  }



}
