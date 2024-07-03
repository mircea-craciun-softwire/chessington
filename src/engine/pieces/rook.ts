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

        let currentSquare: Square = board.findPiece(this);

        for(let i = 0; i < 8; i++){
            if(i != currentSquare.row){
                moves.push(Square.at(i, currentSquare.col));
            }
            if(i != currentSquare.col) {
                moves.push(Square.at(currentSquare.row, i));
            }
        }

        return moves;
    }
}
