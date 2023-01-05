import { Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorPersonalizado {
  color: string;
  marker: mapboxgl.Marker;
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-86.23054433496286, 12.112725103415261];
  
  marcadores: MarcadorPersonalizado[] = [];


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    // const marker = new mapboxgl.Marker()
    // .setLngLat( this.center )
    // .addTo( this.mapa );
  }

  agregarMarcador() {

    // color aleatorio hexadecimal

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const nuevoMarcador = new mapboxgl.Marker(
      {
        color,
        draggable: true
      }
    )
    .setLngLat( this.mapa.getCenter() )
    .addTo( this.mapa );

    this.marcadores.push(
      {
        color,
        marker: nuevoMarcador,
      }
    );
  }

  irMarcador( marcador: MarcadorPersonalizado ) {
    const { lng, lat } = marcador.marker.getLngLat();
    this.mapa.flyTo({
      center: [lng, lat],
      essential: true,
    });
  }
}
