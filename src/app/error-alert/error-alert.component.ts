import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {
  message: string;
  constructor(private errorService: ErrorService) { }
  ngOnInit() {
    this.errorService.errorSource$.subscribe((message: string) => {
      this.message = message;
    });
  }
}
