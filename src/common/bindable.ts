export abstract class Bindable {
    constructor() {
        const proto = Object.getPrototypeOf(this);
        const methods = Object.getOwnPropertyNames(proto);
        for (const method of methods) {
            if (method === "constructor") continue;

            // @ts-expect-error Element implicity has 'any' type
            this[method] = this[method].bind(this);
        }
    }
}
