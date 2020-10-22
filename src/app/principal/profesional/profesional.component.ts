import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    document.getElementById("mostrarHorarios").style.display = "none";
    document.getElementById("mostrarTurnos").style.display = "none";
    document.getElementById("mostrarAtencion").style.display = "none";
    document.getElementById("btnVolver").style.display = "none";
  }

  //Se encarga de guardar el dia y horario laboral del profesional.
  Guardar(){

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
    document.getElementById("mostrarTurnos").style.display = "block";
  }

  //Listado de turnos a atender del profesional.
  Atender(){

    //desactivo botones
    document.getElementById("mostrarBotones").style.display = "none";
    document.getElementById("mostrarAtencion").style.display = "block";
  }

  Volver(){
    document.getElementById("mostrarBotones").style.display = "block";
    document.getElementById("btnVolver").style.display = "none";
    document.getElementById("mostrarHorarios").style.display = "none";
    document.getElementById("mostrarTurnos").style.display = "none";
    document.getElementById("mostrarAtencion").style.display = "none";
  }
}
