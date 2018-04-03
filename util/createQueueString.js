exports.createQueueString = (queue) => {
    let str = ":Current Queue:\n";
    queue.forEach(video => {
        str += video.title + "\n";
    });
    return str;
};