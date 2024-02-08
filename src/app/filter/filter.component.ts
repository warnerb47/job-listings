import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'job-listings-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {}
