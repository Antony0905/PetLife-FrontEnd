import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ComentarioService } from '../services/comentario.service';
import { Comentario } from '../models/comentario';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    private comentarioService: ComentarioService
  ) {
  }

  usuario = new UsuarioDTO();
  comentarios: Comentario[];

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.activatedRoute.queryParams.subscribe((res) => {
      this.usuario.nome = res.nome;
      this.usuario.dataNascimento = moment.unix(res.dataNascimento / 1000).format('DD/MM/YYYY');
      this.usuario.estado = res.estado;
      this.usuario.cidade = res.cidade;
      this.usuario.email = res.email;
      this.usuario.id = res.id;
    });

    this.comentarioService.findByUserId(this.usuario.id).subscribe(res => {
      this.comentarios = res;

      this.comentarios.forEach(element => {
        element.dataCadastro = moment.unix(Number(element.dataCadastro) / 1000).format('DD/MM/YYYY');
      });
      console.log(this.comentarios);
    });

  }

}
