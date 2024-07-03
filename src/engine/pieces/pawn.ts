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

            if(board.getPiece(Square.at(currentSquare.row + 1, currentSquare.col)) === undefined) {
                moves.push(Square.at(currentSquare.row + 1, currentSquare.col));
                if(currentSquare.row === 1){
                    if(board.getPiece(Square.at(currentSquare.row + 2, currentSquare.col)) === undefined) {
                        moves.push(Square.at(currentSquare.row + 2, currentSquare.col));
                    }
                }
            }

        }else {


            if(board.getPiece(Square.at(currentSquare.row - 1, currentSquare.col)) === undefined) {
                moves.push(Square.at(currentSquare.row - 1, currentSquare.col));
                if(currentSquare.row === 6){
                    if(board.getPiece(Square.at(currentSquare.row - 2, currentSquare.col)) === undefined) {
                        moves.push(Square.at(currentSquare.row - 2, currentSquare.col));
                    }
                }
            }

        }
        return moves;

    }
}
