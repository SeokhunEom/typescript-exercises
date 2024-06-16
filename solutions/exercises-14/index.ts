/*

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
interface MapperFunc<I, O> {
    (): MapperFunc<I, O>;
    (input: I[]): O[];
}

export function map<I, O>(): typeof map;
export function map<I, O>(mapper: (i: I) => O): MapperFunc<I, O>;
export function map<I, O>(mapper: (i: I) => O, input: I[]): O[];
export function map<I, O>(mapper?: (i: I) => O, input?: I[]): typeof map | MapperFunc<I, O> | O[]  {
    if(mapper && input) {
        return input.map(mapper);
    }
    if(mapper) {
        const subFunction = (subInput?: I[]) => subInput ? subInput.map(mapper) : subFunction;
        return subFunction as MapperFunc<I, O>;
    }
    return map;
}

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being filtered using
 * the specified filter function.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being filtered using original filter
 * function.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} filterer
 * @param {Array} input
 * @return {Array | Function}
 */
interface FiltererFunc<I> {
    (): FiltererFunc<I>;
    (input: I[]): I[];
}

export function filter<I>(): typeof filter;
export function filter<I>(filterer: (input: I) => boolean): FiltererFunc<I>;
export function filter<I>(filterer: (input: I) => boolean, input: I[]): I[];
export function filter<I>(filterer?: (input: I) => boolean, input?: I[]): typeof filter | FiltererFunc<I> | I[] {
    if(filterer && input) {
        return input.filter(filterer);
    }
    if(filterer) {
        const subFunction = (subInput?: I[]) => subInput ? subInput.filter(filterer) : subFunction;
        return subFunction as FiltererFunc<I>;
    }
    return filter;
}

/**
 * 3 arguments passed: reduces input array it using the
 * specified reducer and initial value and returns
 * the result.
 *
 * 2 arguments passed: returns a function which accepts
 * input array and reduces it using previously specified
 * reducer and initial value and returns the result.
 *
 * 1 argument passed: returns a function which:
 *   * when 2 arguments is passed to the subfunction, it
 *     reduces the input array using specified initial
 *     value and previously specified reducer and returns
 *     the result.
 *   * when 1 argument is passed to the subfunction, it
 *     returns a function which expects the input array
 *     and reduces the specified input array using
 *     previously specified reducer and inital value.
 *   * when 0 argument is passed to the subfunction, it
 *     returns itself.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} reducer
 * @param {*} initialValue
 * @param {Array} input
 * @return {* | Function}
 */
interface ReducerWithInitialFunc<I, O> {
    (): ReducerWithInitialFunc<I, O>;
    (input: I[]): O;
}

interface ReducerFunc<I, O> {
    (): ReducerFunc<I, O>;
    (initialValue: O): ReducerWithInitialFunc<I, O>;
    (initialValue: O, input: I[]): O;
}

export function reduce<I, O>(): typeof reduce;
export function reduce<I, O>(reducer: (acc: O, val: I) => O): ReducerFunc<I, O>;
export function reduce<I, O>(reducer: (acc: O, val: I) => O, initialValue: O): ReducerWithInitialFunc<I, O>;
export function reduce<I, O>(reducer: (acc: O, val: I) => O, initialValue: O, input: I[]): O;
export function reduce<I, O>(reducer?: (acc: O, val: I) => O, initialValue?: O, input?: I[]): typeof reduce | ReducerFunc<I, O> | ReducerWithInitialFunc<I, O> | O {
    if(reducer && initialValue && input) {
        input.reduce(reducer, initialValue);
    }
    if(reducer && initialValue) {
        const subFunction = (subInput?: I[]) => subInput ? subInput.reduce(reducer, initialValue) : subFunction;
        return subFunction as ReducerWithInitialFunc<I, O>;
    }
    if(reducer) {
        const subFunction = (subInitialValue?: O, subInput?: I[]) => {
            if(subInitialValue && subInput) {
                return subInput.reduce(reducer,subInitialValue);
            }
            if(subInitialValue) {
                const subSubFunction = (subSubInput?: I[]) => subSubInput ? subSubInput.reduce(reducer, subInitialValue) : subSubFunction;
                return subSubFunction as ReducerFunc<I, O>;
            }
            return subFunction;
        }
    }
    return reduce;
}

/**
 * 2 arguments passed: returns sum of a and b.
 *
 * 1 argument passed: returns a function which expects
 * b and returns sum of a and b.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */

