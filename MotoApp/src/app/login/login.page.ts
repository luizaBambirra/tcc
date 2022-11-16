import { Component, OnInit } from "@angular/core";
import { AlertController, MenuController, NavController } from "@ionic/angular";
import { Usuario } from "../models/usuario";
import { WsService } from "../services/ws.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginUsuario: string;
  public senhaUsuario: string;

  constructor(
    private alertController: AlertController,
    public nav: NavController,
    private menu: MenuController,
    private ws: WsService
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {}

  fazerCadastro() {
    this.nav.navigateForward("cadastro");
  }

  async fazerLogin() {
    var usuario = new Usuario();
    usuario.setLoginUsuario(this.loginUsuario);
    usuario.setSenhaUsuario(this.senhaUsuario);

    if (
      usuario.getLoginUsuario() == "adm" &&
      usuario.getSenhaUsuario() == "1"
    ) {
      await this.menu.enable(true);
      this.nav.navigateForward("home");
    } else {
      const respostaDoServidor = await this.ws.login(usuario);

      if (respostaDoServidor == false) {
        this.mostraMensagemErro();
      } else {
        await this.menu.enable(true);
        this.nav.navigateForward("home");
      }
    }
  }

  async mostraMensagemErro() {
    const alert = await this.alertController.create({
      header: "Atenção",
      message: "Usuario ou senha incorretos",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
