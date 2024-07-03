import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        let currentSquare: Square = board.findPiece(this);

        let availableSquares: Square[] = new Array(0);
        availableSquares.push(Square.at(currentSquare.row + 1, currentSquare.col - 2));
        availableSquares.push(Square.at(currentSquare.row - 1, currentSquare.col - 2));
        availableSquares.push(Square.at(currentSquare.row + 2, currentSquare.col - 1));
        availableSquares.push(Square.at(currentSquare.row - 2, currentSquare.col - 1));

        availableSquares.push(Square.at(currentSquare.row + 1, currentSquare.col + 2));
        availableSquares.push(Square.at(currentSquare.row - 1, currentSquare.col + 2));
        availableSquares.push(Square.at(currentSquare.row + 2, currentSquare.col + 1));
        availableSquares.push(Square.at(currentSquare.row - 2, currentSquare.col + 1));

        for(let i = 0; i < availableSquares.length; i++){
            if(Board.positionsExists(availableSquares[i].row, availableSquares[i].col)){
                let hitPiece: Piece | undefined = board.getPiece(availableSquares[i]);
                if(hitPiece === undefined || (hitPiece.player !== this.player && ! (hitPiece instanceof King))){
                    moves.push(availableSquares[i]);
                }
            }
        }

        return moves;
    }
}
