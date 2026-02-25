import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CarryInput } from '../models/carry-input.model';
import { computed, effect } from '@angular/core';
import { InputFieldLength } from '../constants/fields.constant';
import { CharacterBoard } from '../../components/input-pad/input-pad.model';

type CarryInputState = {
  inputs: CarryInput[];
  pointerIndex: number | null;
  showKeyboard: boolean;
};

const initialState: CarryInputState = {
  inputs: [] as CarryInput[],
  pointerIndex: null,
  showKeyboard: false,
};

export const CarryInputStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ inputs }) => ({
    inputMap: computed(() => {
      const map = new Map<number, CarryInput>();
      inputs().forEach((input) => {
        map.set(input.index, input);
      });
      return map;
    }),
    totalValue: computed(() => {
      const sumTotal = inputs().reduce((total, v) => total + v.value, 0);
      return sumTotal;
    }),
  })),
  withMethods((store) => ({
    setInput(input: CharacterBoard) {
      patchState(store, (state) => {
        const pointerIndex = state.pointerIndex;
        if (pointerIndex === null) {
          return {};
        }
        const prev = state.inputs.findIndex((i) => i.index === pointerIndex);

        if (prev !== -1) {
          const updated = [...state.inputs];
          updated[prev] = { ...input, index: pointerIndex };

          return { inputs: updated };
        }

        return { inputs: [...state.inputs, { ...input, index: pointerIndex }] };
      });
    },
    toggleKeyboard(show: boolean) {
      patchState(store, (state) => {
        return { showKeyboard: show };
      });
    },
    clearInputField(index?: number) {
      patchState(store, (state) => {
        const pointerIndex = index || state.pointerIndex;

        if (pointerIndex === null) {
          return { inputs: [] };
        }
        const updated = state.inputs.filter((i) => i.index === pointerIndex);
        return { inputs: updated };
      });
    },
    clearAll() {
      patchState(store, (state) => {
        return { inputs: [] };
      });
    },
    carryPointerIndex(index?: number) {
      patchState(store, (state) => {
        // set pointer to index if is passed
        if (index !== undefined && index !== null) {
          if (index >= 0 && index < InputFieldLength) {
            return { pointerIndex: index };
          }
          return {};
        }
        // set pointer to 0 if is not passed
        if (state.pointerIndex === null) {
          return { pointerIndex: 0 };
        }
        // set pointer to next index if index is not passed oonly if it is less than actual length
        const nextIndex = state.pointerIndex + 1;

        return {
          pointerIndex: nextIndex < InputFieldLength ? nextIndex : state.pointerIndex,
        };
      });
    },

    resetStore() {
      patchState(store, initialState);
    },
  })),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem('INPUTS_STORE');
      if (saved) {
        const parsed = JSON.parse(saved) as CarryInputState;

        patchState(store, (state) => {
          return {
            inputs: parsed.inputs,
            pointerIndex: parsed.pointerIndex,
            showKeyboard: parsed.showKeyboard,
          };
        });
      }

      effect(() => {
        const state: CarryInputState = {
          inputs: store.inputs(),
          pointerIndex: store.pointerIndex(),
          showKeyboard: store.showKeyboard(),
        };

        localStorage.setItem('INPUTS_STORE', JSON.stringify(state));
      });
    },
  }),
);
