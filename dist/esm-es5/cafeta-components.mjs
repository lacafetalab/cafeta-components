import { p as patchBrowser, b as bootstrapLazy } from './core-8392cfc6.js';
patchBrowser().then(function (options) {
    return bootstrapLazy([["my-component", [[1, "my-component", { "first": [1], "middle": [1], "last": [1] }]]]], options);
});
