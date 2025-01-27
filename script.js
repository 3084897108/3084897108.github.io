// GitHub API 配置
const GITHUB_CONFIG = {
    owner: '3084897108',
    repo: '-',
    path: 'blog/posts', // 确保这个路径和你的仓库中的文章路径一致
};

// 从GitHub获取文章列表
async function fetchArticles() {
    try {
        // 首先尝试从 GitHub 获取文章
        const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`);
        const files = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch articles from GitHub');
        }

        // 只处理.md文件
        const articles = await Promise.all(files
            .filter(file => file.name.endsWith('.md'))
            .map(async file => {
                try {
                    const contentResponse = await fetch(file.download_url);
                    const content = await contentResponse.text();
                    return parseArticle(content, file.name);
                } catch (error) {
                    console.error(`Error fetching article ${file.name}:`, error);
                    return null;
                }
            }));

        // 过滤掉加载失败的文章
        const validArticles = articles.filter(article => article !== null);

        // 添加一些本地测试文章
        const localArticles = [
            {
                id: '1',
                title: 'Python入门指南：从零开始的编程之旅',
                date: '2024-03-21',
                author: '冯雨阳',
                category: 'tech',
                tags: ['编程', 'Python', '教程', '推荐'],
                content: `
                    <h2>Python简介</h2>
                    <p>Python是一门优雅、简洁且功能强大的编程语言，非常适合初学者入门。</p>
                    <h2>基础语法</h2>
                    <p>Python的基础语法非常直观，让我们从一个简单的Hello World开始：</p>
                    <pre><code>print("Hello, World!")</code></pre>
                    <h2>数据类型</h2>
                    <p>Python中的基本数据类型包括：</p>
                    <ul>
                        <li>数字（整数和浮点数）</li>
                        <li>字符串</li>
                        <li>列表</li>
                        <li>字典</li>
                        <li>元组</li>
                    </ul>
                `,
                excerpt: 'Python是一门优雅、简洁且功能强大的编程语言，非常适合初学者入门。'
            },
            {
                id: '2',
                title: 'Web开发必备：HTML5与CSS3新特性详解',
                date: '2024-03-22',
                author: '冯雨阳',
                category: 'tech',
                tags: ['Web开发', 'HTML5', 'CSS3', '推荐'],
                content: `
                    <h2>HTML5新特性</h2>
                    <p>HTML5引入了许多新的语义化标签和API，让网页开发更加直观和强大。</p>
                    <h3>语义化标签</h3>
                    <ul>
                        <li>header - 页眉</li>
                        <li>nav - 导航</li>
                        <li>main - 主要内容</li>
                        <li>article - 文章</li>
                        <li>section - 区块</li>
                        <li>footer - 页脚</li>
                    </ul>
                    <h2>CSS3新特性</h2>
                    <p>CSS3带来了丰富的视觉效果和动画能力。</p>
                    <h3>主要特性</h3>
                    <ul>
                        <li>圆角（border-radius）</li>
                        <li>阴影（box-shadow）</li>
                        <li>渐变（gradient）</li>
                        <li>转换（transform）</li>
                        <li>过渡（transition）</li>
                        <li>动画（animation）</li>
                    </ul>
                `,
                excerpt: '随着Web技术的发展，HTML5和CSS3为网页开发带来了革命性的改变。'
            },
            {
                id: '3',
                title: 'JavaScript进阶：深入理解闭包和原型链',
                date: '2024-03-23',
                author: '冯雨阳',
                category: 'tech',
                tags: ['JavaScript', '前端开发', '进阶教程', '推荐'],
                content: `
                    <h2>闭包（Closure）</h2>
                    <p>闭包是JavaScript中最强大的特性之一，它允许函数访问其词法作用域之外的变量。</p>
                    <h3>闭包示例</h3>
                    <pre><code>function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
                    <h2>原型链（Prototype Chain）</h2>
                    <p>原型链是JavaScript实现继承的主要机制。</p>
                    <h3>原型链示例</h3>
                    <pre><code>function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(this.name + ' makes a sound.');
};</code></pre>
                `,
                excerpt: '闭包和原型链是JavaScript中最重要的概念之一。'
            },
            {
                id: '4',
                title: '算法入门：常见排序算法详解',
                date: '2024-03-24',
                author: '冯雨阳',
                category: 'tech',
                tags: ['算法', '数据结构', '编程基础', '推荐'],
                content: `
                    <h2>冒泡排序</h2>
                    <p>冒泡排序是最简单的排序算法之一，通过重复比较相邻元素并交换它们的位置来实现排序。</p>
                    <pre><code>function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}</code></pre>
                    <h2>快速排序</h2>
                    <p>快速排序是一种高效的排序算法，使用分治法策略来实现排序。</p>
                    <pre><code>function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter(x => x <= pivot);
    const right = arr.slice(1).filter(x => x > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}</code></pre>
                `,
                excerpt: '排序算法是算法学习的基础。'
            },
            {
                id: '5',
                title: 'Git版本控制：从入门到精通',
                date: '2024-03-25',
                author: '冯雨阳',
                category: 'tech',
                tags: ['Git', '版本控制', '开发工具', '推荐'],
                content: `
                    <h2>Git基础概念</h2>
                    <p>Git是一个分布式版本控制系统，用于跟踪文件的变化。</p>
                    <h3>常用命令</h3>
                    <ul>
                        <li>git init - 初始化仓库</li>
                        <li>git add - 添加文件到暂存区</li>
                        <li>git commit - 提交更改</li>
                        <li>git push - 推送到远程仓库</li>
                        <li>git pull - 拉取远程更新</li>
                    </ul>
                    <h2>分支管理</h2>
                    <p>分支是Git的核心概念之一，允许并行开发不同的功能。</p>
                    <pre><code>git branch feature    # 创建分支
