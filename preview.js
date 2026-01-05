// 预览页面专用功能

// 渲染简历到页面
function renderResume() {
    const data = loadResumeData();
    const container = document.getElementById('resume-content');
    
    if (!container) return;
    
    let html = `
        <!-- 个人信息 -->
        <div class="resume-header">
            <h1 class="resume-name">${data.personal_info.name}</h1>
            <p class="resume-title">${data.personal_info.title}</p>
            <div class="resume-contact">
                <p>
                    <i class="fas fa-envelope"></i> ${data.personal_info.email} | 
                    <i class="fas fa-phone"></i> ${data.personal_info.phone || '未填写'} | 
                    <i class="fas fa-map-marker-alt"></i> ${data.personal_info.location}
                </p>
                <p>
                    <i class="fab fa-github"></i> <a href="${data.personal_info.github}">${data.personal_info.github}</a> | 
                    <i class="fab fa-linkedin"></i> <a href="${data.personal_info.linkedin}">${data.personal_info.linkedin}</a>
                </p>
            </div>
        </div>
        
        <!-- 个人摘要 -->
        <div class="resume-section">
            <h2 class="resume-section-title">
                <i class="fas fa-user"></i> 个人摘要
            </h2>
            <p>${data.summary}</p>
        </div>
        
        <!-- 工作经历 -->
        <div class="resume-section">
            <h2 class="resume-section-title">
                <i class="fas fa-briefcase"></i> 工作经历
            </h2>
    `;
    
    data.experience.forEach(exp => {
        html += `
            <div class="resume-item">
                <div class="resume-item-header">
                    <span class="resume-item-title">${exp.title}</span>
                    <span>${exp.start_date} - ${exp.end_date}</span>
                </div>
                <div class="resume-item-subtitle">${exp.company} | ${exp.location}</div>
                <ul>
        `;
        
        exp.description.forEach(desc => {
            html += `<li>${desc}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    });
    
    html += `
        </div>
        
        <!-- 项目经验 -->
        <div class="resume-section">
            <h2 class="resume-section-title">
                <i class="fas fa-project-diagram"></i> 项目经验
            </h2>
    `;
    
    data.projects.forEach(proj => {
        html += `
            <div class="resume-item">
                <div class="resume-item-header">
                    <span class="resume-item-title">${proj.name}</span>
                    <span>${proj.year}</span>
                </div>
                ${proj.role ? `<div class="resume-item-subtitle">角色: ${proj.role}</div>` : ''}
                <p><strong>技术栈:</strong> ${proj.tech_stack}</p>
                <p>${proj.description}</p>
                <p><strong>链接:</strong> <a href="${proj.link}" target="_blank">${proj.link}</a></p>
            </div>
        `;
    });
    
    html += `
        </div>
        
        <!-- 技能 -->
        <div class="resume-section">
            <h2 class="resume-section-title">
                <i class="fas fa-code"></i> 技能
            </h2>
            <div class="resume-skills">
    `;
    
    data.skills.forEach(skill => {
        html += `<span class="resume-skill-tag">${skill}</span>`;
    });
    
    html += `
            </div>
        </div>
        
        <!-- 教育背景 -->
        <div class="resume-section">
            <h2 class="resume-section-title">
                <i class="fas fa-graduation-cap"></i> 教育背景
            </h2>
    `;
    
    data.education.forEach(edu => {
        html += `
            <div class="resume-item">
                <div class="resume-item-header">
                    <span class="resume-item-title">${edu.degree}</span>
                    <span>${edu.graduation_date}</span>
                </div>
                <div class="resume-item-subtitle">${edu.university} | ${edu.location}</div>
                ${edu.gpa ? `<p><strong>GPA:</strong> ${edu.gpa}</p>` : ''}
                ${edu.honors ? `<p><strong>荣誉:</strong> ${edu.honors}</p>` : ''}
            </div>
        `;
    });
    
    // 证书（如果有）
    if (data.certifications && data.certifications.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">
                    <i class="fas fa-certificate"></i> 证书
                </h2>
        `;
        
        data.certifications.forEach(cert => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">
                        <span class="resume-item-title">${cert.name}</span>
                        <span>${cert.date}</span>
                    </div>
                    <div class="resume-item-subtitle">${cert.issuer}</div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    // 语言（如果有）
    if (data.languages && data.languages.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">
                    <i class="fas fa-language"></i> 语言能力
                </h2>
                <div class="resume-skills">
        `;
        
        data.languages.forEach(lang => {
            html += `<span class="resume-skill-tag">${lang.language}: ${lang.level}</span>`;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    html += `
        <div class="resume-footer" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 0.9rem;">
            <p>最后更新: ${new Date().toLocaleDateString('zh-CN')} | 使用在线简历编辑器生成</p>
        </div>
    `;
    
    container.innerHTML = html;
}

// 分享简历
function shareResume() {
    const data = loadResumeData();
    const shareText = `查看${data.personal_info.name}的在线简历`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: `${data.personal_info.name}的简历`,
            text: shareText,
            url: shareUrl
        })
        .then(() => showMessage('分享成功！'))
        .catch(error => console.log('分享失败:', error));
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(shareUrl)
            .then(() => showMessage('链接已复制到剪贴板！'))
            .catch(err => {
                // 备用方案
                const textArea = document.createElement('textarea');
                textArea.value = shareUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showMessage('链接已复制到剪贴板！');
            });
    }
}

// 初始化预览页面
document.addEventListener('DOMContentLoaded', function() {
    renderResume();
});