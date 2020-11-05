import { Component, OnInit } from '@angular/core';

//import database
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { element } from 'protractor';

//import service
import { FirebaseService } from "../../servicios/firebase.service";

//import router
import { Router } from "@angular/router";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  //Var para mostrar del profesional
  apellido;
  nombre;
  especialidadAux;
  especialidad;
  diasAux;
  dias;
  horariosAux;
  horarios;
  horarios2;
  idKey;

  //variables turnos:
  idTurno;
  especialidadElejida;
  horarioElejido;
  diaElejido;
  estadoTurno = "pendiente";

  //variables del paciente
  idPaciente;
  apellidoPaciente;
  nombrePaciente;

  //var Mensajes
  MensajePaciente;

  //Variables
  pedirTurno: boolean = false;
  opcion = "";
  opcionFilter = "";
  usuario;
  usuariosFilter;
  usuariosFilterMod;
  currentUser;
  turnosEnlinea;
  resenia;
  opcionResena;
  constructor(private auth: FirebaseService, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit(): void {
    
    //Traigo user actual
    this.auth.getCurrentUser().then(user =>{
      this.currentUser = user.email;
    })
    
    //Traigo y mantengo actualizado los Usuarios
    this.auth.traerUsuarios()
    .snapshotChanges()
        .subscribe((item) => {
          this.usuario = [];
          this.usuariosFilter = [];
          this.usuariosFilterMod = [];
          item.forEach((element) => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.usuario.push(x);
            this.usuariosFilter = this.usuario.filter(user => user.tipoUsuario === "profesional");
          });
        });

    //Traigo y mantengo actualizado los turnos
    this.auth.traerTurnos()
    .snapshotChanges()
        .subscribe((item) =>{
          this.turnosEnlinea = [];
          item.forEach((element)=>{
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.MensajePaciente = x["mensaje"];
            this.turnosEnlinea.push(x);
          });
        });
  }

  Opciones(value:string){
    this.pedirTurno = false;
    this.opcion = value;
    if(value == "turno"){
      document.getElementById("buttonsTop").style.display = "none";
      document.getElementById("btnDesconectar").style.display = "none";
    }
  }

  OpcionesFilter(value:string){
    this.pedirTurno = false;
    this.opcionFilter = value;   
  }

  ObtenerIdPaciente(){
    this.usuario.forEach(element => {
      if(element.correo === this.currentUser)
      {
          this.idPaciente = element.id;
          //otros datos por las dudas.
          this.apellidoPaciente = element.apellido;
          this.nombrePaciente = element.nombre;
      }
    });
  }
  
  //Quitar valores nulos a la lista de especialidad
  Especialidad(){
    this.especialidad = [];
    if(this.especialidadAux[0] != null)
    {
      this.especialidad.push(this.especialidadAux[0]);
    }
    if(this.especialidadAux[1] != null)
    {
      this.especialidad.push(this.especialidadAux[1]);
    }
    if(this.especialidadAux[2] != null)
    {
      this.especialidad.push(this.especialidadAux[2]);
    }
    if(this.especialidadAux[3] != null)
    {
      this.especialidad.push(this.especialidadAux[3]);
    }
    if(this.especialidadAux[4] != null)
    {
      this.especialidad.push(this.especialidadAux[4]);
    }
  }

  //Quitar valores nulos a la lista de dias
  Dia(){
    this.dias = [];
    if(this.diasAux[0] != null){
      this.dias.push(this.diasAux[0]);
    }
    if(this.diasAux[1] != null){
      this.dias.push(this.diasAux[1]);
    }
    if(this.diasAux[2] != null){
      this.dias.push(this.diasAux[2]);
    }
    if(this.diasAux[3] != null){
      this.dias.push(this.diasAux[3]);
    }
    if(this.diasAux[4] != null){
      this.dias.push(this.diasAux[4]);
    }
    if(this.diasAux[5] != null){
      this.dias.push(this.diasAux[5]);
    }
  }

  //Quitar valores nulos a la lista de horarios
  Horario(){
    this.horarios2 = [];
    if(this.horariosAux[0] != null){
      this.horarios2.push(this.horariosAux[0]);
    }
    if(this.horariosAux[1] != null){
      this.horarios2.push(this.horariosAux[1]);
    }
  }

  SacarTurno(persona){
    this.apellido = persona.apellido;
    this.nombre = persona.nombre;
    this.especialidadAux = persona.especialidad;
    this.Especialidad();
    this.diasAux = persona.diaLaboral;
    this.Dia();
    this.horarios = persona.horarioLaboral;
    this.horariosAux = persona.horarioLaboral;
    this.Horario();
    this.idKey = persona.id;

    this.pedirTurno = true;
  }

  Turno(){
    this.ObtenerIdPaciente();
    this.especialidadElejida = document.getElementById("especialidad");
    this.diaElejido = document.getElementById("dia");
    this.horarioElejido = document.getElementById("hora");
    this.idTurno = Math.random().toString(26).substr(2, 9);
    this.db.list('turnos').set(this.idTurno, {
                                                idTurno: this.idTurno,
                                                id: this.idPaciente,
                                                apellidoProf: this.apellido,
                                                nombreProf: this.nombre,
                                                apellidoCliente: this.apellidoPaciente,
                                                nombreCliente: this.nombrePaciente,
                                                especialidadElejida: this.especialidadElejida.value,
                                                dia: this.diaElejido.value,
                                                hora: this.horarioElejido.value,
                                                estadoTurno: this.estadoTurno
                                              });
    this.Volver();
  }

  CancelarTurnos(id){
    this.db.list("turnos").remove(id);
    this.opcion = "";
    this.Volver();
  }

  Resenia(){
    this.ObtenerIdPaciente();
    this.resenia = this.turnosEnlinea.forEach(element => {
      if(this.idPaciente === element.id){
        this.resenia = element.comentarioProf;
      }
    });
  }

  Comentar(){

  }

  ObternerIdTurno(){
    this.ObtenerIdPaciente();
    this.turnosEnlinea.forEach(element => {
      if(element.id === this.idPaciente)
      {
        this.idTurno = element.idTurno;
      }
    });
  }

  BorrarMensaje(){
    this.ObternerIdTurno();
    this.db.list("turnos").update(this.idTurno, {mensaje: ""});
    this.MensajePaciente = "";
  }

  Volver(){
    this.pedirTurno = false;
    document.getElementById("buttonsTop").style.display = "block";
    document.getElementById("btnDesconectar").style.display = "block";
    document.getElementById("filter").style.display = "none";
    document.getElementById("btnVolver").style.display = "none";
    
  }
  Desconectar(){
    this.auth.logOutCurrentUser();
    this.router.navigate(['/login']);
  }
}
