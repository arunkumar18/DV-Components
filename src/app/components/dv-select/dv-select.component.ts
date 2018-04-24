import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {of} from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';


@Component({
  selector: 'dv-select',
  templateUrl: './dv-select.component.html',
  styleUrls: ['./dv-select.component.css']
})
export class DvSelectComponent implements OnInit {
  myControl: FormControl = new FormControl();
  options;
  inputValue:string;
  @ViewChild('auto') autoComplete
  filteredOptions: Observable<string[]>;
  constructor() { }

  ngOnInit() { 
  this.options = [
    'One',
    'Two',
    'Three'
   ];

   this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    // if(val.length <= 0){
    //   return [];
    // }
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  onClick(){
    debugger
    this.myControl.setValue('o');
    this.autoComplete;
    }
    
  }
