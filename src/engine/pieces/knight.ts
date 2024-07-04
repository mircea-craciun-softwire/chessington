import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import Helper from "../helper/helper";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAreaOfControl(board: Board): Square[] {
        const moves: Square[] = new Array(0);
        const possibleMoves = this.getPossibleMoves(board.findPiece(this));
        this.extractValidMoves(possibleMoves, board, moves, false);

        return moves;
    }

    public getAvailableMoves(board: Board) {
        const moves: Square[] = new Array(0);
        const currentSquare: Square = board.findPiece(this);
        const availableSquares = this.getPossibleMoves(currentSquare);

        this.extractValidMoves(availableSquares, board, moves);

        if(board.checkedPlayer === this.player){
            return Helper.squaresArrayIntersection(moves, board.lastPlayerAreaOfControl);
        }else {
            return moves;
        }
    }

    private getPossibleMoves(currentSquare: Square) {
        let availableSquares: Square[] = new Array(0);
        availableSquares.push(Square.at(currentSquare.row + 1, currentSquare.col - 2));
        availableSquares.push(Square.at(currentSquare.row - 1, currentSquare.col - 2));
        availableSquares.push(Square.at(currentSquare.row + 2, currentSquare.col - 1));
        availableSquares.push(Square.at(currentSquare.row - 2, currentSquare.col - 1));

        availableSquares.push(Square.at(currentSquare.row + 1, currentSquare.col + 2));
        availableSquares.push(Square.at(currentSquare.row - 1, currentSquare.col + 2));
        availableSquares.push(Square.at(currentSquare.row + 2, currentSquare.col + 1));
        availableSquares.push(Square.at(currentSquare.row - 2, currentSquare.col + 1));
        return availableSquares;
    }

    private extractValidMoves(availableSquares: Square[], board: Board, moves: Square[], excludeKing: boolean = true) {
        for (let i = 0; i < availableSquares.length; i++) {
            if (Board.positionsExists(availableSquares[i].row, availableSquares[i].col)) {
                let hitPiece: Piece | undefined = board.getPiece(availableSquares[i]);
                if (hitPiece === undefined || (hitPiece.player !== this.player && (!excludeKing || !(hitPiece instanceof King)))) {
                    moves.push(availableSquares[i]);
                }
            }
        }
    }
}