interface ArithmeticFunc {
    (): ArithmeticFunc;
    (b: number): number;
}

export function add(): typeof add;
export function add(a: number): ArithmeticFunc;
export function add(a: number, b: number): number;
export function add(a?: number, b?: number): typeof add | ArithmeticFunc | number {
    if(a && b) {
        return a + b;
    }
    if(a) {
        const subFunction = (b?: number) => b ? a + b : subFunction;
        return subFunction as ArithmeticFunc;
    }
    return add;
}

/**
 * 2 arguments passed: subtracts b from a and
 * returns the result.
 *
 * 1 argument passed: returns a function which expects
 * b and subtracts b from a and returns the result.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export function subtract(): typeof add;
export function subtract(a: number): ArithmeticFunc;
export function subtract(a: number, b: number): number;
export function subtract(a?: number, b?: number): typeof subtract | ArithmeticFunc | number {
    if(a && b) {
        return a - b;
    }
    if(a) {
        const subFunction = (b?: number) => b ? a - b : subFunction;
        return subFunction as ArithmeticFunc;
    }
    return subtract;
}

/**
 * 2 arguments passed: returns value of property
 * propName of the specified object.
 *
 * 1 argument passed: returns a function which expects
 * propName and returns value of property propName
 * of the specified object.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Object} obj
 * @param {String} propName
 * @return {* | Function}
 */
interface StringKeyObject {
    [key: string]: any;
}

interface PropNameFunc<K extends string> {
    (): PropNameFunc<K>;
    <O extends {[key in K]: O[K]}>(obj: O): O[K];
}

export function prop<O extends StringKeyObject, K extends string>(): typeof prop;
export function prop<O extends StringKeyObject, K extends string>(propName:  K): PropNameFunc<K>;
export function prop<O extends StringKeyObject, K extends string>(propName: K, obj: O): O[K];
export function prop<O extends StringKeyObject, K extends string>(obj?: O, propName?: K): typeof prop | PropNameFunc<K> | O[K] {
    if(obj && propName) {
        return obj[propName];
    }
    if(obj) {
        const subFunction = (propName?: string) => propName ? obj[propName] : subFunction;
        return subFunction;
    }
    return prop;
}

/**
 * >0 arguments passed: expects each argument to be
 * a function. Returns a function which accepts the
 * same arguments as the first function. Passes these
 * arguments to the first function, the result of
 * the first function passes to the second function,
 * the result of the second function to the third
 * function... and so on. Returns the result of the
 * last function execution.
 *
 * 0 arguments passed: returns itself.
 *
 * TODO TypeScript
 *   * Should properly handle at least 5 arguments.
 *   * Should also make sure argument of the next
 *     function matches the return type of the previous
 *     function.
 *
 * @param {Function[]} functions
 * @return {*}
 */
type PipeFunc<A extends any[], O> = (...args: A) => O;
type IOFunc<I, O> = (arg: I) => O;

export function pipe(): typeof pipe;
export function pipe<A1 extends any[], O1>(f: PipeFunc<A1, O1>): (...args: A1) => O1;
export function pipe<A1 extends any[], O1, O2>(f: PipeFunc<A1, O1>, op1: IOFunc<O1, O2>): (...args: A1) => O2;
export function pipe<A1 extends any[], O1, O2, O3>(f: PipeFunc<A1, O1>, op1: IOFunc<O1, O2>, op2: IOFunc<O2, O3>): (...args: A1) => O3;
export function pipe<A1 extends any[], O1, O2, O3, O4>(f: PipeFunc<A1, O1>, op1: IOFunc<O1, O2>, op2: IOFunc<O2, O3>, op3: IOFunc<O3, O4>): (...args: A1) => O4;
export function pipe<A1 extends any[], O1, O2, O3, O4, O5>(f: PipeFunc<A1, O1>, tr1: IOFunc<O1, O2>, op2: IOFunc<O2, O3>, op3: IOFunc<O3, O4>, op4: IOFunc<O4, O5>): (...args: A1) => O5;
export function pipe(...functions: Function[]) {
    if (arguments.length === 0) {
        return pipe;
    }
    return function subFunction() {
        let nextArguments = Array.from(arguments);
        let result;
        for (const func of functions) {
            result = func(...nextArguments);
            nextArguments = [result];
        }
        return result;
    };
};