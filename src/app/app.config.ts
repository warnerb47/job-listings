import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { JobGateway } from './core/ports/job.gateway';
import { InMemoryJobGateway } from './core/adapters/in-memory-job.gateway';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment.development';
import { JobState } from './core/stores/job/job.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    {provide: JobGateway, useValue: new InMemoryJobGateway()},
    importProvidersFrom(
      NgxsModule.forRoot([JobState], {
        developmentMode: !environment.production
      })
    ),
  ],
};
