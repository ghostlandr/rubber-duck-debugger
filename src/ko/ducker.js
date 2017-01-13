(function (ko, duck) {
  'use strict';
  function duckViewModel() {
    this.authorName = ko.observable('You');
    this.messages = ko.observableArray();
    this.timeout = null;

    this.addMessage = function (author, message) {
      const date = new Date(Date.now()).toTimeString().split(" ")[0];
      this.messages.unshift({ authorName: author, message, timestamp: date });
    };
    this.addNewMessage = function (message) {
      this.addMessage(this.authorName, message);
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(function () {
        this.addMessage('Duck', duck.pickMessage());
      }.bind(this), 2000);
    }.bind(this);
    this.updateAuthorname = function (newName) {
      this.authorName = newName;
    };

    // Set up subscriptions for new messages and author names, so that those components stay decoupled.
    ko.postbox.subscribe('newname', this.updateAuthorName);
    ko.postbox.subscribe('newmessage', this.addNewMessage);
  }

  ko.applyBindings(new duckViewModel(), document.getElementById('duck-root'));
})(window.ko, window.duck);
