export class Debugger {
    private _verboseEnabled: boolean = import.meta.env.VITE_VERBOSE_DEBUG === 'true';
    private _debugEnabled: boolean = import.meta.env.VITE_DEBUG_ENABLE === 'true';
    private static _instance: Debugger;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {
    }

    private static get instance() {
        if (!Debugger._instance) Debugger._instance = new Debugger();

        return Debugger._instance;
    }


    private static get verboseEnabled() {
        return this.instance._verboseEnabled;
    }

    private static get debugEnabled() {
        return this.instance._debugEnabled;
    }

    public static debug(...message: any) {
        if (!this.debugEnabled) return;

        console.log(message);
    }

    public static verbose(...message: any) {
        if (!this.verboseEnabled) return;

        console.debug(message);
    }

    public static table(...message: any) {
        console.table(message);
    }

    public static log(...message: any) {
        console.log(message);
    }
}
