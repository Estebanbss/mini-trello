
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { CustomUrlSerializer } from '../UrlSerializer';
import { UrlSerializer } from '@angular/router';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),


  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
