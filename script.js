// 示例博客文章数据
const blogPosts = [
    {
        id: 1,
        title: "JavaScript高级技巧解析",
        date: "2024年3月20日",
        author: "张三",
        excerpt: "探讨JavaScript中的闭包、原型链等高级概念...",
        content: `
            <h1>JavaScript高级技巧解析</h1>
            <p>在JavaScript开发中，理解闭包和原型链是非常重要的。</p>
            <h2>1. 闭包</h2>
            <p>闭包是指那些能够访问自由变量的函数。换句话说，闭包是函数和其周围状态的引用的组合。</p>
            <h2>2. 原型链</h2>
            <p>原型链是JavaScript实现继承的主要方法。当试图访问一个对象的属性时，不仅会在该对象上搜索，还会搜索该对象的原型。</p>
            <!-- 更多文章内容 -->
        `,
        tags: ["技术", "JavaScript", "编程"],
        category: "tech"
    },
    {
        id: 2,
        title: "春日旅行记",
        date: "2024年3月19日",
        author: "李四",
        excerpt: "记录了一次美妙的春季旅行经历...",
        content: `
            <h1>春日旅行记</h1>
            <p>春天是最适合旅行的季节，万物复苏，处处充满生机。</p>
            <h2>1. 行程准备</h2>
            <p>这次旅行我选择了江南水乡作为目的地，准备了为期一周的行程。</p>
            <h2>2. 沿途风景</h2>
            <p>江南的春天特别美，小桥流水，粉墙黛瓦，处处都是诗画般的景致。</p>
            <!-- 更多文章内容 -->
        `,
        tags: ["生活", "旅行"],
        category: "travel"
    },
    // 可以添加更多文章
];

// 加载文章列表
function loadBlogPosts() {
    const postsGrid = document.querySelector('.posts-grid');
    if (!postsGrid) return;

    blogPosts.forEach(post => {
        const articleElement = document.createElement('article');
        articleElement.className = 'post';
        articleElement.id = `article-${post.id}`;
        
        const tagsHtml = post.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        
        articleElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="post-meta">
                <span class="date">${post.date}</span>
                <span class="author">作者：${post.author}</span>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-tags">${tagsHtml}</div>
            <a href="article.html?id=${post.id}" class="read-more">阅读更多</a>
        `;
        
        postsGrid.appendChild(articleElement);
    });
}

// 加载文章详情
function loadArticleContent() {
    const articleContent = document.getElementById('article-content');
    if (!articleContent) return;

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    
    const article = blogPosts.find(post => post.id === articleId);
    
    if (article) {
        document.title = `${article.title} - 我的博客`;
        articleContent.id = `article-${article.id}`; // 设置文章ID用于评论关联
        
        const tagsHtml = article.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        
        articleContent.innerHTML = `
            <div class="post-meta">
                <span class="date">${article.date}</span>
                <span class="author">作者：${article.author}</span>
            </div>
            <div class="post-tags">${tagsHtml}</div>
            <div class="article-content">
                ${article.content}
            </div>
        `;
    } else {
        articleContent.innerHTML = '<p>文章不存在</p>';
    }
}

function addComment(container, name, text) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    const date = new Date().toLocaleDateString('zh-CN');
    
    comment.innerHTML = `
        <div class="comment-author">${name}</div>
        <div class="comment-date">${date}</div>
        <p>${text}</p>
    `;
    
    container.appendChild(comment);
}

// 分类过滤功能
function filterByCategory(category) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
    loadArticleContent();
}); 