import { Component, OnInit } from '@angular/core';

//firebase
import { FirebaseService } from "../../servicios/firebase.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { HtmlAstPath } from '@angular/compiler';

//router
import { Router } from '@angular/router'

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {
  opcion;

  currentUser;
  userAux;
  usuarios;

  //checkbox
  checks:string[];

  //horario
  horarioEyS:string[];
  turnosEnlinea;

  //intTurno
  intervaloTurno: string;

  //turnos aceptados
  turnosAceptados;
  atendiendo = false;
  turnoActual;

  //datos de encuesta a guardar en el turno
  peso;
  estatura;
  presion;
  edad;
  tempCorporal;
  datoExtra;
  comentarioProf;

  constructor(private auth: FirebaseService, private db: AngularFireDatabase, private afStorage: AngularFireStorage, private router: Router) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().then(user =>{
      this.currentUser = user.email;
    })
    this.auth.traerUsuarios()
    .snapshotChanges()
        .subscribe((item) => {
          this.usuarios = [];
          item.forEach((element) => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.usuarios.push(x);
          });
        });
    document.getElementById("mostrarHorarios").style.display = "none";

    //Traigo y mantengo actualizado los turnos
    this.auth.traerTurnos()
    .snapshotChanges()
        .subscribe((item) =>{
          this.turnosEnlinea = [];
          this.turnosAceptados = [];
          item.forEach((element)=>{
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.turnosEnlinea.push(x);
            this.turnosAceptados = this.turnosEnlinea.filter(turno => turno.estadoTurno === "aceptado");
          })
        })
  }

  //Se encarga de guardar el dia y horario laboral del profesional.
  Guardar(){
    this.checks = new Array();
    this.horarioEyS = new Array();
    this.usuarios.forEach(element => {
      if(element.correo === this.currentUser || "profesional@profesiona.com" === this.currentUser)
      {
        this.userAux = element;
      }
    });
    this.usuarios.forEach(element => {
      if(element.correo === this.currentUser || "profesional@profesional.com" === this.currentUser)
      {
        //capturo los checks.
        let checked = document.querySelectorAll('input[type=checkbox]:checked');
        checked.forEach(item => {
          this.checks.push((<HTMLInputElement>item).value);
        });

        //capturo de que horario a que horario.
        this.horarioEyS.push((<HTMLInputElement>document.getElementById('horaEntrada')).value);
        this.horarioEyS.push((<HTMLInputElement>document.getElementById('horaSalida')).value);

        //Intervalos de turnos
        this.intervaloTurno = (<HTMLInputElement>document.getElementById('intervaloTurno')).value;

        //realizar update de horarios laborales del profesional.
        this.auth.update(this.userAux.id, {
          diaLaboral: this.checks, horarioLaboral: this.horarioEyS, intervaloTurnos: this.intervaloTurno
        });

        //Ocultar Horarios.
        document.getElementById("mostrarHorarios").style.display = "none";
        document.getElementById("mostrarBotones").style.display = "block";
      }
    });
  }

  //Armado de horarios de atencion del profesional.
  Horarios(){
    //desactivo botones
    document.getElementById("mostrarBotones").style.display = "none";
    document.getElementById("mostrarHorarios").style.display = "block";
  }

  //Listado de turnos para el profesional.
  Turnos(){
    //desactivo botones
    document.getElementById("mostrarBotones").style.display = "none";
    this.opcion = "listaTurnos";
  }

  AceptarTurno(id){
    this.turnosEnlinea.forEach(element => {
      if(element.idTurno == id){
        this.db.list("turnos").update(id, {estadoTurno: "aceptado", mensaje: "Estimado: "+element.apellidoCliente+" el turno del dia: "+element.dia+" a las: "+element.hora+" am, fue aceptado."});
      }
    })
  }

  CancelarTurno(id){
    this.turnosEnlinea.forEach(element => {
    if(element.idTurno == id){
        this.db.list("turnos").update(id, {estadoTurno: "cancelado", mensaje: "Estimado: "+element.apellidoCliente+" el turno del dia: "+element.dia+" a las: "+element.hora+" am, fue cancelado."});
      }
    })
  }

  //Listado de turnos a atender del profesional.
  AtenderTurno(){
    //desactivo botones
    document.getElementById("mostrarBotones").style.display = "none";
    this.opcion = "atenderTurno";
  }

  Atendiendo(turno){
    this.atendiendo = true;
    this.turnoActual = turno;
  }

  AgregarDatoOpcional(){
    let nomOP = (<HTMLInputElement>document.getElementById("nombreDOP")).value;
    let datoOP = (<HTMLInputElement>document.getElementById("datoOP")).value;

    (<HTMLInputElement>document.getElementById("mostrarDato")).value = (<HTMLInputElement>document.getElementById("mostrarDato")).value + nomOP+": "+datoOP+",";
    this.datoExtra = (<HTMLInputElement>document.getElementById("mostrarDato")).value;
  }

  GuardarEncuesta(){
    this.peso = (<HTMLInputElement>document.getElementById("peso")).value;
    this.estatura = (<HTMLInputElement>document.getElementById("estatura")).value;
    this.presion = (<HTMLInputElement>document.getElementById("presion")).value;
    this.edad = (<HTMLInputElement>document.getElementById("edad")).value;
    this.tempCorporal = (<HTMLInputElement>document.getElementById("temperaturaCorporal")).value;

    this.comentarioProf = (<HTMLInputElement>document.getElementById("texto")).value;

    if(this.datoExtra === undefined){
      console.log(this.datoExtra);
      this.datoExtra = "none";
    }
    console.log(this.datoExtra);

    this.db.list("turnos").update(this.turnoActual.idTurno,{
                                                          estadoTurno: "atendido",
                                                          peso: this.peso,
                                                          estatura: this.estatura,
                                                          presion: this.presion,
                                                          edad: this.edad,
                                                          tempCorporal: this.tempCorporal,
                                                          datoExtra: this.datoExtra,
                                                          comentarioProf: this.comentarioProf
                                                        })
    this.turnoActual = null;
    this.CerrarEncuesta();
  }

  CerrarEncuesta(){
    this.atendiendo=false;
  }

  Volver(){
    document.getElementById("mostrarBotones").style.display = "block";
    document.getElementById("mostrarHorarios").style.display = "none";
    this.opcion = "";
  }

  Desconectar(){
    this.auth.logOutCurrentUser();
    this.router.navigate(['/login']);
  }
}
