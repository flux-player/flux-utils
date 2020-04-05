import EventBus from "./bus";

export default abstract class BroadcastsEvents {
  private bus: EventBus;

  protected constructor(bus: EventBus | undefined = undefined) {
    this.bus = bus ?? new EventBus();
  }

  protected subscribeEvent(event: string, callable: Function) {
    this.bus.listen(event, callable);
  }

  /**
   *
   * @param event
   * @param data
   */
  protected async raiseEvent(event: string, data: any = null) {
    await this.bus.fire(event, data);
  }
}
