import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["Rincian"];
    
    columns = [
        { field: "LoadingNo", title: "No Loading" },
        { field: "Article", title: "No Artikel" },
        { field: "TotalRemainingQuantity", title: "Sisa", sortable: false },
        { field: "RONo", title: "RO" },
        { field: "ColorList", title: "Warna" , sortable: false},
        { field: "Unit.Name", title: "Unit Loading" },
        { field: "UnitFrom.Name", title: "Unit Asal" },
        { field: "SewingDONo", title: "No DO Sewing", sortable: false },
        { field: "LoadingDate", title: "Tanggal Loading", formatter: value => moment(value).format("DD MMM YYYY") },
        { field: "ProductList", title: "Kode Barang", sortable: false },
    ]

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
                
                result.data.forEach(d => {
                    d.ColorList = `${d.Colors.map(p => `- ${p}`).join("<br/>")}`
                    d.ProductList = `${d.Products.map(p => `- ${p}`).join("<br/>")}`
                });
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}