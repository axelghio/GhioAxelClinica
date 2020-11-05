import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  usuario = '';
  clave= '';
  logeando=true;
  mensaje: string;

  usuarios;

  constructor( private router: Router, private service: FirebaseService) { }

  ngOnInit(): void {
    this.service.traerUsuarios()
    .snapshotChanges()
        .subscribe((item) => {
          this.usuarios = [];
          item.forEach((element) => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.usuarios.push(x);
          });
        });
    document.getElementById("btnPredefinidos1").style.display = "none";
    document.getElementById("btnPredefinidos2").style.display = "none";
    document.getElementById("btnPredefinidos3").style.display = "none";
    document.getElementById("btnPredefinidos4").style.display = "none";
  }

  //pegar a la base de datos y autentificar datos. para saber que tipo de perfil llega. 
  //luego verificar en Authentification si existe ese correo registrado.
  Login() {
    if(this.usuario != '' && this.clave !='')
    {
      this.service.login(this.usuario, this.clave).then((res:any) =>
      {
        if(this.usuario == "admin@admin.com")
        {
          this.router.navigate(['/inicio/admin']);
        }
        else if(this.usuario == "profesional@profesional.com"){
          this.router.navigate(['/inicio/profesional']);
        }
        else if(this.usuario == "paciente@paciente.com"){
          this.router.navigate(['/inicio/paciente']);
        }
        if(res.user.emailVerified)
        {
          this.usuarios.forEach(element => {
            if(this.usuario === element.correo){
              if(element.tipoUsuario === "profesional")
              {
                this.router.navigate(['/inicio/profesional']);
              }
              else if(element.tipoUsuario === "paciente"){
                this.router.navigate(['/inicio/paciente']);
              }
            }
          });
        }
        else{
          this.MostrarMsj("Cuenta no verificada. por favor revisa tu email.");
        }
      },(error: any) => {
          switch (error.code) 
          {
            case 'auth/user-not-found':
              this.MostrarMsj('El usuario no existe');
              break;
            case 'auth/invalid-email':
              this.MostrarMsj('Mail invalido');
              break;
            case 'auth/wrong-password':
              this.MostrarMsj('Contraseña incorrecta');
              break;
            default:
              this.MostrarMsj("Error:" + error);
              break;
          }
        });
      }
    else{
      this.MostrarMsj("Campos vacios.");
    }
  }

  MostrarEsconderBTNS(){
    document.getElementById("btnPredefinidos1").style.display = "block";
    document.getElementById("btnPredefinidos2").style.display = "block";
    document.getElementById("btnPredefinidos3").style.display = "block";
    document.getElementById("btnPredefinidos4").style.display = "block";
  }


  User(user: string){
    switch (user) {
      case "paciente":
        this.usuario = "paciente@paciente.com";
        this.clave = "123456";
        break;
      case "profesional":
        this.usuario = "profesional@profesional.com";
        this.clave = "123456";
        break;
      case "admin":
        this.usuario = "admin@admin.com";
        this.clave = "123456";
        break;
      case "pacienteReal":
        this.usuario = "axelghio@live.com";
        this.clave = "123456";
      default:
        break;
    }
  }
  //Redirecciona a la seccion registro.
  Registrar(){
    this.router.navigate(['/registro']);
  }

  MostrarMsj(text:string){
    setTimeout(() => {
      this.mensaje ="";
    }, 3000);
    this.mensaje = text;
  }

  LimpiarMensaje(){
    this.mensaje = "";
  }
}
