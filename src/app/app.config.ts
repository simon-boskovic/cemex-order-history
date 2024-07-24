import { OverlayModule } from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import {
  APP_ID,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppEffects, appReducer } from '@app-state';
import { EffectsModule } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ app: appReducer }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: APP_ID,
      useValue: 'cemex-order-history',
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
    importProvidersFrom(
      MatNativeDateModule,
      OverlayModule,
      BrowserModule,
      StoreDevtoolsModule.instrument({
        maxAge: 25,
      }),
      EffectsModule.forRoot(AppEffects)
    ),
    provideHttpClient(),
    provideAnimations(),
  ],
};
