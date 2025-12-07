const XMLHttpRequest = require("xhr2");

const xhrPut = new XMLHttpRequest();
xhrPut.open("PUT", "https://jsonplaceholder.typicode.com/posts/1", true);
xhrPut.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

xhrPut.onload = () => {
  if (xhrPut.status >= 200 && xhrPut.status < 300) {
    console.log("PUT Response:", JSON.parse(xhrPut.responseText));
  } else {
    console.error("PUT Error:", xhrPut.status);
  }
};

xhrPut.send(JSON.stringify({
  id: 1,
  title: "Updated Post",
  body: "This post has been updated",
  userId: 1
}));
