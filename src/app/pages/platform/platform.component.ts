import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../common/header/header.component";

@Component({
  selector: 'app-platform',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss'
})
export class PlatformComponent {
  htmlCode: string = '<h1>Hello...</h1>';
  cssCode: string = 'h1 { color: #c9e4de; }';
  jsCode: string = 'console.log("Hello from JS");';
  editorWidth: number = 500; 
  isHeaderVisible = true; 
  isResizing = false;

  @ViewChild('outputFrame', { static: true }) outputFrame!: ElementRef;

  updateOutput() {
    const outputDoc = this.outputFrame.nativeElement.contentDocument;
    outputDoc.open();
    outputDoc.write(`
      <html>
        <head>
          <style>${this.cssCode}</style>
        </head>
        <body>
          ${this.htmlCode}
          <script>${this.jsCode}</script>
        </body>
      </html>
    `);
    outputDoc.close();
  }

  ngOnInit(){
    this.updateOutput()
  }

  startResizing(event: MouseEvent) {
    this.isResizing = true;
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResizing);
  }

  resize = (event: MouseEvent) => {
    if (this.isResizing) {
      this.editorWidth = Math.max(200, Math.min(event.clientX, window.innerWidth - 200));
    }
  };

  stopResizing = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.stopResizing);
  };

  autoResize(event: MouseEvent) {
    this.editorWidth = Math.max(200, Math.min(event.clientX, window.innerWidth - 200));
  }

  toggleHeader() {
    this.isHeaderVisible = !this.isHeaderVisible;
  }
}
