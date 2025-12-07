 const API = "https://jsonplaceholder.typicode.com/posts";

    // GET - Load posts
    function loadPosts() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", API);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const posts = JSON.parse(xhr.responseText);
          displayPosts(posts.slice(0, 10)); // show first 10
        }
      };
      xhr.send();
    }

    function displayPosts(posts) {
      const container = document.getElementById("posts");
      container.innerHTML = "";
      posts.forEach(p => {
        container.innerHTML += `
          <div class="post">
            <h3>#${p.id} - ${p.title}</h3>
            <p>${p.body}</p>
          </div>
        `;
      });
    }

    // POST - Create new post
    function createPost() {
      const data = {
        title: document.getElementById("newTitle").value,
        body: document.getElementById("newBody").value,
        userId: 1
      };

      const xhr = new XMLHttpRequest();
      xhr.open("POST", API);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        alert("Post Created:\n" + xhr.responseText);
      };

      xhr.send(JSON.stringify(data));
    }

    // PUT - Update post
    function updatePost() {
      const id = document.getElementById("updateId").value;

      const data = {
        title: document.getElementById("updateTitle").value,
        body: document.getElementById("updateBody").value,
        userId: 1
      };

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${API}/${id}`);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        alert("Post Updated:\n" + xhr.responseText);
      };

      xhr.send(JSON.stringify(data));
    }

    // DELETE - Delete post
    function deletePost() {
      const id = document.getElementById("deleteId").value;
      const xhr = new XMLHttpRequest();

      xhr.open("DELETE", `${API}/${id}`);
      xhr.onload = function () {
        alert("Post Deleted (Fake): Status " + xhr.status);
      };
      xhr.send();
    }