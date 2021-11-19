import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-item-card',
  templateUrl: './category-item-card.component.html',
  styleUrls: ['./category-item-card.component.css']
})
export class CategoryItemCardComponent implements OnInit {

  @Input() category: any

  constructor() { }
 

  ngOnInit(): void {
  }

  

}
