
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import {Observable} from 'rxjs';

@Injectable(
  {providedIn:"root"}
)
export class Hawk_test_service{
  public arrCarneTipo = new Array();
    prueba(Carne_tipo: number) {
        switch (Carne_tipo) {

            case 1:
                this.arrCarneTipo = [
                    { 'id': '1', 'nombre': 'Arranchera', 'precio': '6.59'  }
                    , { 'id': '2', 'nombre': 'Bistek Diesmillo', 'precio': '4.49.59' }
                    , { 'id': '3', 'nombre': 'Bistek Bola', 'precio': '3.5,'}
                    , { 'id': '4', 'nombre': 'Costillas Ribs', 'precio': '3.5,'}
                    , { 'id': '5', 'nombre': 'Carne Molida', 'precio': '2.99,'}
                    , { 'id': '6', 'nombre': 'Costilla para caldo', 'precio': '92.99,'}

                ];
                break;

            case 2:
                this.arrCarneTipo = [
                    { 'id': '1', 'nombre': 'Bistek Adobado', 'precio': '6.59'}
                    , { 'id': '2', 'nombre': 'Costilla de puerco', 'precio': '4.49.59'}
                    , { 'id': '3', 'nombre': 'Bistek de Puerco', 'precio': '3.5,', }
                    , { 'id': '4', 'nombre': 'Chuleta Ahumada', 'precio': '3.5,', }
                    , { 'id': '5', 'nombre': 'Chicharon Carnudo', 'precio': '6.99,', }

                ];

                break;
            case 3:
                this.arrCarneTipo = [
                    { 'id': '1', 'nombre': 'pollo_bistek', 'precio': '6.59', }

                ];

                break;
            default:
                break;
        }
        return this.arrCarneTipo;

    }
}
