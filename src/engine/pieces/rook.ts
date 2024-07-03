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

        if(currentSquare.col < 7) {
            for (let x = currentSquare.col + 1; x < 8; x++) {
                if (board.getPiece(Square.at(currentSquare.row, x)) !== undefined) {
                    break;
                }
                moves.push(Square.at(currentSquare.row, x));
            }
        }
        if(currentSquare.col > 0) {
            for (let x = currentSquare.col - 1; x >= 0; x--) {
                if (board.getPiece(Square.at(currentSquare.row, x)) !== undefined) {
                    break;
                }
                moves.push(Square.at(currentSquare.row, x));
            }
        }

        if(currentSquare.row < 7) {
            for (let y = currentSquare.row + 1; y < 8; y++) {
                if (board.getPiece(Square.at(y, currentSquare.col)) !== undefined) {
                    break;
                }
                moves.push(Square.at(y, currentSquare.col));
            }
        }
        if(currentSquare.row > 0) {
            for (let y = currentSquare.row - 1; y >= 0; y--) {
                if (board.getPiece(Square.at(y, currentSquare.col)) !== undefined) {
                    break;
                }
                moves.push(Square.at(y, currentSquare.col));
            }
        }

        return moves;
    }
}
