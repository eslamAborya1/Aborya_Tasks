const resultDiv = document.createElement("div");
resultDiv.id = "result";
resultDiv.style.margin = "20px auto";
resultDiv.style.padding = "20px";
resultDiv.style.background = "white";
resultDiv.style.border = "1px solid #ddd";
resultDiv.style.borderRadius = "10px";
resultDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
resultDiv.style.width = "60%";
resultDiv.style.fontFamily = "monospace";
resultDiv.style.whiteSpace = "pre-wrap";
resultDiv.style.display = "none"; 
document.body.appendChild(resultDiv);

function createInput(labelText, id) {
  const wrapper = document.createElement("div");
  wrapper.style.marginTop = "10px";
  wrapper.style.marginLeft = "auto";
  wrapper.style.marginRight = "auto";
  wrapper.style.width = "25%";
  const label = document.createElement("label");
  label.innerText = labelText;
  label.style.display = "inline-block";
  label.style.marginBottom = "3px";
  const input = document.createElement("input");
  input.id = id;
  input.className = "form-control";
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  document.body.appendChild(wrapper);
}

createInput("Post ID:", "postId");
createInput("Title:", "title");
createInput("Body:", "body");
createInput("User ID:", "userId");

const btnWrapper = document.createElement("div");
btnWrapper.style.display = "flex";
btnWrapper.style.justifyContent = "center";
btnWrapper.style.marginTop = "20px";
btnWrapper.style.flexWrap = "wrap";
document.body.appendChild(btnWrapper);

function addButton(text, className, onclick) {
  const btn = document.createElement("button");
  btn.className = className + " m-2";
  btn.innerText = text;
  btn.onclick = onclick;
  btnWrapper.appendChild(btn);
}

function prettyPrint(json) {
  resultDiv.style.display = "block";
  resultDiv.innerText = JSON.stringify(json, null, 4);
}

function CreatePost() {
  let request = new XMLHttpRequest();
  request.open("POST", "https://jsonplaceholder.typicode.com/posts");
  request.responseType = "json";
  request.setRequestHeader("Content-Type", "application/json");
  let bodyParams = {
    title: title.value,
    body: body.value,
    userId: userId.value,
  };
  request.send(JSON.stringify(bodyParams));
  request.onload = () => prettyPrint(request.response);
}

function CreateGetAll() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/posts");
  request.responseType = "json";
  request.send();
  request.onload = () => prettyPrint(request.response);
}

function CreateGetOne() {
  let id = postId.value;
  let request = new XMLHttpRequest();
  request.open("GET", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.responseType = "json";
  request.send();
  request.onload = () => prettyPrint(request.response);
}

function CreateUpdateByPut() {
  let id = postId.value;
  let request = new XMLHttpRequest();
  request.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.responseType = "json";
  request.setRequestHeader("Content-Type", "application/json");
  let bodyParams = {
    id: id,
    title: title.value,
    body: body.value,
    userId: userId.value,
  };
  request.send(JSON.stringify(bodyParams));
  request.onload = () => prettyPrint(request.response);
}

function CreateUpdateByPatch() {
  let id = postId.value;
  let request = new XMLHttpRequest();
  request.open("PATCH", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.responseType = "json";
  request.setRequestHeader("Content-Type", "application/json");
  let bodyParams = { title: title.value };
  request.send(JSON.stringify(bodyParams));
  request.onload = () => prettyPrint(request.response);
}

function CreateDelete() {
  let id = postId.value;
  let request = new XMLHttpRequest();
  request.open("DELETE", `https://jsonplaceholder.typicode.com/posts/${id}`);
  request.responseType = "json";
  request.send();
  request.onload = () => prettyPrint({ message: "Deleted Successfully", id });
}

addButton("POST", "btn btn-primary", CreatePost);
addButton("GET ALL", "btn btn-primary", CreateGetAll);
addButton("GET ONE", "btn btn-primary", CreateGetOne);
addButton("UPDATE (PUT)", "btn btn-warning", CreateUpdateByPut);
addButton("UPDATE (PATCH)", "btn btn-info", CreateUpdateByPatch);
addButton("DELETE", "btn btn-danger", CreateDelete);
