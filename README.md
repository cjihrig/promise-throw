# promise-throw

Turn `process` `Promise` events into thrown exceptions.

- Intended to be used by applications, not other modules.
- Handled `'unhandledRejection'` and `'multipleResolves'` events.
  - `'multipleResolves'` is currently not handled because `Promise.race()` currently triggers this event.
- JavaScript `Error` serialization is very lossy.
- Primary goal is to maintain state during serialization due to:
  - `util.inspect()`
  - `toString()`
  - `JSON.stringify()`
  - Uncaught exception that terminates the process.
- Compatible with `--abort-on-uncaught-exception`.
