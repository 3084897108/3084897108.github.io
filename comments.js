// 评论管理类
class CommentManager {
    constructor() {
        this.storageKey = 'blog_comments';
        this.initComments();
    }

    // 初始化评论系统
    initComments() {
        // 获取评论表单
        const commentForm = document.querySelector('#main-comments .comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => this.handleCommentSubmit(e));
        }

        // 加载并显示已有评论
        this.loadComments();
    }

    // 获取当前文章ID
    getCurrentArticleId() {
        // 从URL获取文章ID
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        return articleId || 'default';
    }

    // 处理评论提交
    handleCommentSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const articleId = this.getCurrentArticleId();
        const name = form.querySelector('input[type="text"]').value;
        const content = form.querySelector('textarea').value;
        
        const comment = {
            id: Date.now(),
            articleId: articleId,
            name: name,
            content: content,
            date: new Date().toLocaleString('zh-CN')
        };

        this.saveComment(comment);
        this.displayComment(comment, document.querySelector('#main-comments .comments-list'));
        form.reset();
    }

    // 保存评论到 localStorage
    saveComment(comment) {
        const comments = this.getAllComments();
        comments.push(comment);
        localStorage.setItem(this.storageKey, JSON.stringify(comments));
    }

    // 获取所有评论
    getAllComments() {
        const commentsJson = localStorage.getItem(this.storageKey);
        return commentsJson ? JSON.parse(commentsJson) : [];
    }

    // 加载评论
    loadComments() {
        const comments = this.getAllComments();
        const commentsList = document.querySelector('#main-comments .comments-list');
        if (!commentsList) return;

        const articleId = this.getCurrentArticleId();
        const articleComments = comments.filter(comment => comment.articleId === articleId);
        
        // 清空现有评论
        commentsList.innerHTML = '';
        
        // 按时间顺序显示评论
        articleComments
            .sort((a, b) => a.id - b.id)
            .forEach(comment => {
                this.displayComment(comment, commentsList);
            });
    }

    // 显示评论
    displayComment(comment, container) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${this.escapeHtml(comment.name)}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">${this.escapeHtml(comment.content)}</div>
        `;
        container.appendChild(commentElement);
    }

    // HTML转义，防止XSS攻击
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// 页面加载完成后初始化评论系统
document.addEventListener('DOMContentLoaded', () => {
    new CommentManager();
}); 