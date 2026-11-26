// Show every post as a link to its own page
async function loadPosts() {
  const response = await fetch("/api/posts");
  const posts = await response.json();

  const container = document.getElementById("posts");
  container.textContent = "";

  for (const post of posts) {
    const link = document.createElement("a");
    link.textContent = post.title;
    link.href = "post.html?id=" + post.id;   // e.g. post.html?id=3
    link.className = "post-link";
    container.append(link);
  }
}

// Create a new post when the form is submitted
const form = document.getElementById("post-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  document.getElementById("title-error").textContent = "";
  document.getElementById("content-error").textContent = "";

  const newPost = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value
  };

  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)
  });

  if (response.ok) {
    form.reset();
    loadPosts();
  } else {
    const error = await response.json();
    const errors = error.errors || {};
    document.getElementById("title-error").textContent = errors.title || "";
    document.getElementById("content-error").textContent = errors.content || "";
  }
});

loadPosts();