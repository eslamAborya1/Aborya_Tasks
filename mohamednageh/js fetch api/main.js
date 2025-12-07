// عناصر الصفحة
const postsContainer = document.getElementById("posts");
const getAllBtn = document.getElementById("getAllBtn");
const getSingleBtn = document.getElementById("getSingleBtn");
const createBtn = document.getElementById("createBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

// دالة لعرض المنشورات
function renderPosts(posts) {
  postsContainer.innerHTML = "";
  if (!Array.isArray(posts)) posts = [posts];

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <p><strong>UserId:</strong> ${post.userId}</p>
    `;
    postsContainer.appendChild(div);
  });
}

// GET All Posts
function getAllPosts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
  xhr.onload = () => {
    if (xhr.status === 200) renderPosts(JSON.parse(xhr.responseText));
    else
      postsContainer.innerHTML =
        '<p style="text-align:center;">Failed to fetch posts</p>';
  };
  xhr.onerror = () => {
    postsContainer.innerHTML =
      '<p style="text-align:center;">Network Error</p>';
  };
  xhr.send();
}

// GET Single Post
function getSinglePost() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);
  xhr.onload = () => {
    if (xhr.status === 200) renderPosts(JSON.parse(xhr.responseText));
    else
      postsContainer.innerHTML =
        '<p style="text-align:center;">Failed to fetch post</p>';
  };
  xhr.onerror = () => {
    postsContainer.innerHTML =
      '<p style="text-align:center;">Network Error</p>';
  };
  xhr.send();
}

// POST New Post
function createPost() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onload = () => {
    if (xhr.status === 201) renderPosts(JSON.parse(xhr.responseText));
    else alert("Failed to create post");
  };
  xhr.onerror = () => alert("Network Error");
  xhr.send(
    JSON.stringify({
      title: "New Post",
      body: "This is a new post",
      userId: 1,
    })
  );
}

// PUT Update Post #1
function updatePost() {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://jsonplaceholder.typicode.com/posts/1", true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onload = () => {
    if (xhr.status === 200) renderPosts(JSON.parse(xhr.responseText));
    else alert("Failed to update post");
  };
  xhr.onerror = () => alert("Network Error");
  xhr.send(
    JSON.stringify({
      id: 1,
      title: "Updated Post",
      body: "This post has been updated",
      userId: 1,
    })
  );
}

// DELETE Post #1
function deletePost() {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
  xhr.onload = () => {
    if (xhr.status === 200)
      postsContainer.innerHTML =
        '<p style="text-align:center;">Post deleted!</p>';
    else alert("Failed to delete post");
  };
  xhr.onerror = () => alert("Network Error");
  xhr.send();
}

// ربط الأزرار
getAllBtn.addEventListener("click", getAllPosts);
getSingleBtn.addEventListener("click", getSinglePost);
createBtn.addEventListener("click", createPost);
updateBtn.addEventListener("click", updatePost);
deleteBtn.addEventListener("click", deletePost);
