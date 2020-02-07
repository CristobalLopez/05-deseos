import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

@ViewChild( IonList, {static: true}) lista: IonList;
@Input() terminada = true;



  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(list: Lista){
    
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${list.id}`);
      
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${list.id}`);
      
    }
    

  }

  borrarLista(list: Lista){
    this.deseosService.borrarLista(list);
  }

  async create(list: Lista){
    
    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.titulo,
          placeholder: 'Nombre de la Lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            list.titulo = data.titulo;            
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();            
          }
        }
      ]
    });

    alert.present();
  }

}