git checkout feature # 切换分支
git merge feature   # 合并分支</code></pre>
                `,
                excerpt: 'Git是现代软件开发中不可或缺的版本控制工具。'
            }
        ];

        // 合并 GitHub 文章和本地文章
        const allArticles = [...validArticles, ...localArticles];

        // 按日期排序
        return allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error fetching articles:', error);
        // 如果 GitHub 加载失败，至少显示本地文章
        return localArticles;
    }
}

// 解析文章内容
function parseArticle(content, fileName) {
    try {
        // 解析 Markdown 文件的 frontmatter
        const frontMatterMatch = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
        if (!frontMatterMatch) {
            throw new Error('Invalid article format');
        }

        const [, frontMatter, body] = frontMatterMatch;
        const metadata = {};
        
        // 解析前置元数据
        frontMatter.split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length) {
                metadata[key.trim()] = values.join(':').trim();
            }
        });

        // 解析标签
        if (metadata.tags) {
            metadata.tags = metadata.tags
                .replace(/[\[\]]/g, '')
                .split(',')
                .map(tag => tag.trim());
        }

        return {
            id: fileName.split('-')[0],
            title: metadata.title || '无标题',
            date: metadata.date || new Date().toLocaleDateString('zh-CN'),
            author: metadata.author || '冯雨阳',
            category: metadata.category || 'uncategorized',
            tags: metadata.tags || [],
            content: body.trim(),
            excerpt: body.trim().slice(0, 200) + '...'
        };
    } catch (error) {
        console.error('Error parsing article:', error);
        return null;
    }
}

// 加载文章列表
async function loadBlogPosts() {
    const postsGrid = document.querySelector('.posts-grid');
    if (!postsGrid) return;

    const articles = await fetchArticles();
    
    // 更新最新文章
    const featuredPost = document.getElementById('article-1');
    if (featuredPost && articles.length > 0) {
        const latest = articles[0];
        featuredPost.innerHTML = `
            <h3>${latest.title}</h3>
            <div class="post-meta">
                <span class="date">${latest.date}</span>
                <span class="author">作者：${latest.author}</span>
            </div>
            <p class="post-excerpt">${latest.excerpt}</p>
            <div class="post-tags">
                ${latest.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="article.html?id=${latest.id}" class="read-more">阅读更多</a>
            <div class="article-actions">
                <button class="like-btn" data-id="${latest.id}">
                    <i class="bi bi-heart"></i>
                    <span class="like-count">0</span>
                </button>
                <div class="share-buttons">
                    <button class="share-btn" data-platform="twitter">
                        <i class="bi bi-twitter"></i>
                    </button>
                    <button class="share-btn" data-platform="facebook">
                        <i class="bi bi-facebook"></i>
                    </button>
                    <button class="share-btn" data-platform="linkedin">
                        <i class="bi bi-linkedin"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // 更新文章列表
    postsGrid.innerHTML = articles.slice(1).map(article => `
        <article class="post" id="article-${article.id}">
            <h3>${article.title}</h3>
            <div class="post-meta">
                <span class="date">${article.date}</span>
                <span class="author">作者：${article.author}</span>
            </div>
            <p class="post-excerpt">${article.excerpt}</p>
            <div class="post-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="article.html?id=${article.id.replace('local-', '')}" class="read-more">阅读更多</a>
            <div class="article-actions">
                <button class="like-btn" data-id="${article.id}">
                    <i class="bi bi-heart"></i>
                    <span class="like-count">0</span>
                </button>
                <div class="share-buttons">
                    <button class="share-btn" data-platform="twitter">
                        <i class="bi bi-twitter"></i>
                    </button>
                    <button class="share-btn" data-platform="facebook">
                        <i class="bi bi-facebook"></i>
                    </button>
                    <button class="share-btn" data-platform="linkedin">
                        <i class="bi bi-linkedin"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// 加载文章详情
async function loadArticleContent() {
    const articleContent = document.getElementById('article-content');
    if (!articleContent) return;

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        articleContent.innerHTML = '<p>文章ID不存在</p>';
        return;
    }

    try {
        // 先尝试从 GitHub 获取文章
        const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`);
        const files = await response.json();
        
        if (response.ok) {
            // 查找对应的文章文件
            const articleFile = files.find(file => file.name.startsWith(articleId) && file.name.endsWith('.md'));
            if (articleFile) {
                const contentResponse = await fetch(articleFile.download_url);
                const content = await contentResponse.text();
                const article = parseArticle(content, articleFile.name);
                
                if (article) {
                    document.title = `${article.title} - 冯雨阳的博客`;
                    articleContent.innerHTML = `
                        <h1>${article.title}</h1>
                        <div class="post-meta">
                            <span class="date">${article.date}</span>
                            <span class="author">作者：${article.author}</span>
                        </div>
                        <div class="post-tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="article-content">
                            ${article.content}
                        </div>
                    `;
                    return;
                }
            }
        }

        // 如果 GitHub 加载失败或找不到文章，尝试加载本地文章
        const localArticles = [
            {
                id: '1',
                title: 'Python入门指南：从零开始的编程之旅',
                date: '2024-03-21',
                author: '冯雨阳',
                category: 'tech',
                tags: ['编程', 'Python', '教程', '推荐'],
                content: `
                    <h2>Python简介</h2>
                    <p>Python是一门优雅、简洁且功能强大的编程语言，非常适合初学者入门。</p>
                    <h2>基础语法</h2>
                    <p>Python的基础语法非常直观，让我们从一个简单的Hello World开始：</p>
                    <pre><code>print("Hello, World!")</code></pre>
                    <h2>数据类型</h2>
                    <p>Python中的基本数据类型包括：</p>
                    <ul>
                        <li>数字（整数和浮点数）</li>
                        <li>字符串</li>
                        <li>列表</li>
                        <li>字典</li>
                        <li>元组</li>
                    </ul>
                `,
                excerpt: 'Python是一门优雅、简洁且功能强大的编程语言，非常适合初学者入门。'
            },
            {
                id: '2',
                title: 'Web开发必备：HTML5与CSS3新特性详解',
                date: '2024-03-22',
                author: '冯雨阳',
                category: 'tech',
                tags: ['Web开发', 'HTML5', 'CSS3', '推荐'],
                content: `
                    <h2>HTML5新特性</h2>
                    <p>HTML5引入了许多新的语义化标签和API，让网页开发更加直观和强大。</p>
                    <h3>语义化标签</h3>
                    <ul>
                        <li>header - 页眉</li>
                        <li>nav - 导航</li>
                        <li>main - 主要内容</li>
                        <li>article - 文章</li>
                        <li>section - 区块</li>
                        <li>footer - 页脚</li>
                    </ul>
                    <h2>CSS3新特性</h2>
                    <p>CSS3带来了丰富的视觉效果和动画能力。</p>
                    <h3>主要特性</h3>
                    <ul>
                        <li>圆角（border-radius）</li>
                        <li>阴影（box-shadow）</li>
                        <li>渐变（gradient）</li>
                        <li>转换（transform）</li>
                        <li>过渡（transition）</li>
                        <li>动画（animation）</li>
                    </ul>
                `,
                excerpt: '随着Web技术的发展，HTML5和CSS3为网页开发带来了革命性的改变。'
            },
            {
                id: '3',
                title: 'JavaScript进阶：深入理解闭包和原型链',
                date: '2024-03-23',
                author: '冯雨阳',
                category: 'tech',
                tags: ['JavaScript', '前端开发', '进阶教程', '推荐'],
                content: `
                    <h2>闭包（Closure）</h2>
                    <p>闭包是JavaScript中最强大的特性之一，它允许函数访问其词法作用域之外的变量。</p>
                    <h3>闭包示例</h3>
                    <pre><code>function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
                    <h2>原型链（Prototype Chain）</h2>
                    <p>原型链是JavaScript实现继承的主要机制。</p>
                    <h3>原型链示例</h3>
                    <pre><code>function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(this.name + ' makes a sound.');
};</code></pre>
                `,
                excerpt: '闭包和原型链是JavaScript中最重要的概念之一。'
            },
            {
                id: '4',
                title: '算法入门：常见排序算法详解',
                date: '2024-03-24',
                author: '冯雨阳',
                category: 'tech',
                tags: ['算法', '数据结构', '编程基础', '推荐'],
                content: `
                    <h2>冒泡排序</h2>
                    <p>冒泡排序是最简单的排序算法之一，通过重复比较相邻元素并交换它们的位置来实现排序。</p>
                    <pre><code>function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}</code></pre>
                    <h2>快速排序</h2>
                    <p>快速排序是一种高效的排序算法，使用分治法策略来实现排序。</p>
                    <pre><code>function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter(x => x <= pivot);
    const right = arr.slice(1).filter(x => x > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}</code></pre>
                `,
                excerpt: '排序算法是算法学习的基础。'
            },
            {
                id: '5',
                title: 'Git版本控制：从入门到精通',
                date: '2024-03-25',
                author: '冯雨阳',
                category: 'tech',
                tags: ['Git', '版本控制', '开发工具', '推荐'],
                content: `
                    <h2>Git基础概念</h2>
                    <p>Git是一个分布式版本控制系统，用于跟踪文件的变化。</p>
                    <h3>常用命令</h3>
                    <ul>
                        <li>git init - 初始化仓库</li>
                        <li>git add - 添加文件到暂存区</li>
                        <li>git commit - 提交更改</li>
                        <li>git push - 推送到远程仓库</li>
                        <li>git pull - 拉取远程更新</li>
                    </ul>
                    <h2>分支管理</h2>
                    <p>分支是Git的核心概念之一，允许并行开发不同的功能。</p>
                    <pre><code>git branch feature    # 创建分支
git checkout feature # 切换分支
git merge feature   # 合并分支</code></pre>
                `,
                excerpt: 'Git是现代软件开发中不可或缺的版本控制工具。'
            }
        ];

        // 查找本地文章
        const article = localArticles.find(a => String(a.id) === articleId);
        
        if (article) {
            document.title = `${article.title} - 冯雨阳的博客`;
            
            articleContent.innerHTML = `
                <h1>${article.title}</h1>
                <div class="post-meta">
                    <span class="date">${article.date}</span>
                    <span class="author">作者：${article.author}</span>
                </div>
                <div class="post-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="article-content">
                    ${article.content}
                </div>
            `;
        } else {
            articleContent.innerHTML = '<p>文章不存在</p>';
        }
    } catch (error) {
        console.error('Error loading article:', error);
        articleContent.innerHTML = '<p>加载文章失败</p>';
    }
}

