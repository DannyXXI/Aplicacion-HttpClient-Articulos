import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../modelos/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private readonly API_URL = "http://localhost:3000/articles";

  public listaArticulos:any[];

  constructor(private http: HttpClient) {
    this.listaArticulos = [];
  }

  // peticion GET 
  public getArticulos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  // peticion POST
  public postArticulos(articulo:Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.API_URL, articulo);
  }

  // peticion PATCH
  public patchArticulos(id:string, articulo:Articulo): Observable<any> {
    return this.http.patch<any>(this.API_URL+"/"+id, articulo);
  }

  // peticion DELETE
  public deleteArticulos(id:string): Observable<number> {
    return this.http.delete<number>(this.API_URL+"/"+id);
  }

  // obtenemos los datos de la API
  public mostrarArticulos(callback: (html: string) => void): void {
    let tabla = "<table class='table table-striped text-center'><thead class='table-dark'><tr><th>ID</th><th>Titulo</th><th>Descripción</th><th>Contenido</th></tr></thead><tbody>";

    this.getArticulos().subscribe({
      next: (data) => {
        
        this.listaArticulos = data;

        if(this.listaArticulos.length === 0) {
          tabla += "<tr><td class='align-middle' colspan='4'>No hay articulos registrados...</td></tr>";
        }
        else{
          for(let i = 0 ; i < this.listaArticulos.length ; i++){
            tabla += "<tr><td>" + this.listaArticulos[i].id + "</td>";
            tabla += "<td>" + this.listaArticulos[i].title + "</td>";
            tabla += "<td>" + this.listaArticulos[i].description + "</td>";
            tabla += "<td>" + this.listaArticulos[i].body + "</td></tr>";
          }
        }
        tabla += "</tbody></table>";
        
        callback(tabla); // llamamos a la función pasando el HTML generado
      },
      error: (e) => { console.log(e.name+": "+e.message); }
    });
  }
  
}
