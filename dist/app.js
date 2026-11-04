const heroData={
  agent:{src:'assets/aiagent-context.jpg',alt:'수율 현황 화면 옆에서 현재 화면의 맥락과 근거를 보여주는 에이전트 대화 패널',title:'현장 업무 화면 + 에이전트 패널',status:'확장형 UX 컨셉',caption:'기존 업무 화면과 에이전트를 함께 쓰는 경험. 제공된 웹앱의 실제 대화 패널을 촬영했습니다.',href:'#aiagent'},
  ops:{src:'assets/aiops-comparison.jpg',alt:'후보 모델과 운영 모델을 비교하고 반영 승인을 기다리는 AIOps 참조 화면',title:'모델 재학습 / 후보 버전 비교',status:'실제 데모 화면',caption:'모델 지표를 비교하고, 운영 반영은 승인을 거칩니다. 수치는 제공 데모의 예시입니다.',href:'#aiops'},
  bi:{src:'assets/aibi-yield.jpg',alt:'금일 생산량과 공정별 수율 추이를 함께 확인하는 AIBI 참조 화면',title:'현장 분석 / 수율 현황',status:'실제 데모 화면',caption:'생산량, 목표 대비 수율, 공정별 차이를 확인하는 제공 데모의 분석 화면입니다.',href:'#aibi'},
  studio:{src:'assets/mlstudio-results.jpg',alt:'삼정 Data Studio에서 계산한 합성 데이터 모델 비교와 예측 결과',title:'모델 개발 / 비교·예측',status:'합성 데이터 시연',caption:'같은 평가 데이터로 모델을 비교합니다. 합성 데이터로 계산한 실제 프로토타입 화면입니다.',href:'#mlstudio'}
};
const heroTabs=[...document.querySelectorAll('[data-hero]')];
function selectHero(button,focus=false){
  const data=heroData[button.dataset.hero];
  heroTabs.forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  const image=document.getElementById('hero-image');image.src=data.src;image.alt=data.alt;
  document.querySelector('.hero-image-button').setAttribute('aria-label',button.querySelector('span').textContent+' 참조 화면 크게 보기');
  document.getElementById('hero-window-title').textContent=data.title;document.getElementById('hero-window-status').textContent=data.status;
  document.getElementById('hero-caption').textContent=data.caption;document.getElementById('hero-detail-link').href=data.href;
  document.getElementById('hero-panel').setAttribute('aria-labelledby',button.id);
  if(focus){button.focus();button.scrollIntoView({block:'nearest',inline:'nearest'});}
}
function tabKeyboard(event,tabs,select){let next;const i=tabs.indexOf(event.currentTarget);if(event.key==='ArrowRight')next=(i+1)%tabs.length;if(event.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(tabs[next],true);}}
heroTabs.forEach(button=>{button.addEventListener('click',()=>selectHero(button));button.addEventListener('keydown',e=>tabKeyboard(e,heroTabs,selectHero));});
document.querySelectorAll('[data-gallery]').forEach(gallery=>{
  const tabs=[...gallery.querySelectorAll('[data-gallery-src]')];
  function select(button,focus=false){tabs.forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});const img=gallery.querySelector('img');img.src=button.dataset.gallerySrc;img.alt=button.dataset.galleryAlt;gallery.querySelector('figcaption').textContent=button.dataset.galleryCaption;gallery.querySelector('[role="tabpanel"]').setAttribute('aria-labelledby',button.id);if(focus)button.focus();}
  tabs.forEach(button=>{button.addEventListener('click',()=>select(button));button.addEventListener('keydown',e=>tabKeyboard(e,tabs,select));});
});
const menuButton=document.querySelector('.menu-toggle');const menu=document.getElementById('main-nav');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');}
menuButton.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const dialog=document.getElementById('image-dialog');const lightboxImage=document.getElementById('lightbox-image');let returnFocus;
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{const original=document.getElementById(button.dataset.lightbox);lightboxImage.src=original.src;lightboxImage.alt=original.alt;document.getElementById('lightbox-title').textContent=original.alt;returnFocus=button;dialog.showModal();document.body.classList.add('body-locked');document.getElementById('close-lightbox').focus();}));
document.getElementById('close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('body-locked');returnFocus?.focus({preventScroll:true});});

// Hero Background & Orbit Scroll Coordination
const heroBg = document.querySelector('.hero-bg');
const heroBgInner = document.querySelector('.hero-bg-inner');
const heroOrbit = document.querySelector('.hero-orbit');
if (heroBg || heroOrbit) {
  let ticking = false;
  function updateScrollVisuals() {
    const scrollY = window.scrollY || window.pageYOffset;
    const fadeDistance = 600;

    // 1. Top Particle Background: visible at top, zooms in and disappears by 600px
    if (heroBg) {
      if (scrollY > fadeDistance) {
        if (heroBg.style.visibility !== 'hidden') {
          heroBg.style.visibility = 'hidden';
          heroBg.style.opacity = '0';
        }
      } else {
        if (heroBg.style.visibility !== 'visible') {
          heroBg.style.visibility = 'visible';
        }
        const progress = scrollY / fadeDistance;
        heroBg.style.opacity = (1 - progress).toFixed(3);
        const translateY = -scrollY * 0.22;
        const scale = 1 + progress * 0.32;
        if (heroBgInner) {
          heroBgInner.style.transform = 'translate3d(0, ' + translateY.toFixed(1) + 'px, 0) scale(' + scale.toFixed(3) + ')';
        }
      }
    }

    // 2. Orbit Graphic: hidden at top, reveals smoothly as the top image disappears (380px -> 620px)
    if (heroOrbit) {
      const orbitFadeStart = 380;
      const orbitFadeEnd = 620;
      if (scrollY <= orbitFadeStart) {
        if (heroOrbit.style.visibility !== 'hidden') {
          heroOrbit.style.visibility = 'hidden';
          heroOrbit.style.opacity = '0';
        }
      } else if (scrollY >= orbitFadeEnd) {
        if (heroOrbit.style.visibility !== 'visible') {
          heroOrbit.style.visibility = 'visible';
        }
        heroOrbit.style.opacity = '0.88';
      } else {
        if (heroOrbit.style.visibility !== 'visible') {
          heroOrbit.style.visibility = 'visible';
        }
        const orbitProgress = (scrollY - orbitFadeStart) / (orbitFadeEnd - orbitFadeStart);
        heroOrbit.style.opacity = (orbitProgress * 0.88).toFixed(3);
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollVisuals);
      ticking = true;
    }
  }, { passive: true });
  updateScrollVisuals();
}

