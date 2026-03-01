import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Luy',
  webDir: 'www',
  server: {
    androidScheme: 'http', // Força o app a aceitar tráfego HTTP
    cleartext: true,       // Adicione esta linha
    allowNavigation: ['*'] // Libera o IP do seu ESP32
  }
};

export default config;