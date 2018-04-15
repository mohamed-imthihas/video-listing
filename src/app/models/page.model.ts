import { VideoModel } from './video.model';
export class PageModel{
    public title: string;
    public totalContentItems: number;
    public pageNumRequested: number;
    public pageSizeRequested: number;
    public pageSizeReturned: number;
    public contentItems: VideoModel[];
}