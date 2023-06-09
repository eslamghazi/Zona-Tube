import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
import { ClipService } from '../services/clip.service';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: videojs.Player;
  clip?: IClip;
  Scrollable = false;

  constructor(public route: ActivatedRoute, private clipService: ClipService) {}

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    this.route.data.subscribe((data) => {
      this.clip = data['clip'] as IClip;

      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4',
      });
    });
  }

  handleScroll = () => {
    //offsetHeight
    //if scrollTop + innerHeight = offsetHeight ==>send request
    const { scrollTop, offsetHeight, scrollHeight } = document.documentElement;

    const bottomOfWindow =
      Math.round(scrollTop) + offsetHeight === scrollHeight;

    if (bottomOfWindow) {
      this.Scrollable = true;
      this.clipService.getClips();
    }
  };
}
