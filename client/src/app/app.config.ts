import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitService } from '../core/service/init-service';
import { lastValueFrom } from 'rxjs';
import { TestErrors } from '../features/test-errors/test-errors';
import { errorInterceptor } from '../core/interceptors/error-interceptor';
import { jwtInterceptor } from '../core/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])),
    provideAppInitializer(async() => {
      const initService = inject(InitService);

      return new Promise<void>((resolve) =>{
        setTimeout(async () =>{
            try{
              return lastValueFrom(initService.init());
            }finally{
              const splash = document.getElementById("initial-splash");

              if (splash){
                splash.remove();

                resolve();
              }
            }
        }, 500);
      })

      
    })
  ]
};
