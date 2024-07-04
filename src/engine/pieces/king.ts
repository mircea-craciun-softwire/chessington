import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        let currentSquare: Square = board.findPiece(this);

        for (let y = currentSquare.row - 1; y <= currentSquare.row + 1; y++){
            for (let x: number = currentSquare.col - 1; x <= currentSquare.col + 1; x++){
                if (Board.positionsExists(y, x) && (y != currentSquare.row || x != currentSquare.col)){
                    const hitPiece: Piece | undefined = board.getPiece(Square.at(y, x));
                    if (hitPiece === undefined || (hitPiece.player !== this.player && ! (hitPiece instanceof King))){
                        moves.push(Square.at(y, x));
                    }
                }
            }
        }

        const kingStartRow = this.player === Player.WHITE?0:7;
        const kingStartCol = 4;
        if(board.pieceAtPositionHasMoved(kingStartRow,kingStartCol) || currentSquare.row !== kingStartRow || currentSquare.col !== kingStartCol){
            return moves;
        }
        //long castle
        this.checkCastle(board, moves, 0, 2, kingStartRow);
        //short castle
        this.checkCastle(board, moves, 7, 6, kingStartRow);

        return moves;
    }


    private checkCastle(board: Board, moves: Square[], rookCol: number, newCol: number, row: number) {
        const startClearArea: number = rookCol === 0?1:5;
        const endClearArea: number = rookCol === 0?3:6;

        if (board.pieceAtPositionHasMoved(row, rookCol)) {
            return;
        }

        for (let x = startClearArea; x <= endClearArea; x++) {
            if (board.getPiece(Square.at(row, x)) !== undefined) {
                return;
            }
        }
        moves.push(Square.at(row, newCol));
    }
}
