'use strict';

const changeView = function() {
    window.location.href = '/'
}

const postData = {
    'title': '',
    'href': ''
}

const Config = {
    url: 'http://localhost:3000/posts',
    method: 'POST',
    callback: changeView,
    data: null
}


document.querySelector('button.submit-button').addEventListener('click', function(event) {
    event.preventDefault();
    postData.title = document.querySelector('textarea').value;
    postData.href = document.querySelector('input[type="text"]').value;
    if (postData.title) {
        Config.data = JSON.stringify(postData);
        ajaxRequest(Config);
    } else {
        alert("Missing title")
    }
})
