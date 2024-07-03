import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        let currentSquare: Square = board.findPiece(this);

        for(let i = 0; i < 8;i ++){
            let difference: number = Math.abs(currentSquare.col - i);

            if(difference === 0)continue;

            let yPositionUp: number = currentSquare.row + difference;
            let yPositionDown: number = currentSquare.row - difference;

            if(yPositionUp < 8) {
                moves.push(Square.at(yPositionUp, i))
            }
            if(yPositionDown >= 0) {
                moves.push(Square.at(yPositionDown, i))
            }
        }

        return moves;
    }
}
