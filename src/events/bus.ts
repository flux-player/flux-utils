import { log } from "../log/logger";
import { randomString } from "../utilities/text";

export default class EventBus {
  /**
   * Collection of callbacks registered for all events added to the event bus
   */
  private callbacks: any = {};

  /**
   * Temporary storage for the current event's data
   */
  private eventData: any = null;
  private last: number = 0;

  /**
   * Add an event listener for the specified event
   *
   * @param event The unique identifier for the event
   * @param callable Callback for when the event is fired
   */
  public listen(event: string, callable: Function) : number {
    if (!this.callbacks.hasOwnProperty(event)) {
      Object.defineProperty(this.callbacks, event, { value: [] });
    }

    // Generate random identifier for callback
    let index = this.id();

    // Push the new callback
    this.callbacks[event][index] = callable;
    
    log("info", `Added a new event listener for event ${event}`);

    return index;
  }


  /**
   * Get the ID for the next callback
   */
  private id(): number {
    let value = this.last;

    this.last++;

    return value;
  }

  /**
   * Fires an event
   *
   *
   * @param event The identifier of the event being fired
   * @param data Optional data to pass to the event callback(s)
   */
  public async fire(event: string, data: any = null) {
    let callbacks: Function[] = this.callbacks.hasOwnProperty(event)
      ? this.callbacks[event]
      : [];

    // Set the data of the event to the data passed into the broadcast method
    this.eventData = data;

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
  private async execute(callbacks: Function[]) {
    callbacks.forEach((callback) => callback(this.eventData));
  }
}
