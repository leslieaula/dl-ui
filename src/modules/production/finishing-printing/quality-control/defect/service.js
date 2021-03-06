import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing//quality-control/defect';
const kanbanServiceUri = 'production/kanbans';
const finishingPrintingSalesContract = 'sales/finishing-printing-sales-contracts';
const productionOrder = 'sales/production-orders';

export class Service extends RestService {

    constructor(http, aggregator, config) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchKanban(info) {
        var endpoint = `${kanbanServiceUri}`;
        return super.list(endpoint, info);
    }

    getKanbanById(id) {
        var endpoint = `${kanbanServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getSalesContractByNo(salesContractNo, select) {
        var endpoint = `${finishingPrintingSalesNoServiceUri}/${salesContractNo.replace("/", "").replace("/", "")}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

export class SalesService extends RestService {
    constructor(http, aggregator, config) {
        super(http, aggregator, config, "sales");
    }

    getSalesContractById(id) {
        var endpoint = `${finishingPrintingSalesContract}/${id}`;
        return super.get(endpoint);
    }

    getProductionOrderById(id) {
        var endpoint = `${productionOrder}/${id}`;
        return super.get(endpoint);
    }
}