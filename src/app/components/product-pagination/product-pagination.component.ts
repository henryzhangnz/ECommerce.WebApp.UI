import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-pagination',
  imports: [NgFor],
  templateUrl: './product-pagination.component.html',
  styleUrl: './product-pagination.component.scss',
})
export class ProductPaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() pages: number[] = [];

  @Output() pageChanged = new EventEmitter<number>();

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
