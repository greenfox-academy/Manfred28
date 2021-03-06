'use strict';


const getTimeSincePost = function(timestamp) {
    const gmt2Offset = 3600 * 1
    const secondsPassed = Math.floor((Date.now() + gmt2Offset - timestamp) / 1000) + gmt2Offset;
    if (Math.floor(secondsPassed / 60 / 60 / 24) > 0) {
        return Math.floor(secondsPassed / 60 / 60 / 24) + " day(s)"
    } else if (Math.floor(secondsPassed / 60 / 60) > 0) {
        return Math.floor(secondsPassed / 60 / 60) + " hour(s)"        
    } else if (Math.floor(secondsPassed / 60)) {
        return Math.floor(secondsPassed / 60) + " minute(s)"                
    } else {
        return secondsPassed + " second(s)"
    }
}


const createPosts = function(postData){
    postData = JSON.parse(postData).posts
    const $postContainer = document.querySelector('main > article')    
    postData.forEach(function(postData) {
        const $post = document.createElement('section');
        $post.innerHTML = `
            <section class="rating">
                <button><img src="assets/images/upvote.png"/></button>
                ${postData.score}
                <button><img src="assets/images/downvote.png"/></button>
            </section>
            <div>
                <h2><a href="${postData.url}">${postData.title}</a></h2>
                <section class="post-info">
                    submitted ${getTimeSincePost(postData.timestamp)} ago by ${postData.user ? postData.user : 'Anonymus'}
                </section>
                <section class="post-actions">
                    <a href="_blank">Modify</a>
                    <a href="_blank">Remove</a>
                </section>
            </div>
        `
        $post.setAttribute('class', 'post');
        $postContainer.appendChild($post);
    })
}

const Config = {
    url: 'http://secure-reddit.herokuapp.com/simple/posts',
    method: 'GET',
    callback: createPosts,
    data: null
}

ajaxRequest(Config);

