import {Injectable} from '@angular/core';
import {IFlash} from '../models/flash.model';
import {BehaviorSubject} from 'rxjs';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  constructor() {
  }

  addFlash(flash: { question: string, answer: string }): void {
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: getRandomNumber(),
      }
    ];
    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),

      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);

  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect'): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);

  }

  updateFlash(id, flash: { question: string, answer: string }): void {
    const index = this.flashs.findIndex(f => f.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...flash
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);

  }

  getFlash(id: number): any {
    const index = this.flashs.findIndex(flash => flash.id === id);
    return this.flashs[index];
  }

}
