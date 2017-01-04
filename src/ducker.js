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
      <form class="pure-form pure-form-stacked" v-show="editingName" style="display: inline-block"  v-on:submit.prevent="editingName = false">
        <label for="username">Change your username:</label>
        <input type="text" v-model="username" id="username"/>
        <button type="submit" class="pure-button pure-button-primary">Change</button>
      </form>
      <span v-show="!editingName" v-on:dblclick="editingName = true">Username: {{ username }}</span>
    </div>
    `,
    computed: {
      allCapsUsername: function () {
        return this.username.toUpperCase();
      }
    },
    watch: {
      editingName: function (isEditing) {
        if (!isEditing) {
          // They've finished editing their name, emit the new one.
          this.$emit('newname', this.username);
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
      <input type="text" v-model="textValue" class="pure-input-1" />
      <button type="submit" class="pure-button pure-button-primary">Send</button>
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
  <div v-bind:style="styleObject" class="pure-u-1-1">
    <div v-for="message in messages">
      <div style="clear: both">
        <span style="float:left;">{{ message.authorName }}: {{message.message}}</span>
        <span style="float: right;">{{ message.timestamp }}</span>
      </div>
    </div>
  </div>
  `,
    data: function () {
      return {
        styleObject: {
          border: "1px solid #DADADA",
          height: "500px",
          "overflow-y": "scroll"
        }
      }
    }
  });

  const duckViewModel = new Vue({
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
        this.timeout = setTimeout(function () {
          this.addMessage('Duck', this.pickDuckMessage());
        }.bind(this), 2000);
      },
      pickDuckMessage: function () {
        return ['Hey', 'Ho', 'Let\'s go'][(Math.floor(Math.random() * 3))];
      },
      updateAuthorname: function (newName) {
        this.authorName = newName;
      }
    }
  });
})(window.Vue);
