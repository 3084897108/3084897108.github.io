document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const messagesList = document.getElementById('messages-list');
    
    // 加载已有留言
    loadMessages();
    
    // 处理表单提交
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString('zh-CN')
        };
        
        // 保存留言
        saveMessage(message);
        
        // 显示留言
        displayMessage(message);
        
        // 重置表单
        contactForm.reset();
        
        // 显示成功提示
        alert('留言已发送！');
    });
    
    // 保存留言到 localStorage
    function saveMessage(message) {
        const messages = getMessages();
        messages.push(message);
        localStorage.setItem('contact_messages', JSON.stringify(messages));
    }
    
    // 获取所有留言
    function getMessages() {
        const messages = localStorage.getItem('contact_messages');
        return messages ? JSON.parse(messages) : [];
    }
    
    // 加载留言
    function loadMessages() {
        const messages = getMessages();
        messages.forEach(message => displayMessage(message));
    }
    
    // 显示单条留言
    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-item';
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-author">${escapeHtml(message.name)}</span>
                <span class="message-date">${message.date}</span>
            </div>
            <div class="message-content">${escapeHtml(message.message)}</div>
        `;
        messagesList.insertBefore(messageElement, messagesList.firstChild);
    }
    
    // HTML 转义防止 XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});

function sendEmail(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // 构建邮件内容
    const mailtoLink = `mailto:vcby2009@gmail.com?subject=来自博客的留言 - ${name}&body=姓名：${name}%0D%0A%0D%0A发件人邮箱：${email}%0D%0A%0D%0A留言内容：%0D%0A${message}`;
    
    // 打开邮件客户端
    window.location.href = mailtoLink;
    
    // 清空表单
    document.getElementById('contact-form').reset();
    
    return false;
} 