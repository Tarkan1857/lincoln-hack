import {Socket} from "socket.io";
export enum Team {
    ORDER,
    CHAOS
}
export class User {
    public ready: boolean;
    public name: string;

    constructor(public readonly team: Team, public readonly socket: Socket) {
    }
}