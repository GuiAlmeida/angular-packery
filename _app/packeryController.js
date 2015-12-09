'use strict';

class packeryController {
    constructor() {
        this.config = {};
        this.container = undefined;
    }

    ready() {
        return !!this.config && !!this.config.packeryContainer;
    }

    initialize() {
        let defaultOpts = {itemSelector: this.config.packeryItem},
            opts = !this.config.packeryOptions ? defaultOpts : angular.extend(defaultOpts, this.config.packeryOptions);

        this.container = new Packery(this.config.packeryContainer, opts);
    }
}

export {packeryController};