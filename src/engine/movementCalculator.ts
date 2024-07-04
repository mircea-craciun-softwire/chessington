import Square from "./square";
import Board from "./board";
import Piece from "./pieces/piece";
import King from "./pieces/king";

export default class MovementCalculator {

    public static checkInDirection(piece: Piece, moves: Square[], board: Board, xDir: number, yDir: number): void {
        let currentSquare: Square = board.findPiece(piece);

        let x: number = currentSquare.col + xDir;
        let y: number = currentSquare.row + yDir;

        while (Board.positionsExists(y, x)) {
            const hitPiece: Piece | undefined = board.getPiece(Square.at(y, x));

            if (hitPiece !== undefined) {
                if (hitPiece.player === piece.player){
                    break;
                }
                if (hitPiece instanceof King){
                    break;
                }
                moves.push(Square.at(y, x));
                break;
            }

            moves.push(Square.at(y, x));
            x += xDir;
            y += yDir;
        }
    }
}