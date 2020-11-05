import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//firebase
import { FirebaseService } from "../../servicios/firebase.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
//variable para saber tipo de usuario.
opcion: string;


valueCaptcha: number;
captcha: string;

//mensajes
mensaje: string;

//datos para registrar usuarios.
nombre: string = "";
apellido: string = "";
correo: string = "";
clave: string = "";
foto1: string;
foto1File;
foto2: string;
foto2File;

//datos para usuarios solamente profesionales.
especialidad: string[];
agregoEspecialidad: string;


constructor(private authService: FirebaseService, private db: AngularFireDatabase, private router: Router, private afStorage: AngularFireStorage) {
  this.especialidad = new Array();
 }

  ngOnInit(): void {
  }

  Register(){
    if(this.opcion == "paciente"){
      if(this.correo !="" && this.clave !=""){
        console.log("entre");
        this.authService.register(this.correo, this.clave).then(response => {
          this.authService.getCurrentUser().then((response: any) => {
            this.SuboFoto(response.uid);
            this.db.list('personas').set(response.uid, {tipoUsuario: this.opcion, nombre: this.nombre, apellido: this.apellido, correo:this.correo, clave: this.clave, foto1: this.foto1, foto2: this.foto2, id: response.uid });
            this.VolverInicio();
          });
        }),(error: any) => {
          switch (error.code) 
          {
            case 'auth/weak-password':
              this.MostrarMsj('contraseña demaciado corta.');
              break;
            case 'auth/invalid-email':
              this.MostrarMsj('formato de correo invalido.');
              break;
            case 'auth/wrong-password':
              this.MostrarMsj('Contraseña incorrecta.');
              break;
            case 'auth/email-already-in-use':
              this.MostrarMsj('Correo ya existente.')
              break;
            default:
              this.MostrarMsj("Error:" + error);
              break;
          }
        }
      }
      else
      {
        this.MostrarMsj("Hay campos vacios.");
      }
    }
    else if(this.opcion == "profesional"){
      if(this.correo !="" && this.clave !=""){
        this.authService.register(this.correo, this.clave).then(response => {
          this.authService.getCurrentUser().then((response: any) => {
            this.SuboFoto(response.uid);
            this.db.list('personas').set(response.uid, {tipoUsuario: this.opcion, nombre: this.nombre, apellido: this.apellido, correo:this.correo, clave: this.clave, foto1: this.foto1, foto2: this.foto2, especialidad: this.especialidad, id: response.uid });
            this.VolverInicio();
          });
        }),(error: any) => {
          switch (error.code) 
          {
            case 'auth/weak-password':
              this.MostrarMsj('contraseña demaciado corta.');
              break;
            case 'auth/invalid-email':
              this.MostrarMsj('formato de correo invalido.');
              break;
            case 'auth/wrong-password':
              this.MostrarMsj('Contraseña incorrecta.');
              break;
            case 'auth/email-already-in-use':
              this.MostrarMsj('Correo ya existente.')
              break;
            default:
              this.MostrarMsj("Error:" + error);
              break;
          }
        }
      }
      else
      {
        this.MostrarMsj("Hay campos vacios.");
      }
    }
  }

  TomoFoto(e, numero){
    if(numero == 1){
      this.foto1File = e.target.files[0];
    }
    else
    {
      this.foto2File = e.target.files[0];
    }
  }

  SuboFoto(id:string){
    if(this.foto1File) {
      console.log("SuboFoto 1")
      this.foto1 = `/personas/${id}/1`;
      this.afStorage.upload(this.foto1,this.foto1File);
    } else {
      this.foto1 = `/personas/default.jpg`;
    } 
    if(this.foto2File) {
      console.log("SuboFoto 2")
      this.foto2 = `/personas/${id}/2`;
      this.afStorage.upload(this.foto2,this.foto1File);
    } else {
      this.foto2 = `/personas/default.jpg`;
    }
  }

  //recibe el tipo de usuario a registrar.
  User(opcion: string){
    //guarda el usuario en la variable.
    this.opcion = opcion;

    //esconde botones
    var x = document.getElementById("btnPacientes");
    x.style.display = "none";
    var y = document.getElementById("btnProfesional");
    y.style.display = "none";
    var y = document.getElementById("btnVolver");
    y.style.display = "none";
    var z = document.getElementById("table1");
    z.style.display = "none";
    this.captchaRandom();
  }

  AgregarEspecialidad(){
    this.especialidad.push(this.agregoEspecialidad);
    (<HTMLInputElement>document.getElementById("inputEspecialidad")).value = "";
  }

  Volver(){
    this.opcion = "none";
    var z = document.getElementById("table1");
    z.style.display = "block";
    var x = document.getElementById("btnPacientes");
    x.style.display = "block";
    var y = document.getElementById("btnProfesional");
    y.style.display = "block";
    var y = document.getElementById("btnVolver");
    y.style.display = "block";
    this.router.navigate(['/registro']);
  }

  VolverInicio(){
    this.authService.logOutCurrentUser();
    this.router.navigate(['/']);
  }

  captchaRandom(){
    this.valueCaptcha = Math.floor((Math.random() * 999999) + 1);
  }

  MostrarMsj(text:string){
    setTimeout(() => {
      this.mensaje ="";
    }, 3000);
    this.mensaje = text;
  }
}
