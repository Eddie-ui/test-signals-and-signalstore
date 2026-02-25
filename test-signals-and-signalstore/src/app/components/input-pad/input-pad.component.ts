import {
  Component,
  computed,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterBoard } from './input-pad.model';
import { CharacterSet } from '../../core/constants/characters.constant';
import { charToNumber } from '../../core/utils/helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-pad',
  standalone: true,
  templateUrl: './input-pad.component.html',
  styleUrl: './input-pad.component.scss',
  imports: [CommonModule],
})
export class InputPadComponent {
  characterBoardWithUniqueValue = signal<CharacterBoard[]>([]);
  @Output() keyInputEmit: EventEmitter<CharacterBoard> = new EventEmitter();

  constructor() {
    const board: CharacterBoard[] = CharacterSet.split('').map((v) => ({
      label: v,
      value: charToNumber(v),
    }));
    this.characterBoardWithUniqueValue.set(board);
  }

  onClick(key: CharacterBoard) {
    this.keyInputEmit.emit(key);
  }
}