// 初始化点赞功能
function initializeLikeButtons() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        const articleId = btn.dataset.id;
        const likeCount = btn.querySelector('.like-count');
        const likes = JSON.parse(localStorage.getItem('article_likes') || '{}');

        // 显示保存的点赞数
        likeCount.textContent = likes[articleId] || 0;
        if (likes[articleId]) btn.classList.add('liked');

        // 移除旧的事件监听器
        btn.replaceWith(btn.cloneNode(true));
        const newBtn = document.querySelector(`.like-btn[data-id="${articleId}"]`);

        // 添加新的事件监听器
        newBtn.addEventListener('click', function() {
            const currentLikes = likes[articleId] || 0;
            if (newBtn.classList.contains('liked')) {
                likes[articleId] = currentLikes - 1;
                newBtn.classList.remove('liked');
            } else {
                likes[articleId] = currentLikes + 1;
                newBtn.classList.add('liked');
            }
            newBtn.querySelector('.like-count').textContent = likes[articleId];
            localStorage.setItem('article_likes', JSON.stringify(likes));
        });
    });
}

// 初始化分享功能
function initializeShareButtons() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        // 移除旧的事件监听器
        btn.replaceWith(btn.cloneNode(true));
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl;
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    loadRandomBackground();
    loadBlogPosts();
    loadArticleContent();
    loadFeaturedPosts();
    initializeBubbleMessage();
    initializeLikeButtons();
    initializeShareButtons();
});

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

