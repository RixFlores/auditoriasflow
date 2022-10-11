import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { answer } from 'src/app/models/answer.model';
import { AnswerService } from 'src/app/services/answers/answer.service';
import { answerDetail } from 'src/app/models/answer.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'stamping',
  templateUrl: './stamping.component.html',
  styleUrls: ['./stamping.component.css']
})
export class StampingComponent implements OnInit {
  public preguntas: Array<any> = []

  /* SECCION DE PREGUNTAS INICIO */
  public preguntasStamping: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (guantes anticorte, lentes, tapones, botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al trasladar el molde hacia el troquel el operador utiliza la mesa elevadora',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La herramienta utilizada para colocar el molde está en buenas condiciones y no es hechiza',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al utilizar la prensa el operador utiliza ambas manos para activar los controles (validar si intenta tomar atajo)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Valide que los guantes, lentes y tapones estén en buenas condiciones',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasAlmacen: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (lentes, tapones y botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Solicite al operador si puede bajar un material de una estiba alta y valide si al hacerlo usa el barandal de la escalera',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Revise si la escalera está en buenas condiciones (gomas de las patas, barandales, escalones)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Observe si cuando mueven una carga pesada utilizan un carro transportador de apoyo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Revise si el carro transportador tiene frenos en las ruedas y está siendo utilizado',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasAreaDeCorte: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (lentes, casco, guantes, tapones, botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Observe si cuando mueven una carga pesada utilizan un carro transportador de apoyo y/o polipasto',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La herramienta utilizada para realizar su trabajo está en buenas condiciones de uso y no es hechiza',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador utiliza la eslinga correcta para mover la carga (pregunte al operador para cuántos kilos es la eslinga)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador realizó revisión de la eslinga y la registró en el check list',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador utiliza algún dispositivo para quitar la rebaba',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasComedor: Array<any> = [
    {
      pregunta: 'El operador está utilizando correctamente y completo su EPP (zapato antiderrapante, cofia, cubrebocas, guantes y mandil)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El área por donde transita el personal está libre de líquidos o derrames',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Observe si los recipientes que mueve el personal son grandes, si es así pregunte cuántos Kg pesa, revise si lo mueven con ayuda de algún carrito.',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'En caso de emergencia el personal del comedor tiene una salida despejada y rápida',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Pregunte a cualquier persona del comedor si sabe a quien notificar en caso de algún accidente.',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasEnsambleP62: Array<any> = [
    {
      pregunta: 'La operadora está usando correctamente y completo su EPP (guantes anticorte, lentes, tapones, botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al trasladar los componentes hacia la mesa, la operadora utiliza algún dispositivo, p/e caja, carrito, etc.',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La operadora utiliza alguna herramienta para hacer el ensamble, está en buenas condiciones de uso',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La operadora permanece de pie y/o sentada para hacer su trabajo, hay algún riesgo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al mover cargas manualmente, lo hace correctamente, hay algún riesgo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Las guardas de las prensas están en óptimas condiciones de uso, funciona la cortina de luz',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasEnsambleP72: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (guantes anticorte, lentes, tapones y botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Valide que la pieza que el operador está trabajando se encuentra sujeta a una base fija, sin riesgo a caer',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La herramienta utilizada para realizar el ensamble está en buenas condiciones y no es hechiza',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Si el personal realiza golpes con el martillo, está utilizando guantes anti-impacto y su finger saver',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Si el operador realiza esmerilado o corte a la pieza debe adicionar a su EPP mandil, careta, guantes de carnaza y debe sujetar la herramienta con ambas manos y pies separados firmemente',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasGruas: Array<any> = [
    {
      pregunta: 'El operador está utilizando correctamente y completo su EPP (guantes, casco, lentes, tapones y botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador utiliza la eslinga correcta para mover la carga (pregunte al operador para cuántos kilos es la eslinga)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador realizó la revisión de la eslinga y la registró en el check list',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Solicite al operador su licencia vigente para operar grúas',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al realizar la maniobra el operador voltea hacia ambos lados para validar que no hay personas en su camino',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasISC: Array<any> = [
    {
      pregunta: 'La operadora está usando correctamente y completo su EPP (guantes anticorte, lentes, tapones y botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al trasladar los componentes hacia la mesa, la operadora utiliza algún dispositivo, p/e caja, carrito, etc',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La operadora utiliza alguna herramienta para hacer el ensamble y está en buenas condiciones de uso',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La operadora permanece de pie y/o sentada para hacer su trabajo, hay algún riesgo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al mover cargas manualmente, lo hace correctamente, hay algún riesgo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al utilizar la cabina laser, el operador se asegura que la puerta se encuentre completamente cerrada',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasLapeado: Array<any> = [
    {
      pregunta: 'El operador(a) está usando correctamente y completo su EPP (guantes, lentes, tapones, botas, peto)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al trasladar los componentes el operador(a) utiliza un dispositivo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador(a) utiliza alguna herramienta para realizar el lapeado',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La lapeadora cuenta con paro de emergencia',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador(a) utiliza algún EPP especial para realizar el lapeado',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasTonoManual: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (lentes, tapones y botas), valide que cuando el operador esté en contacto con la pieza en movimiento no utilice guantes',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Valide que el operador no realice operación de lijado con el torno en movimiento (revise el área del torno validando que no existan pedazos de lija, de existir pregunte al operador porque)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La herramienta utilizada para realizar el ensamble está en buenas condiciones y no es hechiza',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Pregunte al operador las revoluciones por minuto a las que está trabajando y valide si están de acuerdo a la especificación que tiene indicada el operador',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasSoldadura: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (guantes, careta, mandil, lentes, tapones y botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Valide que la pieza que el operador esta trabajando se encuentra sujeta a una base fija, sin riesgo de caer',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La herramienta utilizada para trabajar está en buenas condiciones de uso y no es hechiza',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Los controles y/o manómetros están integros y sin desperfectos aparentes',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Si el operador realiza esmerilado o corte a la pieza debe adicionar a su EPP mandil, y careta facial',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Las conexiones de los cables porta electrodo y de tierra están en buen estado de uso',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La máquina de soldar está debidamente aterrizada y con conexiones adecuadas',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Para el transporte de los cilindros de gas se utiliza un medio mecánico, los cilindros están verticalmente colocados',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasCNC: Array<any> = [
    {
      pregunta: 'El operador está usando completo y correctamente su EPP al intervenir su equipo (lentes, tapones, botas, faja, recuerde que para partes rotatorias no se debe usar guantes)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Revise con el operador que las puertas de la máquina CNC no se puedan abrir mientras la máquina este trabajando',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'La herramienta utilizada está en buenas condiciones y no es hechiza',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Observe si cuando mueven una carga pesada utilizan un carro transportador de apoyo o polipasto',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Revise si el carro transportador tenía frenos en las ruedas y estaba siendo utilizado',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Valide que las piezas a maquinar no tienen filos pronunciados y de tenerlos, el operador usa guantes anticorte (ver imagen)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]
  public preguntasRubber: Array<any> = [
    {
      pregunta: 'El operador está usando correctamente y completo su EPP (guantes anticorte, lentes, tapones, botas)',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al trasladar los componentes hacia la mesa, el operador utiliza algún dispositivo, p/e caja, carrito, etc.',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al trasladar el molde hacia Rubber Molding el operador utiliza la mesa elevadora',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'El operador permanece de pie y/o sentado para hacer su trabajo, hay algún riesgo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Al mover cargas manualmente, lo hace correctamente, hay algún riesgo',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: 'Las guardas de la Rubber Molding están en óptimas condiciones de uso, funciona la cortina de luz',
      respuesta: undefined,
      comentarios: ''
    },
    {
      pregunta: '(OPCIONAL) Describa algun comportamiento de riesgo que haya observado',
      respuesta: undefined,
      comentarios: ''
    }
  ]

  /* SECCION DE PREGUNTAS FIN */

  public respuestas: answer = {
    eventId: '',
    assignedTo: '',
    image: 'No image',
    questions: [{
      description: '',
      selection: false,
      comments: ''
    }]
  }
  public answersArray: Array<answerDetail> = [];

  public selectedQuestion = 0;
  public formReady = false;
  public archivos: any = [];
  public previsualizacion: string = '';
  public userAccepted = false;
  public userId = '';
  public notAccepted = false;
  public paramsObject: any;
  public formId = '';
  public formCode = '';
  public eventId = '';
  public gems = '';
  public formFinished = false;

  /* VARIABLES PROVISIONALES */
  bbsName=''
  employeeName = ''



  constructor(
    private sanitizer: DomSanitizer,
    private readonly activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private answerService: AnswerService,
    private employeeService: EmployeesService,
    private cookieService: CookieService,
    private readonly spinnerService: SpinnerService
    ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };
        this.formId = this.paramsObject.params.formId;
        console.log(this.formId)
      }
    );
  }

  checkUser(){
    const request ={
      formId: this.formId,
      gems: this.gems
    }
    this.authService.checkUser(request)
    .subscribe(
      (success)=>{
        console.log(success)
        this.cookieService.set('accessToken', success.accessToken);
        this.cookieService.set('refreshToken', success.refreshToken);
        if(success.accessToken){
          var tokenDecoded:any = jwt_decode(success.accessToken);
          console.log(tokenDecoded)
          this.formCode = tokenDecoded["FormCode"];
          this.userId = tokenDecoded["EmployeeId"];
          this.eventId = tokenDecoded["EventId"]
        }

        this.employeeService.getEmployeeLogged()
        .subscribe(
          (success)=>{
            console.log(success)
            this.employeeName = success.firstName + ' '+success.lastName;
          },(error)=>{
            console.log(error)
          }
        )

        if(this.formCode == 'STP62'){
          this.preguntas = this.preguntasStamping;
          this.bbsName = 'BBS STAMPING P62';
        }else if(this.formCode == 'CMDR'){
          this.preguntas = this.preguntasComedor
          this.bbsName = 'BBS COMEDOR';
        }else if(this.formCode == 'ALM52'){
          this.preguntas = this.preguntasAlmacen
          this.bbsName = 'BBS ALMACÉN PLANTA 52';
        }else if(this.formCode == 'SOL72'){
          this.preguntas = this.preguntasSoldadura
          this.bbsName = 'BBS SOLDADURA P72';
        }else if(this.formCode == 'CNC52'){
          this.preguntas = this.preguntasCNC
          this.bbsName = 'BBS Proceso CNC, LCS';
        }else if(this.formCode == 'CTE52'){
          this.preguntas = this.preguntasAreaDeCorte
          this.bbsName = 'BBS AREA DE CORTE P52';
        }else if(this.formCode == 'ENS72'){
          this.preguntas = this.preguntasEnsambleP72
          this.bbsName = 'BBS ENSAMBLE P72';
        }else if(this.formCode == 'LP62'){
          this.preguntas = this.preguntasLapeado
          this.bbsName = 'BBS LAPEADO P62';
        }else if(this.formCode == 'GRA'){
          this.preguntas = this.preguntasGruas
          this.bbsName = 'BBS USO DE GRÚAS SA';
        }else if(this.formCode == 'TM52'){
          this.preguntas = this.preguntasTonoManual
          this.bbsName = 'BBS TORNO MANUAL P52';
        }else if(this.formCode == 'RM62'){
          this.preguntas = this.preguntasRubber
          this.bbsName = 'BBS RUBBER MOLDING P62';
        }else if(this.formCode == 'ENS62'){
          this.preguntas = this.preguntasEnsambleP62
          this.bbsName = 'BBS ENSAMBLE P62';
        }else if(this.formCode == 'ISC62'){
          this.preguntas = this.preguntasISC
          this.bbsName = 'BBS ISC P62';
        }
        this.userAccepted = true;
        this.notAccepted = false;
      },(error)=>{
        this.userAccepted = false;
        this.notAccepted = true;
        console.log(error)
      }
    )
  }

  /* functionReady(){
    this.preguntas[this.preguntas.length-1].respuesta = true;
    this.respuestas.image = 'No image';
    var answered = 0;



    for (let i = 0; i < this.preguntas.length; i++) {
      if(this.preguntas[i].respuesta == undefined || this.respuestas.image == ''){
        answered ++;
      }if(answered == 0){
        this.formReady = true;
      }
    }
  } */

  functionYes(index:any){
    this.preguntas[index].respuesta = true;
    var answered = 0;
    for (let i = 0; i < this.preguntas.length-1; i++) {
      if(this.preguntas[i].respuesta == undefined){
        answered ++;
      }
    }
    if(answered == 0){
      this.formReady = true;
    }
  }

  functionNo(index:any){
    this.preguntas[index].respuesta = false;
    var answered = 0;
    for (let i = 0; i < this.preguntas.length-1; i++) {
      if(this.preguntas[i].respuesta == undefined){
        answered ++;
      }
    }
    if(answered == 0){
      this.formReady = true;
    }
  }

  captureFile(event:any):any{
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then(async (imagen:any) => {
      console.log("GRANDE", imagen.base.length)
      var smallImage = await reduceImageSize(imagen.base);
      this.respuestas.image = smallImage;
      this.previsualizacion = smallImage;
      console.log("CHICA", this.previsualizacion.length)
      this.preguntas[this.preguntas.length-1].respuesta = true;
      var answered = 0;
      for (let i = 0; i < this.preguntas.length-1; i++) {
        if(this.preguntas[i].respuesta == undefined){
          answered ++;
        }
      }
      if(answered == 0){
        this.formReady = true;
      }
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

  enviar(){
    this.spinnerService.show();
    for(let i = 0; i<this.preguntas.length; i++){
      this.answersArray.push(
        {
          description: this.preguntas[i].pregunta,
          selection: this.preguntas[i].respuesta,
          comments: this.preguntas[i].comentarios,
        });
    }

    const answers = {
      eventId: this.eventId,
      assignedTo: this.userId,
/*       assignedTo: '08da9604-1bc6-4e5a-8456-7664bf46720b',*/
      image: this.respuestas.image,
      questions: this.answersArray
    }
    console.log(this.answersArray)
    this.answerService.addAnswer(answers)
      .subscribe(
        (success)=>{
          console.log(success)
          this.spinnerService.hide();
          this.formFinished = true;
        },(error)=>{
          console.log(error)
        }
      )
    console.log("RESPUESTAS", this.preguntas)
  }
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
