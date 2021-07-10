const getDataBtn = document.querySelector('#get-data');
/*
getDataBtn.addEventListener('click', (e) => {
    console.log('clicked');
    fetch('http:localhost:3000/get', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
      }).then(res => {
          res.json().then(data => {
            console.log(data);
          });
      });
        
}); */

const urlInput = document.querySelector('#url-input');
urlInput.addEventListener('keyup', (e) => {
    getDataBtn.href = 'http://localhost:3000/get?from=' + e.target.value;
})