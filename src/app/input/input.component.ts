import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  _inputModel: any;
  maskSuffix: string = '';

  @Input() autocomplete?: string;
  @Input() cssClasses?: any;
  @Input() labelCssClasses?: any;
  @Input() id?: string;
  @Input() for?: string;
  @Input() type: string;
  @Input() helpText?: string;
  @Input()
  set inputModel(value: any) {
      this.inputModelChange.emit(value);
      this._inputModel = value;
  }
  get inputModel() {
      return this._inputModel;
  }
  @Input() isRequired?: boolean;
  @Input() isDisabled?: boolean;
  @Input() isWaitingForData?: boolean;
  @Input() isReadonly?: boolean;
  @Input() inputStyle?: any;
  @Input() includeIcon?: any;
  @Input() label?: string;
  @Input() maxLength?: string;
  @Input() ngClass?: any;
  @Input() ngModelOptions: any;
  @Input() ngTrim?: boolean = true;
  @Input() placeholder?: string;
  @Input() popoverAppendToBody?: boolean = false;
  @Input() popoverPlacement?: string = 'auto top';
  @Input() setFocus?: any;
  @Input() isHtmlHelpText?: boolean;
  @Input() minVal?: number;
  @Input() maxVal?: number;
  @Input() inputCustomArg?: number;
  @Input() noFileText?: string;

  @Output() handleKeyDown?: EventEmitter<any> = new EventEmitter<void>();
  @Output() inputModelChange?= new EventEmitter<any>();
  @Output() ngBlur?: EventEmitter<any> = new EventEmitter<void>();
  @Output() onFocus?: EventEmitter<any> = new EventEmitter<void>();
  @Output() onChange?: EventEmitter<any> = new EventEmitter<void>();
  @Output() onInputChange?: EventEmitter<any> = new EventEmitter<void>();
  @Input()  isNegativeCurrency: boolean=true;

  inputCssClasses: string | any = '';

  constructor(
  ) {
  }

  ngOnInit() {
      if (Array.isArray(this.inputCustomArg) && this.inputCustomArg[1] === 'percent') {
          this.maskSuffix = '%';
      }

      this.setInputClasses();
  }

  /**
   * Desc: this function is used to know that the component
   * was rendered with or without label and helpText
   */
  withoutLabelAndHelp() {
      return !this.label && !this.helpText;
  }

  /**
   * Desc: this function configure the cssClasses for the input being rendered
   * @private
   */
  private setInputClasses() {
    
  }

  /**
   * Desc: emit events to the outer world
   */
  focused() {
      if (this.onFocus) {
          this.onFocus.emit();
      }
  }

  /**
   * Desc: called when the underline input gets changed.
   * also notify the outer world
   */
  handleChange($event?: any) {
      if (this.onChange) {
          this.onChange.emit({ $event });
      }
  }

  /**
   * Desc: called when the underline input gets blurred.
   */
  blurred($event?: Event) {
      const value = ($event.target as HTMLInputElement).value
      if (this.ngBlur) {
          this.inputModel = (this.ngTrim && typeof value === 'string') ? value.trim() : value;
          this.ngBlur.emit();
      }
  }

  /**
   * Desc: called when the underline input gets a keydown.
   */
  keyWasDown() {
      if (this.handleKeyDown) {
          this.handleKeyDown.emit();
      }
  }
}