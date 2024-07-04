import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from "../../../src/engine/pieces/rook";

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    describe("white King", () =>{
        describe("Castling: ",()=>{
            let king : King;
            let rookLeft: Rook;
            let rookRight: Rook;

            beforeEach(()=>{
            king = new King(Player.WHITE);
            rookLeft = new Rook(Player.WHITE);
            rookRight = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0,0), rookLeft);
            board.setPiece(Square.at(0,7), rookRight);
            board.setPiece(Square.at(0,1), undefined);
            board.setPiece(Square.at(0,2), undefined);
            board.setPiece(Square.at(0,3), undefined);
            board.setPiece(Square.at(0,5), undefined);
            board.setPiece(Square.at(0,6), undefined);
            });


            it("can move to castle position",() => {
                const moves = king.getAvailableMoves(board);

                moves.should.deep.include.members([Square.at(0,2),Square.at(0,6)]);
            });

            it("can swap positions with the rook in long castle",() => {
                const moves = king.getAvailableMoves(board);
                board.currentPlayer = Player.WHITE;

                king.moveTo(board, Square.at(0,2));

                const validSquares: Square[] = [];
                if(board.getPiece(Square.at(0,2)) instanceof King && board.getPiece(Square.at(0,3)) instanceof Rook){
                    validSquares.push(Square.at(0,0));
                }

                validSquares.should.have.length(1);
            });

        });

    });
    describe("black King", () =>{
        it("can castle",() => {
            const king = new King(Player.BLACK);
            const rookLeft : Rook= new Rook(Player.BLACK);
            const rookRight : Rook= new Rook(Player.BLACK);

            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7,0), rookLeft);
            board.setPiece(Square.at(7,7), rookRight);
            board.setPiece(Square.at(7,1), undefined);
            board.setPiece(Square.at(7,2), undefined);
            board.setPiece(Square.at(7,3), undefined);
            board.setPiece(Square.at(7,5), undefined);
            board.setPiece(Square.at(7,6), undefined);

            const moves = king.getAvailableMoves(board);

            moves.should.deep.include.members([Square.at(7,2),Square.at(7,6)]);
        });
    });


    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });
});
