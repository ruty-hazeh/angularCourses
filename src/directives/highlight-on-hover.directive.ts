import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05) translateZ(0)'); 
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 12px rgba(6, 122, 195, 0.2)');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(6, 122, 195, 0.1)'); 
    // this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid rgba(6, 122, 195, 0.5)');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '0.3rem'); // הוספת עיצוב לגבול solid rgba(6, 122, 195, 0.5)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1) translateZ(0)'); 
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent'); 
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none'); 
  }
}