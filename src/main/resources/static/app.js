async function loadPosts(){
    const response = await fetch("/api/posts");
    const posts = await response.json();
    const container = document.getElementById("posts");
    container.textContent = "";
    for(const post of posts){
        const article = document.createElement("article");

        const title = document.createElement("h2");
        title.textContent = post.title;

        const content = document.createElement("p");
        content.textContent= post.content;

        article.append(title,content);
        container.append(article);
    }
}
const form = document.getElementById("post-form");
form.addEventListener("submit",async function(event){
event.preventDefault();
document.getElementById("title-error").textContent ="";
document.getElementById("content-error").textContent = "";
const newPost = {
title:document.getElementById("title").value,
content:document.getElementById("content").value
};
const response = await fetch("/api/posts",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(newPost)
});

if(response.ok){
form.reset();
loadPosts();
}else{
const error = await response.json();
const errors = error.errors || {};
document.getElementById("title-error").textContent = errors.title || "";
document.getElementById("content-error").textContent = errors.content || "";
}

})
loadPosts();