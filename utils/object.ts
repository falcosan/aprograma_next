export function filterObjProperties<T extends object>(data: object, filters: string | string[], rule: boolean) {
    return Object.fromEntries(
        Object.entries(data).filter(([k, v]) =>
            k
                ? rule
                    ? new RegExp(Array.isArray(filters) ? filters.join('|') : filters).test(k)
                    : !new RegExp(Array.isArray(filters) ? filters.join('|') : filters).test(k)
                : { [k]: v },
        ),
    ) as T;
}
