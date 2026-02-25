import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputPadComponent } from './components/input-pad/input-pad.component';
import { CommonModule } from '@angular/common';
import { InputRowComponent } from './components/input-row/input-row.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputPadComponent, InputRowComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('test-rxjs-observables');
}
