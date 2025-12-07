const XMLHttpRequest = require("xhr2");

// POST مثال
const xhrPost = new XMLHttpRequest();
xhrPost.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

xhrPost.onload = () => {
  if (xhrPost.status >= 200 && xhrPost.status < 300) {
    console.log("POST Response:", JSON.parse(xhrPost.responseText));
  } else {
    console.error("POST Error:", xhrPost.status);
  }
};

xhrPost.send(JSON.stringify({
  title: "My New Post",
  body: "This is the content of the new post",
  userId: 1
}));
