import EventBus from "./bus";
export default abstract class BroadcastsEvents {
    private bus;
    /**
     * BroadcastsEvents constructor
     *
     * @param bus Optionally, you can pass an event bus to utilize, useful when you want to
     * have a global event bus
     */
    protected constructor(bus?: EventBus | undefined);
    /**
     * Subsribe to the specified event
     *
     * @param event The event to subscribe to
     * @param callable The callback to execute
     */
    subscribeEvent(event: string, callable: Function): void;
    /**
     * Raise the specified event.
     *
     * @param event The event to subscribe to
     * @param callable The callback to execute
     */
    protected raiseEvent(event: string, ...data: any): Promise<void>;
}
