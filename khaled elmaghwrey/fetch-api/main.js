// API Configuration
const API_BASE = "https://jsonplaceholder.typicode.com";
const ENDPOINTS = {
  posts: `${API_BASE}/posts`,
  singlePost: (id) => `${API_BASE}/posts/${id}`,
};

// DOM Elements
const contentArea = document.querySelector("#content-display");
const btnLoadAll = document.querySelector("#btn-load-all");
const btnLoadOne = document.querySelector("#btn-load-one");
const btnAdd = document.querySelector("#btn-add");
const btnEdit = document.querySelector("#btn-edit");
const btnRemove = document.querySelector("#btn-remove");

// Helper function to show loading state
const showLoader = () => {
  contentArea.innerHTML = '<div class="loader">جاري التحميل...</div>';
};

// Helper function to show errors
const displayError = (message) => {
  contentArea.innerHTML = `<div class="error-message">${message}</div>`;
};

// Display posts in the UI
const displayContent = (data) => {
  const items = Array.isArray(data) ? data : [data];
  contentArea.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("content-card");
    card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${item.title}</h3>
        <span class="user-badge">User #${item.userId}</span>
      </div>
      <p class="card-body">${item.body}</p>
    `;
    contentArea.appendChild(card);
  });
};

// Fetch all posts from API
const fetchAllContent = async () => {
  showLoader();
  try {
    const response = await fetch(ENDPOINTS.posts);
    if (!response.ok) throw new Error("فشل في تحميل البيانات");
    const data = await response.json();
    displayContent(data);
  } catch (error) {
    displayError("حدث خطأ أثناء تحميل المنشورات");
    console.error("Error:", error);
  }
};

// Fetch single post by ID
const fetchSingleContent = async () => {
  showLoader();
  try {
    const response = await fetch(ENDPOINTS.singlePost(1));
    if (!response.ok) throw new Error("فشل في تحميل المنشور");
    const data = await response.json();
    displayContent(data);
  } catch (error) {
    displayError("حدث خطأ أثناء تحميل المنشور");
    console.error("Error:", error);
  }
};

// Create new post
const addNewContent = async () => {
  showLoader();
  const newData = {
    title: "منشور جديد من تطبيقي",
    body: "هذا محتوى المنشور الجديد الذي تم إنشاؤه بنجاح",
    userId: 5,
  };

  try {
    const response = await fetch(ENDPOINTS.posts, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    if (!response.ok) throw new Error("فشل في إنشاء المنشور");
    const data = await response.json();
    displayContent(data);
  } catch (error) {
    displayError("حدث خطأ أثناء إنشاء المنشور");
    console.error("Error:", error);
  }
};

// Update existing post
const modifyContent = async () => {
  showLoader();
  const updatedData = {
    id: 1,
    title: "عنوان محدث للمنشور",
    body: "تم تعديل محتوى هذا المنشور بنجاح",
    userId: 3,
  };

  try {
    const response = await fetch(ENDPOINTS.singlePost(1), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("فشل في تحديث المنشور");
    const data = await response.json();
    displayContent(data);
  } catch (error) {
    displayError("حدث خطأ أثناء تحديث المنشور");
    console.error("Error:", error);
  }
};

// Delete post
const removeContent = async () => {
  showLoader();
  try {
    const response = await fetch(ENDPOINTS.singlePost(1), {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("فشل في حذف المنشور");
    contentArea.innerHTML =
      '<div class="success-message">تم حذف المنشور بنجاح ✓</div>';
  } catch (error) {
    displayError("حدث خطأ أثناء حذف المنشور");
    console.error("Error:", error);
  }
};

// Event Listeners
btnLoadAll?.addEventListener("click", fetchAllContent);
btnLoadOne?.addEventListener("click", fetchSingleContent);
btnAdd?.addEventListener("click", addNewContent);
btnEdit?.addEventListener("click", modifyContent);
btnRemove?.addEventListener("click", removeContent);
