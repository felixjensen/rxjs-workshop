import { AfterViewInit, Component } from '@angular/core';
import { of, range } from 'rxjs';
import { filter, find, first, last, take, tap } from 'rxjs/operators';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-filtering',
  templateUrl: './page.template.html',
  styles: []
})
export class FilteringComponent extends PageComponent implements AfterViewInit {
  headline = 'Filter';

  ngAfterViewInit(): void {
    this.run();
  }

  run(): void {
//    this.filter();
//    this.tap();
//    this.find();
    this.first();
//    this.last();
//    this.take();
  }

  filter(): void {
    const oneToFive$ = range(1, 5).pipe(tap(v => this.card.info('tap', v)));
    oneToFive$
      .pipe(filter((v) => v < 3))
      .subscribe((v) => this.card.result(v));

    const threeToFive$ = oneToFive$.pipe(filter((v) => v >= 3));
    threeToFive$
      .subscribe((v) => this.card.result(v));

    this.facts.add('filter gibt alle Werte zurück, die der Bedingung entsprechen.');
    this.facts.add('alle Operationen innerhalb des pipe-Blocks werden nacheinander ausgeführt.');
  }

  tap(): void {
    range(1, 5)
      .pipe(tap((v) => this.card.info('Side effect', v)))
      .subscribe((v) => this.card.result(v));

    this.facts.add(
      'tap verändert das Observable nicht, sondern wird benutzt, um Seiteneffekte auszulösen.'
    );
  }

  find(): void {
    range(1, 5)
      .pipe(find((v) => v > 1))
      .subscribe((v) => this.card.result(v), _ => {}, () => this.card.info('completed'));
    this.facts.add('find gibt den ersten Wert zurück, der der Bedingung entspricht.');
  }

  first(): void {
    range(1, 5)
      .pipe(first())
      .subscribe((v) => this.card.result(v));
    this.facts.add('first gibt den ersten emitteten Wert zurück');
    this.facts.add('first kann genutzt werden, um aus heißen kalte Observables zu machen.');

    range(1, 5)
    .pipe(first(v => v >= 3))
    .subscribe((v) => this.card.result(v));
    this.facts.add('first kann auch filtern');

    of(undefined)
      .pipe(first(v => v >= 3, 'default'))
      .subscribe((v) => this.card.result(v));
    this.facts.add('wenn first nichts zurückgibt, bis das Observable terminiert, gibt es den default-Wert zurück.');
  }

  last(): void {
    range(1, 5)
      .pipe(last())
      .subscribe((v) => this.card.result(v));
    this.facts.add('last gibt den letzten emitteten Wert zurück, sobald completed wurde');
  }

  take(): void {
    range(1, 5)
      .pipe(take(3))
      .subscribe((v) => this.card.result(v));

    this.facts.add('take schränkt die Anzahl der zurückgegebenen Werte auf n ein.');
  }
}
