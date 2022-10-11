import { Component, OnInit, ViewChild } from '@angular/core';
import { employee } from 'src/app/models/employee.model';
import { NgForm } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageServiceService } from 'src/app/services/image-service.service';

@Component({
  selector: 'empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  @ViewChild('employeeForm') employeeForm?: NgForm;
  @ViewChild('adminForm') adminForm?: NgForm;
  @ViewChild(MatPaginator) paginatorEmployee!: MatPaginator;
  @ViewChild(MatPaginator) paginatorAdmin!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formReady = false;
  displayedColumns = ['nombre','matricula','opciones'];
  displayedColumnsAdmin = ['nombre','matricula','opciones'];
  employees: Array<employee> = [];
  employeeArray: Array<any> = [];  
  administrators: Array<any> = [];
  administratorsArray: Array<any> = [];  
  dataSource!: MatTableDataSource<any>;
  dataSourceAdmin!: MatTableDataSource<any>;
  public archivos: any = [];

  menuOption = 'uno';
  hide = true;  
  userToUpdate = '';
  userToDelete = '';
  adminDelete = '';
  previsualizacion = '';
  request:any;

  admin:any = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    phoneNumber:''
  }

  empleado: employee = {
    firstName: '',
    lastName: '',
    officialId: ''
  }

  updateEmpleado: any = {
    firstName: '',
    lastName: '',
    officialId: '',
    profileImage:''
  }

  constructor(
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private employeService: EmployeesService,
    private imageService: ImageServiceService
  ) {
    this.employeService.getEmployees()
    .subscribe(
      (successResponse)=>{
        this.employees = successResponse;
        for (let i = 0; i < this.employees.length; i++) {
          this.employeeArray.push(createNewUser(successResponse[i]));
        }
        this.dataSource = new MatTableDataSource(this.employeeArray);
        this.dataSource.paginator = this.paginatorEmployee;
        this.dataSource.sort = this.sort;

      },
      (error) =>{
        console.log(error);
      }
    );

    this.employeService.getAllAdministrators()
    .subscribe(
      (successResponse)=>{
        console.log(successResponse,"respuesta de admin")
        this.administrators = successResponse;
        for (let i = 0; i < this.administrators.length; i++) {
          this.administratorsArray.push(createNewUserAdmin(successResponse[i]));
        }
        this.dataSourceAdmin = new MatTableDataSource(this.administratorsArray);
        this.dataSourceAdmin.paginator = this.paginatorAdmin;
        this.dataSourceAdmin.sort = this.sort;

      },
      (error) =>{
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.empleado = {
      firstName: '',
      lastName: '',
      officialId: ''
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkForm(){
    if(this.empleado.firstName != '' && this.empleado.lastName != '' && this.empleado.officialId != ''){
      this.formReady = true;
    }else{
      this.formReady = false;
    }
  }

  checkAdminForm(){
    if(this.admin.firstName != '' && this.admin.lastName != '' && this.admin.email != '' && this.admin.password != '' && this.admin.phoneNumber != ''){
      this.formReady = true;
    }else{
      this.formReady = false;
    }
  }

  add(){
    if(this.empleado.firstName != '' && this.empleado.lastName != '' && this.empleado.officialId != ''){
      this.formReady = true;
    }else{
      this.formReady = false;
    }
    if(this.formReady){
      this.employeService.addEmployees(this.empleado)
      .subscribe(
        (success)=>{
          this.snackbar.open('Se creó el empleado correctamente',undefined,{
            duration: 2000
          });
          window.location.reload();
        },
        (error)=>{
          this.snackbar.open('Error creando al empleado',undefined,{
            duration: 2000
          });
          console.log(error)
        }
      )
    }
  }

  addAdmin(){
  if(this.admin.firstName != '' && this.admin.lastName != '' && this.admin.email != '' && this.admin.password != '' && this.admin.phoneNumber != ''){
      this.formReady = true;
    }else{
      this.formReady = false;
    }
    if(this.formReady){
      this.employeService.addAdmin(this.admin)
      .subscribe(
        (success)=>{
          this.snackbar.open('Se creó el administrador correctamente',undefined,{
            duration: 2000
          });
          var tiempos = setTimeout(()=>{
            window.location.reload();
          },2000);
        },
        (error)=>{
          this.snackbar.open('Error creando al administrador',undefined,{
            duration: 2000
          });
          console.log(error)
        }
      )
    }
  }

  employeeToUpdate(id:any){
    const imageDefault = this.imageService.getImage()

    this.userToUpdate = id;
    this.employeService.getEmployee(id)
    .subscribe(
      (success)=>{
        console.log("USUARIO BUSCADO",success)
        this.updateEmpleado.firstName = success.firstName,
        this.updateEmpleado.lastName = success.lastName,
        this.updateEmpleado.officialId = success.officialId
        if(success.profileImage == null){
          this.previsualizacion = imageDefault
        }else{
          this.previsualizacion = success.profileImage    
        }
      },(error)=>{
        console.log(error)
      }
    )
  }

  updateEmployee(){
    

     /*  this.employeService.updateUserPicture(this.userToUpdate, request)
      .subscribe(
        (success)=>{
          this.snackbar.open('Imagen actualizada',undefined,{
            duration: 2000
          });
        },(error)=>{
          console.log(error)
        }
      ) 
       */
    

    this.employeService.updateEmployee(this.userToUpdate, this.request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se actualizó el usuario correctamente',undefined,{
          duration: 2000
        });
          var tiempos = setTimeout(()=>{
            window.location.reload();
          },2000); 
        },(error)=>{
        this.snackbar.open('Error actualizando al usuario',undefined,{
          duration: 2000
        });
        console.log(error)
      }
    )
  }

  employeeToDelete(id:any){
    this.userToDelete = id;
  }

  deleteEmployee(){
    this.employeService.deleteEmployee(this.userToDelete)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se eliminó el usuario correctamente',undefined,{
          duration: 2000
        });
          var tiempos = setTimeout(()=>{
            window.location.reload();
          },2000);      
        },(error)=>{
        this.snackbar.open('Error eliminando al usuario',undefined,{
          duration: 2000
        });
        console.log(error)
      }
    )
  }
  adminToDelete(id:any){
    this.adminDelete = id;
  }

  deleteAdmin(){
    this.employeService.deleteAdmin(this.adminDelete)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se eliminó el administrador correctamente',undefined,{
          duration: 2000
        });
          var tiempos = setTimeout(()=>{
            window.location.reload();
          },2000);      
        },(error)=>{
        this.snackbar.open('Error eliminando al administrador',undefined,{
          duration: 2000
        });
        console.log(error)
      }
    )
  }
  
  captureFile(event:any):any{
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then(async (imagen:any) => {
      console.log("GRANDE", imagen.base.length)
      var smallImage = await reduceImageSize(imagen.base);
      this.previsualizacion = smallImage;

      this.request = {
        firstName: this.updateEmpleado.firstName,
        lastName: this.updateEmpleado.lastName,
        officialId: this.updateEmpleado.officialId,
        profileImage: this.previsualizacion,
      }     

      var answered = 0;
    })
    this.archivos.push(archivoCapturado);

    
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
        reader.onload = () =>{
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error =>{
          resolve({
            base: null
          });
        };
        return
      }catch (e) {
        return null;
      }
    })
}

async function reduceImageSize(base64Str:string, MAX_WIDTH = 450, MAX_HEIGHT = 450): Promise<string>{
  let resized_base64:string = await new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
          let canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > height) {
              if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width
                  width = MAX_WIDTH
              }
          } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height
                  height = MAX_HEIGHT
              }
          }
          canvas.width = width
          canvas.height = height
          let ctx = canvas.getContext('2d')
          ctx!.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL()) // this will return base64 image results after resize
      }
  });
  return resized_base64;
}


function createNewUser(todas: any): any {

  return {
    id: todas.id,
    firstName: todas.firstName,
    lastName : todas.lastName,
    officialId: todas.officialId
  };
}

function createNewUserAdmin(todas: any): any {
  console.log(todas,"DATOS DEL ADMIN")

  return {
    id: todas.id,
    firstName: todas.firstName,
    lastName : todas.lastName,
    officialId: todas.user.userName
  };
}


