import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({selector: 'app-search-bar', template: ''})
class SearchBarStubComponent{}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let headerEl: DebugElement;
  let searchBtn: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, SearchBarStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    headerEl = fixture.debugElement.query(By.css('h1'));
    searchBtn = fixture.debugElement.query(By.css('button.search-btn'));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('title should be displayed', () => {
    component.title = 'Romantic Comedy';
    fixture.detectChanges();
    expect(headerEl.nativeElement.innerHTML).toEqual('Romantic Comedy');
  });
  it('showSearch should be true when search icon is clicked', () => {
    searchBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.showSearch).toBeTruthy();
  });
});
