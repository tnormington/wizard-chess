const States = {
    currentState: null,
    running: false,
    turnStates: [
        {
            name: 'start',
        },
        {
            name: 'deploy',
        },
        {
            name: 'command',
        },
        {
            name: 'endTurn',
        }
    ],
    beginTurn: function() {
        console.log('States.beginTurn');
        this.running = true;

        
        // while(this.running) {
        //     this.currentState = this.turnStates[0];
        //     let state = this.currentState;
        //     console.log('current state: ' + state);
        // }
    }

};


export default States;