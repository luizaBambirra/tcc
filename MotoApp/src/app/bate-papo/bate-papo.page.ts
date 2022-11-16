import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
@Component({
  selector: "app-bate-papo",
  templateUrl: "./bate-papo.page.html",
  styleUrls: ["./bate-papo.page.scss"],
})
export class BatePapoPage implements OnInit {
  texto: string = "";
  mensagens: Array<{ titulo: string; texto: string }> = [];

  constructor(public nav: NavController) {}

  ngOnInit() {}

  enviarMensagem() {
    if (this.texto !== "") {
      this.mensagens.push({ titulo: "Eu", texto: this.texto });
      this.texto = "";
    }
  }
}
