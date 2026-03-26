import { HttpEvent, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../service/busy-service';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  const generateCache = (url: string, params: HttpParams): string => {
    const paramsString = params.keys()
      .map(key => `${key}=${params.get(key)}`)
      .join(`&`);

      return paramsString ? `${url}?${paramsString}` : url;
  }

  const cacheKey = generateCache(req.url, req.params);

  if (req.method === 'GET') {
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  busyService.busy();

  return next(req).pipe(
    delay(500),
    tap(response => {
      cache.set(cacheKey, response)
    }),
    finalize(() => {
      busyService.idle();
    })
  );
};