import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../error-alert/error.service';
import { VideoListingService } from '../services/video-listing/video-listing.service';
import { VideoModel } from '../models/video.model';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let getVideoSpy: jasmine.Spy;
  const videoData: VideoModel[] = [{name: 'The Birds', posterImage: 'assets/images/poster1.jpg'}];
  beforeEach(async(() => {
    const service = jasmine.createSpyObj('VideoListingService', ['getVideosBySearch']);
    getVideoSpy = service.getVideosBySearch.and.returnValue(of(videoData));
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SearchBarComponent ],
      providers: [{provide: VideoListingService, useValue: service}, ErrorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get search result',() => {
    component.searchText = 'The'
    component.search();
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(1);
  });
  it('should show error message', () => {
    component.searchText = 'xyz';
    component.searchResults = [];
    fixture.detectChanges();
    let noResultEl = fixture.debugElement.query(By.css('.no-result'));
    expect(noResultEl).toBeDefined();
  });
  it('should show search result', () => {
    component.searchText = 'The';
    component.searchResults = videoData;
    fixture.detectChanges();
    let noResultEl = fixture.debugElement.query(By.css('.no-result'));
    let resultEl = fixture.debugElement.query(By.css('.item'));    
    expect(noResultEl).toBeNull();
    expect(resultEl).toBeDefined();
  });
  it('should show loader', () => {
    component.isLoading = true;
    fixture.detectChanges();
    let loaderEl = fixture.debugElement.query(By.css('.search-loader'));
    expect(loaderEl).toBeDefined();    
  });
  it('should emit event when back is clicked', () => {
    spyOn(component.onClosed, 'emit');
    fixture.debugElement.query(By.css('.back-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onClosed.emit).toHaveBeenCalledWith(true);
  })
});
