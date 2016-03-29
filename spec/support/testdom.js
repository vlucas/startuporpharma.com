module.exports = function(markup) {
  // Don't do anything if document global is already defined
  if (typeof document !== 'undefined') {
    return;
  }

  // Use jsdom
  var jsdom           = require("jsdom").jsdom;

  // Declare globals to emulate browser DOM
  global.document     = jsdom(markup || '');
  global.window       = document.defaultView;
  global.navigator    = window.navigator;
  global.HTMLElement  = window.HTMLElement;
}
