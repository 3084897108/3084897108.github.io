// 从script.js中导入文章数据
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
            <p>闭包是指那些能够访问自由变量的函数。</p>
        `,
        tags: ["技术", "JavaScript", "编程"],
        category: "tech"
    },
    {
        id: 2,
        title: "春日生活随笔",
        date: "2024年3月19日",
        author: "李四",
        excerpt: "记录了一次美好的春日时光...",
        content: `
            <h1>春日生活随笔</h1>
            <p>春天是最美好的季节，万物复苏，充满生机。</p>
        `,
        tags: ["生活", "随笔"],
        category: "life"
    },
    {
        id: 3,
        title: "云南之旅",
        date: "2024年3月18日",
        author: "王五",
        excerpt: "记录了一次难忘的云南旅行经历...",
        content: `
            <h1>云南之旅</h1>
            <p>云南是一个美丽的地方，有着独特的风景和文化。</p>
        `,
        tags: ["旅行", "风景"],
        category: "travel"
    }
];

// 获取当前页面的分类
function getCurrentCategory() {
    const path = window.location.pathname;
    if (path.includes('tech')) return 'tech';
    if (path.includes('life')) return 'life';
    if (path.includes('travel')) return 'travel';
    return null;
}

// 加载分类文章
function loadCategoryPosts() {
    const category = getCurrentCategory();
    if (!category) return;

    const postsContainer = document.querySelector(`#${category}-posts`);
    if (!postsContainer) return;

    const categoryPosts = blogPosts.filter(post => post.category === category);

    categoryPosts.forEach(post => {
        const articleElement = document.createElement('article');
        articleElement.className = 'post';
        
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
        
        postsContainer.appendChild(articleElement);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadCategoryPosts);

document.addEventListener('DOMContentLoaded', function() {
    // 加载现有分类到所有页面的导航栏
    loadCategories();
    
    // 处理添加分类表单提交
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newCategory = {
                id: Date.now(),
                name: document.getElementById('category-name').value,
                slug: document.getElementById('category-name').value.toLowerCase().replace(/\s+/g, '-'),
                description: document.getElementById('category-description').value
            };
            
            // 保存新分类
            saveCategory(newCategory);
            
            // 重新加载导航栏
            loadCategories();
            
            // 创建新的分类页面
            createCategoryPage(newCategory);
            
            alert('分类添加成功！');
            window.location.href = `${newCategory.slug}.html`;
        });
    }
});

// 保存分类到 localStorage
function saveCategory(category) {
    const categories = getCategories();
    categories.push(category);
    localStorage.setItem('blog_categories', JSON.stringify(categories));
}

// 获取所有分类
function getCategories() {
    const categories = localStorage.getItem('blog_categories');
    return categories ? JSON.parse(categories) : [
        { id: 1, name: '技术', slug: 'tech', description: '技术相关文章' },
        { id: 2, name: '生活', slug: 'life', description: '生活随笔' },
        { id: 3, name: '旅行', slug: 'travel', description: '旅行见闻' }
    ];
}

// 加载分类到导航栏
function loadCategories() {
    const categories = getCategories();
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent) {
        dropdownContent.innerHTML = categories.map(category => `
            <li><a href="${category.slug}.html">${category.name}</a></li>
        `).join('');
    }
}

// 创建新的分类页面
function createCategoryPage(category) {
    // 这里可以通过 GitHub API 创建新的分类页面
    // 或者提供一个模板让用户手动创建
    console.log('需要创建新的分类页面:', category);
} 