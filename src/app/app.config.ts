import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { UrlSerializer, provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CustomUrlSerializer } from '../UrlSerializer';
import { Serializer } from 'v8';


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition:true,
      }
      )),
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule,
      CookieService,

    ),

  ]


};
