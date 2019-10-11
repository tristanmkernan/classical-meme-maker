import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { IArtwork } from '../models';
import { ReplaySubject, Subscription } from 'rxjs';
import { TextChangeEventType } from './editor-toolbar/editor-toolbar.component';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver';

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

  public get hasSelectedTextObject(): boolean {
    if (this.canvas) {
      return !!this.canvas.getActiveObject();
    }

    return false;
  }

  private artwork$: ReplaySubject<IArtwork> = new ReplaySubject<IArtwork>();
  private subscription: Subscription = new Subscription();

  private canvas: fabric.Canvas;

  private isDragging = false;
  private lastPosX = 0;
  private lastPosY = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvas = this.canvas = new fabric.Canvas(this.myCanvas.nativeElement);

    canvas.setDimensions({
      width: '100%',
      height: '500px',
    }, {cssOnly: true});

    this.subscription.add(
      this.artwork$.subscribe(
        artwork => {
          const url = `${environment.proxyUrl}${artwork.primaryImage}`;

          const el = new Image();

          el.crossOrigin = 'anonymous';
          el.onload = () => {
            const image = new fabric.Image(el);
            image.scaleToWidth(this.canvas.getWidth(), false);
            canvas.setBackgroundImage(image, () => {
              canvas.requestRenderAll();
            });
          };

          el.src = url;
        }
      )
    );

    /*
     * Zoom and Pan
     * http://fabricjs.com/fabric-intro-part-5#pan_zoom
     */

    canvas.on('mouse:wheel', (opt: any) => {
      const delta = -opt.e.deltaY;
      let zoom = canvas.getZoom();

      zoom = zoom + (delta / 50);

      if (zoom > 20) {
        zoom = 20;
      }

      if (zoom < 0.01) {
        zoom = 0.01;
      }

      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY } as any, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on('mouse:down', (opt: any) => {
      const evt = opt.e;

      if (evt.shiftKey === true) {
        this.isDragging = true;
        canvas.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    canvas.on('mouse:move', (opt: any) => {
      if (this.isDragging) {
        const e = opt.e;
        canvas.viewportTransform[4] += e.clientX - this.lastPosX;
        canvas.viewportTransform[5] += e.clientY - this.lastPosY;
        canvas.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    canvas.on('mouse:up', _ => {
      this.isDragging = false;
      canvas.selection = true;
      canvas.requestRenderAll();

      // Reset object coords to fix bug where clickable area does not match object position
      // https://github.com/fabricjs/fabric.js/wiki/Fabric-gotchas
      for (const obj of canvas.getObjects()) {
        obj.setCoords();
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAddText() {
    const randomQuote = DEFAULT_TEXT_CONTENT[Math.floor(Math.random() * DEFAULT_TEXT_CONTENT.length)];
    let coords = {};

    if (this.canvas.vptCoords) {
      coords = {
        left: this.canvas.vptCoords.tl.x,
        top: this.canvas.vptCoords.tl.y,
      };
    }

    const itext = new fabric.IText(randomQuote, {
      fontFamily: 'Impact',
      stroke: '#c3bfbf',
      strokeWidth: 2,
      ...coords
    });

    this.canvas.add(
      itext
    );

    this.canvas.setActiveObject(itext);
  }

  handleTextChange(type: TextChangeEventType) {
    const textObj: fabric.IText = this.canvas.getActiveObject() as fabric.IText;

    if (type === TextChangeEventType.BOLD) {
      if (textObj.fontWeight === 'bold') {
        textObj.fontWeight = 'normal';
      } else {
        textObj.fontWeight = 'bold';
      }
    } else if (type === TextChangeEventType.ITALIC) {
      if (textObj.fontStyle === 'italic') {
        textObj.fontStyle = 'normal';
      } else {
        textObj.fontStyle = 'italic';
      }
    } else if (type === TextChangeEventType.DELETE) {
      this.canvas.remove(textObj);
    } else if (type === TextChangeEventType.SIZE_UP) {
      textObj.fontSize += 10;
    } else if (type === TextChangeEventType.SIZE_DOWN) {
      textObj.fontSize -= 10;
    }

    this.canvas.requestRenderAll();
  }

  handleCopy() {
    window.open(this.canvas.toDataURL());
  }

  handleSave() {
    this.canvas.getElement().toBlob(
      blob => {
        saveAs(blob, 'meme.png');
      }
    );
  }
}
