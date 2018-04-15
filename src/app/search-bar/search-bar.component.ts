import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { VideoListingService } from '../services/video-listing/video-listing.service';
import { VideoModel } from '../models/video.model';
import { ErrorService } from '../error-alert/error.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements AfterViewInit {
  @ViewChild('searchField') searchBox: ElementRef;
  @Output() onClosed = new EventEmitter<boolean>()
  searchText: string;
  searchResults: VideoModel[];
  isLoading: boolean;
  constructor(private videoListingService: VideoListingService, private errorService: ErrorService) { }
  ngAfterViewInit() {
    this.searchBox.nativeElement.focus();
  }
  /**
   * Sends onClosed event
   */
  onClose(): void {
    this.onClosed.emit(true);
  }
  /**
   * Searchs for videos
   */
  search(): void {
    if (this.searchText.trim().length === 0) {
      this.searchResults = [];
      return;
    }
    this.isLoading = true;
    this.videoListingService.getVideosBySearch(this.searchText)
    .subscribe((data: VideoModel[]) => {
      this.searchResults = data;
      this.isLoading = false;
    },
    (error) => {
      this.isLoading = false;
      this.errorService.showError(error);
    });
  }
}
