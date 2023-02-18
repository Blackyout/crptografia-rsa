import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { privateKey, publicKey } from './config';
import { JSEncrypt } from 'jsencrypt';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.scss']
})
export class EncryptComponent implements OnInit {


plainText: string = ''; // Texto a cifrar
cypherText: string = ''; // Texto cifrado
descifradoText: string = '' // Texto descifrado

  $encrypt: any; // Instancia de JSEncrypt

  errorText: boolean = false;
  errorDesc: boolean = false;

  constructor() {}

  ngOnInit() {
    this.$encrypt = new JSEncrypt();
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  encrypt() {
    const text = `${this.plainText}`.trim();

    // Las claves de 1024 bits admiten longitudes de texto plano de hasta 127
    if (text.length > 117) {
      this.errorText = true;
    } else {
      this.$encrypt.setPublicKey(publicKey);
      this.cypherText = this.$encrypt.encrypt(text);
    }
  }

  decrypt() {
    this.$encrypt.setPrivateKey(privateKey);
    this.descifradoText = this.$encrypt.decrypt(this.cypherText);
    if (Object.is(this.plainText, null)) {
        this.errorDesc = true;
    }
  }

  limpiar() {
    this.plainText = '';
    this.errorText = false;
  }

}