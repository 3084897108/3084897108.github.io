document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: this.name.value,
                email: this.email.value,
                subject: this.subject.value,
                message: this.message.value
            };
            
            // 这里可以添加发送表单数据的逻辑
            console.log('表单数据：', formData);
            
            // 显示提交成功消息
            alert('消息已发送！我们会尽快回复您。');
            
            // 重置表单
            this.reset();
        });
    }
}); 