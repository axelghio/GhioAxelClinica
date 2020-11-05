import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { resolve } from 'dns';
import { User } from 'firebase';
import { Usuarios } from '../entidades/usuarios';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  usuario: any;
  turnos: any;

  constructor(public authFire: AngularFireAuth, private db: AngularFireDatabase) { }

  register(email: string, password: string)
  {
    return new Promise<any>((resolve, rejected) => {
      this.authFire.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.EnviarMailDeVerificacion();
        resolve(response);
      }).catch(error => console.log(error))
    });
  }

  async EnviarMailDeVerificacion(){
    return await (await this.authFire.currentUser).sendEmailVerification(); 
  }

  login(email:string, password:string)
  {
    return new Promise((resolve, rejected)=>{
      this.authFire.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user)  
      }).catch(err => rejected(err));
    });
  }

  //devolver usuario de la db
  traerUsuarios(){
    return this.usuario = this.db.list("personas");
  }

  //devolver el usuario logeado actualmente.
  getCurrentUser() {
    return this.authFire.currentUser
  }

  //desconectar usuario.
  logOutCurrentUser() {
    this.authFire.signOut();
  }

  update(key, data){
    this.db.list("personas").update(key, data);
  }

  traerTurnos(){
    return this.turnos = this.db.list("turnos");
  }
}