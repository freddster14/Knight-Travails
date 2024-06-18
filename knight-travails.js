let graph = [0, 1, 2, 3, 4, 5, 6 , 7];
let movesCount = 0;
let moves = []


class knightMoves{
    constructor(){
        this.moves = [
            [1, 2], [2, 1], [1, -2], [2, -1],
            [-1, -2], [-2, -1], [-1, 2], [-2, 1]
        ]
        this.knightTravailed = new Array(8).fill(null).map(() => new Array(8).fill(false));
        this.nodeTree = new Node()
    }
    transversal(start, end){
        let queue = [];
        let count = 7;
        let dequeue = [];
        queue.push(start);
        this.nodeTree.data = start
        this.knightTravailed[start[0]][start[1]] = true;
        while(queue.length !== 0){
            for(let n in this.moves){
                console.log(count)
                if(count > 3){
                    
                }
                let move = [queue[0][0] + this.moves[n][0], queue[0][1] + this.moves[n][1]]
                if(this.validate(move)){
                    queue.push(move);
                } else if(move[0] === end[0] && move[1] === end[1]){
                    console.log(dequeue)
                    return this.logPath(queue[0], move, movesCount += 1, dequeue)
                }
            }
            dequeue.push(queue.shift());
            if(count === 7) {movesCount += 1; count = 0}
            count += 1;
            console.log(queue[0], count)

        }   
        
    }
    validate(move){
        if(move[0] > 7 || move[1] > 7 || move[0] < 0 || move[1] < 0) {
            return false
        }
        if(this.knightTravailed[move[0]][move[1]]){
            return false
        } else{
            this.knightTravailed[move[0]][move[1]] = true
            return true
        }
        
    }
   
    logPath(lastMove, end, count, pastElements){
        console.log(`You made it in ${count} moves! Here is your path:`)
       /
        console.log(lastMove)
        console.log(end)

    }
}

class Node{
    constructor(data = null, moves = []){
        this.data = data;
        this.left = moves;
    }
}






const KNIGHT = new knightMoves;
KNIGHT.transversal([5, 3], [0, 0])
console.log(KNIGHT)