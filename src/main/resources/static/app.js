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
loadPosts();