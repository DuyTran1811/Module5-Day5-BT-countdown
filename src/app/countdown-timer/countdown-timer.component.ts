import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnChanges, OnDestroy {
  message = '';
  remainingTime: number;
  @Input() seconds = 11;
  @Output() finish = new EventEmitter<boolean>();
  private intervalId = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 11 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 11 : vFixed;
    }
  }

  ngOnDestroy(): void {
  this.clearTimer();
  }

  ngOnInit(): void {
    this.reset();
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }

  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `Click start button to start the Countdown`;
  }
  
  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime === 0) {
        this.message = 'Blast off!';
        this.clearTimer();
        this.finish.emit(true);
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);
  }
}
