import { piece } from "./cell.ts";

export class Player{
    name : string | null;
    piece: piece;

    constructor(name : string | null , piece : piece){
        this.name = name;
        this.piece = piece;
    }

    getName(){
        return this.name;
    }

    getPiece(){
        return this.piece;
    }

}