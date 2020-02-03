import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {


  listas: Lista[] = [];

  
  constructor() {

    const LISTA1= new Lista("Recolectar piedras del Infinito");
    const LISTA2= new Lista("Heroes a desaparecer");
    this.listas.push(LISTA1, LISTA2);

    console.log(this.listas);
   }


}
