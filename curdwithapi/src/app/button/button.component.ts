import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
@Input() btnClass:string='btn btn-default';
@Input() textButton:string='Button';
@Output() click=new EventEmitter();
btnClick(event:any):void
{
  this.click.emit();
}
}
