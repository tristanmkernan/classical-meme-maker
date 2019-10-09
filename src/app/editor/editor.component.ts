import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { IArtwork } from '../models';
import { ReplaySubject, Subject, Subscription } from 'rxjs';

const DEFAULT_TEXT_CONTENT = [
  'HE WASN\'T ALONE'
];

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('myCanvas', {static: true})
  public myCanvas: ElementRef;

  @Input()
  public set artwork(artwork: IArtwork) {
    this.artwork$.next(artwork);
  }

  private artwork$: ReplaySubject<IArtwork> = new ReplaySubject<IArtwork>();
  private subscription: Subscription = new Subscription();

  private canvas: fabric.Canvas;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.myCanvas.nativeElement);

    // create a rectangle object
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    // "add" rectangle onto canvas
    this.canvas.add(rect);

    this.subscription.add(
      this.artwork$.subscribe(
        artwork => {
          fabric.Image.fromURL(artwork.primaryImage, image => {
            this.canvas.add(image);
          });
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAddText() {
    const randomQuote = DEFAULT_TEXT_CONTENT[Math.floor(Math.random() * DEFAULT_TEXT_CONTENT.length)];

    this.canvas.add(
      new fabric.IText(randomQuote)
    );
  }
}
