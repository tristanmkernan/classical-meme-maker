import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum TextChangeEventType {
  BOLD,
  ITALIC,
  DELETE,
  SIZE_UP,
  SIZE_DOWN
}

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  @Output()
  public addText = new EventEmitter();

  @Output()
  public copy = new EventEmitter();

  @Output()
  public save = new EventEmitter();

  @Output()
  public textChange = new EventEmitter<TextChangeEventType>();

  @Input()
  public showTextOptions = false;

  constructor() { }

  ngOnInit() {
  }

  handleAddText() {
    this.addText.emit();
  }

  handleCopy() {
    this.copy.emit();
  }

  handleSave() {
    this.save.emit();
  }

  handleTextBold() {
    this.textChange.emit(TextChangeEventType.BOLD);
  }

  handleTextItalic() {
    this.textChange.emit(TextChangeEventType.ITALIC);
  }

  handleTextDelete() {
    this.textChange.emit(TextChangeEventType.DELETE);
  }

  handleTextSizeUp() {
    this.textChange.emit(TextChangeEventType.SIZE_UP);
  }

  handleTextSizeDown() {
    this.textChange.emit(TextChangeEventType.SIZE_DOWN);
  }
}
