import {Server} from "socket.io";
import {Team, User} from "./user";
import Timeout = NodeJS.Timeout;

const roundTime = 15000;
const initialHealth = 100;
const roundCount = 2;
const timeBetweenRounds = 1000;

const damageTable = [[4,1,2],[1,2,4],[2,4,1]];

export class Game {

    private votes: [number[], number[]];
    private voteCount: number;
    private currentHealth: number = initialHealth;
    private currentTurn: number = 0;
    private end: boolean = false;
    private timeout: Timeout;
    constructor(private io: Server, private users: User[]) {}

    start() {
        this.io.emit('starting');
        setTimeout(() => {
            this.beginVote();
        }, timeBetweenRounds);

    }

    stop() {
        this.end = true;
        clearTimeout(this.timeout);
    }


    beginVote() {
        console.log('round starting');
        this.io.emit('vote');
        this.votes = [[], []];
        this.voteCount = 0;
        const startTime = Date.now();
        this.tick(startTime);
        this.users.forEach((u) => {
            u.socket.on('vote', (value: string) => {
                console.log(`vote ${value} received from ${u.name}`);
                this.votes[u.team].push(Number(value));
                this.voteCount++;
            });
        });
        this.currentTurn++;
    }
    private tick(startTime: number) {
        if(Date.now() < startTime + roundTime * 1000 && this.voteCount < this.votes[0].length + this.votes[1].length) {
            this.io.emit('time-remaining', (startTime + roundTime) - Date.now());
            this.timeout = setTimeout(() => this.tick(startTime), 500);
        }
        else {
            this.io.emit('vote-complete');
            this.resolveTurn();
        }
    }

    private resolveTurn() {
        const chaosAction = mode(this.votes[Team.CHAOS]);
        const orderAction = mode(this.votes[Team.ORDER]);
        console.log(`o:${orderAction} c:${chaosAction}`);
        let damage;

        if(chaosAction === undefined && orderAction === undefined) {
            console.log('sigh');
            damage = 100;
        }
        else if(chaosAction === undefined) {
            damage = 0;
        }
        else if(orderAction === undefined) {
            damage = 4;
        }
        else {
            damage = damageTable[orderAction][chaosAction]
        }

        this.io.emit('resolved', orderAction, chaosAction);

        console.log(`damage: ${damage}`);
        this.currentHealth -= damage;
        if (this.currentHealth > 0) {
            console.log(`health is ${this.currentHealth}`);
            this.io.emit('damage', damage);
            setTimeout(() => {
                this.nextTurn();
            }, timeBetweenRounds);

        }
        else if(this.currentTurn < roundCount) {
            console.log('chaos victory');
            this.io.emit('end', Team.CHAOS);
        }
        else {
            console.log('order victory');
            this.io.emit('end', Team.ORDER);
        }
    }

    nextTurn() {
        this.beginVote();
    }
}

function mode<T>(arr: T[]): T|undefined{
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}