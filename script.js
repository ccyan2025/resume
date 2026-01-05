// 默认简历数据
const DEFAULT_RESUME = {
    personal_info: {
        name: "张明",
        title: "机器学习工程师",
        email: "zhangming@example.com",
        github: "https://github.com/zhangming",
        linkedin: "https://linkedin.com/in/zhangming",
        location: "北京, 中国",
        phone: "+86 138-0000-0000"
    },
    summary: "机器学习工程师，拥有3年以上开发基于LLM的医学图像分析系统的经验，精通Python、Streamlit和模型部署。熟悉深度学习框架如PyTorch和TensorFlow，有丰富的Web应用开发经验。",
    experience: [
        {
            title: "高级机器学习工程师",
            company: "健康科技公司",
            location: "上海, 中国",
            start_date: "2020年1月",
            end_date: "至今",
            description: [
                "设计和实施了医学图像分析系统，将模型准确率提高了30%",
                "开发了基于Streamlit的Web应用，用于从SPECT图像生成医学报告",
                "领导了5人团队开发了AI辅助诊断平台，服务超过100家医院",
                "优化了深度学习模型部署流程，将推理时间减少了40%"
            ]
        },
        {
            title: "机器学习工程师",
            company: "人工智能研究院",
            location: "北京, 中国",
            start_date: "2018年6月",
            end_date: "2020年1月",
            description: [
                "开发了基于深度学习的图像分类算法",
                "优化了模型部署流程，将推理时间减少了40%",
                "参与了多个医疗AI项目的研究与开发",
                "发表了3篇关于医学图像分析的学术论文"
            ]
        }
    ],
    projects: [
        {
            name: "智能医学图像分析系统",
            year: "2022",
            tech_stack: "Python, PyTorch, Streamlit, FastAPI, Docker",
            description: "基于深度学习的医学图像分析平台，支持多种影像格式，能够自动识别病变并生成诊断报告。",
            link: "https://github.com/zhangming/medical-ai",
            role: "项目负责人"
        },
        {
            name: "自动化报告生成工具",
            year: "2021",
            tech_stack: "Python, Transformers, React, Docker, PostgreSQL",
            description: "使用NLP技术自动生成医学报告，提高医生工作效率，支持多语言输出。",
            link: "https://demo.example.com/report-generator",
            role: "核心开发工程师"
        }
    ],
    skills: ["Python", "机器学习", "深度学习", "PyTorch", "TensorFlow", "Streamlit", "FastAPI", "Docker", "Git", "Linux", "SQL", "JavaScript"],
    education: [
        {
            degree: "计算机科学硕士",
            university: "清华大学",
            location: "北京, 中国",
            graduation_date: "2018年6月",
            gpa: "3.8/4.0",
            honors: "优秀毕业生"
        },
        {
            degree: "计算机科学学士",
            university: "北京大学",
            location: "北京, 中国",
            graduation_date: "2015年6月",
            gpa: "3.7/4.0",
            honors: "院长荣誉名单"
        }
    ],
    certifications: [
        {
            name: "AWS认证机器学习专家",
            issuer: "亚马逊云科技",
            date: "2021年3月"
        },
        {
            name: "深度学习专项课程证书",
            issuer: "Coursera",
            date: "2020年8月"
        }
    ],
    languages: [
        { language: "中文", level: "母语" },
        { language: "英语", level: "流利 (TOEFL 105)" },
        { language: "日语", level: "日常会话 (N2)" }
    ]
};

// 保存简历数据到localStorage
function saveResumeData(data) {
    try {
        localStorage.setItem('resumeData', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('保存数据失败:', e);
        return false;
    }
}

// 从localStorage加载简历数据
function loadResumeData() {
    try {
        const saved = localStorage.getItem('resumeData');
        return saved ? JSON.parse(saved) : DEFAULT_RESUME;
    } catch (e) {
        console.error('加载数据失败:', e);
        return DEFAULT_RESUME;
    }
}

// 显示消息提示
function showMessage(text, type = 'success', duration = 3000) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, duration);
    } else {
        // 如果message元素不存在，创建一个临时提示
        const tempMsg = document.createElement('div');
        tempMsg.className = `message ${type}`;
        tempMsg.textContent = text;
        tempMsg.style.cssText = 'position:fixed; top:20px; right:20px; z-index:1000; padding:15px; border-radius:5px;';
        document.body.appendChild(tempMsg);
        
        setTimeout(() => {
            document.body.removeChild(tempMsg);
        }, duration);
    }
}

