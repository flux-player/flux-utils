import { log } from "..";

/**
 * Defines the structure of the the callback collection
 */
export interface CallbackCollection {
  [index: string]: Array<CallbackItem>;
}

export interface GlobalCallbackCollection {
  [index: number]: CallbackItem;
}

export interface CallbackItem {
  id: Number;
  callback: Function;
}

export default class EventBus {
  /**
   * Collection of callbacks registered for all events added to the event bus
   */
  private callbacks: CallbackCollection = {};

  /**
   * Collection of callbacks that are executed for all events (global callbacks)
   */
  private globals: GlobalCallbackCollection = {};

  /**
   * Temporary storage for the current event's data
   */
  private eventData: any = null;

  /**
   * The last index
   */
  private last: number = 0;

  /**
   * Add an event listener for the specified event
   *
   * @param event The unique identifier for the event
   * @param callable Callback for when the event is fired
   */
  public listen(event: string, callable: Function): number {
    if (!this.callbacks.hasOwnProperty(event)) {
      Object.defineProperty(this.callbacks, event, {
        value: [],
        writable: true,
      });
    }

    // Generate random identifier for callback
    let index = this.id();

    // Push the new callback
    this.callbacks[event].push({
      id: index,
      callback: callable,
    });

    log(
      "info",
      `Registered event listener for event ${event} with ID ${index}`
    );

    return index;
  }

  /**
   * Remove the specified listener for the specified event
   *
   * @param event The event to remove a listener for
   * @param id The ID of the listener to remove
   */
  public removeListener(event: string, id: Number): boolean {
    if (!this.hasListenersForEvent(event)) return false;

    // Remove the listener at the specified event
    this.callbacks[event] = this.callbacks[event].filter((callback) => {
      return id !== callback.id;
    });

    return true;
  }

  /**
   * Checks if the specified event has any listeners *kind of
   *
   * @param event The event to check for
   */
  private hasListenersForEvent(event: string): boolean {
    return this.callbacks.hasOwnProperty(event);
  }

  /**
   * Get the ID for the next callback
   */
  private id(): number {
    // Get the current index
    let value = this.last;

    // Increment the index
    this.last++;

    // Return the current index
    return value;
  }

  /**
   * Fires an event
   *
   *
   * @param event The identifier of the event being fired
   * @param data Optional data to pass to the event callback(s)
   */
  public async fire(event: string, ...data: any): Promise<void> {
    let callbacks: CallbackItem[] = this.callbacks.hasOwnProperty(event)
      ? this.callbacks[event]
      : [];

    // Set the data of the event to the data passed into the broadcast method
    this.eventData = data;

    // Execute all global callbacks
    await this.executeGlobals(event);

    // There's no listeners
    if (!callbacks.length) return;

    log(
      "info",
      `Firing event ${event}. Executing ${callbacks.length} listeners`
    );

    // Execute all the callbacks in parallel
    await this.execute(callbacks);

    // Reset event data to null (so we don't get spillover of data between events)
    this.eventData = null;
  }

  /**
   * Executes the callbacks passing in the events' data
   *
   * @todo Research if this is the only way
   *
   * @param callbacks
   */
  private async execute(callbacks: CallbackItem[]): Promise<void> {
    callbacks.forEach((item) => item.callback(...this.eventData));
  }

  /**
   * Executes the global callbacks passing in the events' data
   *
   * @todo Research if this is the only way
   *
   * @param callbacks
   */
  private async executeGlobals(event: string): Promise<void> {
    for (const key in this.globals) {
      if (this.globals.hasOwnProperty(key)) {
        this.globals[key].callback(event, ...this.eventData);
      }
    }
  }

  /**
   * Register a global event listener. T
   *
   * My rationale for this is when we want to extend this event bus with a third party event
   * system, you can use this method to register a listener that listens to every event and
   * bypasses the event and it's data to the third party system
   *
   * For example in Vue.
   *
   * this.bus.extend((event, data) => this.$emit(event, data));
   *
   * @param callback
   */
  public extend(callback: Function): number {
    let id = this.id();

    this.globals[id] = {
      id,
      callback,
    };

    return id;
  }
}
