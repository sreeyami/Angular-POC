import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import { ICars } from '../cars';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  public cars = [];

  registeredCars = [];
  selectedRow: number;
  public car: ICars;
  showNew: Boolean = false;
  submitType: string;
  loading: Boolean = false;

  constructor(private _carService: CarService) { }

  ngOnInit() {
    this.loading = true;
    // console.log('loading', this.loading);
    this._carService.fetchData().subscribe(data => this.cars = data);
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.car = new ICars;
    this.car = Object.assign({}, this.cars[this.selectedRow]);
    this.showNew = true;
    this.submitType = 'Update';
  }

  onDelete(index: number) {
    this.cars.splice(index, 1);
  }

  onNew() {
    this.car = new ICars;
    this.submitType = 'Save';
    this.showNew = true;
  }

  onSave() {
    // this.selectedRow = index;
    if (this.submitType === 'Save' ) {
      this.cars.push(this.car);
    } else {
      console.log('this car', this.car.name);
      this.cars[this.selectedRow].name = this.car.name;
      this.cars[this.selectedRow].year = this.car.year;
    }
    this.showNew = false;
  }

  onCancel() {
    this.showNew = false;
  }
}
