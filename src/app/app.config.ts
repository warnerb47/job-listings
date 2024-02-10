import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { JobGateway } from './core/ports/job.gateway';
import { InMemoryJobGateway } from './core/adapters/in-memory-job.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    {provide: JobGateway, useValue: new InMemoryJobGateway()}
  ],
};
