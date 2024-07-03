import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        this.checkInDirection(moves, board,1,0);
        this.checkInDirection(moves, board, -1,0);
        this.checkInDirection(moves, board, 0,-1);
        this.checkInDirection(moves, board, 0,1);

        return moves;
    }
    private checkInDirection(moves: Square[], board: Board, xDir: number, yDir: number): void{
        let currentSquare: Square = board.findPiece(this);

        let x: number = currentSquare.col + xDir;
        let y: number = currentSquare.row + yDir;
        while( Board.positionsExists(y,x) && board.getPiece(Square.at(y,x)) === undefined ){
            moves.push(Square.at(y,x));
            x+= xDir;
            y+= yDir;
        }
    }
}
