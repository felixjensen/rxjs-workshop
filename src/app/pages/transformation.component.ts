import { AfterViewInit, Component } from '@angular/core';
import { concat, from, interval, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-transformation',
  styles: [],
  templateUrl: './page.template.html',
})
export class TransformationComponent extends PageComponent implements AfterViewInit {
  public headline = 'Grundlegende Transformation und Kombination';

  public ngAfterViewInit(): void {
    this.run();
  }

  public run(): void {
//    this.map();
//    this.merge();
    this.concat();
  }

  public map(): void {
    from([12, 3]).pipe(
      map((v) => v * 3)
    ).subscribe((v) => this.card.result(v));

    this.facts.add('map verändert die Werte eines Observables');
  }

  public merge(): void {
   const first$ = interval(500).pipe(map((v) => `First: ${v}`));
   const second$ = interval(800).pipe(map((v) => `Second: ${v}`));

   merge(first$, second$).subscribe((v) => this.card.result(v));

   this.facts.add('merge kombiniert mehrere Observables und lässt sie parallel ablaufen.');
   this.facts.add('Das gemergte Observable emitted immer sofort den Wert jedes Input-Observables.');
  }

  public concat(): void {
   const first$ = interval(500).pipe(map((v) => `First: ${v}`), take(3));
   const second$ = interval(800).pipe(map((v) => `Second: ${v}`));

   concat(first$, second$).subscribe((v) => this.card.result(v));

   this.facts.add('concat kombiniert mehrere Observables und lässt sie nacheinander ablaufen.');
   this.facts.add('Das zweite Observable startet erst, wenn das erste completed ist.');
  }
}
