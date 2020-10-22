import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-especialidad-profesional',
  templateUrl: './especialidadProfesional.component.html',
  styleUrls: ['./especialidadProfesional.component.scss']
})
export class EspecialidadProfesionalComponent implements OnInit {

  //lista de profesionales
  profesionales: any[];

  //especialidad a agregar.
  especial;
  
  //lista de especialidades.
  especialidad;

  //correo del profesional a agregar especialidad.
  correo;

  //variable para mostrar y ocultar la tabla de especialidades a agregar.
  tablaEspecialidades;

  constructor(private router: Router) {
    this.profesionales = new Array();
    this.profesionales.push({correo : 'asdad@asdad.com', especialidades : 'doctor, pediatra, ginecologo'});
    this.profesionales.push({correo : 'asdad@asdad.com', especialidades : 'doctor, pediatra, ginecologo'});
    this.profesionales.push({correo : 'asdad@asdad.com', especialidades : 'doctor, pediatra, ginecologo'});
  }

  ngOnInit(): void {
    this.tablaEspecialidades = document.getElementById("agregarEspecialidad");
    this.tablaEspecialidades.style.display = "none";
  }

  Especialidad(profesional){
    this.especialidad = profesional.especialidades;
    this.correo = profesional.correo;
    this.tablaEspecialidades.style.display = "block";
  }

  AgregarEspecialidad(){
    this.especialidad += ", ";
    this.especialidad += this.especial; 
  }

  ConfirmarEspecialidad(){
    //subir a la base de datos.

    //ocultar ventana.
    this.tablaEspecialidades.style.display = "none";
  }

  Volver(){
    this.router.navigate(['/inicio/admin']);
  }
}