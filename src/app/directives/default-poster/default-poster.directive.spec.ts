import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DefaultPosterDirective } from './default-poster.directive';
import { ElementRef } from '@angular/core';
import { constantValues } from '../../constants/constants';

class MockElementRef extends ElementRef { nativeElement = {}; }
@Component({
  template: `<img src appDefaultPoster>`
})
class DefaultPosterTestComponent {
}
describe('DefaultPosterDirective', () => {
  let component: DefaultPosterTestComponent;
  let fixture: ComponentFixture<DefaultPosterTestComponent>;
  let imgEl: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultPosterTestComponent, DefaultPosterDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPosterTestComponent);
    component = fixture.componentInstance;
    imgEl = fixture.debugElement.query(By.css('img'));
    fixture.detectChanges();
  });
  it('should provide fallback image', () => {
    imgEl.triggerEventHandler('error', null);
    fixture.detectChanges();
    expect(imgEl.nativeElement.src).toContain(constantValues.values.defaultPosterImage);
  });
});
