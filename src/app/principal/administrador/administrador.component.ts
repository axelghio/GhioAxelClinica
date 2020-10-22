import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  RegisterAdmin(){
    this.router.navigate(['/inicio/admin/registro']);
  }

  ActivarProfesional(){
    this.router.navigate(['inicio/admin/activar']);
  }
  
  AgregarEspecialidad(){
    this.router.navigate(['inicio/admin/especialidad']);
  }

  Desconectarse(){
    this.router.navigate(['/login']);
  }
}
