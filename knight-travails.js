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
        this.nodeTree = new Node();
    }
    transversal(start, end){
        if(start[0] === end[0] && start[1] === end[1]) return console.log("Same spot")
        const queue = [];
        let count = 7;
        let length = 0
        queue.push(start);
        this.nodeTree.data = start
        this.knightTravailed[start[0]][start[1]] = true;
        while(queue.length !== 0){
            for(let n in this.moves){
                let element = this.find(queue[0])
                let move = [queue[0][0] + this.moves[n][0], queue[0][1] + this.moves[n][1]]
                if(this.validate(move)){
                    queue.push(move);
                    element.moves.push(new Node(move))
                } else if(move[0] === end[0] && move[1] === end[1]){
                    element.moves.push(new Node(move))
                    console.log(count)
                   
                    return this.logPath(queue[0], move, movesCount += 1)
                }
                length += 1;
                console.log(movesCount, count, length)
            }
            queue.shift()
            if(count === 7) {
                movesCount += 1;
                count = 0;
            }
            count += 1;
            console.log(count)

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
    find(value, node = this.nodeTree){
        if(node === undefined) return
        for(let i = 0; i < node.moves.length; i++){
            if(node.moves[i].data === value) return node.moves[i];
        }
        if(node.data !== value){
            for(let n in node.moves){
                let test = this.find(value, node.moves[n])
                if(test.data === value) return test
            }
        }
        return node
    }
    findPrev(value, node = this.nodeTree){
        if(node === undefined ) return undefined
        if( value === node.data) return [node, node]
        for(let i = 0; i < node.moves.length; i++){
                if(node.moves[i].data[0] === value[0] && 
                   node.moves[i].data[1] === value[1]) {
                    return [node.moves[i], node]
                };
        }
        if(node.data !== value){
            for(let n in node.moves){
                let test = this.findPrev(value, node.moves[n])
                if(test.length === 2) return test
            }
        }
        return node
    }
    logPath(lastMove, end, count, pastElements = []){
        console.log(`You made it in ${count} moves! Here is your path:`)
        for(let i = 1; i < count; i++){
            pastElements.push(lastMove)
            lastMove = this.findPrev(lastMove)[1].data
        }
        pastElements.reverse();
        for(let i = 0; i < pastElements.length; i++){
            console.log(pastElements[i])
        }
        console.log(end)
        console.log(this.nodeTree)

    }
}

class Node{
    constructor(data = null, moves = []){
        this.data = data;
        this.moves = moves;
    }
}






const KNIGHT = new knightMoves;
KNIGHT.transversal([7, 3], [4, 3])
