(function (Vue, duck) {
  'use strict';

  new Vue({
    el: '#duck-root',
    data: {
      authorName: 'You',
      messages: [],
      timeout: null
    },
    methods: {
      addMessage: function (author, message) {
        const date = new Date(Date.now()).toTimeString().split(" ")[0];
        this.messages.unshift({ authorName: author, message, timestamp: date });
      },
      addNewMessage: function (message) {
        this.addMessage(this.authorName, message);
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(function () {
          this.addMessage('Duck', duck.pickMessage());
        }.bind(this), 2000);
      },
      updateAuthorname: function (newName) {
        this.authorName = newName;
      }
    }
  });
})(window.Vue, window.duck);
