import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import MovementCalculator from "../movementCalculator";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        MovementCalculator.checkInDirection(this, moves, board, 1, 0);
        MovementCalculator.checkInDirection(this, moves, board, -1, 0);
        MovementCalculator.checkInDirection(this, moves, board, 0, -1);
        MovementCalculator.checkInDirection(this, moves, board, 0, 1);

        MovementCalculator.checkInDirection(this, moves, board, 1, 1);
        MovementCalculator.checkInDirection(this, moves, board, -1, 1);
        MovementCalculator.checkInDirection(this, moves, board, 1, -1);
        MovementCalculator.checkInDirection(this, moves, board, -1, -1);

        return moves;
    }

}
