import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPageComponent } from './list-page.component';
import { VideoListingService } from '../services/video-listing/video-listing.service';
import { ErrorService } from '../error-alert/error.service';
import { PageModel } from '../models/page.model';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({selector: 'app-header',template:''})
class HeaderStubComponent{}

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let getVideoSpy: jasmine.Spy;
  const pageData: PageModel = {
    title: 'Romantic Comedy',
    pageNumRequested: 1,
    pageSizeRequested: 20,
    pageSizeReturned: 20,
    totalContentItems: 50,
    contentItems: [{name: 'The Birds', posterImage: 'assets/images/poster1.jpg'}]
  }
  beforeEach(async(() => {
    const service = jasmine.createSpyObj('VideoListingService', ['getVideoList']);
    getVideoSpy = service.getVideoList.and.returnValue(of(pageData));
    TestBed.configureTestingModule({
      imports: [InfiniteScrollModule, BrowserAnimationsModule],
      declarations: [ ListPageComponent, HeaderStubComponent ],
      providers: [{provide: VideoListingService, useValue: service}, ErrorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  })
  it('should load the page data', () => {
    fixture.detectChanges();
    expect(component.pageData).toBeDefined();
  })
});
