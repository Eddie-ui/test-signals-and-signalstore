import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterBoard } from './input-pad.model';
import { CharacterSet } from '../../core/constants/characters.constant';
import { charToNumber } from '../../core/utils/helpers';
import { CommonModule } from '@angular/common';
import { CarryInputStore } from '../../core/store/inputStore';

@Component({
  selector: 'app-input-pad',
  standalone: true,
  templateUrl: './input-pad.component.html',
  styleUrl: './input-pad.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPadComponent {
  store = inject(CarryInputStore);
  characterBoardWithUniqueValue = signal<CharacterBoard[]>([]);

  get showKeyboard() {
    return this.store.showKeyboard();
  }

  get pointerHighlightKey() {
    const pointer = this.store.pointerIndex();
    if (pointer === null) {
      return;
    }
    return this.store.inputMap().get(pointer);
  }

  constructor() {
    const board: CharacterBoard[] = CharacterSet.split('').map((v) => ({
      label: v,
      value: charToNumber(v),
    }));
    this.characterBoardWithUniqueValue.set(board);
  }

  onClick(key: CharacterBoard) {
    this.store.setInput(key);
    this.store.carryPointerIndex();
  }
}
