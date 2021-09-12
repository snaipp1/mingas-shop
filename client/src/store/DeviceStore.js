import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
  constructor() {
    this._types = [
        {id: 1, name: 'Плита газовая'},
        {id: 2, name: 'Колонка газовая'},
        {id: 3, name: 'Счетчик расхода газа'},
        {id: 4, name: 'Котел газовый'},
    ];
    this._brands = [
        {id: 1, name: "Gefest"},
        {id: 2, name: "Bosh"},
    ];
    this._devices = [
        {id: 1, name: "PG123", price: 355, rating: 5, img: 'https://trudogolik24.ru/pic/tov/oreon/201807312357539758.jpg'},
        {id: 2, name: "PG123", price: 355, rating: 5, img: 'https://trudogolik24.ru/pic/tov/oreon/201807312357539758.jpg'},
        {id: 3, name: "PG123", price: 355, rating: 5, img: 'https://trudogolik24.ru/pic/tov/oreon/201807312357539758.jpg'},
        {id: 4, name: "PG123", price: 355, rating: 5, img: 'https://trudogolik24.ru/pic/tov/oreon/201807312357539758.jpg'},
    ];
    this._selectedType = {};
    this._selectedBrand = {};

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

   setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }

  get types() {
      return this._types;
  }

  get brands() {
      return this._brands;
  }

  get devices() {
      return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

};

