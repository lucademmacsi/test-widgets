import { Component, OnInit } from '@angular/core';
import { Widgets } from '../../configuration/widgets';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.sass']
})
export class WidgetsComponent implements OnInit {

  Widgets = Widgets;
  constructor() { }


  ngOnInit(): void {
    console.debug("Widgets", Widgets);
  }
}
