class Store<T> extends Array {
    protected index:{ [field: string]: { [index: string]: T } } = {};

    constructor(array?:T[]) {
        super(array ? array.length : 0);
        if (array) {
            for (var i = 0; i < array.length; i++) {
                this[i] = array[i];
            }
        }
        this.length = array.length;
    }

    protected addIndex(field:string) {
        this.index[field] = {};
        for (let item of this) {
            this.addToFieldIndex(item, field);
        }
        return this;
    }

    protected addToFieldIndex(item:T, field:string) {
        this.index[field][item[field]] = item;
    }

    protected addToIndex(item:T) {
        for (let field in this.index) {
            this.addToFieldIndex(item, field);
        }
        return this;
    }

    protected removeFromIndex(item:T) {
        for (let field in this.index) {
            this.index[field][item[field]] = null;
        }
        return this;
    }

    update() {
        return this;
    }

    clear() {
        for (let i = 0; i < this.length; i++) {
            super.pop();
        }
        for (let field in this.index) {
            this.index[field] = {};
        }
        this.update();
        return this;
    }

    getBy(field:string, value:string | number, nullIfNothing = false):T {
        if (!(field in this.index)) {
            this.addIndex(field);
        }
        if (this.index[field][value] == null) {
            if (nullIfNothing) {
                return null;
            }
            else {
                console.error('Item not found', field, value);
            }
        }
        else {
            return this.index[field][value];
        }
    }

    remove(item:T) {
        let pos = this.indexOf(item);
        if (pos > -1) {
            this.splice(pos, 1);
            this.update();
        }
        else {
            console.error('Item not found', item);
        }
        return this;
    }

    push(...items:T[]):number {
        for (let item of items) {
            this.addToIndex(item);
        }
        var res = super.push(...items);
        this.update();
        return res;
    }

    unshift(...items:T[]):number {
        for (let item of items) {
            this.addToIndex(item);
        }
        var res = super.unshift(...items);
        this.update();
        return res;
    }

    shift():T {
        this.removeFromIndex(this[0]);
        var res = super.shift();
        this.update();
        return res;
    }

    pop():T {
        this.removeFromIndex(this[this.length - 1]);
        var res = super.pop();
        this.update();
        return res;
    }

    reverse():Store<T> {
        super.reverse();
        this.update();
        return this;
    }

    splice(start:number, deleteCount?:number, ...items:T[]):Store<T> {
        for (let item of items) {
            this.addToIndex(item);
        }
        for (let i = start; i < start + deleteCount; i++) {
            this.removeFromIndex(this[i]);
        }
        super.splice(start, deleteCount, ...items);
        this.update();
        return this;
    }

    sort(compareFn?:(a:T, b:T) => number):Store<T> {
        super.sort(compareFn);
        this.update();
        return this;
    }

    // return new Arrays
    slice(start:number, end?:number):Store<T> {
        return new Store(super.slice(start, end));
    }

    map<U>(callbackfn:(value:T, index:number, array:T[]) => U, thisArg?:any):Store<U> {
        return new Store(super.map(callbackfn, thisArg));
    }

    filter(callbackfn:(value:T, index:number, array:T[]) => boolean, thisArg?:any):Store<T> {
        return new Store(super.filter(callbackfn, thisArg));
    }

    firstWhere(callbackfn:(value:T, index:number, array:T[]) => boolean, nullIfNothing = false):T {
        for (let i = 0; i < this.length; i++) {
            if (callbackfn(this[i], i, this)) {
                return this[i];
            }
        }
        if (nullIfNothing) {
            console.error('Item not found');
        }
        return null;
    }

    concat<U extends T[]>(...items:U[]):Store<T>;
    concat(...items:T[]):Store<T> {
        return new Store(super.concat(...items));
    }
}

class IDStore<T> extends Store<T> {
    getById(id:number) {
        return this.getBy('id', id);
    }

    getByEventId(id:number) {
        return this.getBy('eventId', id);
    }

    removeById(id:number) {
        this.remove(this.getById(id));
    }
}

var a = [{id: 10, eventId: 100}, {id: 11, eventId: 101}, {id: 12, eventId: 102}, {id: 13, eventId: 103}, {
    id: 14,
    eventId: 104
}];
var store = new IDStore(a);
store.getById(11);
