import { Board } from "./board.ts";
import { PieceO, PieceS, PieceX, PieceY, PieceZ, piece } from "./cell.ts";
import { Player } from "./player.ts";

export class Game{
    board : Board;
    players : Player[] =[];
    
    constructor(){
        this.setBoard();
    }

    setBoard(size : number = 3){
        this.board = new Board(size);
    }

    addPlayer(playerName : string , playerPiece : string){
        let pieceType;
        if(playerPiece == piece.X){
               pieceType = new PieceX();
        }else if(playerPiece == piece.O){
            pieceType = new PieceO();
        }else if(playerPiece == piece.Y){
            pieceType = new PieceY()
        }else if(playerPiece == piece.Z){
            pieceType = new PieceZ();
        }else if(playerPiece == piece.S){
            pieceType = new PieceS();
        }

        this.players.push(new Player(playerName , pieceType.piece))

    }

    getBoardStatus(){
        return this.board.getBoardStatus();
    }
    

    isValidPosition(r : number , c : number , player : Player){
        let isValidPosition = this.board.addPeice(r , c , player.getPiece());
        if (!isValidPosition){
            return false
        }

        this.players = this.players.slice(1 , this.players.length);
        this.players.push(player);
        return true
    }

    checkGameStatus(r : number , c : number , player : Player){
        let [isWin , direction] = this.board.checkWinner(r , c , player.getPiece());
        if(isWin){
            return ['win' , direction]
        }
        let tie = this.board.isTie();
        if(tie){
            return ['tie' , tie]
        }


    }
    currentPlayer(){
        return this.players[0];
    }

    getAllPieace(){
        return piece
    }
    getPieceArray(){
        return Object.keys(piece);
    }
}