import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { JobQuery } from '../core/models/query.model';

@Component({
  selector: 'job-listings-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() queries$: Observable<JobQuery> = of({
    languages: [],
    level: '',
    role: '',
    tools: [],
  });

}
