document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
 
 
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><strong>Category:</strong> ${post.category}</p>
                <p><strong>Likes:</strong> <span id="like-count-${index}">${post.likes || 0}</span></p>
                <button onclick="likePost(${index})">Like</button>
                <button onclick="commentOnPost(${index})">Comment</button>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
                <div class="comments" id="comments-${index}">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
            `;
            postsContainer.appendChild(postDiv);
        });
    }
 
 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const category = document.getElementById('category').value;
 
 
        const newPost = { title, content, category, likes: 0, comments: [] };
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        form.reset();
        loadPosts();
    });
 
 
    window.likePost = function(index) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        posts[index].likes = (posts[index].likes || 0) + 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById(`like-count-${index}`).innerText = posts[index].likes;
    };
 
 
    window.commentOnPost = function(index) {
        const comment = prompt('Enter your comment:');
        if (comment) {
            const posts = JSON.parse(localStorage.getItem('posts'));
            posts[index].comments.push(comment);
            localStorage.setItem('posts', JSON.stringify(posts));
            loadPosts();
        }
    };



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const category = document.getElementById('category').value;
    
        const newPost = { title, content, category, likes: 0, comments: [] };
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        form.reset();
        loadPosts();
    
        // Show success message
        alert('Your post has been added successfully!');
    });
    
 
 
    window.editPost = function(index) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        const post = posts[index];
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('category').value = post.category;
 
 
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    };
 
 
    window.deletePost = function(index) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    };
 
 
    loadPosts();
 });
 

