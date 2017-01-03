
Vue.component('chat-box', {
  data: function () {
    return {
      textValue: ''
    }
  },
  template: `
<input type="text" v-on:keyup.enter="emitNewMessage" v-model="textValue" />
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
<div v-bind:style="styleObject">
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
        border: "1px solid blue",
        height: "200px",
        width: "500px",
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
