import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../../utils/rest-service';

const serviceUri = 'garment/leftover-warehouse-receipts/monitoring';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    xls(info) {
        let endpoint = `${serviceUri}?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}