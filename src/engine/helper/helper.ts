import Square from "../square";

export default class Helper{
    public static squaresArrayDifference(base: Square[], eliminate: Square[]) : Square[]{
        if(base === undefined || eliminate === undefined) return base;
        for (let i = base.length - 1; i >= 0; i--) {
            for (let j = 0; j < eliminate.length; j++) {
                if(base[i] === undefined || eliminate[j] === undefined)continue;
                if (base[i].row === eliminate[j].row && base[i].col === eliminate[j].col) {
                    base.splice(i, 1);
                }
            }
        }
        return base;
    }
    public static squaresArrayIntersection(array1: Square[], array2: Square[]) : Square[]{
        const result: Square[] = [];
        if(array1 === undefined || array2 === undefined) return array1;

        for (let i = array1.length - 1; i >= 0; i--) {
            for (let j = 0; j < array2.length; j++) {
                if (array1[i].row === array2[j].row && array1[i].col === array2[j].col) {
                    result.push(array1[i]);
                }
            }
        }
        return result;
    }
}