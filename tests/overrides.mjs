import fs from 'node:fs';
import vm from 'node:vm';

const code = fs.readFileSync(new URL('../src/overrides-ko.js', import.meta.url), 'utf8');
const ctx = { globalThis: {} };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const O = ctx.globalThis.GHK_OVERRIDES;
const T = ctx.globalThis.GHK_SYSTEM_TEMPLATE;
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

function translate(text) {
  const trimmed = text.trim();
  if (Object.prototype.hasOwnProperty.call(O.static, trimmed)) return O.static[trimmed];
  for (const [pattern, repl] of O.regexp) {
    pattern.lastIndex = 0;
    if (pattern.test(trimmed)) { pattern.lastIndex = 0; return trimmed.replace(pattern, repl); }
  }
  for (const [source, repl] of O.partial) if (trimmed.includes(source)) return trimmed.split(source).join(repl);
  return false;
}

assert(translate('All users') === '모든 사용자', 'All users');

assert(translate('No projects found') === '프로젝트를 찾을 수 없습니다', 'no projects title');
assert(translate('There are no projects linked to this repository.') === '이 저장소에 연결된 프로젝트가 없습니다.', 'no projects description');
assert(translate('All pull requests') === '모든 끌어오기 요청', 'all pull requests');
assert(translate('No pull requests matched your search') === '검색 조건과 일치하는 끌어오기 요청이 없습니다', 'no pull request results');
assert(translate('Count of total contribution activity to Discussions, Issues, and PRs') === '토론, 이슈 및 끌어오기 요청에서의 전체 기여 활동 수', 'contribution activity');
assert(translate("Projects on GitHub are created at the repository owner's level (organization or user) and can be linked to a repository's Projects tab. Projects are suitable for cross-repository development efforts such as feature work, complex product roadmaps or even Issue triage.").startsWith('GitHub 프로젝트는 저장소 소유자'), 'projects description');
assert(translate('Welcome to PoBCon Discussions!') === 'PoBCon 토론에 오신 것을 환영합니다!', 'discussion title');
assert(translate('See how rulesets are affecting this 저장소') === '규칙 집합이 이 저장소에 어떤 영향을 주는지 확인하세요', 'mixed ruleset phrase');
assert(translate('Count of total contribution activity to Discussions, Issues, 그리고 PRs') === '토론, 이슈 및 끌어오기 요청에서의 전체 기여 활동 수', 'mixed contributions');
assert(translate('Issues integrate lightweight task tracking into your repository. Keep projects on track with issue labels and milestones, 그리고 reference them in commit messages.').includes('이슈는 저장소에'), 'mixed issue description');

const template = `<!--\n    ✏️ Optional: Customize the content below to let your community know what you intend to use Discussions for.\n-->\n## 👋 Welcome!\n  We’re using Discussions as a place to connect with other members of our community. We hope that you:\n  * Ask questions you’re wondering about.\n  * Share ideas.\n  * Engage with other community members.\n  * Welcome others and are open-minded. Remember that this is a community we\n  build together 💪.\n\n  To get started, comment below with an introduction of yourself and tell us about what you do with this community.\n\n<!--\n  For the maintainers, here are some tips 💡 for getting started with Discussions. We'll leave these in Markdown comments for now, but feel free to take out the comments for all maintainers to see.\n\n  📢 **Announce to your community** that Discussions is available!\n-->`;
assert(T.isDiscussionWelcome(template), 'template detection');
const translatedTemplate = T.translateDiscussionWelcome(template);
assert(translatedTemplate.includes('## 👋 환영합니다!'), 'template heading');
assert(translatedTemplate.includes('궁금한 점을 질문해 주세요.'), 'template bullet');
assert(translatedTemplate.includes('유지 관리자를 위한 토론 시작 팁'), 'template maintainer comment');
assert(!T.isDiscussionWelcome('내가 직접 작성한 토론 내용입니다.'), 'user content safety');

console.log(JSON.stringify({ok:true, static:Object.keys(O.static).length, regexp:O.regexp.length, partial:O.partial.length}, null, 2));
