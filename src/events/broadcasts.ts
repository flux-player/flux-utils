import EventBus from "./bus";

export default abstract class BroadcastsEvents {
  private bus: EventBus;

  /**
   * BroadcastsEvents constructor
   *
   * @param bus Optionally, you can pass an event bus to utilize, useful when you want to
   * have a global event bus
   */
  protected constructor(bus: EventBus | undefined = undefined) {
    this.bus = bus ?? new EventBus();
  }

  /**
   * Subsribe to the specified event
   *
   * @param event The event to subscribe to
   * @param callable The callback to execute
   */
  public subscribeEvent(event: string, callable: Function) {
    this.bus.listen(event, callable);
  }

  /**
   * Raise the specified event.
   *
   * @param event The event to subscribe to
   * @param callable The callback to execute
   */
  protected async raiseEvent(event: string, ...data: any) {
    await this.bus.fire(event, ...data);
  }
}
