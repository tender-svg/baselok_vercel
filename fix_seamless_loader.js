const fs = require('fs');
const path = require('path');

function fixHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Matching the preloader script in head
    const oldScriptRegex = /<script>\(function\(\)\{var d=document\.documentElement;[\s\S]*?window\.__cmsFetch=[\s\S]*?<\/script>/i;

    const newScript = `<script>(function(){
var d=document.documentElement;
d.classList.add('cms-content-loading');
d.classList.add('cms-booting');
var done=false;
function hideLoader(){if(!done){done=true;d.classList.remove('cms-booting');d.classList.remove('cms-content-loading');}}
window.hideCmsLoader=hideLoader;
var timer=setTimeout(hideLoader,2500);
var ed=sessionStorage.getItem('cms_tab_session')==='active';
try{
var s=(location.pathname.split('/').pop().replace('.html',''))||'index';
function cg(k){return null;}
function ld(k,u,c){
var net=fetch(u,{credentials:'include'}).then(function(r){
if(r&&r.ok&&!ed){r.clone().json().then(function(j){try{sessionStorage.setItem(k,JSON.stringify({t:Date.now(),d:j}));}catch(e){}}).catch(function(){});}
return r;
}).catch(function(){return null;});
if(c!=null){net.catch(function(){});return Promise.resolve(new Response(JSON.stringify(c),{status:200,headers:{'Content-Type':'application/json'}}));}
return net;
}
var t=Date.now();
var siteC=cg('cms_site_data'),pageC=cg('cms_page_'+s);
var p1=ld('cms_site_data','/api/v2/site-data?t='+t,siteC);
var p2=ld('cms_page_'+s,'/api/v2/page-elements/'+s+'?t='+t,pageC);
window.__cmsFetch={slug:s,t:t,siteData:p1,pageElements:p2};
Promise.all([p1,p2]).then(function(){
setTimeout(hideLoader,50);
}).catch(hideLoader);
}catch(e){hideLoader();}
})();</script>`;

    if (oldScriptRegex.test(content)) {
        content = content.replace(oldScriptRegex, newScript);
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

function processDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    let count = 0;
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                count += processDir(filePath);
            }
        } else if (file.endsWith('.html')) {
            if (fixHtmlFile(filePath)) {
                count++;
            }
        }
    }
    return count;
}

const dir1 = path.join(__dirname);
const updatedCount = processDir(dir1);
console.log(`Successfully updated ${updatedCount} HTML files in ${dir1}`);
