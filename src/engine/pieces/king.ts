import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        let currentSquare: Square = board.findPiece(this);

        for (let y = currentSquare.row - 1; y <= currentSquare.row + 1; y++){
            for (let x: number = currentSquare.col - 1; x <= currentSquare.col + 1; x++){
                if (Board.positionsExists(y, x) && (y != currentSquare.row || x != currentSquare.col)){
                    const hitPiece: Piece | undefined = board.getPiece(Square.at(y, x));
                    if (hitPiece === undefined || (hitPiece.player !== this.player && ! (hitPiece instanceof King))){
                        moves.push(Square.at(y, x));
                    }
                }
            }
        }



        return moves;
    }


}
