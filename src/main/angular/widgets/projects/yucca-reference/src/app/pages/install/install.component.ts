import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.sass']
})
export class InstallComponent implements OnInit {

  section: string = "section_overview";
  constructor() { }

  ngOnInit(): void {
  }

}
