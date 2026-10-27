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