// AhnLab-style Inertial Smooth Scrolling (Momentum Scroll)
(function initSmoothScroll() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const isTouchOnly = 'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches;
  if (isTouchOnly) return;

  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let isRunning = false;
  const damping = 0.082; // Luxurious momentum damping factor

  function getMaxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function tick() {
    const maxScroll = getMaxScroll();
    targetY = Math.max(0, Math.min(targetY, maxScroll));
    const diff = targetY - currentY;

    if (Math.abs(diff) > 0.4) {
      currentY += diff * damping;
      window.scrollTo(0, currentY);
      requestAnimationFrame(tick);
    } else {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isRunning = false;
    }
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener('wheel', (e) => {
    if (document.body.classList.contains('body-locked')) return;

    let el = e.target;
    while (el && el !== document.body && el !== document.documentElement) {
      const overflowY = window.getComputedStyle(el).overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        return;
      }
      el = el.parentElement;
    }

    e.preventDefault();

    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 40;
    else if (e.deltaMode === 2) delta *= window.innerHeight;

    const isMouseWheel = Math.abs(delta) >= 50;
    const multiplier = isMouseWheel ? 1.15 : 1.0;

    targetY += delta * multiplier;
    targetY = Math.max(0, Math.min(targetY, getMaxScroll()));
    start();
  }, { passive: false });

  window.addEventListener('scroll', () => {
    if (!isRunning) {
      currentY = targetY = window.scrollY;
    }
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href === '#' || href === '#top') {
        e.preventDefault();
        targetY = 0;
        start();
        return;
      }
      const targetElem = document.querySelector(href);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 80;
        const elemTop = targetElem.getBoundingClientRect().top + window.scrollY;
        targetY = Math.max(0, elemTop - headerOffset);
        start();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (document.body.classList.contains('body-locked')) return;

    let delta = 0;
    switch (e.key) {
      case 'ArrowDown': delta = 100; break;
      case 'ArrowUp': delta = -100; break;
      case 'PageDown': delta = window.innerHeight * 0.85; break;
      case 'PageUp': delta = -window.innerHeight * 0.85; break;
      case 'Space':
        delta = e.shiftKey ? -window.innerHeight * 0.75 : window.innerHeight * 0.75;
        break;
      case 'Home':
        targetY = 0;
        start();
        e.preventDefault();
        return;
      case 'End':
        targetY = getMaxScroll();
        start();
        e.preventDefault();
        return;
      default: return;
    }

    if (delta !== 0) {
      e.preventDefault();
      targetY += delta;
      targetY = Math.max(0, Math.min(targetY, getMaxScroll()));
      start();
    }
  });

  window.addEventListener('resize', () => {
    currentY = targetY = window.scrollY;
  });
})();


