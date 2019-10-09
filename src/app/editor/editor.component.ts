import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { IArtwork } from '../models';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas', {static: true})
  public myCanvas: ElementRef;

  @Input()
  public artwork: IArtwork = null;

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
  }
}
