import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    { field: "name", title: "Nama" },
    { field: "unit.name", title: "Unit" },
    { field: "step.process", title: "Step" },
    { field: "process", title: "Proses" },
    { field: "manufacture", title: "Manufaktur" },
    { field: "year", title: "Tahun" },
    { field: "condition", title: "Kondisi" },
    { field: "machineType.name", title: "Jenis Mesin" },
    { field: "monthlyCapacity", title: "Kapasitas Bulanan" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }


    create() {
        this.router.navigateToRoute('create');
    }
}
