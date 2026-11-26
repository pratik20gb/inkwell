// Read the id from the URL: post.html?id=3  ->  "3"
const id = new URLSearchParams(window.location.search).get("id");

const view = document.getElementById("view");
const editForm = document.getElementById("edit-form");
const message = document.getElementById("message");

let post = null;

// Load this one post and show it
async function loadPost() {
  const response = await fetch("/api/posts/" + id);

  if (!response.ok) {
    view.hidden = true;
    message.textContent = "Post not found.";
    return;
  }

  post = await response.json();
  document.title = post.title;
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-content").textContent = post.content;
  view.hidden = false;
}

// Edit: hide the post, show the form filled with the current text
document.getElementById("edit-button").addEventListener("click", function () {
  document.getElementById("edit-title").value = post.title;
  document.getElementById("edit-content").value = post.content;
  view.hidden = true;
  editForm.hidden = false;
});

// Cancel: go back to viewing
document.getElementById("cancel-button").addEventListener("click", function () {
  document.getElementById("title-error").textContent = "";
  document.getElementById("content-error").textContent = "";
  editForm.hidden = true;
  view.hidden = false;
});

// Save: send the changes with PUT
editForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  document.getElementById("title-error").textContent = "";
  document.getElementById("content-error").textContent = "";

  const response = await fetch("/api/posts/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: document.getElementById("edit-title").value,
      content: document.getElementById("edit-content").value
    })
  });

  if (response.ok) {
    editForm.hidden = true;
    loadPost();
  } else if (response.status === 404) {
    editForm.hidden = true;
    message.textContent = "This post no longer exists.";
  } else {
    const error = await response.json();
    const errors = error.errors || {};
    document.getElementById("title-error").textContent = errors.title || "";
    document.getElementById("content-error").textContent = errors.content || "";
  }
});

// Delete: ask first, then send DELETE and go back to the home page
document.getElementById("delete-button").addEventListener("click", async function () {
  if (!confirm("Delete this post?")) {
    return;
  }

  const response = await fetch("/api/posts/" + id, { method: "DELETE" });

  if (response.ok) {
    window.location.href = "/";
  } else {
    alert("Could not delete the post (status " + response.status + ")");
  }
});

loadPost();