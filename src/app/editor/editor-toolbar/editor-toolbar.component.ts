import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  @Output()
  public addText = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleAddText() {
    this.addText.emit();
  }

}
