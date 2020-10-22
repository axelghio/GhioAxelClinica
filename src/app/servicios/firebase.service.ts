import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuario: AngularFireList<any>;

  constructor(private authFire: AngularFireAuth, private db: AngularFireDatabase) { }

  //Funcion para registrar un usuario
  register(email: string, password: string)
  {
    return new Promise<any>((resolve, rejected) => {
      this.authFire.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.EnviarMailDeVerificacion();
        resolve(response);
        //verificar que tipo de usuario es y guardar los datos en firedatabase.
      }).catch(error => console.log(error))
    });
  }

  async EnviarMailDeVerificacion(){
    return await (await this.authFire.currentUser).sendEmailVerification(); 
  }

  //Crear funcion para enviar la verificacion por email.

  //Crear funcion para preguntar si esta verificcada la cuenta.

  //crear el login con redireccion y verificacion de cuenta.
  login(email:string, password:string)
  {
    return new Promise((resolve, rejected)=>{
      this.authFire.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user)  
      }).catch(err => rejected(err));
    });
  }

  //devolver usuario de la db
  traerUsuario(){
    return this.usuario = this.db.list("personas");
  }

  //devolver el usuario logeado actualmente.
  getCurrentUser() {
    return this.authFire.currentUser;
  }

  //desconectar usuario.
  logOutCurrentUser() {
    this.authFire.signOut();
  }
}