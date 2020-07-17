// 事件总线
import Vue from 'vue';

class EventEmitter {
  constructor () {
    this.event = new Vue();
  }

  on (event, callback) {
    this.event.$on(event, callback);
  }

  once (event, callback) {
    this.event.$once(event, callback);
  }

  off (event, callback) {
    this.event.$off(event, callback);
  }

  emit (eventName, ...args) {
    this.event.$emit(eventName, ...args);
  }

  test () {
    console.log(this.event);
  }
}

export const event = new EventEmitter()
