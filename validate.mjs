import {readFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));const dist=path.join(root,'dist');
const html=await readFile(path.join(dist,'index.html'),'utf8');const css=await readFile(path.join(dist,'styles.css'),'utf8');const js=await readFile(path.join(dist,'app.js'),'utf8');
const errors=[];const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)errors.push('Duplicate HTML IDs');
for(const m of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))errors.push('Missing anchor: '+m[1]);
for(const m of html.matchAll(/(?:aria-controls|aria-labelledby|data-lightbox)="([^"]+)"/g))for(const id of m[1].split(' '))if(!ids.includes(id))errors.push('Missing accessible target: '+id);
for(const m of html.matchAll(/<img\b[^>]*>/g))if(!m[0].includes('alt='))errors.push('Image missing alt');
const refs=new Set([...html.matchAll(/(?:src|href)="(assets\/[^"#?]+|styles\.css|app\.js)"/g),...html.matchAll(/data-gallery-src="(assets\/[^"#?]+)"/g),...js.matchAll(/src:'(assets\/[^']+)'/g)].map(m=>m[1]));
for(const ref of refs){try{await access(path.join(dist,ref));}catch{errors.push('Missing file: '+ref);}}
for(const ref of refs){if(ref.endsWith('.jpg')){const b=await readFile(path.join(dist,ref));if(b[0]!==255||b[1]!==216)errors.push('Invalid JPEG: '+ref);}}
const font=await readFile(path.join(dist,'assets/PretendardVariable.woff2'));if(font.subarray(0,4).toString()!=='wOF2')errors.push('Invalid WOFF2');
if(html.includes('F1-AgentBot'))errors.push('Old product name in public page');
if(!html.includes('Chrome 확장형')||!html.includes('실제 Chrome 확장판'))errors.push('Missing extension concept distinction');
if(!css.includes('prefers-reduced-motion'))errors.push('Missing reduced motion support');
for(const text of [html,css,js])if(/admin\/admin|Bearer\s+[A-Za-z0-9]|password\s*[:=]\s*['"]/i.test(text))errors.push('Possible credential in deployable content');
const manifest=JSON.parse(await readFile(path.join(root,'.openai/hosting.json'),'utf8'));if(!manifest.project_id||manifest.static?.directory!=='dist')errors.push('Invalid hosting manifest');
if(errors.length){process.stderr.write(errors.join('\n')+'\n');process.exitCode=1;}else{process.stdout.write(JSON.stringify({status:'passed',asset_references:refs.size,unique_ids:ids.length,products:4,hosting_project_id:manifest.project_id},null,2)+'\n');}
