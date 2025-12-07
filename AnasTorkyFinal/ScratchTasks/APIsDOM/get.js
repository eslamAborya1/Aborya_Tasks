const XMLHttpRequest = require("xhr2");

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
xhr.responseType = "json";

xhr.onload = () => {
  console.log(xhr.response);
};

xhr.send();
