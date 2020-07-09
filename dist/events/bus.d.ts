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
    private callbacks;
    /**
     * Collection of callbacks that are executed for all events (global callbacks)
     */
    private globals;
    /**
     * Temporary storage for the current event's data
     */
    private eventData;
    /**
     * The last index
     */
    private last;
    /**
     * Add an event listener for the specified event
     *
     * @param event The unique identifier for the event
     * @param callable Callback for when the event is fired
     */
    listen(event: string, callable: Function): number;
    /**
     * Remove the specified listener for the specified event
     *
     * @param event The event to remove a listener for
     * @param id The ID of the listener to remove
     */
    removeListener(event: string, id: Number): boolean;
    /**
     * Checks if the specified event has any listeners *kind of
     *
     * @param event The event to check for
     */
    private hasListenersForEvent;
    /**
     * Get the ID for the next callback
     */
    private id;
    /**
     * Fires an event
     *
     *
     * @param event The identifier of the event being fired
     * @param data Optional data to pass to the event callback(s)
     */
    fire(event: string, ...data: any): Promise<void>;
    /**
     * Executes the callbacks passing in the events' data
     *
     * @todo Research if this is the only way
     *
     * @param callbacks
     */
    private execute;
    /**
     * Executes the global callbacks passing in the events' data
     *
     * @todo Research if this is the only way
     *
     * @param callbacks
     */
    private executeGlobals;
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
    extend(callback: Function): number;
}
