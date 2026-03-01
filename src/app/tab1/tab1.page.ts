import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonItem, IonLabel, IonInput, IonButton, IonText 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText
  ]
})
export class Tab1Page {
  // Controle de tela: true = Login, false = Cadastro
  estaNoLogin = true;

  loginData = { email: '', senha: '' };
  cadastroData = { nome: '', email: '', senha: '' };

  constructor() {}

  alternarTela() {
    this.estaNoLogin = !this.estaNoLogin;
  }

  fazerLogin() { console.log('Login:', this.loginData); }
  criarConta() { console.log('Cadastro:', this.cadastroData); }
}