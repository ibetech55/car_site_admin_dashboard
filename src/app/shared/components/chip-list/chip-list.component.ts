import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.scss',
})
export class ChipListComponent {
  @Input() items!: string[];
  @Output() removeItemEmit = new EventEmitter<number>();

  removeItem(itemIndex:number){
    this.removeItemEmit.emit(itemIndex)
  }
}
