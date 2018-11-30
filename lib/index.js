'use strict';
const Util = require('util');


class PromiseError extends Error {
  constructor (event, type, promise, reason) {
    const message = Util.inspect(reason) +
      (reason instanceof Error ? '\n    ---' : '');

    super(message);
    this.event = event;
    this.type = type;
    this.promise = promise;
    this.reason = reason;
  }
  get name () {
    return `PromiseError[${this.event}]`;
  }
  toString () {
    return Util.inspect(this);
  }
  toJSON () {
    return {
      name: this.name,
      type: this.type,
      promise: Util.inspect(this.promise),
      reason: Util.inspect(this.reason)
    };
  }
}


function onUnhandledRejection (reason, promise) {
  throw new PromiseError('unhandledRejection',
    'unhandledRejection', promise, reason);
}


function onMultipleResolves (type, promise, reason) {
  throw new PromiseError('multipleResolves', type, promise, reason);
}


function on () {
  process.on('unhandledRejection', onUnhandledRejection);
  process.on('multipleResolves', onMultipleResolves);
}


function off () {
  process.removeListener('unhandledRejection', onUnhandledRejection);
  process.removeListener('multipleResolves', onMultipleResolves);
}


on();
module.exports = { on, off, PromiseError };
