import {bindable} from 'aurelia-framework';

export class LayoutBox {
  
  @bindable title = "";
  @bindable posts = [];
  @bindable nested = false;
  
}