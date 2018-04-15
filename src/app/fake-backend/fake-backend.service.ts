import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { videoData } from './data';

@Injectable()
export class FakeBackendService implements HttpInterceptor {
  videoObj: any;
  constructor() {
    this.videoObj = videoData;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.of(null).mergeMap(() => {
      if (request.url.endsWith('/api/videos') && request.method === 'GET') {
          let pageNumber = parseInt(request.params.get('page'));
          if (isNaN(pageNumber)) {
            pageNumber = 1;
          }
          let pageSize = parseInt(request.params.get('size'));
          if (isNaN(pageSize)) {
            pageSize = 10;
          }
          const videoList = videoData.content.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize);
          let responseObj = {
            title: videoData.title,
            totalContentItems: videoData.content.length,
            pageNumRequested: pageNumber,
            pageSizeRequested: pageSize,
            pageSizeReturned: videoList.length,
            contentItems: videoList
            };
          return Observable.of(new HttpResponse({ status: 200, body: responseObj }));
        }
        if (request.url.endsWith('/api/search/videos') && request.method === 'GET') { 
          const keyword = request.params.get('keyword');
          const results = this.videoObj.content.filter((item) => {
            return item.name.toLowerCase().match(keyword.toLowerCase())
          })
          return Observable.of(new HttpResponse({ status: 200, body: results }));

        }
        return next.handle(request);
    })
    .materialize()
    .delay(500)
    .dematerialize();
  }
}
