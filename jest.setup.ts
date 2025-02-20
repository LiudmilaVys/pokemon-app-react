import '@testing-library/jest-dom';
import 'fast-text-encoding';
import 'whatwg-fetch';
import 'web-streams-polyfill/polyfill';
new ReadableStream();

class MockBroadcastChannel {
  name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => object) | null =
    null;
  onmessageerror:
    | ((this: BroadcastChannel, ev: MessageEvent) => object)
    | null = null;

  constructor(name: string) {
    this.name = name;
  }

  postMessage(message) {
    if (this.onmessage) {
      this.onmessage(new MessageEvent('message', { data: message }));
    }
  }

  close() {}

  addEventListener() {}

  removeEventListener() {}

  dispatchEvent() {
    return true;
  }
}

global.BroadcastChannel = MockBroadcastChannel;
