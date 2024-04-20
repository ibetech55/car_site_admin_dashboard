import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  constructor(
    private _renderer: Renderer2,
    private _element: ElementRef<HTMLDivElement>
  ) {}
  @Input() label: string = '';
  @Input() color: string = 'primary';
  @Input() size: 'small' | 'large' | undefined = 'small';
  @Input() isLink: boolean = false;
  @Input() routePath!: string;
  @Input() handleClick!: (event?: Event) => void;
  @Input() type: string = 'button';
  @Input() isUpload: boolean = false;
  @Output() onFileChange: EventEmitter<File> = new EventEmitter();
  @Input() id!: string;
  @Input() fileName!: string;
  @Input() icon!: string;
  @Input() iconPos!: ButtonIconPosition;

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      const file: File = target.files[0];
      this.onFileChange.emit(file);
    }
  }

  openFilePicker() {
    const el = this._element.nativeElement.querySelector(
      '#fileInput'
    ) as HTMLButtonElement;
    el.click();
  }

  ngOnInit() {
    if (this.icon && !this.iconPos) {
      this.iconPos = 'right';
    }
  }
}
