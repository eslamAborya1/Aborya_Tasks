const XMLHttpRequest = require("xhr2");

const xhrDelete = new XMLHttpRequest();
xhrDelete.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);

xhrDelete.onload = () => {
  if (xhrDelete.status >= 200 && xhrDelete.status < 300) {
    console.log("DELETE Status:", xhrDelete.status);
  } else {
    console.error("DELETE Error:", xhrDelete.status);
  }
};

xhrDelete.send();
