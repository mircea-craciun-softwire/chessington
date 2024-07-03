import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        let currentSquare: Square = board.findPiece(this);

        if(this.player === Player.WHITE) {
            moves.push(Square.at(currentSquare.row + 1, currentSquare.col));
            if(currentSquare.row === 1){
                moves.push(Square.at(currentSquare.row + 2, currentSquare.col));
            }
        }else {
            moves.push(Square.at(currentSquare.row - 1, currentSquare.col));
            if(currentSquare.row === 6){
                moves.push(Square.at(currentSquare.row - 2, currentSquare.col));
            }
        }
        return moves;

    }
}
