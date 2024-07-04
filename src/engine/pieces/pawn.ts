import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import Queen from "./queen";
import MovementCalculator from "../movementCalculator";
import Helper from "../helper/helper";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    private readonly FINAL_ROW_BLACK: number = 0;
    private readonly FINAL_ROW_WHITE: number = 7;

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        if (this.isOnFinalRow(newSquare)) {
            this.promoteToQueen(board, currentSquare, newSquare);
        } else {
            if (this.isMovingEnPassant(newSquare, currentSquare, board)) {
                this.captureOppPawnThroughEnPassant(board, currentSquare, newSquare);
            }
            board.movePiece(currentSquare, newSquare);
        }
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);

        if (this.player === Player.WHITE) {
            this.checkMove(board, moves, 1);
        } else {
            this.checkMove(board, moves, -1);
        }

        if(board.checkedPlayer === this.player){
            return Helper.squaresArrayIntersection(moves, board.lastPlayerAreaOfControl);
        }else {
            return moves;
        }
    }

    public getAreaOfControl(board: Board): Square[] {
        const moves: Square[] = [];

        const direction: number = this.player === Player.WHITE? 1 : -1;
        const currentSquare: Square = board.findPiece(this);

        const leftSquare = Square.at(currentSquare.row + direction, currentSquare.col - 1);
        const rightSquare = Square.at(currentSquare.row + direction, currentSquare.col + 1);

        if(MovementCalculator.isUnoccupiedValidSquare(board, leftSquare)){
            moves.push(leftSquare);
        }
        if(MovementCalculator.isUnoccupiedValidSquare(board, rightSquare)){
            moves.push(rightSquare);
        }

        return moves;
    };


    private isOnFinalRow(newSquare: Square) {
        return (newSquare.row === this.FINAL_ROW_WHITE && this.player === Player.WHITE) || (newSquare.row === this.FINAL_ROW_BLACK && this.player === Player.BLACK);
    }

    private captureOppPawnThroughEnPassant(board: Board, currentSquare: Square, newSquare: Square) {
        board.setPiece(Square.at(currentSquare.row, newSquare.col), undefined);
    }

    private isMovingEnPassant(newSquare: Square, currentSquare: Square, board: Board) {
        return (newSquare.col !== currentSquare.col && board.getPiece(newSquare) === undefined);
    }

    private promoteToQueen(board: Board, currentSquare: Square, newSquare: Square) {
        board.movePiece(currentSquare, newSquare);
        let newQueen: Queen = new Queen(this.player);
        board.setPiece(newSquare, newQueen);
    }

    private checkMove(board: Board, moves: Square[], direction: number): void {
        let finalRow: number = this.player === Player.WHITE ? 7 : 0;
        let currentSquare: Square = board.findPiece(this);

        if (currentSquare.row === finalRow) {
            return;
        }

        let startingRow: number = this.player === Player.WHITE ? 1 : 6;

        let nextSquare: Square = Square.at(currentSquare.row + direction, currentSquare.col);

        if (board.getPiece(nextSquare) === undefined) {
            moves.push(Square.at(currentSquare.row + direction, currentSquare.col));

            if (currentSquare.row === startingRow) {
                if (board.getPiece(Square.at(nextSquare.row + direction, nextSquare.col)) === undefined) {
                    moves.push(Square.at(nextSquare.row + direction, nextSquare.col));
                }
            }
        }

        this.checkDiagonalAttack(board, moves, direction, 1);
        this.checkDiagonalAttack(board, moves, direction, -1);

    }

    private checkDiagonalAttack(board: Board, moves: Square[], verticalDir: number, horizontalDir: number): void {
        let targetSquare: Square = Square.at(board.findPiece(this).row + verticalDir, board.findPiece(this).col + horizontalDir);

        if (!Board.positionsExists(targetSquare.row, targetSquare.col)) {
            return;
        }

        let hitPiece: Piece | undefined = board.getPiece(targetSquare);

        //check en passant attack
        if (hitPiece === undefined) {
            let lastMove: { from: Square, to: Square } = board.getLastMove();
            let requiredLastMove: {
                from: Square,
                to: Square
            } = {
                from: Square.at(targetSquare.row + verticalDir, targetSquare.col),
                to: Square.at(targetSquare.row - verticalDir, targetSquare.col)
            };

            if (lastMove.from.row === requiredLastMove.from.row && lastMove.from.col === requiredLastMove.from.col && lastMove.to.row === requiredLastMove.to.row && lastMove.to.col === requiredLastMove.to.col) {
                if (board.getPiece(requiredLastMove.to) instanceof Pawn) {
                    moves.push(targetSquare);
                }
            }
        }

        if (hitPiece !== undefined && hitPiece.player !== this.player && !(hitPiece instanceof King)) {
            moves.push(targetSquare);
            return;
        }
    }
}