// 加载随机背景图
async function loadRandomBackground() {
    const bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) return;

    try {
        // 使用多个备选 API
        const imageApis = [
            'https://api.ixiaowai.cn/api/api.php',
            'https://api.mtyqx.cn/api/random.php',
            'https://api.yimian.xyz/img',
            'https://img.paulzzh.com/touhou/random'
        ];

        // 随机选择一个 API
        const imgUrl = imageApis[Math.floor(Math.random() * imageApis.length)];
        
        // 预加载图片
        const img = new Image();
        img.onload = () => {
            bgContainer.style.backgroundImage = `url(${img.src})`;
            bgContainer.style.opacity = '1';
        };
        img.onerror = () => {
            console.error('Failed to load image from:', imgUrl);
            // 如果加载失败，尝试下一个 API
            loadRandomBackground();
        };
        img.src = imgUrl;
    } catch (error) {
        console.error('Failed to load random background:', error);
    }
}

// 加载推荐文章
async function loadFeaturedPosts() {
    const postsScroll = document.querySelector('.posts-scroll');
    if (!postsScroll) return;

    // 只在首页加载推荐文章
    if (window.location.pathname.includes('blog.html')) {
        return;
    }

    const articles = await fetchArticles();
    const featuredArticles = articles.filter(article => article.tags.includes('推荐'));
    
    // 设置CSS变量用于滚动动画
    postsScroll.style.setProperty('--total-posts', featuredArticles.length);
    
    // 为了实现无缝滚动，需要复制一份文章
    const allPosts = [...featuredArticles, ...featuredArticles];
    
    postsScroll.innerHTML = allPosts.map(article => `
        <article class="featured-post-card">
            <h3>${article.title}</h3>
            <div class="post-meta">
                <span class="date">${article.date}</span>
                <span class="author">作者：${article.author}</span>
            </div>
            <p class="post-excerpt">${article.excerpt}</p>
            <div class="post-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="article.html?id=${article.id}" class="read-more">阅读更多</a>
        </article>
    `).join('');
}

