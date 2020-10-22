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

const firebaseConfig = {
  apiKey: "AIzaSyAHgrc4chgFS8vK9cDy0DCdbVzLi_3pOok",
  authDomain: "clinica-online-87dea.firebaseapp.com",
  databaseURL: "https://clinica-online-87dea.firebaseio.com",
  projectId: "clinica-online-87dea",
  storageBucket: "clinica-online-87dea.appspot.com",
  messagingSenderId: "735073213019",
  appId: "1:735073213019:web:19b3253d9575c093087d7e"
};

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
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
