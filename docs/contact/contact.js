(()=>{const sel='.contact-link';const scriptTag=document.querySelector(sel);if(!scriptTag){console.error(`Could not find ${sel} selector for contact link`);return;}
if(document.location.protocol==='https:'){const meta=document.createElement('meta');meta.setAttribute('http-equiv','Content-Security-Policy');meta.setAttribute('content','upgrade-insecure-requests');document.head.appendChild(meta);}
const{url:iframeUrl,origin,title:boxTitle,button:btnText,}=scriptTag.dataset;let url;if(/^https?:/.test(iframeUrl)){url=new URL(iframeUrl);}else{url=new URL(document.location);url.pathname=iframeUrl;}
url.searchParams.set('qs',url.searchParams.toString())
url.searchParams.set('origin',origin);const button=document.createElement('a');button.setAttribute('href',url);button.innerHTML=btnText;const html=`
    <div class="contact-backdrop">
      <div class="contact-box">
        <div class="contact-title">
          <span>${boxTitle}</span>
          <div class="contact-close">&times;</div>
        </div>
        <div class="contact-body">
          <iframe src="${url}" frameborder="0" scrolling="no"></iframe>
       </div> 
      </div>
    </div>
  `;let boxWrap;let iframe;const resizeBody=()=>{const cw=iframe.contentWindow;const height=cw.document.body.scrollHeight;iframe.style.height=`${height}px`;};const openBox=(e)=>{e.preventDefault();document.body.classList.add('modal-open');boxWrap=document.createElement('div');boxWrap.id='contact-box-wrap';boxWrap.innerHTML=html.trim();const closeBtn=boxWrap.querySelector('.contact-close');closeBtn.addEventListener('click',closeBox);iframe=boxWrap.querySelector('iframe');iframe.addEventListener('load',()=>{const cw=iframe.contentWindow;cw.document.querySelectorAll('textarea').forEach(el=>{new MutationObserver(resizeBody).observe(el,{attributes:true,attributeFilter:["style"],});});resizeBody();});const style=document.createElement('link');style.rel='stylesheet';style.href='/contact/contact-box.css';const backdrop=boxWrap.querySelector('.contact-backdrop');backdrop.addEventListener('click',closeBox);window.addEventListener('resize',resizeBody);const box=boxWrap.querySelector('.contact-box');box.addEventListener('click',e=>e.stopPropagation());document.head.append(style);document.body.append(boxWrap);};const closeBox=(e)=>{e.preventDefault();document.body.classList.remove('modal-open');if(!boxWrap){return;}
boxWrap.parentNode.removeChild(boxWrap);};scriptTag.parentNode.insertBefore(button,scriptTag.nextSibling);})();