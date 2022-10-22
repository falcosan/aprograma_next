export function rangeItems(val: number, max: number) {
    return val < 1 ? 1 : val > max ? max : val;
}

export function uuidGenerator() {
    if (typeof self.crypto.randomUUID != 'undefined') {
        return self.crypto.randomUUID();
    } else if (typeof self.crypto.getRandomValues != 'undefined') {
        const e = (([1e7] as never) + -1e3 + -4e3 + -8e3 + -1e11) as unknown as string;
        return e.replace(/[018]/g, (c) => {
            return (
                (c as unknown as number) ^
                (self.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> ((c as unknown as number) / 4)))
            ).toString(16);
        });
    } else {
        let date = new Date().getTime();
        let init = (performance && performance.now && performance.now() * 1000) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (acc) => {
            let random = Math.random() * 16;
            if (date > 0) {
                random = (date + random) % 16 | 0;
                date = Math.floor(date / 16);
            } else {
                random = (init + random) % 16 | 0;
                init = Math.floor(init / 16);
            }
            return (acc == 'x' ? random : (random & 0x7) | 0x8).toString(16);
        });
    }
}
