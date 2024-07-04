import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import Piece from "../../../src/engine/pieces/piece";
import Queen from "../../../src/engine/pieces/queen";

describe('Pawn', () => {

    let board: Board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {

        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it("Can promote to a queen", ()=> {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(6, 2), pawn);

            pawn.moveTo(board, Square.at(7, 2));

            const newPiece: Piece | undefined = board.getPiece(Square.at(7, 2));

            const validPieces: Piece[] = [];
            if(newPiece instanceof Queen){
                validPieces.push(newPiece);
            }

            validPieces.should.have.length(1);

        });

        it("can En Passant an opposing pawn", () =>{
            const pawn : Pawn = new Pawn(Player.WHITE);
            const opposingPawn: Pawn = new Pawn(Player.BLACK);

            board.setPiece(Square.at(6, 3), opposingPawn);
            board.setPiece(Square.at(4, 4), pawn);
            board.currentPlayer = Player.BLACK;

            opposingPawn.moveTo(board, Square.at(4,3));
            let moves: Square[] = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it("cannot En Passant any other opposing piece", () =>{
            const pawn : Pawn = new Pawn(Player.WHITE);
            const opposingPawn: Rook = new Rook(Player.BLACK);

            board.setPiece(Square.at(6, 3), opposingPawn);
            board.setPiece(Square.at(4, 4), pawn);
            board.currentPlayer = Player.BLACK;

            opposingPawn.moveTo(board, Square.at(4,3));
            let moves: Square[] = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it("can capture the opposing pawn when doing En Passant", () =>{
            const pawn : Pawn = new Pawn(Player.WHITE);
            const opposingPawn: Rook = new Rook(Player.BLACK);

            board.setPiece(Square.at(6, 3), opposingPawn);
            board.setPiece(Square.at(4, 4), pawn);
            board.currentPlayer = Player.BLACK;

            opposingPawn.moveTo(board, Square.at(4,3));
            let moves: Square[] = pawn.getAvailableMoves(board);

            let capturedPiece: Piece | undefined = board.getPiece(Square.at(4,3));

            const invalidPieces: Piece[] = [];
            if(capturedPiece !== undefined){
                invalidPieces.push(capturedPiece);
            }

            invalidPieces.should.have.length(0);

        });
    });

    describe('black pawns', () => {

        let board: Board;
        beforeEach(() => board = new Board(Player.BLACK));

        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it("can En Passant an opposing pawn", () =>{
            const pawn : Pawn = new Pawn(Player.BLACK);
            const opposingPawn: Pawn = new Pawn(Player.WHITE);

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPawn);
            board.currentPlayer = Player.WHITE;

            opposingPawn.moveTo(board, Square.at(3,3));
            let moves: Square[] = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(2, 3));
        });

        it("cannot En Passant any other opposing piece", () =>{
            const pawn : Pawn = new Pawn(Player.BLACK);
            const opposingPawn: Queen = new Queen(Player.WHITE);

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPawn);
            board.currentPlayer = Player.WHITE;

            opposingPawn.moveTo(board, Square.at(3,3));
            let moves: Square[] = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(2, 3));
        });
        it("can capture the opposing pawn when doing En Passant", () =>{
            const pawn : Pawn = new Pawn(Player.BLACK);
            const opposingPawn: Queen = new Queen(Player.WHITE);

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPawn);
            board.currentPlayer = Player.WHITE;

            opposingPawn.moveTo(board, Square.at(3,3));

            let capturedPiece: Piece | undefined = board.getPiece(Square.at(3,3));

            const invalidPieces: Piece[] = [];
            if(capturedPiece !== undefined){
                invalidPieces.push(capturedPiece);
            }

            invalidPieces.should.have.length(0);

        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });
});
