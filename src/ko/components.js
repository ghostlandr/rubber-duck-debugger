(function (ko) {
  'use strict';

  ko.components.register('name-picker', {
    viewModel: function (params) {
      // Observables
      this.username = ko.observable('You');
      this.editingName = ko.observable(false);

      // Component methods
      this.emitName = function () {
        ko.postbox.publish('newname', this.username);
        this.editingName(false);
      };
    },
    template: `
    <div>
      <!-- ko if: editingName -->
      <form class="pure-form pure-form-stacked" style="display: inline-block" data-bind="submit: emitName">
        <label for="username">Change your username:</label>
        <input type="text" id="username" data-bind="value: username"/>
        <button type="submit" class="pure-button pure-button-primary">Change</button>
      </form>
      <!-- /ko -->
      <!-- ko ifnot: editingName -->
        <span data-bind="event: { dblclick: function () { editingName(true) } }" title="Double click to change your username">Messages will come from: <span data-bind="text: username"></span></span>
      <!-- /ko -->
    </div>
    `
  });

  ko.components.register('chat-box', {
    viewModel: function (params) {
      this.message = ko.observable('');

      this.emitNewMessage = function () {
        ko.postbox.publish('newmessage', this.message());
        this.message('');
      }
    },
    template: `
    <div>
      <form class="pure-form" data-bind="submit: emitNewMessage">
        <input type="text" class="pure-u-18-24" data-bind="value: message" />
        <button type="submit" class="pure-button pure-button-primary pure-u-4-24">Send</button>
      </form>
    </div>
    `
  });

  ko.components.register('message-area', {
    viewModel: function (params) {
      this.messages = params.messages;
    },
    template: `
    <div class="message-area">
      <div data-bind="foreach: messages">
        <div style="clear: both">
          <span style="float:left;"><span data-bind="text: authorName"></span>: <span data-bind="text: message"></span></span>
          <span style="float: right;"><span data-bind="text: timestamp"></span></span>
        </div>
      </div>
    </div>
    `
  });
})(window.ko);
