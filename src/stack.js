class Stack {
    constructor() {
        this.arr = [];
    }

    push(element) {
        this.arr.push(element);
    }

    pop() {
        if(this.arr.length) {
            var lastElement = this.arr[this.arr.length - 1];
            this.arr.splice(this.arr.length - 1, 1);
            return lastElement;
        }
        else {
            return null;
        }
    }

    getLastElement() {
        if(this.arr.length) {
            return this.arr[this.arr.length - 1];
        }
        else {
            return null;
        }
    }

    length(){
        return this.arr.length;
    }

    clean() {
        this.arr = [];
    }
}

module.exports = Stack;