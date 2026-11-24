'use strict';
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
const gallery=document.querySelector('#gallery');const full=document.querySelector('#gallery-image');const caption=document.querySelector('#gallery-caption');let trigger;
document.querySelectorAll('[data-image]').forEach(btn=>btn.addEventListener('click',()=>{trigger=btn;const img=btn.querySelector('img');full.src=btn.dataset.image;full.alt=img.alt;caption.textContent=img.alt;gallery.showModal();}));
document.querySelector('#gallery-close').addEventListener('click',()=>gallery.close());
gallery.addEventListener('click',e=>{if(e.target===gallery){const r=gallery.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)gallery.close();}});
gallery.addEventListener('close',()=>{full.removeAttribute('src');trigger?.focus();});
if('IntersectionObserver' in window){const links=[...nav.querySelectorAll('a[href^="#"]')];const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-20% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
