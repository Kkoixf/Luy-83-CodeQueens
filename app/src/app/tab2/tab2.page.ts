import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, 
  IonText, IonSpinner, IonList, IonCardHeader, IonCardTitle 
} from '@ionic/angular/standalone';
import { BleClient } from '@capacitor-community/bluetooth-le'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Preferences } from '@capacitor/preferences'; 
import { 
  settingsOutline, bluetoothOutline, wifiOutline, 
  lockClosedOutline, globeOutline, saveOutline, 
  handRightOutline, thumbsUpOutline 
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonItem, IonLabel, IonInput, IonButton, IonIcon, 
    IonText, IonSpinner, IonList, IonCardHeader, IonCardTitle,
    CommonModule, FormsModule
  ],   
})
export class Tab2Page implements OnInit {

  ipEsp32 = "maorobotica.local"; 
  wifiSSID = ""; 
  wifiPASS = ""; 
  isConfiguring = false;
  statusConfig = "";

  listaGestos = [
    { nome: 'Abrir Mão', tipo: 'abrir', icone: 'hand-right-outline' },
    { nome: 'Fechar Mão', tipo: 'fechar', icone: 'hand-right-outline' },
    { nome: 'Joinha', tipo: 'joinha', icone: 'thumbs-up-outline' },
    { nome: 'Vezinho', tipo: 'vezinho', icone: 'hand-right-outline' }
  ];

  constructor(
    private androidPermissions: AndroidPermissions
  ) {
    addIcons({
      wifiOutline,
      lockClosedOutline,
      bluetoothOutline,
      globeOutline,
      saveOutline,
      settingsOutline,
      handRightOutline,
      thumbsUpOutline
    });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'ip_esp32' });
    if (value) this.ipEsp32 = value;

    try {
      await BleClient.initialize();
    } catch (e) {
      console.error("Erro ao iniciar Bluetooth", e);
    }
  }

  async pedirPermissoesBLE() {
    await this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.BLUETOOTH_SCAN,
      this.androidPermissions.PERMISSION.BLUETOOTH_CONNECT,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
    ]);
  }
async configurarNovaMao() {
    let deviceId = ""; 

    try {
      this.isConfiguring = true;
      this.statusConfig = "Iniciando Bluetooth...";
      
      await BleClient.initialize();
      await this.pedirPermissoesBLE();

      this.statusConfig = "Buscando MaoRobotica...";

      
      const device = await BleClient.requestDevice({
       
        optionalServices: ["6E400001-B5A3-F393-E0A9-E50E24DCCA9E"]
      });

      deviceId = device.deviceId;
      this.statusConfig = "Conectando...";

      
      await BleClient.connect(deviceId);
      
    
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.statusConfig = "Enviando dados...";

      const payload = `SSID:${this.wifiSSID};PASS:${this.wifiPASS}`;
      const data = new TextEncoder().encode(payload);

      
      await BleClient.write(
        deviceId,
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E", // Service
        "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", // RX Characteristic
        new DataView(data.buffer)
      );

      alert("Dados enviados! Observe o Monitor Serial do Arduino.");

    } catch (error) {
      console.error("ERRO DETALHADO:", error);
      alert("Falha na conexão. Tente desparear o dispositivo nas configurações do Android.");
    } finally {
      this.isConfiguring = false;
      if (deviceId) {
        await BleClient.disconnect(deviceId);
      }
    }
  }
async enviarComando(tipoGesto: string) {
    
    let host = this.ipEsp32.trim().replace('http://', '').replace('/', '');
    
    
    const url = `http://${host}/executar?tipo=${tipoGesto}`;

    console.log("Enviando comando para:", url);

    try {
      await fetch(url, { 
        method: 'GET', 
        mode: 'no-cors', 
        credentials: 'omit',
        cache: 'no-cache'
      });

      
      console.log("Sinal enviado!");
      
    } catch (error) {
      console.error("Erro capturado:", error);
      
      alert("Erro ao tocar na mão. Verifique se você está no Wi-Fi 'Yurinha2g'.");
    }
  }

  async salvarIP() {
    try {
      await Preferences.set({
        key: 'ip_esp32',
        value: this.ipEsp32
      });
      alert('Endereço IP salvo com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar IP:", error);
      alert("Erro ao salvar o endereço.");
    }
  }

} 