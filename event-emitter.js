module.exports = class EventEmitter {
  listeners = {};
  errorMessages = "Event name is required"
  addListener(eventName, fn) {
    if (!eventName) {
      throw new Error(errorMessages);
    }
    if (!fn) {
      throw new Error("Handler is required");
    }
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
    console.log("LISTENERS :>> ", this.listeners);
    return this;
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }
  removeListener(eventName, fn) {
    if (!eventName) {
      throw new Error(errorMessages);
    }
    if (!fn) {
      throw new Error("Handler is required");
    }
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.removeListener(eventName, onceWrapper);
    };
    this.addListener(eventName, onceWrapper);
    return this;
  }

  emit(eventName, ...args) {
    if (!eventName) {
      throw new Error(errorMessages);
    }
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(...args));
    }
  }

  listenerCount(eventName) {
    if (!eventName) {
      throw new Error(errorMessages);
    }
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    if (!eventName) {
      throw new Error(errorMessages);
    }
    return this.listeners[eventName] || [];
  }
};
