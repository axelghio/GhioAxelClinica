import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registroLogin/registro/registro.component';
import { LoginComponent } from './registroLogin/login/login.component';
import { InicioComponent } from './registroLogin/inicio/inicio.component';
import { AdministradorComponent } from './principal/administrador/administrador.component';
import { PacienteComponent } from './principal/paciente/paciente.component';
import { ProfesionalComponent } from './principal/profesional/profesional.component';
import { RegistroAdminComponent } from './principal/administrador/registroAdmin/registroAdmin.component';
import { ActivarProfesionalComponent } from './principal/administrador/activarProfesional/activarProfesional.component';
import { EspecialidadProfesionalComponent } from './principal/administrador/especialidadProfesional/especialidadProfesional.component';
import { environment } from './../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    InicioComponent,
    AdministradorComponent,
    PacienteComponent,
    ProfesionalComponent,
    RegistroAdminComponent,
    ActivarProfesionalComponent,
    EspecialidadProfesionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
