import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-minha-nova-tab',
  templateUrl: './minha-nova-tab.page.html',
  styleUrls: ['./minha-nova-tab.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MinhaNovaTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
