'use strict';

const core = require('./core-a20b60bb.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["cc-button.cjs",[[1,"cc-button",{"iconName":[1,"icon-name"],"iconReverse":[4,"icon-reverse"],"iconOnly":[4,"icon-only"],"disabled":[4],"fill":[1],"expand":[4],"color":[1],"href":[1],"target":[1],"size":[1]}]]],["cc-badge.cjs",[[1,"cc-badge",{"color":[1]}]]],["cc-text.cjs",[[1,"cc-text",{"type":[1],"strong":[4],"tag":[1]}]]],["cc-icon.cjs",[[1,"cc-icon",{"name":[1],"size":[2]}]]]], options);
});
