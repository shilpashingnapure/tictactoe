export enum piece {
    X = 'X' ,
    O = 'O' ,
    Y = 'Y',
    Z = 'Z',
    S = 'S'
}

export class CellType{
    piece : piece;
    constructor(piece : piece){
        this.piece = piece;
    }
}

export class PieceX extends CellType{
    constructor(){
        super(piece.X);
    }
}

export class PieceO extends CellType{
    constructor(){
        super(piece.O);
    }
}

export class PieceY extends CellType{
    constructor(){
        super(piece.Y);
    }
}

export class PieceZ extends CellType{
    constructor(){
        super(piece.Z)
    }
}

export class PieceS extends CellType{
    constructor(){
        super(piece.S)
    }
}

