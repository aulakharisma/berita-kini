import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes)
  ]
};


export function getPrerenderParams() {
  return [
    { category: 'olahraga', slug: 'ngeri-ngeri-sedap-lini-serang-kanan-timnas-indonesia' },
    { category: 'nasional', slug: 'fakta-fakta-kasus-inses-grup-facebook-fantasi-sedarah-dan-suka-duka' },
  ];
}

export const config = mergeApplicationConfig(appConfig, serverConfig);
