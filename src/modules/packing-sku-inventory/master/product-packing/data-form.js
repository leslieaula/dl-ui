import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { EventAggregator } from 'aurelia-event-aggregator';

const UOMLoader = require('../../packing-sku-loaders/uom-loader');
const SKULoader = require('../../packing-sku-loaders/product-sku-loader');

@inject(EventAggregator)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(eventAggregator, service) {
    this.eventAggregator = eventAggregator;
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.selectedUOM = this.data.uom || null;
    this.selectedSKU = this.data.productSKU || null;
  }

  @bindable selectedUOM;
  selectedUOMChanged(newValue, oldValue) {
    if (newValue)
      this.data.UOMId = newValue.id;
    else {
      this.data.UOMId = 0
    }
  }

  get uomLoader() {
    return UOMLoader;
  }

  @bindable selectedSKU;
  selectedSKUChanged(newValue, oldValue) {
    if (newValue)
      this.data.ProductSKUId = newValue.id
    else
      this.data.ProductSKUId = 0
  }

  get skuLoader() {
    return SKULoader;
  }

}


