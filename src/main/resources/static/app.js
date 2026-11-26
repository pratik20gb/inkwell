// Remembers which post is being edited.
// null means no post is being edited (we are in "create new post" mode).
let editingID = null;


// ---------- 1. Get all posts from the server and show them ----------
async function loadPosts() {
  // Ask the server for the posts (GET /api/posts)
  const response = await fetch("/api/posts");

  // Turn the JSON text into JavaScript data
  const posts = await response.json();

  // Find the empty box in the HTML where posts will be shown
  const container = document.getElementById("posts");

  // Clear the box so posts don't appear twice
  container.textContent = "";

  // This code runs once for every post
  for (const post of posts) {
    // One box for one post
    const article = document.createElement("article");

    // The title (heading)
    const title = document.createElement("h2");
    title.textContent = post.title;

    // The content (paragraph)
    const content = document.createElement("p");
    content.textContent = post.content;

    // Edit button: on click, run startEdit and pass this post
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      startEdit(post);
    });

    // Delete button: on click, run deletePost and pass only the id
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deletePost(post.id);
    });

    // Put everything inside the post box (the order matters)
    article.append(title, content, editButton, deleteButton);

    // Add the post box to the page so it becomes visible
    container.append(article);
  }
}


// ---------- 2. Delete a post ----------
async function deletePost(id) {
  // Show an OK/Cancel box. If the user clicks Cancel, stop here.
  if (!confirm("Delete this post?")) {
    return;
  }

  // Send a DELETE request, for example /api/posts/3
  const response = await fetch("/api/posts/" + id, { method: "DELETE" });

  // If it worked, load the list again so the post disappears
  if (response.ok) {
    if(editingID==id){
    stopEdit();
    }
    loadPosts();
  }
}


// ---------- 3. Start editing a post ----------
function startEdit(post) {
  // Remember which post we are editing
  editingID = post.id;

  // Fill the form boxes with the post's current title and content
  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;

  // Change the button text and show the Cancel button
  document.getElementById("submit-button").textContent = "Save changes";
  document.getElementById("cancel-button").hidden = false;
}


// ---------- 4. Stop editing (put everything back to normal) ----------
function stopEdit() {
  editingID = null;   // no post is being edited now
  form.reset();       // empty the form boxes
  document.getElementById("submit-button").textContent = "Publish";
  document.getElementById("cancel-button").hidden = true;   // hide Cancel again
}


// ---------- 5. The form ----------
// Find the form
const form = document.getElementById("post-form");

// When Cancel is clicked, run stopEdit.
// Note: there is no () after stopEdit, because we want it to run on click, not right now.
document.getElementById("cancel-button").addEventListener("click", stopEdit);

// This runs when the form is submitted (Publish or Save changes)
form.addEventListener("submit", async function (event) {
  // Stop the browser from reloading the page
  event.preventDefault();

  // Clear old red error messages
  document.getElementById("title-error").textContent = "";
  document.getElementById("content-error").textContent = "";

  // Put what the user typed into one object
  const newPost = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value
  };

  // Are we editing, or creating a new post?
  const isEditing = editingID !== null;

  // Editing: /api/posts/3 (with the id). Creating: /api/posts
  const url = isEditing ? "/api/posts/" + editingID : "/api/posts";

  // Editing: PUT (replace). Creating: POST (new).
  const method = isEditing ? "PUT" : "POST";

  // Send the request to the server
  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },  // tells the server the body is JSON
    body: JSON.stringify(newPost)                      // turns the object into JSON text
  });

  if (response.ok) {
    // It worked: leave edit mode and reload the list
    stopEdit();
    loadPosts();
  } else {
    // Something was wrong (for example, an empty title). Read the server's error.
    const error = await response.json();
    const errors = error.errors || {};

    // Show the red messages next to the form fields
    document.getElementById("title-error").textContent = errors.title || "";
    document.getElementById("content-error").textContent = errors.content || "";
  }
});


// Show the posts as soon as the page opens
loadPosts();