import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-activar-profesional',
  templateUrl: './activarProfesional.component.html',
  styleUrls: ['./activarProfesional.component.scss']
})
export class ActivarProfesionalComponent implements OnInit {
  profesionales: any[];
  constructor(private router: Router) {
    this.profesionales = new Array();
    this.profesionales.push({correo : 'asdad@asdad.com', especialidades : 'doctor, pediatra, ginecologo', activo: true});
    this.profesionales.push({correo : 'asdad@asdad.com', especialidades : 'doctor, pediatra, ginecologo', activo: false});
    this.profesionales.push({correo : 'asdad@asdad.com', especialidades : 'doctor, pediatra, ginecologo', activo: true});
  }

  ngOnInit(): void {
    //Cuando traemos los datos de la base de datos, ver si su estado es true or false.
    //Realizar cambios poner checks y buttons para saber.
    //if(profesional.activo == true)
    //{
    //  document.getElementById("id").style.display = "none";
    //}
  }

  //Encargado de realizar dichos cambios ya se habilitar checks o buttons.
  Habilitar(profesional){

  }

  Volver(){
    this.router.navigate(['/inicio/admin']);
  }
}
