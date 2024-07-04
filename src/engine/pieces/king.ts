import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Helper from "../helper/helper";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare: Square = board.findPiece(this);
        if (this.isCastling(newSquare, currentSquare)) {
            if (newSquare.col < currentSquare.col) {
                //castle left (long)
                board.movePiece(Square.at(currentSquare.row, 0), Square.at(currentSquare.row, 3));
            } else {
                //castle right (short)
                board.movePiece(Square.at(currentSquare.row, 7), Square.at(currentSquare.row, 5));
            }
        }
        board.currentPlayer = this.player;
        super.moveTo(board, newSquare);
    }

    private isCastling(newSquare: Square, currentSquare: Square) {
        return Math.abs(newSquare.col - currentSquare.col) > 1;
    }

    public getAreaOfControl(board: Board): Square[] {
        return this.getAvailableMoves(board);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        let currentSquare: Square = board.findPiece(this);

        for (let y = currentSquare.row - 1; y <= currentSquare.row + 1; y++) {
            for (let x: number = currentSquare.col - 1; x <= currentSquare.col + 1; x++) {
                if (Board.positionsExists(y, x) && (y != currentSquare.row || x != currentSquare.col)) {
                    const hitPiece: Piece | undefined = board.getPiece(Square.at(y, x));
                    if (hitPiece === undefined || (hitPiece.player !== this.player && !(hitPiece instanceof King))) {
                        moves.push(Square.at(y, x));
                    }
                }
            }
        }

        const kingStartRow = this.player === Player.WHITE ? 0 : 7;
        const kingStartCol = 4;
        this.addValidCastlingMoves(board, kingStartRow, kingStartCol, currentSquare, moves);

        return Helper.squaresArrayDifference(moves, board.lastPlayerAreaOfControl);

    }

    private addValidCastlingMoves(board: Board, kingStartRow: number, kingStartCol: number, currentSquare: Square, moves: Square[]) {
        if (board.pieceAtPositionHasMoved(kingStartRow, kingStartCol) || currentSquare.row !== kingStartRow || currentSquare.col !== kingStartCol) {
            return;
        }
        //long castle
        this.checkCastle(board, moves, 0, 2, kingStartRow);
        //short castle
        this.checkCastle(board, moves, 7, 6, kingStartRow);
    }

    private checkCastle(board: Board, moves: Square[], rookCol: number, newCol: number, row: number) {
        const startClearArea: number = rookCol === 0 ? 1 : 5;
        const endClearArea: number = rookCol === 0 ? 3 : 6;

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
