import { Injectable } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "@ionic/angular";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../models/usuario";

@Injectable({
  providedIn: "root",
})
export class WsService {
  urlBase: string = "http://localhost/MotoApp/ws/rest/api/";
  load: any;
  actionLoad: string;
  viagem: any = {};
  viagensByData: any = [];
  token: any;
  headers: HttpHeaders;

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController //public storage: Storage
  ) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
  }

  async login(usuario: Usuario) {
    return await this.http
      .post(this.urlBase + "usuario/login", usuario, {
        headers: this.headers,
      })
      .toPromise();
  }

  async cadastro(usuario: Usuario) {
    return await this.http
      .post(this.urlBase + "usuario/cadastro", usuario, {
        headers: this.headers,
      })
      .toPromise();
  }

  /*async setUsuario(usuario: Usuario) {
    return await this.http
      .post(this.urlBase + "usuario/set", usuario, {
        headers: this.headers,
      })
      .toPromise();
  }

  getDirUploads() {
    //return this.urlBase.replace("api", "uploads");
    return this.urlBase.split("rest")[0] + "uploads/";
  }

  async getCidade() {
    return await this.http.get(this.urlBase + "cidade").toPromise();
  }

  async getCidadeUsadas() {
    return await this.http.get(this.urlBase + "cidade/usadas").toPromise();
  }

  async getAreaAtuacao() {
    return await this.http.get(this.urlBase + "areaAtuacao").toPromise();
  }

  async setAreaAtuacao(areaAtuacao: AreaAtuacao) {
    return await this.http
      .post(this.urlBase + "areaAtuacao/set", areaAtuacao, {
        headers: this.headers,
      })
      .toPromise();
  }

  async getEspecialidade() {
    return await this.http.get(this.urlBase + "especialidade").toPromise();
  }

  async setEspecialidade(especialidade: Especialidade) {
    return await this.http
      .post(this.urlBase + "especialidade/set", especialidade, {
        headers: this.headers,
      })
      .toPromise();
  }

  async getClinicaAll() {
    return await this.http.get(this.urlBase + "clinica/get").toPromise();
  } 

  async setClinica(clinica: Clinica) {
    return await this.http
      .post(this.urlBase + "clinica/set", clinica, {
        headers: this.headers,
      })
      .toPromise();
  }*/

  /**
   *
   * @param idArtigo Id para quando ser quer apenas um artigo
   * @returns
   */
  /*async getArtigo(idArtigo?: number) {
    if (idArtigo && idArtigo > 0) {
      return await this.http
        .get(this.urlBase + "artigo/get/" + idArtigo)
        .toPromise();
    } else {
      return await this.http.get(this.urlBase + "artigo/get").toPromise();
    }
  }

  async getArtigoAll() {
    return await this.http.get(this.urlBase + "artigo/getAll").toPromise();
  }

  async setArtigo(artigo: Artigo) {
    return await this.http
      .post(this.urlBase + "artigo/set", artigo, {
        headers: this.headers,
      })
      .toPromise();
  }*/

  //----------------------------------------------------------------------------------------

  /**
   *
   * @param action 'open' ou 'close'
   */
  async loading(action: "open" | "close") {
    this.actionLoad = action;
    if (this.actionLoad === "open") {
      this.load = this.loadingCtrl
        .create({
          message:
            '<ion-row class="ion-align-items-center"><ion-col size="4"><div id="dv-img"><ion-img src="/assets/imgs/monitorCardiaco.gif"></ion-img></div></ion-col><ion-col size="8">Carregando...</ion-col></ion-row>',
          spinner: null,
          cssClass: "class-loading",
        })
        .then((loading) => {
          if (this.actionLoad === "open") {
            // Verificação refeita aqui -> as vezes, enquanto está criando já mandei fechar
            this.load = loading;
            this.load.present();
          }
        });
    } else if (this.actionLoad === "close") {
      if (await this.load) {
        await this.load.dismiss();
        this.load = null;
      }
    }
  }

  async doAlert(titulo: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async toast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "bottom",
      mode: "ios",
      color: "success",
    });
    await toast.present();
  }
}
