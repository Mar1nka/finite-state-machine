class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (arguments.length === 0) {
            throw new Error();
        } else {
            this.prevHistory = [];
            this.nextHistory = [];

            this.stateInitial = config.initial;
            this.currentState = config.initial;
            this.states = config.states;
        }
    }


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
            if (this.currentState != state) {
                this.prevHistory.push(this.currentState);
                this.currentState = state;
            }
        }
        else{
            throw new Error();
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

                        var state = stateObj[key].transitions[key2];

                        this.changeState(state);

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
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.stateInitial;
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
        if(this.prevHistory.length === 0) {
            return false;
        }else {
            if(this.nextHistory[this.nextHistory.length - 1] != this.currentState) {
                this.nextHistory.push(this.currentState);
            }

            this.currentState = this.prevHistory[this.prevHistory.length - 1]
            this.prevHistory.splice(this.prevHistory.length - 1, 1);

            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.nextHistory.length === 0) {
            return false;
        }else {
            this.prevHistory.push(this.currentState);
            this.currentState = this.nextHistory[this.nextHistory.length - 1];
            this.nextHistory.splice(this.nextHistory.length - 1, 1);

            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevHistory = [];
        this.nextHistory = [];
        this.currentState = this.stateInitial;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
