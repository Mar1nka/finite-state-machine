class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        //error empty config
        if (arguments.length === 0) {
            //console.log('config error');
            throw new Error();
        } else {
            this.history = [];
            this.index = 0;
            this.history.push('');

            this.stateInitial = config.initial;
            this.currentState = config.initial;
            this.states = config.states;

            this.history.push(this.currentState);
            this.index++;
    }
    }

    getPreviousState() {
        //return this.previousState;
        return this.history[this.index];
    }

    // setPreviousState(){
    //     this.previousState = this.currentState;
    // }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states) {

            this.currentState = state;

            //this.history[this.index] = this.currentState;

            this.history.push(this.currentState);
            this.index = this.history.length - 1;
            //this.index ++;
        }
        else{
            console.log('error in changeState');
            throw new Error();
            //console.log('error in changeState');
            //add error;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var stateObj = [];
        var isFound = false;

        for(var key in this.states) {
            if (key === this.currentState) {
                stateObj[key] = this.states[key];

                for (var key2 in stateObj[key].transitions) {
                    if (key2 === event) {

                        this.currentState = stateObj[key].transitions[key2];

                        this.history.push(this.currentState);
                        this.index = this.history.length - 1;

                        isFound = true;
                        break;
                    }
                }
            }
            if (isFound === true) {
                break;
            }
        }

            if(isFound === false) {
                //console.log('error in trigger');
                //throw new Error();
                //throw new Error();
                //
                //error
            }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.stateInitial;
        // perhaps clearHistory()


        //this.previousState = this.currentState;//setPreviousState();//my fun
        //this.currentState = this.stateInitial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = [];
        if(arguments.length === 0) {
            for(var key in this.states) {
                states.push(key);
            }
        } else {
            for(var key in this.states) {
                for( var key2 in this.states[key].transitions) {
                    if(key2 === event) {
                        states.push(key);
                    }
                }
            }
        }

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.history[this.index - 1] === '') {
            return false;
        }else {

            this.currentState = this.history[this.index - 1];
           // // this.history.push(this.currentState);
            //// this.index ++;
            //this.history.push(this.currentState);
            this.index --;

            //this.previousState = this.currentState;//setPreviousState();//my fun

            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.index >= this.history.length - 1) {
            return false;
        }else {
            this.currentState = this.history[this.index + 1];
            this.index ++;

            //this.previousState = this.currentState;//setPreviousState();//my fun

            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.history.push('');
        this.index = 0;
        this.currentState = this.stateInitial;
        this.history.push(this.currentState);
        this.index++;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

function test(){
    const config = {
        initial: 'normal',
        states: {
            normal: {
                transitions: {
                    study: 'busy',
                }
            },
            busy: {
                transitions: {
                    get_tired: 'sleeping',
                    get_hungry: 'hungry',
                }
            },
            hungry: {
                transitions: {
                    eat: 'normal'
                },
            },
            sleeping: {
                transitions: {
                    get_hungry: 'hungry',
                    get_up: 'normal',
                },
            },
        }
    };

    var student = new FSM(config);

    var state = student.getState();

    student.trigger('study');
    student.undo();

    student.trigger('study');
    student.undo();

    student.trigger('study');
    student.redo();

    var redo = student.redo();//).to.be.false;

    console.log(state, redo);

}

test();