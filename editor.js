// 编辑器专用功能
let resumeData = loadResumeData();

// 加载数据到表单
function loadDataToForm() {
    // 个人信息
    document.getElementById('name').value = resumeData.personal_info.name;
    document.getElementById('title').value = resumeData.personal_info.title;
    document.getElementById('email').value = resumeData.personal_info.email;
    document.getElementById('phone').value = resumeData.personal_info.phone || '';
    document.getElementById('github').value = resumeData.personal_info.github;
    document.getElementById('linkedin').value = resumeData.personal_info.linkedin;
    document.getElementById('location').value = resumeData.personal_info.location;
    
    // 个人摘要
    document.getElementById('summary').value = resumeData.summary;
    
    // 工作经历
    renderExperiences();
    
    // 项目经验
    renderProjects();
    
    // 技能
    renderSkills();
    
    // 教育背景
    renderEducations();
    
    // 证书
    renderCertifications();
    
    // 语言
    renderLanguages();
    
    // 添加技能输入事件
    document.getElementById('new-skill').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });
}

// 渲染工作经历
function renderExperiences() {
    const container = document.getElementById('experience-container');
    container.innerHTML = '';
    
    resumeData.experience.forEach((exp, index) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <div class="array-item-header">
                <h3>工作经历 ${index + 1}</h3>
                <button onclick="removeExperience(${index})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>职位</label>
                    <input type="text" value="${exp.title}" 
                           oninput="updateExperience(${index}, 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>公司</label>
                    <input type="text" value="${exp.company}" 
                           oninput="updateExperience(${index}, 'company', this.value)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>地点</label>
                    <input type="text" value="${exp.location}" 
                           oninput="updateExperience(${index}, 'location', this.value)">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>开始时间</label>
                        <input type="text" value="${exp.start_date}" 
                               oninput="updateExperience(${index}, 'start_date', this.value)">
                    </div>
                    <div class="form-group">
                        <label>结束时间</label>
                        <input type="text" value="${exp.end_date}" 
                               oninput="updateExperience(${index}, 'end_date', this.value)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>工作描述（每行一条）</label>
                <textarea oninput="updateExperienceDescription(${index}, this.value)" 
                          rows="4">${exp.description.join('\n')}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

// 渲染项目经验
function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    resumeData.projects.forEach((proj, index) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <div class="array-item-header">
                <h3>项目经验 ${index + 1}</h3>
                <button onclick="removeProject(${index})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>项目名称</label>
                    <input type="text" value="${proj.name}" 
                           oninput="updateProject(${index}, 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>年份</label>
                    <input type="text" value="${proj.year}" 
                           oninput="updateProject(${index}, 'year', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>技术栈</label>
                <input type="text" value="${proj.tech_stack}" 
                       oninput="updateProject(${index}, 'tech_stack', this.value)">
            </div>
            <div class="form-group">
                <label>角色</label>
                <input type="text" value="${proj.role || ''}" 
                       oninput="updateProject(${index}, 'role', this.value)">
            </div>
            <div class="form-group">
                <label>项目描述</label>
                <textarea oninput="updateProject(${index}, 'description', this.value)" 
                          rows="3">${proj.description}</textarea>
            </div>
            <div class="form-group">
                <label>项目链接</label>
                <input type="url" value="${proj.link}" 
                       oninput="updateProject(${index}, 'link', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

// 渲染技能
function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    
    resumeData.skills.forEach((skill, index) => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = `
            ${skill}
            <span class="remove-skill" onclick="removeSkill(${index})">&times;</span>
        `;
        container.appendChild(tag);
    });
}

// 渲染教育背景
function renderEducations() {
    const container = document.getElementById('education-container');
    container.innerHTML = '';
    
    resumeData.education.forEach((edu, index) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <div class="array-item-header">
                <h3>教育背景 ${index + 1}</h3>
                <button onclick="removeEducation(${index})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>学位</label>
                    <input type="text" value="${edu.degree}" 
                           oninput="updateEducation(${index}, 'degree', this.value)">
                </div>
                <div class="form-group">
                    <label>学校</label>
                    <input type="text" value="${edu.university}" 
                           oninput="updateEducation(${index}, 'university', this.value)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>地点</label>
                    <input type="text" value="${edu.location}" 
                           oninput="updateEducation(${index}, 'location', this.value)">
                </div>
                <div class="form-group">
                    <label>毕业时间</label>
                    <input type="text" value="${edu.graduation_date}" 
                           oninput="updateEducation(${index}, 'graduation_date', this.value)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>GPA</label>
                    <input type="text" value="${edu.gpa || ''}" 
                           oninput="updateEducation(${index}, 'gpa', this.value)">
                </div>
                <div class="form-group">
                    <label>荣誉</label>
                    <input type="text" value="${edu.honors || ''}" 
                           oninput="updateEducation(${index}, 'honors', this.value)">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// 渲染证书
function renderCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    (resumeData.certifications || []).forEach((cert, index) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <div class="array-item-header">
                <h3>证书 ${index + 1}</h3>
                <button onclick="removeCertification(${index})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>证书名称</label>
                    <input type="text" value="${cert.name}" 
                           oninput="updateCertification(${index}, 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>颁发机构</label>
                    <input type="text" value="${cert.issuer}" 
                           oninput="updateCertification(${index}, 'issuer', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>获得时间</label>
                <input type="text" value="${cert.date}" 
                       oninput="updateCertification(${index}, 'date', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

// 渲染语言
function renderLanguages() {
    const container = document.getElementById('languages-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    (resumeData.languages || []).forEach((lang, index) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <div class="array-item-header">
                <h3>语言 ${index + 1}</h3>
                <button onclick="removeLanguage(${index})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>语言</label>
                    <input type="text" value="${lang.language}" 
                           oninput="updateLanguage(${index}, 'language', this.value)">
                </div>
                <div class="form-group">
                    <label>熟练程度</label>
                    <input type="text" value="${lang.level}" 
                           oninput="updateLanguage(${index}, 'level', this.value)">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// 添加工作经历
function addExperience() {
    resumeData.experience.push({
        title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        description: []
    });
    renderExperiences();
}

// 更新工作经历
function updateExperience(index, field, value) {
    if (resumeData.experience[index]) {
        resumeData.experience[index][field] = value;
    }
}

// 更新工作经历描述
function updateExperienceDescription(index, value) {
    if (resumeData.experience[index]) {
        resumeData.experience[index].description = value.split('\n').filter(line => line.trim());
    }
}

// 删除工作经历
function removeExperience(index) {
    if (confirm('确定要删除这个工作经历吗？')) {
        resumeData.experience.splice(index, 1);
        renderExperiences();
    }
}

// 添加项目经验
function addProject() {
    resumeData.projects.push({
        name: '',
        year: new Date().getFullYear().toString(),
        tech_stack: '',
        description: '',
        link: '',
        role: ''
    });
    renderProjects();
}

// 更新项目经验
function updateProject(index, field, value) {
    if (resumeData.projects[index]) {
        resumeData.projects[index][field] = value;
    }
}

// 删除项目经验
function removeProject(index) {
    if (confirm('确定要删除这个项目经验吗？')) {
        resumeData.projects.splice(index, 1);
        renderProjects();
    }
}

// 添加技能
function addSkill() {
    const input = document.getElementById('new-skill');
    const skill = input.value.trim();
    
    if (skill && !resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        renderSkills();
        input.value = '';
        showMessage(`已添加技能: ${skill}`);
    } else if (resumeData.skills.includes(skill)) {
        showMessage('该技能已存在', 'error');
    }
}

// 删除技能
function removeSkill(index) {
    if (confirm('确定要删除这个技能吗？')) {
        resumeData.skills.splice(index, 1);
        renderSkills();
    }
}

// 添加教育背景
function addEducation() {
    resumeData.education.push({
        degree: '',
        university: '',
        location: '',
        graduation_date: '',
        gpa: '',
        honors: ''
    });
    renderEducations();
}

// 更新教育背景
function updateEducation(index, field, value) {
    if (resumeData.education[index]) {
        resumeData.education[index][field] = value;
    }
}

// 删除教育背景
function removeEducation(index) {
    if (confirm('确定要删除这个教育背景吗？')) {
        resumeData.education.splice(index, 1);
        renderEducations();
    }
}

// 添加证书
function addCertification() {
    if (!resumeData.certifications) {
        resumeData.certifications = [];
    }
    resumeData.certifications.push({
        name: '',
        issuer: '',
        date: ''
    });
    renderCertifications();
}

// 更新证书
function updateCertification(index, field, value) {
    if (resumeData.certifications && resumeData.certifications[index]) {
        resumeData.certifications[index][field] = value;
    }
}

// 删除证书
function removeCertification(index) {
    if (confirm('确定要删除这个证书吗？') && resumeData.certifications) {
        resumeData.certifications.splice(index, 1);
        renderCertifications();
    }
}

// 添加语言
function addLanguage() {
    if (!resumeData.languages) {
        resumeData.languages = [];
    }
    resumeData.languages.push({
        language: '',
        level: ''
    });
    renderLanguages();
}

// 更新语言
function updateLanguage(index, field, value) {
    if (resumeData.languages && resumeData.languages[index]) {
        resumeData.languages[index][field] = value;
    }
}

// 删除语言
function removeLanguage(index) {
    if (confirm('确定要删除这个语言吗？') && resumeData.languages) {
        resumeData.languages.splice(index, 1);
        renderLanguages();
    }
}

// 保存所有数据
function saveAllData() {
    // 收集个人信息
    resumeData.personal_info = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        github: document.getElementById('github').value,
        linkedin: document.getElementById('linkedin').value,
        location: document.getElementById('location').value
    };
    
    // 个人摘要
    resumeData.summary = document.getElementById('summary').value;
    
    // 保存到localStorage
    if (saveResumeData(resumeData)) {
        showMessage('简历保存成功！');
    } else {
        showMessage('保存失败，请检查浏览器设置', 'error');
    }
}

// 恢复默认数据
function resetToDefault() {
    if (confirm('确定要恢复默认数据吗？这会丢失所有当前编辑的内容。')) {
        resumeData = JSON.parse(JSON.stringify(DEFAULT_RESUME));
        saveResumeData(resumeData);
        loadDataToForm();
        showMessage('已恢复默认数据');
    }
}

// 导出数据为JSON文件
function exportData() {
    saveAllData(); // 先保存当前数据
    
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `resume_${resumeData.personal_info.name}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('数据导出成功！');
}

// 导入数据
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // 验证数据格式
                if (importedData.personal_info && importedData.personal_info.name) {
                    resumeData = importedData;
                    saveResumeData(resumeData);
                    loadDataToForm();
                    showMessage('数据导入成功！');
                } else {
                    showMessage('导入的文件格式不正确', 'error');
                }
            } catch (error) {
                showMessage('导入失败：文件格式错误', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// 初始化编辑器
document.addEventListener('DOMContentLoaded', function() {
    loadDataToForm();
});