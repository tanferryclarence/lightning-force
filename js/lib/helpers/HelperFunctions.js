export default function FindQueueIDIndex(queueArray, queueId) {
    for(let i = 0; i < queueArray.length; i++) {
        if(queueArray[i].queueId === queueId) {
            return true
        }
    }

    return false
}
