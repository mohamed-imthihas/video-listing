import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ErrorAlertComponent } from './error-alert.component';
import { ErrorService } from './error.service';
import { By } from '@angular/platform-browser';

describe('ErrorAlertComponent', () => {
  let component: ErrorAlertComponent;
  let fixture: ComponentFixture<ErrorAlertComponent>;
  let errorService: ErrorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorAlertComponent ],
      providers: [ErrorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAlertComponent);
    component = fixture.componentInstance;
    errorService = getTestBed().get(ErrorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set message', () => {
    errorService.showError('Error Happened');
    expect(component.message).toEqual('Error Happened');
  });
  it('should show error dialog', () => {
    component.message = 'Error';
    fixture.detectChanges();
    let dialogEl = fixture.debugElement.query(By.css('.dialog'));
    expect(dialogEl).toBeDefined();
  });
  it('should hide error dialog', () => {
    component.message = '';
    fixture.detectChanges();
    let dialogEl = fixture.debugElement.query(By.css('.dialog'));
    expect(dialogEl).toBeNull();
  })
});
