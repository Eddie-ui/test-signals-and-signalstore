import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputPadComponent } from './components/input-pad/input-pad.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputPadComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('test-rxjs-observables');
}