// 添加悬浮按钮滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.querySelector('.floating-write-btn');
    if (floatingBtn) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 添加滚动类
            if (scrollTop > 100) {
                floatingBtn.classList.add('scrolled');
            } else {
                floatingBtn.classList.remove('scrolled');
            }

            // 保存最后滚动位置
            lastScrollTop = scrollTop;
        });
    }
});

// 添加导航栏当前页面高亮
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// 添加分类右键菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const categoryLink = document.querySelector('.categories-dropdown > a');
    if (categoryLink) {
        categoryLink.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            window.location.href = 'add-category.html';
        });
    }
});

// 初始化底部泡沫弹窗
function initializeBubbleMessage() {
    const bubble = document.querySelector('.bottom-bubble');
    if (!bubble) return;
    
    let bubbleShown = false;
    
    window.addEventListener('scroll', function() {
        // 检查是否滚动到底部
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const threshold = 50; // 距离底部50px时触发
        
        if (scrollPosition >= totalHeight - threshold) {
            if (!bubbleShown) {
                bubble.classList.add('show');
                bubbleShown = true;
                
                // 3秒后自动隐藏
                setTimeout(() => {
                    bubble.classList.remove('show');
                    bubbleShown = false;
                }, 2000);
            }
        } else {
            // 当用户向上滚动时，重置状态
            bubbleShown = false;
            bubble.classList.remove('show');
        }
    });
}

// 加载动画
document.addEventListener('DOMContentLoaded', function() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        setTimeout(() => {
            spinner.classList.add('hidden');
        }, 1000);
    }
});

// 主题切换
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', document.body.dataset.theme);
        updateThemeIcon();
    });

    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.dataset.theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

// 返回顶部按钮
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
} 