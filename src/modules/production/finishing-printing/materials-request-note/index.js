export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Surat Perintah Produksi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Surat Perintah Produksi' },
            { route: 'create', moduleId: './create', name: 'create', nav: true, title: 'Create' } 
        ]);
        this.router = router;
    }
}
