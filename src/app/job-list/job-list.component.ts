import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'job-listings-job-list',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent {}
