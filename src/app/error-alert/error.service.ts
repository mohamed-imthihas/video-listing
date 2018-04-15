import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {
  errorSource = new Subject<string>();
  errorSource$ = this.errorSource.asObservable();
  constructor() { }
  /**
   * Used to show error message
   * @param message - Error Message
   */
  showError(message: string): void {
    this.errorSource.next(message);
  }
  /**
   * Used to hide error message
   */
  hideError(): void {
    this.errorSource.next('');
  }
}
