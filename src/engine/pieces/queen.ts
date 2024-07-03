import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        this.checkInDirection(moves, board,1,0);
        this.checkInDirection(moves, board, -1,0);
        this.checkInDirection(moves, board, 0,-1);
        this.checkInDirection(moves, board, 0,1);

        this.checkInDirection(moves, board,1,1);
        this.checkInDirection(moves, board, -1,1);
        this.checkInDirection(moves, board, 1,-1);
        this.checkInDirection(moves, board, -1,-1);

        return moves;
    }

    private checkInDirection(moves: Square[], board: Board, xDir: number, yDir: number): void{
        let currentSquare: Square = board.findPiece(this);

        let x: number = currentSquare.col + xDir;
        let y: number = currentSquare.row + yDir;
        while( Board.positionsExists(y,x)){
            let hitPiece: Piece | undefined;
            hitPiece = board.getPiece(Square.at(y,x));

            if(hitPiece !== undefined ){

                if(hitPiece.player === this.player)break;

                if(hitPiece instanceof King) break;

                moves.push(Square.at(y,x));
                break;
            }

            moves.push(Square.at(y,x));
            x+= xDir;
            y+= yDir;
        }
    }
}
