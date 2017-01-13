(function (ko) {
  'use strict';

  ko.components.register('name-picker', {
    viewModel: function (params) {
      
    },
    template: `
    <div class="pure-u-1-1">
      <form v-show="editingName" v-on:submit.prevent="editingName = false" class="pure-form pure-form-stacked" style="display: inline-block">
        <label for="username">Change your username:</label>
        <input type="text" v-model="username" id="username"/>
        <button type="submit" class="pure-button pure-button-primary">Change</button>
      </form>
      <span v-show="!editingName" v-on:dblclick="editingName = true" title="Double click to change your username">Messages will come from: {{ username }}</span>
    </div>
    `
  });

  ko.components.register('chat-box', {
    viewModel: function (params) {

    },
    template: `
    <div class="pure-u-1-1">
      <form class="pure-form" v-on:submit.prevent="emitNewMessage">
        <input type="text" v-model="textValue" class="pure-u-18-24" />
        <button type="submit" class="pure-button pure-button-primary pure-u-4-24">Send</button>
      </form>
    </div>
    `
  });

  ko.components.register('message-area', {
    viewModel: function (params) {

    },
    template: `
    <div v-bind:style="styleObject" class="pure-u-1-1">
      <div v-for="message in messages">
        <div style="clear: both">
          <span style="float:left;">{{ message.authorName }}: {{message.message}}</span>
          <span style="float: right;">{{ message.timestamp }}</span>
        </div>
      </div>
    </div>
    `
  })
})(window.ko);
