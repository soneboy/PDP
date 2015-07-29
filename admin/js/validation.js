var button = document.getElementById('button-blue');
button.onclick = function(){


var userName = document.getElementsByTagName('input')[0].value;
var passWord = document.getElementsByTagName('input')[0].value;

if(userName == '') {
    var message = document.createElement('p');
    message.setAttribute('id', 'validate');
    message.innerHTML = 'Please provide username';
    var getDiv = document.getElementById('form-div');
    getDiv.insertBefore(message, getDiv.childNodes[0]);
    console.log(getDiv.childNodes[0]);
  }
};