import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-item-card',
  templateUrl: './category-item-card.component.html',
  styleUrls: ['./category-item-card.component.css']
})
export class CategoryItemCardComponent implements OnInit, DoCheck {

  @Input() category: any

  constructor() { }
  ngDoCheck(): void {
    console.log("ngDoCheck() is called.");
  }

  ngOnInit(): void {
  }

  

}
