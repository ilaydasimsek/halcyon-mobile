import { EventEmitter } from 'eventemitter3';

/**
 * The event emitter that is used globally to subscribe to events and send events
 */
export const eventEmitter = new EventEmitter();
