import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Usuario } from "../models/usuario";
import { WsService } from "../services/ws.service";
@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.page.html",
  styleUrls: ["./cadastro.page.scss"],
})
export class CadastroPage implements OnInit {
  public loginUsuario: string;
  public senhaUsuario: string;
  public confirmaSenhaUsuario: string;

  constructor(
    public nav: NavController,
    private alertController: AlertController,
    private ws: WsService
  ) {}

  ngOnInit() {}

  async fazerCadastro() {
    var usuario = new Usuario();
    usuario.setLoginUsuario(this.loginUsuario);
    usuario.setSenhaUsuario(this.senhaUsuario);

    if (this.senhaUsuario != this.confirmaSenhaUsuario) {
      this.mostraMensagemErro("As senhas devem ser idênticas");
    } else {
      const respostaDoServidor = await this.ws.cadastro(usuario);

      if (respostaDoServidor == false) {
        this.mostraMensagemErro("Erro ao cadastrar o usuário");
      } else {
        this.nav.navigateForward("login");
      }
    }
  }

  async mostraMensagemErro(mensagem: string) {
    const alert = await this.alertController.create({
      header: "Atenção",
      message: mensagem,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
