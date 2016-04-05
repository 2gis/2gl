export function use() {
    global.document = {
        getElementById() {
            return {
                getContext() {
                    return {};
                }
            };
        }
    };
}

export function restore() {
    delete global.document;
}
