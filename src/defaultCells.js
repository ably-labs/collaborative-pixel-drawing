const defaultCells = [
    new Cell(0, 0, 3),
    new Cell(0, 1, 3),
    new Cell(0, 2, 3),
    new Cell(0, 3, 3),
    new Cell(0, 4, 3),
    new Cell(0, 5, 3),
    new Cell(0, 6, 3),
    new Cell(0, 7, 3),
    new Cell(0, 8, 3),
    new Cell(0, 9, 3),
    new Cell(0, 10, 3),
    new Cell(0, 11, 3),
    new Cell(0, 12, 3),
    new Cell(0, 13, 3),
    new Cell(0, 14, 3),
    new Cell(0, 15, 3),
    new Cell(1, 0, 3),
    new Cell(1, 1, 3),
    new Cell(1, 2, 3),
    new Cell(1, 3, 3),
    new Cell(1, 4, 3),
    new Cell(1, 5, 3),
    new Cell(1, 6, 3),
    new Cell(1, 7, 3),
    new Cell(1, 8, 3),
    new Cell(1, 9, 3),
    new Cell(1, 10, 3),
    new Cell(1, 11, 3),
    new Cell(1, 12, 0),
    new Cell(1, 13, 0),
    new Cell(1, 14, 3),
    new Cell(1, 15, 3),
    new Cell(2, 0, 3),
    new Cell(2, 1, 3),
    new Cell(2, 2, 3),
    new Cell(2, 3, 3),
    new Cell(2, 4, 3),
    new Cell(2, 5, 3),
    new Cell(2, 6, 3),
    new Cell(2, 7, 3),
    new Cell(2, 8, 3),
    new Cell(2, 9, 3),
    new Cell(2, 10, 0),
    new Cell(2, 11, 0),
    new Cell(2, 12, 3),
    new Cell(2, 13, 3),
    new Cell(2, 14, 1),
    new Cell(2, 15, 3),
    new Cell(3, 0, 3),
    new Cell(3, 1, 3),
    new Cell(3, 2, 3),
    new Cell(3, 3, 3),
    new Cell(3, 4, 3),
    new Cell(3, 5, 3),
    new Cell(3, 6, 3),
    new Cell(3, 7, 3),
    new Cell(3, 8, 0),
    new Cell(3, 9, 0),
    new Cell(3, 10, 3),
    new Cell(3, 11, 3),
    new Cell(3, 12, 3),
    new Cell(3, 13, 1),
    new Cell(3, 14, 3),
    new Cell(3, 15, 3),
    new Cell(4, 0, 3),
    new Cell(4, 1, 3),
    new Cell(4, 2, 3),
    new Cell(4, 3, 3),
    new Cell(4, 4, 3),
    new Cell(4, 5, 3),
    new Cell(4, 6, 0),
    new Cell(4, 7, 0),
    new Cell(4, 8, 3),
    new Cell(4, 9, 3),
    new Cell(4, 10, 3),
    new Cell(4, 11, 3),
    new Cell(4, 12, 1),
    new Cell(4, 13, 3),
    new Cell(4, 14, 3),
    new Cell(4, 15, 3),
    new Cell(5, 0, 3),
    new Cell(5, 1, 3),
    new Cell(5, 2, 3),
    new Cell(5, 3, 3),
    new Cell(5, 4, 0),
    new Cell(5, 5, 0),
    new Cell(5, 6, 3),
    new Cell(5, 7, 3),
    new Cell(5, 8, 3),
    new Cell(5, 9, 3),
    new Cell(5, 10, 3),
    new Cell(5, 11, 3),
    new Cell(5, 12, 1),
    new Cell(5, 13, 3),
    new Cell(5, 14, 3),
    new Cell(5, 15, 3),
    new Cell(6, 0, 3),
    new Cell(6, 1, 3),
    new Cell(6, 2, 0),
    new Cell(6, 3, 0),
    new Cell(6, 4, 3),
    new Cell(6, 5, 3),
    new Cell(6, 6, 3),
    new Cell(6, 7, 3),
    new Cell(6, 8, 3),
    new Cell(6, 9, 3),
    new Cell(6, 10, 3),
    new Cell(6, 11, 1),
    new Cell(6, 12, 3),
    new Cell(6, 13, 3),
    new Cell(6, 14, 3),
    new Cell(6, 15, 3),
    new Cell(7, 0, 3),
    new Cell(7, 1, 0),
    new Cell(7, 2, 3),
    new Cell(7, 3, 3),
    new Cell(7, 4, 3),
    new Cell(7, 5, 3),
    new Cell(7, 6, 3),
    new Cell(7, 7, 3),
    new Cell(7, 8, 3),
    new Cell(7, 9, 3),
    new Cell(7, 10, 2),
    new Cell(7, 11, 3),
    new Cell(7, 12, 3),
    new Cell(7, 13, 3),
    new Cell(7, 14, 3),
    new Cell(7, 15, 3),
    new Cell(8, 0, 3),
    new Cell(8, 1, 3),
    new Cell(8, 2, 1),
    new Cell(8, 3, 1),
    new Cell(8, 4, 3),
    new Cell(8, 5, 3),
    new Cell(8, 6, 3),
    new Cell(8, 7, 3),
    new Cell(8, 8, 3),
    new Cell(8, 9, 3),
    new Cell(8, 10, 3),
    new Cell(8, 11, 2),
    new Cell(8, 12, 3),
    new Cell(8, 13, 3),
    new Cell(8, 14, 3),
    new Cell(8, 15, 3),
    new Cell(9, 0, 3),
    new Cell(9, 1, 3),
    new Cell(9, 2, 3),
    new Cell(9, 3, 3),
    new Cell(9, 4, 1),
    new Cell(9, 5, 1),
    new Cell(9, 6, 3),
    new Cell(9, 7, 3),
    new Cell(9, 8, 3),
    new Cell(9, 9, 3),
    new Cell(9, 10, 3),
    new Cell(9, 11, 3),
    new Cell(9, 12, 2),
    new Cell(9, 13, 3),
    new Cell(9, 14, 3),
    new Cell(9, 15, 3),
    new Cell(10, 0, 3),
    new Cell(10, 1, 3),
    new Cell(10, 2, 3),
    new Cell(10, 3, 3),
    new Cell(10, 4, 3),
    new Cell(10, 5, 3),
    new Cell(10, 6, 1),
    new Cell(10, 7, 1),
    new Cell(10, 8, 3),
    new Cell(10, 9, 3),
    new Cell(10, 10, 3),
    new Cell(10, 11, 3),
    new Cell(10, 12, 2),
    new Cell(10, 13, 3),
    new Cell(10, 14, 3),
    new Cell(10, 15, 3),
    new Cell(11, 0, 3),
    new Cell(11, 1, 3),
    new Cell(11, 2, 3),
    new Cell(11, 3, 3),
    new Cell(11, 4, 3),
    new Cell(11, 5, 3),
    new Cell(11, 6, 3),
    new Cell(11, 7, 3),
    new Cell(11, 8, 1),
    new Cell(11, 9, 1),
    new Cell(11, 10, 3),
    new Cell(11, 11, 3),
    new Cell(11, 12, 3),
    new Cell(11, 13, 2),
    new Cell(11, 14, 3),
    new Cell(11, 15, 3),
    new Cell(12, 0, 3),
    new Cell(12, 1, 3),
    new Cell(12, 2, 3),
    new Cell(12, 3, 3),
    new Cell(12, 4, 3),
    new Cell(12, 5, 3),
    new Cell(12, 6, 3),
    new Cell(12, 7, 3),
    new Cell(12, 8, 3),
    new Cell(12, 9, 3),
    new Cell(12, 10, 1),
    new Cell(12, 11, 1),
    new Cell(12, 12, 3),
    new Cell(12, 13, 3),
    new Cell(12, 14, 2),
    new Cell(12, 15, 3),
    new Cell(13, 0, 3),
    new Cell(13, 1, 3),
    new Cell(13, 2, 3),
    new Cell(13, 3, 3),
    new Cell(13, 4, 3),
    new Cell(13, 5, 3),
    new Cell(13, 6, 3),
    new Cell(13, 7, 3),
    new Cell(13, 8, 3),
    new Cell(13, 9, 3),
    new Cell(13, 10, 3),
    new Cell(13, 11, 3),
    new Cell(13, 12, 1),
    new Cell(13, 13, 1),
    new Cell(13, 14, 3),
    new Cell(13, 15, 3),
    new Cell(14, 0, 3),
    new Cell(14, 1, 3),
    new Cell(14, 2, 3),
    new Cell(14, 3, 3),
    new Cell(14, 4, 3),
    new Cell(14, 5, 3),
    new Cell(14, 6, 3),
    new Cell(14, 7, 3),
    new Cell(14, 8, 3),
    new Cell(14, 9, 3),
    new Cell(14, 10, 3),
    new Cell(14, 11, 3),
    new Cell(14, 12, 3),
    new Cell(14, 13, 3),
    new Cell(14, 14, 3),
    new Cell(14, 15, 3),
    new Cell(15, 0, 3),
    new Cell(15, 1, 3),
    new Cell(15, 2, 3),
    new Cell(15, 3, 3),
    new Cell(15, 4, 3),
    new Cell(15, 5, 3),
    new Cell(15, 6, 3),
    new Cell(15, 7, 3),
    new Cell(15, 8, 3),
    new Cell(15, 9, 3),
    new Cell(15, 10, 3),
    new Cell(15, 11, 3),
    new Cell(15, 12, 3),
    new Cell(15, 13, 3),
    new Cell(15, 14, 3),
    new Cell(15, 15, 3),
];
