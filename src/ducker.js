(function (Vue) {
  'use strict';

  const duckPhrases = [
    "Hmmm.",
    "Okay.",
    "I see.",
    "Alright.",
    "Interesting.",
    "OK",
    "I'm with you.",
    "Following.",
    "Huh.",
    "Got it."
  ];

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
          this.addMessage('Duck', this.pickDuckMessage());
        }.bind(this), 2000);
      },
      pickDuckMessage: function () {
        return duckPhrases[(Math.floor(Math.random() * duckPhrases.length))];
      },
      updateAuthorname: function (newName) {
        this.authorName = newName;
      }
    }
  });
})(window.Vue);
