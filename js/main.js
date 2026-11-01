
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')})}
 document.querySelectorAll('.nav-dropdown>button').forEach(btn=>btn.addEventListener('click',()=>{const wrap=btn.parentElement;const open=wrap.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))}));
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.main-nav>a').forEach(a=>{if(a.getAttribute('href').split('/').pop()===current)a.classList.add('active')});
 const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
 const back=document.querySelector('.back-top');if(back){window.addEventListener('scroll',()=>back.classList.toggle('visible',window.scrollY>500),{passive:true});back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}
 // Close mobile navigation after choosing a link.
 document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
 // Gallery filtering and accessible image lightbox.
 const filters=document.querySelectorAll('.filter-btn'),items=document.querySelectorAll('.gallery-item'),lightbox=document.querySelector('.lightbox');
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.toggle('active',b===btn));items.forEach(item=>item.hidden=btn.dataset.filter!=='all'&&item.dataset.category!==btn.dataset.filter)}));
 items.forEach(item=>item.addEventListener('click',()=>{if(!lightbox)return;const img=lightbox.querySelector('img');img.src=item.dataset.full;img.alt=item.dataset.alt||'Roofing project photograph';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
 const close=()=>{if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''};
 lightbox?.querySelector('.lightbox-close')?.addEventListener('click',close);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 // Estimate form: validates and confirms locally; no message is transmitted in demo mode.
 const form=document.querySelector('#estimate-form');
 if(form){form.addEventListener('submit',e=>{e.preventDefault();let valid=true;form.querySelectorAll('[required]').forEach(field=>{const error=field.parentElement.querySelector('.field-error');let message='';if(!field.value.trim())message='This field is required.';else if(field.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()))message='Enter a valid email address.';field.classList.toggle('invalid',!!message);if(error)error.textContent=message;if(message)valid=false});if(!valid){form.querySelector('.invalid')?.focus();return}const btn=form.querySelector('.submit-btn'),success=form.querySelector('.form-success');btn.classList.add('loading');btn.disabled=true;setTimeout(()=>{btn.classList.remove('loading');btn.disabled=false;const data=new FormData(form);const name=String(data.get('name')).replace(/[<>]/g,'');success.hidden=false;success.textContent=`Thanks, ${name}. Your details passed the demo form validation. This is a local demonstration only; no request has been sent to Summit Roofing Co. Connect a form backend before using this on a live business website.`;form.reset()},650)})}
 // Graceful image fallback: preserve layout and report failed remote photography.
 document.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{img.classList.add('image-error');img.alt=(img.alt||'Photograph')+' (image could not be loaded; replace source before launch)'})});
});
