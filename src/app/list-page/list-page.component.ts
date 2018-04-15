import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { VideoListingService } from '../services/video-listing/video-listing.service';
import { PageModel } from '../models/page.model';
import { VideoModel } from '../models/video.model';
import { ErrorService } from '../error-alert/error.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ]),
        ], { optional: true })
      ])
    ])]
})
export class ListPageComponent implements OnInit {
  private pageNum: number;
  pageData: PageModel;
  videoList: VideoModel[] = [];
  constructor(private videoListingService: VideoListingService, private errorService: ErrorService) { }
  ngOnInit() {
    this.videoList = [];
    this.pageNum = 0;
    this.loadVideoList();
  }
  /**
   * Loads the video list
   */
  loadVideoList(): void {
    if (this.pageData !== undefined && this.pageData.totalContentItems === this.videoList.length) {
      return;
    }
    this.videoListingService.getVideoList(++this.pageNum)
    .subscribe((data) => {
      this.pageData = data;
      this.videoList.push(...this.pageData.contentItems);
    },
    (error) => {
      this.errorService.showError(error);
    });
  }
}
