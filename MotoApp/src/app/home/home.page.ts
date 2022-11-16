import { Component, OnInit } from "@angular/core";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment,
  MarkerOptions,
  /*CameraPosition,
  MarkerOptions,*/
} from "@ionic-native/google-maps/ngx";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  map: GoogleMap;
  latitude: number;
  longitude: number;
  destino: string = "";

  constructor(private geolocation: Geolocation, private platform: Platform) {}

  ngOnInit() {
    this.carregarMapa();
  }

  carregarMapa() {
    this.pegaPosicaoAtual();
  }

  async pegaPosicaoAtual() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.mostrarMapa();
      })
      .catch((error) => {
        alert("Erro ao obter coordenadas " + error);
      });
  }

  async mostrarMapa() {
    await this.platform.ready();

    try {
      Environment.setEnv({
        API_KEY_FOR_BROWSER_RELEASE: "AIzaSyD8Q2Xorq5ftu9pBJJy0ftXAEB9KsRpBt8",
        API_KEY_FOR_BROWSER_DEBUG: "AIzaSyD8Q2Xorq5ftu9pBJJy0ftXAEB9KsRpBt8",
      });

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.latitude,
            lng: this.longitude,
          },
          zoom: 18,
          tilt: 30,
        },
      };

      this.map = GoogleMaps.create("map_canvas", mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        title: "Meu Local",
        icon: "red",
        animation: "DROP",
        position: {
          lat: this.latitude,
          lng: this.longitude,
        },
      });

      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert("clicou no marcador");
      });
    } catch (error) {
      console.log("Erro ao mostrar mapa", error);
    }
  }

  chamar() {
    alert("agora deve encontrar piloto mais próximo =)");
  }
}
