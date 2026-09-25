import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, root), 'utf8');
const manifest = JSON.parse(read('manifest.json'));
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

assert(manifest.manifest_version === 3, 'Manifest V3 required');
assert(JSON.stringify(manifest.permissions) === JSON.stringify(['storage']), 'Only storage permission is allowed');
assert(!manifest.host_permissions, 'No host_permissions should be needed');
assert(manifest.content_scripts?.length === 1, 'Expected one content script bundle');
assert(manifest.content_scripts[0].matches.includes('https://github.com/*'), 'github.com match missing');

const files = manifest.content_scripts[0].js;
for (const file of files) assert(fs.existsSync(new URL(file, root)), `Missing ${file}`);

const runtimeCode = files.map(read).join('\n');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'eval(', 'new Function(', 'chrome.notifications']) {
  assert(!runtimeCode.includes(forbidden), `Forbidden runtime pattern: ${forbidden}`);
}

const ctx = { console, globalThis: {} };
vm.createContext(ctx);
vm.runInContext(read('src/vendor/github-korean-dictionary.js'), ctx);
const pack = ctx.I18N?.['ko-KR'];
assert(pack, 'Korean legacy dictionary missing');
let staticCount = 0, regexCount = 0, sectionCount = 0;
for (const value of Object.values(pack)) {
  if (!value || typeof value !== 'object') continue;
  sectionCount++;
  staticCount += Object.keys(value.static || {}).length;
  regexCount += (value.regexp || []).length;
}
assert(staticCount > 60000, `Legacy dictionary unexpectedly small: ${staticCount}`);
assert(regexCount > 5000, `Regex rules unexpectedly small: ${regexCount}`);

const supplementalCtx = { globalThis: {} };
vm.createContext(supplementalCtx);
vm.runInContext(read('src/supplemental-ko.js'), supplementalCtx);
const supplementalCount = Object.keys(supplementalCtx.globalThis.GHK_SUPPLEMENTAL?.translations || {}).length;
assert(supplementalCount > 1500, `Supplemental dictionary unexpectedly small: ${supplementalCount}`);


const contentSource = read('src/content.js');
assert(contentSource.includes('normalizeUIString(text)'), 'UI string normalization helper missing');
assert(contentSource.includes("selector !== 'span.ActionListItem-descriptionWrap'"), 'Settings description ignore-rule regression');
assert(contentSource.includes('normalizedStaticDict'), 'Normalized static dictionary lookup missing');

console.log(JSON.stringify({ ok: true, sectionCount, staticCount, regexCount, supplementalCount }, null, 2));
