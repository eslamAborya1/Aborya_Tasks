// ================= STYLE ==================
const style = document.createElement("style");
style.innerHTML = `
  body {
    font-family: Arial, sans-serif;
    background: #f2f2f2;
    padding: 30px;
  }

  .container {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    max-width: 500px;
    margin: auto;
  }

  input, button, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    margin-top: 12px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  button {
    cursor: pointer;
    transition: .3s;
  }

  button:hover { opacity: .8; }

  .btn { color: white; }
  .primary { background: #007bff; }
  .info { background: #00bcd4; }
  .success { background: #4caf50; }
  .warning { background: #ff9800; }
  .danger { background: #f44336; }

  #resultBox {
    background: #1e1e1e;
    color: #00ff9d;
    padding: 15px;
    margin-top: 20px;
    height: 200px;
    border-radius: 8px;
    overflow-y: auto;
    white-space: pre-wrap;
    font-family: monospace;
  }

  h2 { text-align: center; }
`;
document.head.appendChild(style);


// ================= BUILD UI ==================
const container = document.createElement("div");
container.className = "container";

container.innerHTML = `
  <h2>CRUD Operations</h2>

  <label>Title</label>
  <input type="text" id="title">

  <label>Body</label>
  <textarea id="body"></textarea>

  <label>User ID</label>
  <input type="number" id="userId">

  <label>Post ID (Used for GET ONE / UPDATE / DELETE)</label>
  <input type="number" id="postId">

  <button class="btn primary" id="btnPost">Create (POST)</button>
  <button class="btn info" id="btnGetAll">Get All</button>
  <button class="btn success" id="btnGetOne">Get One</button>
  <button class="btn warning" id="btnPut">Update (PUT)</button>
  <button class="btn warning" id="btnPatch">Update (PATCH)</button>
  <button class="btn danger" id="btnDelete">Delete</button>

  <h3 style="margin-top:20px;">Response Output:</h3>
  <div id="resultBox">Waiting for response...</div>
`;

document.body.appendChild(container);

const resultBox = document.getElementById("resultBox");


// ================= FUNCTIONS ==================
function showResponse(data) {
  resultBox.innerText = JSON.stringify(data, null, 2);
}

function CreatePost() {
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  let userId = document.getElementById("userId").value;

  let request = new XMLHttpRequest();
  request.open("POST", "https://jsonplaceholder.typicode.com/posts");
  request.setRequestHeader("Content-Type", "application/json");

  request.send(JSON.stringify({ title, body, userId }));

  request.onload = () => {
    showResponse(request.response);
    alert("Post Created");
  };
}

function CreateGetAll() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/posts");
  request.send();

  request.onload = () => {
    showResponse(request.response);
    alert("All Posts Loaded");
  };
}

function CreateGetOne() {
  let id = document.getElementById("postId").value;

  let request = new XMLHttpRequest();
  request.open("GET", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.send();

  request.onload = () => {
    showResponse(request.response);
    alert("Post Loaded");
  };
}

function CreateUpdateByPut() {
  let id = document.getElementById("postId").value;
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  let userId = document.getElementById("userId").value;

  let request = new XMLHttpRequest();
  request.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.setRequestHeader("Content-Type", "application/json");

  request.send(JSON.stringify({ id, title, body, userId }));

  request.onload = () => {
    showResponse(request.response);
    alert("PUT Updated");
  };
}

function CreateUpdateByPatch() {
  let id = document.getElementById("postId").value;
  let title = document.getElementById("title").value;

  let request = new XMLHttpRequest();
  request.open("PATCH", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.setRequestHeader("Content-Type", "application/json");

  request.send(JSON.stringify({ title }));

  request.onload = () => {
    showResponse(request.response);
    alert("PATCH Updated");
  };
}

function CreateDelete() {
  let id = document.getElementById("postId").value;

  let request = new XMLHttpRequest();
  request.open("DELETE", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.send();

  request.onload = () => {
    showResponse(request.response);
    alert("Post Deleted");
  };
}


// ================= BUTTON EVENTS ==================
document.getElementById("btnPost").onclick = CreatePost;
document.getElementById("btnGetAll").onclick = CreateGetAll;
document.getElementById("btnGetOne").onclick = CreateGetOne;
document.getElementById("btnPut").onclick = CreateUpdateByPut;
document.getElementById("btnPatch").onclick = CreateUpdateByPatch;
document.getElementById("btnDelete").onclick = CreateDelete;
