import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldLength } from '../../core/constants/fields.constant';
import { CarryInputStore } from '../../core/store/inputStore';
import { CarryInput } from '../../core/models/carry-input.model';

@Component({
  selector: 'app-input-row',
  standalone: true,
  templateUrl: './input-row.component.html',
  styleUrl: './input-row.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRowComponent {
  store = inject(CarryInputStore);
  fieldRows = Array(InputFieldLength).fill('');
  emptyField: CarryInput = { index: 0, label: '', value: 0 };
  constructor() {}

  get pointerIndex() {
    return this.store.pointerIndex();
  }

  get total() {
    return this.store.totalValue();
  }

  inputFieldValue(index: number) {
    const field = this.store.inputMap().get(index);
    if (field) {
      return field;
    }
    return { ...this.emptyField, index };
  }

  onClickField(index?: number) {
    this.store.carryPointerIndex(index);
    this.store.toggleKeyboard(true);
  }

  clearField() {
    // , clear data from pointer index when it is passed
    this.store.clearAll();
  }
  reset() {
    // , clear data from pointer index when it is passed
    this.store.resetStore();
  }
}
