/* ============================================
   静谧花园 - 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initParticles();
    initNavbar();
    initScrollReveal();
    initStatsCounter();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initActiveNavLink();
});

/* ---------- 自定义光标 ---------- */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 检测可 hover 元素
    const hoverElements = document.querySelectorAll('a, button, .btn, .blog-card, .gallery-item, .social-link, .nav-toggle');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
    
    function animate() {
        // 光标直接跟随
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        
        // 跟随者延迟跟随
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ---------- 粒子背景 ---------- */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    const colors = [
        'rgba(201, 160, 220, 0.4)',
        'rgba(232, 160, 191, 0.3)',
        'rgba(212, 165, 116, 0.25)',
        'rgba(226, 198, 240, 0.35)',
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = left + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
        
        container.appendChild(particle);
    }
}

/* ---------- 导航栏滚动效果 ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ---------- 滚动显示动画 ---------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 不同延迟
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = delay + 's';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach((el, index) => {
        // 为博客卡片添加递增延迟
        if (el.closest('.blog-grid')) {
            const cardIndex = Array.from(el.parentElement.children).indexOf(el);
            el.style.transitionDelay = (cardIndex * 0.1) + 's';
        }
        // 为画廊项目添加递增延迟
        if (el.closest('.gallery-grid')) {
            const itemIndex = Array.from(el.parentElement.children).indexOf(el);
            el.style.transitionDelay = (itemIndex * 0.08) + 's';
        }
        observer.observe(el);
    });
}

/* ---------- 数字递增动画 ---------- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    function update(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // easeOutExpo
                        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const current = Math.floor(eased * target);
                        
                        stat.textContent = current.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }
                    
                    requestAnimationFrame(update);
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

/* ---------- 移动端菜单 ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // 点击菜单项后关闭
    const navLinks = menu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ---------- 回到顶部按钮 ---------- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ---------- 平滑滚动（增强） ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- 活跃导航链接高亮 ---------- */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ---------- 页面加载完成后的入场动画 ---------- */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/* ---------- 视差滚动效果（鼠标移动时 Hero 区域微动） ---------- */
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) return;
    
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    
    const circles = hero.querySelectorAll('.floating-circle');
    circles.forEach((circle, index) => {
        const depth = (index + 1) * 15;
        circle.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
    
    const petals = hero.querySelectorAll('.floating-petal');
    petals.forEach((petal, index) => {
        const depth = (index + 1) * 8;
        petal.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
});