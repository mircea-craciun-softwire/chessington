import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Rook from "./pieces/rook";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";


export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    private moveHistory: { from: Square, to: Square }[] = [];

    public lastPlayerAreaOfControl: Square[];
    public checkedPlayer: Player | undefined;

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.lastPlayerAreaOfControl = [];
        this.checkedPlayer = undefined;
        this.board = this.createBoard();
    }

    public static positionsExists(row: number, col: number): boolean {

        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            return true;
        }
        return false;

    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.moveHistory.push({from: fromSquare, to: toSquare});

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);

            //this must always be done before switching the player
            this.recalculateLastPlayerAreaOfControl();
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    public getLastMove(): { from: Square, to: Square } {
        if (this.moveHistory.length > 0) {
            return this.moveHistory[this.moveHistory.length - 1];
        } else {
            return {from: Square.at(-1, -1), to: Square.at(-1, -1)};
        }
    }

    public pieceAtPositionHasMoved(row: number, col: number): boolean {
        let hasMoved: boolean = false;
        for (let i: number = 0; i < this.moveHistory.length; i++) {
            if (this.moveHistory[i].from.row === row && this.moveHistory[i].from.col === col) {
                hasMoved = true;
            }
        }
        return hasMoved;
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    private recalculateLastPlayerAreaOfControl() {
        this.lastPlayerAreaOfControl = [];
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                const foundPiece = this.board[row][col];

                if (foundPiece !== undefined && (foundPiece instanceof Rook || foundPiece instanceof Bishop || foundPiece instanceof Knight || foundPiece instanceof Pawn || foundPiece instanceof Queen || foundPiece instanceof King) && foundPiece.player === this.currentPlayer) {
                    const availableMoves: Square[] = foundPiece.getAvailableMoves(this);
                    this.lastPlayerAreaOfControl.concat(availableMoves);
                }
            }
        }
    }
}
