import { Component, ViewChild, ElementRef } from '@angular/core';
import { ArticulosService } from './servicios/articulos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Articulo } from './modelos/Articulo';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild("div") elementoRef!: ElementRef;  // capturar la referencia del div
  @ViewChild("boton") botonRef!: ElementRef;  // capturar la referencia del boton

  public botonMostrar:boolean; // varaible para mostrar u ocultar la tabla de articulos

  // variable de los campos y formularios de añadir, editar y eliminar
  public formAdd:FormGroup;
  public titleAdd:FormControl;
  public descriptionAdd:FormControl;
  public bodyAdd:FormControl;
  public formUpdate:FormGroup;
  public idUpdate:FormControl;
  public titleUpdate:FormControl;
  public descriptionUpdate:FormControl;
  public bodyUpdate:FormControl;
  public formDelete:FormGroup;
  public idDelete:FormControl;

  public interfazArticulo:Articulo; // variable para manejar la interfaz

  // metodo constructor
  constructor(public servicioArticulo: ArticulosService){
    this.botonMostrar = false;

    this.titleAdd = new FormControl ("");
    this.descriptionAdd = new FormControl ("");
    this.bodyAdd = new FormControl ("");
    this.formAdd = new FormGroup({ title:this.titleAdd , description:this.descriptionAdd , body:this.bodyAdd });

    this.idUpdate = new FormControl ("");
    this.titleUpdate = new FormControl ("");
    this.descriptionUpdate = new FormControl ("");
    this.bodyUpdate = new FormControl ("");
    this.formUpdate = new FormGroup({ id:this.idUpdate , title:this.titleUpdate , description:this.descriptionUpdate , body:this.bodyUpdate });

    this.idDelete = new FormControl ("");
    this.formDelete = new FormGroup({ id:this.idDelete });

    this.interfazArticulo = {title: "", description: "", body: ""};
  }

  // metodo para mostrar los articulos al pulsar el boton
  public mostrarArticulos():void {
    this.botonMostrar = !this.botonMostrar;
    if ( this.botonRef.nativeElement.innerHTML.includes("MOSTRAR ARTICULOS") ){

      this.botonRef.nativeElement.innerHTML = "OCULTAR ARTICULOS&nbsp;&nbsp;<i class='bi bi-table'></i>";

      // llamamos al servicio pasándole una función que se ejecutará cuando termine la petición
      this.servicioArticulo.mostrarArticulos((html) => { this.elementoRef.nativeElement.innerHTML = html; });
    }
    else{
      this.botonRef.nativeElement.innerHTML = "MOSTRAR ARTICULOS&nbsp;&nbsp;<i class='bi bi-table'></i>";
      this.elementoRef.nativeElement.innerHTML = "";
    }
  }

  // metodo al enviar los datos para crear un articulo
  public enviarFormularioAdd(event: Event):void {
    if (this.titleAdd.value.trim()==="" || this.descriptionAdd.value.trim()==="" || this.bodyAdd.value.trim()==="") {
      alert("Rellene todos los campos para añadir el articulo.");
      event.preventDefault();
    }
    else {
      this.interfazArticulo = {title: this.titleAdd.value.trim(), description: this.descriptionAdd.value.trim(), body: this.bodyAdd.value.trim()};

      this.servicioArticulo.postArticulos(this.interfazArticulo).subscribe({
        next: (data) => {
          alert ("Articulo registrado:\n\nTitulo:"+data.title+"\nDescripcion:"+data.description);

          this.formAdd.setValue({ title:"" , description:"" , body:""});

          if (this.botonMostrar) { this.mostrarArticulos(); this.mostrarArticulos(); }
        },
        error: (e) => { console.log(e.name+": "+e.message); }
      });
    }
  }

  // metodo al enviar los datos para modificar un articulo
  public enviarFormularioUpdate(event: Event):void {
    if (this.idUpdate.value.trim()==="" || this.titleUpdate.value.trim()==="" || this.descriptionUpdate.value.trim()==="" || this.bodyUpdate.value.trim()==="") {
      alert("Rellene todos los campos para modificar el articulo.");
      event.preventDefault();
    }
    else {
      this.interfazArticulo = {title: this.titleUpdate.value.trim(), description: this.descriptionUpdate.value.trim(), body: this.bodyUpdate.value.trim()};

      this.servicioArticulo.patchArticulos(this.idUpdate.value, this.interfazArticulo).subscribe({
        next: (data) => {
          alert ("Articulo modificado correctamente.");

          this.formUpdate.setValue({ id:"" , title:"" , description:"" , body:"" });

          if (this.botonMostrar) { this.mostrarArticulos(); this.mostrarArticulos(); }
        },
        error: (e) => { console.log(e.name+": "+e.message); }
      });
    }
  }

  // metodo al enviar los datos para eliminar un articulo
  public enviarFormularioDelete(event: Event):void {
    if (this.idDelete.value.trim()==="") {
      alert("Rellene el campo para eliminar el articulo.");
      event.preventDefault();
    }
    else {
      this.servicioArticulo.deleteArticulos(this.idDelete.value).subscribe({
        next: (data) => {
          if (data === 0){
            alert ("Articulo eliminado correctamente.");
          
            this.formDelete.setValue({ id:"" });

            if (this.botonMostrar) { this.mostrarArticulos(); this.mostrarArticulos(); }
          }
          else{ alert("No existe ese ID."); }
        },
        error: (e) => {console.log(e.name+": "+e.message)}
      });
    }
  }
}
