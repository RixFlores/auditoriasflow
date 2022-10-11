import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { ImageServiceService } from 'src/app/services/image-service.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user:any = {
    id: '',
    name: '',
    lastName: '',
    password: '',
    currentPassword:'',
    confirmedPassword:'',
    profileImageUrl: '',
  }
  hide = true;
  public previsualizacion: string = '';
  public archivos: any = [];

  constructor(    
    private sanitizer: DomSanitizer,
    private userService: AuthService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeesService,
    private imageService: ImageServiceService
  ) { }

  ngOnInit(): void {
    //Datos del usuario
    this.userService.getUserData()
    .subscribe(
      (success)=>{
        console.log("DATOS DEL ESTUDIANTE",success)
        this.user.id = success.id;
        this.user.name = success.firstName;
        this.user.lastName = success.lastName;

        const imageDefault = this.imageService.getImage()
        if(!success.profileImage){
          this.user.profileImageUrl = imageDefault
        }else{
          this.user.profileImageUrl = success.profileImage
        }

        /*this.user.profileImageUrl = success.profileImageUrl;
      if(!this.user.profileImageUrl){
          this.user.profileImageUrl = ''
        }*/
      },(error)=>{
        console.log(error);
      }
    )
  }

  updateStudentName(){
    const request = {
      firstName: this.user.name,
      lastName: this.user.lastName
    }
    this.userService.updateName(request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Nombre actualizado',undefined,{
          duration: 2000
        });
        var tiempos = setTimeout(()=>{
          this.ngOnInit();
        },2000);
      },(error)=>{
        this.snackbar.open('Error actualizando el nombre',undefined,{
          duration: 2000
        });
        console.log(error);
      }
    )
  }

  updateStudentPassword(){
    const request = {
      password: this.user.password,
      confirmedPassword: this.user.confirmedPassword,
      currentPassword: this.user.currentPassword
    }
    this.userService.updatePassword(request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Contraseña actualizada',undefined,{
          duration: 2000
        });
          var tiempos = setTimeout(()=>{
            this.ngOnInit();
          },2000);
        },(error)=>{
        this.snackbar.open('Error actualizando la contraseña',undefined,{
          duration: 2000
        });
        console.log(error);
      }
    )
  }

  captureFile(event:any):any{
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then(async (imagen:any) => {
      console.log("GRANDE", imagen.base.length)
      var smallImage = await reduceImageSize(imagen.base);
      this.previsualizacion = smallImage;

      var request = {
        firstName: this.user.name,
        lastName: this.user.lastName,
        profileImage: this.previsualizacion,
      }

      this.employeeService.updateAdminPicture(this.user.id, request)
      .subscribe(
        (success)=>{
          this.snackbar.open('Imagen actualizada',undefined,{
            duration: 2000
          });
          var tiempos = setTimeout(()=>{
            window.location.reload()
          },2000);
        },(error)=>{
          console.log(error)
        }
      )



      console.log(this.previsualizacion)
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
