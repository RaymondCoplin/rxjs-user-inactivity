import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, fromEvent, interval, combineLatest } from 'rxjs';
import { switchMap, takeUntil, tap, filter, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  @ViewChild('container', { static: true })
  $container;

  userActions$: Observable<any>;
  counter$ = interval(60000);
  routes$ = this.router.events.pipe(filter(x => x instanceof NavigationEnd));
  active$ = new Subject<boolean>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.userActions$ = combineLatest(
      fromEvent(this.$container.nativeElement, 'mousemove'),
      this.routes$)
    .pipe(
      map(([mouseMove, route]) => ({ mouseMove, route })),
      switchMap(action => this.counter$.pipe(
        tap(x => { 
          if (x === 10) { // En 10 minutos de inactividad desplegara una alerta.
            this.active$.next(false);
            alert('Usuario inactivo');
            console.log('10 minutos de inactividad.');
          }
        })
      )),
      takeUntil(this.active$)
    );
    
    this.userActions$.subscribe(console.log);
  }
}
