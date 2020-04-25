import { useState } from "react";

export type Link<T extends any> = [T, (v: T) => void];

export const updateObject = <T extends any>([value, setValue]: Link<
    T
    >): ObjectLink<T> => ({
    value,
    update: (updatedValue: Partial<T>) => setValue({ ...value, ...updatedValue }),
    set: (newValue: T) => setValue({ ...newValue  }),
    cb: (key: string) => (updated: any) => setValue({ ...value, [key]: updated }),
    inputCb: (key: string) => (e: any) => setValue({ ...value, [key]: e.target.value }),
});

export const createArrayLinkInterface = <T extends any>([value, setValue]: Link<
    T[]
    >): ArrayLink<T> => {
    const remove = (index: number) => {
        value.splice(index, 1);
        setValue([...value]);
    };

    return {
        value,
        update: (index: number, updatedValue: T) => {
            value[index] = updatedValue;
            setValue([...value]);
        },
        add: (item: T) => {
            value.push(item);
            setValue([...value]);
        },
        remove,
        pop: () => remove(value.length - 1),
        set: (newValue: T[]) => setValue(newValue),
        move: (oldIndex, newIndex) => {
            if (newIndex >= value.length) {
                var k = newIndex - value.length + 1;
                while (k--) {
                    //@ts-ignore
                    value.push(undefined);
                }
            }
            value.splice(newIndex, 0, value.splice(oldIndex, 1)[0]);
            setValue([...value]);
        }
    };
};

export const updateOne = <T extends any>([value, setValue]: Link<T>) => ({
    value,
    update: setValue
});

export const updateSingle = <T extends any>([value, setValue]: Link<T>) => ({
    value,
    set: setValue,
    cb: (value: T) => () => setValue(value)
});

export interface ObjectLink<T> {
    update: (updatedValue: Partial<T>) => void;
    set: (value: T) => void;
    value: T;
    cb: Function;
    inputCb: Function;
}

export interface ArrayLink<T> {
    update: (index: number, updatedValue: T) => void;
    set: (value: T[]) => void;
    add: (item: T) => void;
    move: (oldIndex: number, newIndex: number) => void;
    remove: (index: number) => void;
    pop: () => void;
    value: T[];
}
export interface SingleLink<T> {
    set: (value: T) => void;
    cb: (value: T) => () => void;
    value: T;
}

export const useObjectLink = <T>(initState: T | (() => T)): ObjectLink<T> => {
    const value = useState(initState);
    return updateObject(value);
};

export const useArrayLink = <T>(initState: T[] | (() => T[])): ArrayLink<T> => {
    const value = useState<T[]>(initState);
    return {
        ...createArrayLinkInterface<T>(value)
    };
};

export const useSingleLink = <T>(initState: T | (() => T)): SingleLink<T> => {
    const value = useState(initState);
    return updateSingle(value);
};
