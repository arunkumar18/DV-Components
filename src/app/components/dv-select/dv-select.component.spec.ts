import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DvSelectComponent } from './dv-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('DvSelectComponent', () => {
  let component: DvSelectComponent;
  let fixture: ComponentFixture<DvSelectComponent>;
  const options: any[] = ['One', 'Two', 'Three'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DvSelectComponent],
      imports: [FormsModule, ReactiveFormsModule,
        MatAutocompleteModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sugestions should be displayed as per input text', () => {
    component.options = options;
    let suggestionText: any[] = component.filter(options[0]);

    // verify provided suggestions
    expect(suggestionText.length === 1).toBeTruthy();
    expect(suggestionText[0]).toEqual(options[0]);
  });

  it('no suggestions should be displayed when search text is not found in sugggestion list', () => {
    component.options = options;
    component.allowCustomInput = false;
    let suggestionText: any[] = component.validateInput('Double');
    expect(suggestionText.length === 0).toBeTruthy();
  });

  it('sugestions search should not be case sensitive', () => {
    component.options = options;
    let suggestionText: any[] = component.filter('OnE');

    // verify provided suggestions
    expect(suggestionText.length === 1).toBeTruthy();
    expect(suggestionText[0]).toEqual(options[0]);
  });

  it('error should be displayed when user input is not found in the suggestion list and “allowCustomInput” flag is set to false', () => {
    component.options = options;
    component.allowCustomInput = false;
    let suggestionText: any[] = component.validateInput('Double');
    expect(suggestionText.length === 0).toBeTruthy();
    expect(component.isValid).toEqual(false);
  });

  it('isValid flag should be exposed', () => {
    component.options = options;
    component.allowCustomInput = false;
    let suggestionText: any[] = component.validateInput('Double');
    expect(component.isValid).toEqual(false);    
    // check valid event is emitted with isValid flad is exposed
    component.valid.subscribe(isValid => expect(isValid).toBe(false));
  });

  it('error should be displayed when user input is not found in the suggestion list and “allowCustomInput” flag is set to true', () => {
    component.options = options;
    component.allowCustomInput = true;
    let suggestionText: any[] = component.validateInput('Double');
    expect(component.isValid).toEqual(true);
  });

});