// 导出为PDF
function exportPDF() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';
    
    try {
        const resumeContent = document.getElementById('resume-content');
        if (!resumeContent) {
            throw new Error('找不到简历内容');
        }
        
        // 使用html2pdf.js生成PDF
        const element = resumeContent;
        const opt = {
            margin:       10,
            filename:     `${loadResumeData().personal_info.name}_简历.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // 检查html2pdf是否可用
        if (typeof html2pdf === 'undefined') {
            // 动态加载html2pdf库
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', function() {
                html2pdf().from(element).set(opt).save();
                if (loadingDiv) loadingDiv.style.display = 'none';
            });
        } else {
            html2pdf().from(element).set(opt).save();
            if (loadingDiv) loadingDiv.style.display = 'none';
        }
        
        showMessage('PDF简历生成成功！');
    } catch (error) {
        console.error('PDF生成失败:', error);
        showMessage(`PDF生成失败: ${error.message}`, 'error');
        if (loadingDiv) loadingDiv.style.display = 'none';
        
        // 备用方案：使用浏览器打印功能
        if (confirm('PDF生成失败，是否使用浏览器打印功能？')) {
            window.print();
        }
    }
}

// 导出为Word文档
async function exportWord() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';
    
    try {
        const data = loadResumeData();
        
        // 使用docx库生成Word文档
        if (typeof docx === 'undefined') {
            // 动态加载docx库
            await loadScript('https://unpkg.com/docx@7.7.0/build/index.js');
        }
        
        const { Document, Paragraph, TextRun, HeadingLevel, Packer, Table, TableRow, TableCell, WidthType } = docx;
        
        // 创建文档
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // 标题
                    new Paragraph({
                        text: data.personal_info.name,
                        heading: HeadingLevel.TITLE,
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { after: 200 }
                    }),
                    
                    // 职位
                    new Paragraph({
                        text: data.personal_info.title,
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { after: 300 }
                    }),
                    
                    // 联系信息
                    new Paragraph({
                        children: [
                            new TextRun(`邮箱: ${data.personal_info.email}`),
                            new TextRun({ text: "    ", break: 1 }),
                            new TextRun(`电话: ${data.personal_info.phone || '未填写'}`),
                            new TextRun({ text: "    ", break: 1 }),
                            new TextRun(`GitHub: ${data.personal_info.github}`),
                            new TextRun({ text: "    ", break: 1 }),
                            new TextRun(`LinkedIn: ${data.personal_info.linkedin}`),
                            new TextRun({ text: "    ", break: 1 }),
                            new TextRun(`地点: ${data.personal_info.location}`)
                        ],
                        spacing: { after: 400 }
                    }),
                    
                    // 个人摘要
                    new Paragraph({
                        text: "个人摘要",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        text: data.summary,
                        spacing: { after: 400 }
                    }),
                    
                    // 工作经历
                    new Paragraph({
                        text: "工作经历",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 }
                    }),
                    ...data.experience.flatMap(exp => [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: exp.title,
                                    bold: true
                                }),
                                new TextRun(`  |  ${exp.start_date} - ${exp.end_date}`)
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: `${exp.company} | ${exp.location}`,
                            spacing: { after: 100 }
                        }),
                        ...exp.description.map(desc => 
                            new Paragraph({
                                text: `• ${desc}`,
                                bullet: {
                                    level: 0
                                },
                                spacing: { after: 50 }
                            })
                        ),
                        new Paragraph({
                            text: "",
                            spacing: { after: 200 }
                        })
                    ]),
                    
                    // 项目经验
                    new Paragraph({
                        text: "项目经验",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 }
                    }),
                    ...data.projects.flatMap(proj => [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: proj.name,
                                    bold: true
                                }),
                                new TextRun(` (${proj.year})`)
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: `技术栈: ${proj.tech_stack}`,
                            spacing: { after: 50 }
                        }),
                        new Paragraph({
                            text: `描述: ${proj.description}`,
                            spacing: { after: 50 }
                        }),
                        new Paragraph({
                            text: `链接: ${proj.link}`,
                            spacing: { after: 200 }
                        })
                    ]),
                    
                    // 技能
                    new Paragraph({
                        text: "技能",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        text: data.skills.join(', '),
                        spacing: { after: 400 }
                    }),
                    
                    // 教育背景
                    new Paragraph({
                        text: "教育背景",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 200 }
                    }),
                    ...data.education.flatMap(edu => [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: edu.degree,
                                    bold: true
                                }),
                                new TextRun(`  |  ${edu.graduation_date}`)
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: `${edu.university} | ${edu.location}`,
                            spacing: { after: 200 }
                        })
                    ])
                ]
            }]
        });
        
        // 生成文档并下载
        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.personal_info.name}_简历.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (loadingDiv) loadingDiv.style.display = 'none';
        showMessage('Word简历生成成功！');
    } catch (error) {
        console.error('Word生成失败:', error);
        showMessage(`Word生成失败: ${error.message}`, 'error');
        if (loadingDiv) loadingDiv.style.display = 'none';
    }
}

// 动态加载JavaScript文件
function loadScript(url, callback) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = function() {
            if (callback) callback();
            resolve();
        };
        script.onerror = function() {
            reject(new Error(`Failed to load script: ${url}`));
        };
        document.head.appendChild(script);
    });
}

// 初始化页面
function initializePage() {
    // 如果是编辑页面，加载数据到表单
    if (document.getElementById('name')) {
        loadDataToForm();
    }
    
    // 如果是预览页面，渲染简历
    if (document.getElementById('resume-content')) {
        renderResume();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePage);