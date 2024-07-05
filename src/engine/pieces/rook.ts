import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import MovementCalculator from "../movementCalculator";
import Helper from "../helper/helper";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAreaOfControl(board: Board): Square[] {
        let moves: Square[] = new Array(0);

        MovementCalculator.checkInDirection(this, moves, board, 1, 0, false);
        MovementCalculator.checkInDirection(this, moves, board, -1, 0, false);
        MovementCalculator.checkInDirection(this, moves, board, 0, -1, false);
        MovementCalculator.checkInDirection(this, moves, board, 0, 1, false);

        return moves;
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        MovementCalculator.checkInDirection(this, moves, board, 1, 0);
        MovementCalculator.checkInDirection(this, moves, board, -1, 0);
        MovementCalculator.checkInDirection(this, moves, board, 0, -1);
        MovementCalculator.checkInDirection(this, moves, board, 0, 1);

        if(board.checkedPlayer === this.player){
            return Helper.squaresArrayIntersection(moves, board.lastPlayerAreaOfControl);
        }else {
            return moves;
        }
    }

}
