(function (Vue) {
  'use strict';

  Vue.component('name-picker', {
    data: function () {
      return {
        username: 'You',
        editingName: false
      }
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
    `,
    watch: {
      editingName: function (isEditing) {
        if (!isEditing) {
          // They've finished editing their name, emit the new one.
          this.$emit('namechanged', this.username);
        }
      }
    }
  });

  Vue.component('chat-box', {
    data: function () {
      return {
        textValue: ''
      }
    },
    template: `
  <div class="pure-u-1-1">
    <form class="pure-form" v-on:submit.prevent="emitNewMessage">
      <input type="text" v-model="textValue" class="pure-u-18-24" />
      <button type="submit" class="pure-button pure-button-primary pure-u-4-24">Send</button>
    </form>
  </div>
  `,
    methods: {
      emitNewMessage: function () {
        this.$emit('newmessage', this.textValue);
        this.textValue = '';
      }
    }
  });

  Vue.component('message-area', {
    props: ['messages'],
    template: `
  <div class="pure-u-1-1 message-area">
    <div v-for="message in messages">
      <div style="clear: both">
        <span style="float:left;">{{ message.authorName }}: {{message.message}}</span>
        <span style="float: right;">{{ message.timestamp }}</span>
      </div>
    </div>
  </div>
  `
  });
})(window.Vue);
