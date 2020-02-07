'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-aa9e4bf2.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["cc-button.cjs",[[1,"cc-button",{"iconName":[1,"icon-name"],"iconReverse":[4,"icon-reverse"],"iconOnly":[4,"icon-only"],"disabled":[4],"fill":[1],"expand":[4],"color":[1],"href":[1],"target":[1],"size":[1]}]]],["cc-text.cjs",[[1,"cc-text",{"type":[1],"strong":[4],"tag":[1]}]]],["cc-icon.cjs",[[1,"cc-icon",{"name":[1],"size":[2],"color":[1]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
