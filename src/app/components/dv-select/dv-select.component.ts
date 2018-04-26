import { Component, OnInit, ViewChild, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { MatInput, MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'dv-select',
  templateUrl: './dv-select.component.html',
  styleUrls: ['./dv-select.component.scss']
})
export class DvSelectComponent implements OnInit {
  myControl: FormControl = new FormControl();
  @Input() options = [];
  @Input() allowCustomInput:boolean = false;
  @ViewChild('selectInput') autoComplete
  @ViewChild(MatAutocompleteTrigger) trigger;
  downArrowClicked:boolean = false;
  displayError:boolean = false; 


  filteredOptions: Observable<string[]>;
  constructor() { }

  ngOnInit() {
   this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => {
          this.displayError = false
          let data =  this.filter(val);
          if(!this.allowCustomInput && val != '' && data.length == 0){
            this.displayError = true;
            // this.autoComplete.nativeElement.select();
            return [];
          } 
          return data;
        })   
      );
  }

  filter(val: string): string[] {
    if(val.length <= 0 && !this.downArrowClicked){
      return [];
    }
    let suggestionTexts= this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
      
    this.downArrowClicked = false;
    return suggestionTexts;
  }

  onClick(e){
   e.stopPropagation();
      this.downArrowClicked = true;
      this.autoComplete.nativeElement.focus();      
      this.trigger._onChange(this.autoComplete.nativeElement.value);
  
    }   
  }
