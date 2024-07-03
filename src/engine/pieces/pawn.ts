import Piece from './piece';
import Player from '../player';
import player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import Queen from "./queen";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        if((newSquare.row === 7 && this.player === Player.WHITE) || (newSquare.row === 0 && this.player === Player.BLACK)){
            board.setPiece(currentSquare, undefined);
            let newQueen : Queen = new Queen(this.player);
            board.setPiece(newSquare, newQueen);
        }else {
            board.movePiece(currentSquare, newSquare);
        }
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = new Array(0);


        if(this.player === Player.WHITE) {
            this.checkMove(board, moves, 1);
        }else {
            this.checkMove(board, moves, -1);
        }
        return moves;

    }

    checkMove(board: Board,moves: Square[],  direction: number) : void{

        let finalRow: number = this.player === Player.WHITE? 7:0;
        let currentSquare: Square = board.findPiece(this);

        if(currentSquare.row === finalRow){
            return;
        }

        let startingRow: number = this.player === Player.WHITE? 1:6;

        let nextSquare: Square = Square.at(currentSquare.row + direction, currentSquare.col);

        if(board.getPiece(nextSquare) === undefined) {
            moves.push(Square.at(currentSquare.row + direction, currentSquare.col));

            if(currentSquare.row === startingRow){
                if(board.getPiece(Square.at(nextSquare.row + direction, nextSquare.col)) === undefined) {
                    moves.push(Square.at(nextSquare.row + direction, nextSquare.col));
                }
            }
        }

        this.checkAttack(board, moves, direction,1);
        this.checkAttack(board, moves, direction,-1);

    }

    checkAttack(board: Board, moves: Square[], verticalDir: number, horizontalDir: number):void{
        let targetSquare: Square = Square.at(board.findPiece(this).row + verticalDir, board.findPiece(this).col + horizontalDir);
        if(!Board.positionsExists(targetSquare.row, targetSquare.col)) return;
        let hitPiece: Piece | undefined = board.getPiece(targetSquare);
        if(hitPiece !== undefined && hitPiece.player !== this.player && !(hitPiece instanceof King)){
            moves.push(targetSquare);
        }
    }
}
