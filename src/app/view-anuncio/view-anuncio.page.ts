import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/models/anuncio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-anuncio',
  templateUrl: './view-anuncio.page.html',
  styleUrls: ['./view-anuncio.page.scss'],
})
export class ViewAnuncioPage implements OnInit {


  anuncio = new Anuncio();

  constructor(public activatedRoute: ActivatedRoute) {

  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.anuncio.id = res.id;
      this.anuncio.descricao = res.descricao;
      this.anuncio.titulo = res.titulo;

      console.log(this.anuncio);
    });
  }

  ngOnInit() {

  }

}
