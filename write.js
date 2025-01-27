document.addEventListener('DOMContentLoaded', function() {
    const tagsInput = document.getElementById('tags-input');
    const tagsList = document.querySelector('.tags-list');
    const previewBtn = document.getElementById('preview-btn');
    const articleForm = document.getElementById('article-form');
    let tags = new Set();

    // 处理标签输入
    tagsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const inputTags = this.value.split(',');
            inputTags.forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag && !tags.has(trimmedTag)) {
                    addTag(trimmedTag);
                }
            });
            this.value = '';
        }
    });

    // 当失去焦点时也处理标签
    tagsInput.addEventListener('blur', function() {
        if (this.value) {
            const inputTags = this.value.split(',');
            inputTags.forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag && !tags.has(trimmedTag)) {
                    addTag(trimmedTag);
                }
            });
            this.value = '';
        }
    });

    // 添加标签
    function addTag(tag) {
        tags.add(tag);
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            ${tag}
            <span class="tag-remove" data-tag="${tag}">×</span>
        `;
        tagsList.appendChild(tagElement);

        // 添加删除标签的事件监听
        tagElement.querySelector('.tag-remove').addEventListener('click', function() {
            const tagToRemove = this.dataset.tag;
            tags.delete(tagToRemove);
            this.parentElement.remove();
        });
    }

    // 预览功能
    previewBtn.addEventListener('click', function() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const previewSection = document.querySelector('.article-preview');
        const previewContent = document.getElementById('preview-content');

        if (previewSection.style.display === 'none') {
            previewContent.innerHTML = `
                <h1>${title}</h1>
                <div class="preview-tags">
                    ${Array.from(tags).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="preview-body">
                    ${content}
                </div>
            `;
            previewSection.style.display = 'block';
            this.textContent = '关闭预览';
        } else {
            previewSection.style.display = 'none';
            this.textContent = '预览';
        }
    });

    // 添加 GitHub API 相关配置
    const GITHUB_CONFIG = {
        owner: '3084897108',
        repo: '-',
        path: 'blog/posts', // 文章存储路径
        branch: 'main'
    };

    // 修改表单提交处理
    articleForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 获取 GitHub Token（需要用户先配置）
        const token = localStorage.getItem('github_token');
        if (!token) {
            const userToken = prompt('请输入你的GitHub Personal Access Token:');
            if (userToken) {
                localStorage.setItem('github_token', userToken);
            } else {
                alert('需要GitHub Token才能发布文章！');
                return;
            }
        }

        const articleData = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            tags: Array.from(tags),
            content: document.getElementById('content').value,
            date: new Date().toLocaleDateString('zh-CN'),
            author: '博主'
        };

        try {
            // 创建文章文件名
            const fileName = `${Date.now()}-${articleData.title.replace(/[^a-zA-Z0-9]/g, '-')}.md`;
            
            // 转换为Markdown格式
            const markdown = generateMarkdown(articleData);
            
            // 上传到GitHub
            await createGitHubFile(fileName, markdown);
            
            alert('文章发布成功！');
            window.location.href = 'blog.html';
        } catch (error) {
            console.error('发布失败:', error);
            alert('发布失败，请检查GitHub Token是否正确！');
        }
    });

    // 生成Markdown内容
    function generateMarkdown(article) {
        return `---
title: ${article.title}
date: ${article.date}
author: ${article.author}
category: ${article.category}
tags: [${article.tags.join(', ')}]
---

${article.content}
`;
    }

    // 创建GitHub文件
    async function createGitHubFile(fileName, content) {
        const token = localStorage.getItem('github_token');
        const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}/${fileName}`;

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Add new article: ${fileName}`,
                content: btoa(unescape(encodeURIComponent(content))), // 转换为base64
                branch: GITHUB_CONFIG.branch
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create file');
        }

        return response.json();
    }

    // 保存草稿
    document.querySelector('.save-draft-btn').addEventListener('click', function() {
        const draftData = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            tags: Array.from(tags),
            content: document.getElementById('content').value,
            lastSaved: new Date().toLocaleString('zh-CN')
        };

        localStorage.setItem('article_draft', JSON.stringify(draftData));
        alert('草稿已保存！');
    });

    // 加载草稿
    const savedDraft = localStorage.getItem('article_draft');
    if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        document.getElementById('title').value = draft.title || '';
        document.getElementById('category').value = draft.category || 'tech';
        document.getElementById('content').value = draft.content || '';
        draft.tags.forEach(tag => addTag(tag));
    }
}); 