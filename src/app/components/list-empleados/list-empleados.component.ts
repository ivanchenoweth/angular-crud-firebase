import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  eliminarEmpleado(id : string) {
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      this.toastr.error('Empleado eliminado con exito!', 
                          'Empleado Eliminado!',
                          {positionClass: 'toast-bottom-right'}
                          );
    }).catch(error=> {
      console.log(error);
    })
  } 

}
