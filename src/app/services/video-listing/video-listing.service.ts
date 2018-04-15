import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { PageModel } from '../../models/page.model';
import { VideoModel } from '../../models/video.model';
import { constantValues } from '../../constants/constants';

@Injectable()
export class VideoListingService {
  constructor(private httpClient: HttpClient) {
  }
  /**
   * Used for getting video list for particular page
   * @param pageNumber - Page Number
   */
  getVideoList(pageNumber: number): Observable<PageModel> {
    const params: HttpParams = new HttpParams().set('page', pageNumber.toString())
    .set('size', constantValues.values.pageSize.toString());
    return this.httpClient.get<PageModel>(constantValues.Urls.getVideoListByPage, {params: params})
    .pipe(
      catchError(() => new ErrorObservable(constantValues.messages.httpErrorMsg))
    );
  }
  /**
   * Used for getting video list for particular keyword
   * @param searchText - Search Keyword
   */
  getVideosBySearch(searchText: string): Observable<VideoModel[]> {
    const params: HttpParams = new HttpParams().set('keyword', searchText.trim());
    return this.httpClient.get<VideoModel[]>(constantValues.Urls.getVideoListBySearch, {params : params})
    .pipe(
      catchError(() => new ErrorObservable(constantValues.messages.httpErrorMsg))
    );
  }
}
