import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// service to: communicate to backend, reuse code, communication beteen components

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }
/**
 * 
 * @param empleado 
 * @returns any
 */
  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection(
                                      'empleados',
                                      ref=>ref.orderBy('fechaCreacion','asc')
                                    ).snapshotChanges();
  }

eliminarEmpleado(id : string) : Promise<any> {
  return this.firestore.collection('empleados').doc(id).delete();
}

}
