class GitHubKoreanPlus {
  constructor() {
    this.config = {
      LANG: 'ko-KR',
      PAGE_MAP: {
        'gist.github.com': 'gist',
        'www.githubstatus.com': 'status',
        'skills.github.com': 'skills',
        'education.github.com': 'education'
      },
      SPECIAL_SITES: ['gist', 'status', 'skills', 'education']
    };

    this.pageConfig = {};
    this.previousURL = window.location.href;
    this.processedNodes = new WeakSet();
    this.pendingNodes = new Set();
    this.flushScheduled = false;
    this.maxNodesPerFlush = 220;

    this.observer = null;
    this.observerConfig = {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm', 'title']
    };

    this.useTranslation = true;
    this.useDevTerms = false;
    this.useParticles = true;
    this.logPerformance = false;

    this.devTermsReplacements =[[/끌어오기\s*요청(을|를)/g, '풀 리퀘스트를'],[/끌어오기\s*요청(이|가)/g, '풀 리퀘스트가'],[/끌어오기\s*요청(은|는)/g, '풀 리퀘스트는'],[/끌어오기\s*요청(과|와)/g, '풀 리퀘스트와'],[/끌어오기\s*요청(으로|로)/g, '풀 리퀘스트로'],[/끌어오기\s*요청/g, '풀 리퀘스트'],[/저장소(를|을)/g, '리포지토리를'],[/저장소(가|이)/g, '리포지토리가'],[/저장소(는|은)/g, '리포지토리는'],[/저장소(와|과)/g, '리포지토리와'],[/저장소(로|으로)/g, '리포지토리로'],[/저장소/g, '리포지토리'],
      [/분기(를|을)/g, '브랜치를'],[/분기(가|이)/g, '브랜치가'],[/분기(는|은)/g, '브랜치는'],[/분기(와|과)/g, '브랜치와'],[/분기(로|으로)/g, '브랜치로'],[/분기/g, '브랜치'],[/별표(를|을)/g, '스타를'],[/별표(가|이)/g, '스타가'],[/별표(는|은)/g, '스타는'],[/별표(와|과)/g, '스타와'],[/별표(로|으로)/g, '스타로'],[/별표/g, '스타'],
      [/꼬리표(를|을)/g, '태그를'],[/꼬리표(가|이)/g, '태그가'],[/꼬리표(는|은)/g, '태그는'],[/꼬리표(와|과)/g, '태그와'],[/꼬리표(로|으로)/g, '태그로'],[/꼬리표/g, '태그'],
      [/장터(를|을)/g, '마켓플레이스를'],[/장터(가|이)/g, '마켓플레이스가'],[/장터(는|은)/g, '마켓플레이스는'],[/장터(로|으로)/g, '마켓플레이스로'],[/장터/g, '마켓플레이스'],
      [/탐험하기/g, '탐색'],[/빠른\s*답장/g, '저장된 답장'],[/구매/g, '결제'],[/실행기/g, '러너'],[/토론/g, '디스커션'],[/모음/g, '컬렉션'],[/명령\s*팔레트/g, '커맨드 팔레트'],[/슬래시\s*명령어/g, '슬래시 커맨드'],[/엑세스/g, '액세스']
    ];
  }

  applyDevTerms(text) {
    if (!text) return text;
    let result = text;
    for (const[pattern, replacement] of this.devTermsReplacements) {
      result = result.replace(pattern, replacement);
    }
    return result;
  }

  reorderFlexElements(parent) {
    if (this.processedNodes.has(parent)) return;
    try {
      const shrinkElem = parent.querySelector('.flex-shrink-0');
      const overflowElem = parent.querySelector('.overflow-auto');
      if (!shrinkElem || !overflowElem) return;
      const userAnchor = shrinkElem.querySelector('a');
      if (!userAnchor) return;

      const article = parent.closest('article.js-feed-item-component');
      let cardType = '';
      if (article) {
        try {
          const hydroData = JSON.parse(article.getAttribute('data-hydro-view') || '{}');
          cardType = hydroData?.payload?.feed_card?.card_type || '';
        } catch (e) {}
      }

      const textContent = shrinkElem.textContent;
      let actionSuffix = "";

      if (cardType === 'STARRED_REPOSITORY' || textContent.includes('starred') || textContent.includes('별표')) actionSuffix = "에 별표를 남겼습니다";
      else if (cardType === 'FOLLOW' || textContent.includes('following') || textContent.includes('팔로우')) actionSuffix = "을(를) 팔로우하기 시작했습니다";
      else if (cardType === 'CREATED_REPOSITORY' || textContent.includes('created') || textContent.includes('만들었')) actionSuffix = " 저장소를 만들었습니다";
      else if (cardType === 'FORKED_REPOSITORY' || textContent.includes('forked') || textContent.includes('포크')) actionSuffix = " 저장소를 포크했습니다";
      else if (cardType === 'ADDED_TO_LIST' || textContent.includes('added') || textContent.includes('추가')) actionSuffix = " 목록에 추가했습니다";
      else if (cardType === 'PUBLISHED_RELEASE' || textContent.includes('released') || textContent.includes('릴리즈')) actionSuffix = "의 새 릴리즈를 공개했습니다";
      else if (cardType === 'MERGED_PULL_REQUEST' || textContent.includes('merged') || textContent.includes('기여')) actionSuffix = "에 기여했습니다";
      else return;

      if (this.useDevTerms) actionSuffix = this.applyDevTerms(actionSuffix);

      shrinkElem.innerHTML = '';
      shrinkElem.appendChild(userAnchor);
      shrinkElem.appendChild(document.createTextNode(" 님이 "));

      const textWalker = document.createTreeWalker(overflowElem, NodeFilter.SHOW_TEXT, null, false);
      let textNode;
      while ((textNode = textWalker.nextNode())) {
        let text = textNode.textContent.replace(/^\s+|\s+$/g, '');
        let translated = this.transText(text);
        textNode.textContent = translated ? translated : text;
        this.processedNodes.add(textNode);
      }

      const actionSpan = document.createElement('span');
      actionSpan.className = 'color-fg-muted flex-shrink-0';
      actionSpan.style.whiteSpace = 'nowrap';
      actionSpan.textContent = actionSuffix;
      this.processedNodes.add(actionSpan);

      overflowElem.style.display = 'inline-flex';
      overflowElem.style.alignItems = 'baseline';
      overflowElem.appendChild(actionSpan);

      this.processedNodes.add(parent);
    } catch (e) {}
  }

  reorderUpdatedRelativeTime(div) {
    if (this.processedNodes.has(div)) return;
    try {
      const relTime = div.querySelector("relative-time");
      if (!relTime) return;

      let updatedTextNode = null;
      div.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("Updated")) updatedTextNode = node;
      });
      if (!updatedTextNode) return;

      const children = Array.from(div.childNodes);
      if (children.indexOf(relTime) < children.indexOf(updatedTextNode)) return;

      const newText = " " + updatedTextNode.textContent.trim();
      updatedTextNode.remove();
      relTime.insertAdjacentText('afterend', newText);
      this.processedNodes.add(div);
    } catch (e) {}
  }

  removeOnPrefix(element) {
    try {
      const relativeTimes = element.matches('relative-time') ? [element] : element.querySelectorAll("relative-time");
      relativeTimes.forEach(rt => {
        const prev = rt.previousSibling;
        if (prev && prev.nodeType === Node.TEXT_NODE) {
          prev.textContent = prev.textContent.replace(/\bon\s*$/, '');
          this.processedNodes.add(prev);
        }
      });
    } catch (e) {}
  }

  detectPageType() {
    if (typeof I18N === 'undefined' || !I18N.conf) return false;
    const { PAGE_MAP, SPECIAL_SITES } = this.config;
    const url = new URL(window.location.href);
    const { hostname, pathname } = url;
    const site = PAGE_MAP[hostname] || 'github';
    const isLogin = document.body.classList.contains("logged-in");
    const metaLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';
    const isSession = document.body.classList.contains("session-authentication");
    const isHomepage = pathname === '/' && site === 'github';
    const isProfile = document.body.classList.contains("page-profile") || metaLocation === '/<user-name>';
    const isRepository = /\/<user-name>\/<repo-name>/.test(metaLocation);
    const isOrganization = /\/<org-login>/.test(metaLocation) || /^\/(?:orgs|organizations)/.test(pathname);
    const { rePagePathRepo, rePagePathOrg, rePagePath } = I18N.conf;
    let pageType;

    switch (true) {
      case isSession: pageType = 'session-authentication'; break;
      case SPECIAL_SITES.includes(site): pageType = site; break;
      case isProfile:
        const tabParam = new URLSearchParams(url.search).get('tab');
        pageType = pathname.includes('/stars') ? 'page-profile/stars' : tabParam ? `page-profile/${tabParam}` : 'page-profile';
        break;
      case isHomepage: pageType = isLogin ? 'dashboard' : 'homepage'; break;
      case isRepository:
        const repoMatch = pathname.match(rePagePathRepo);
        pageType = repoMatch ? `repository/${repoMatch[1]}` : 'repository';
        break;
      case isOrganization:
        const orgMatch = pathname.match(rePagePathOrg);
        pageType = orgMatch ? `orgs/${orgMatch[1] || orgMatch.slice(-1)[0]}` : 'orgs';
        break;
      default:
        const pathMatch = pathname.match(rePagePath);
        pageType = pathMatch ? (pathMatch[1] || pathMatch.slice(-1)[0]) : false;
    }

    if (pageType === false || !I18N[this.config.LANG]?.[pageType]) return false;
    return pageType;
  }

  buildPageConfig(pageType) {
    if (typeof I18N === 'undefined') return;

    const langPack = I18N[this.config.LANG];
    const conf = I18N.conf;

    const extraIgnoreSelectors =[
      '[class*="DirectoryRichtextContent"]',
      '[class*="BlobViewContent"]',
      '.js-snippet-clipboard-copy-unpositioned',
      'qb-search-input',
      'search-input',
      '[class*="QueryBuilder"]',
      '[id*="query-builder"]',
      '[data-target*="query-builder"]'
    ];

    this.pageConfig = {
      currentPageType: pageType,
      staticDict: {
        ...langPack.public.static,
        ...(globalThis.GHK_SUPPLEMENTAL?.translations || {}),
        ...(langPack[pageType]?.static || {}),
        ...(globalThis.GHK_OVERRIDES?.static || {})
      },
      overrideRegexpRules: [ ...(globalThis.GHK_OVERRIDES?.regexp || []) ],
      regexpRules: [ ...langPack.public.regexp, ...(langPack[pageType]?.regexp ||[]) ],
      partialRules: [ ...(globalThis.GHK_OVERRIDES?.partial || []) ],
      normalizedStaticDict: new Map(),
      ignoreSelectors: [
        ...conf.ignoreSelectorPage['*'].filter((selector) => selector !== 'span.ActionListItem-descriptionWrap'),
        ...(conf.ignoreSelectorPage[pageType] ||[]),
        ...extraIgnoreSelectors
      ].join(', '),
      tranSelectors:[ ...(langPack.public.selector || []), ...(langPack[pageType]?.selector ||[]) ],
    };

    for (const [source, translated] of Object.entries(this.pageConfig.staticDict)) {
      this.pageConfig.normalizedStaticDict.set(this.normalizeUIString(source), translated);
    }
  }
  
  updatePageConfig() {
    const newType = this.detectPageType();
    if (newType && newType !== this.pageConfig.currentPageType) {
      this.buildPageConfig(newType);
      if (this.logPerformance) console.log(`[Debug] Page type changed: ${newType}`);
    }
  }

  normalizeUIString(text) {
    return String(text ?? '')
      .replace(/[\u00a0\u2007\u202f]/g, ' ')
      .replace(/[\u200b\u200c\u200d\ufeff]/g, '')
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  transText(text) {
    if (!this.useTranslation || !text || /^\s*$/.test(text)) return false;

    const original = String(text);
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    const trimmedText = original.trim();
    const normalizedText = this.normalizeUIString(trimmedText);
    if (!/[a-zA-Z]/.test(normalizedText)) return false;

    // Exact lookup first, then normalized lookup. GitHub frequently inserts
    // NBSP/newlines/typographic quotes into otherwise identical UI strings.
    let translated = this.pageConfig.staticDict[trimmedText];
    if (typeof translated !== 'string') {
      translated = this.pageConfig.normalizedStaticDict?.get(normalizedText);
    }
    if (typeof translated === 'string') {
      let result = `${leading}${translated}${trailing}`;
      if (this.useDevTerms) result = this.applyDevTerms(result);
      return result;
    }

    // Project-owned current-GitHub rules have priority over the broad vendor rules.
    for (const [pattern, replacement] of this.pageConfig.overrideRegexpRules || []) {
      pattern.lastIndex = 0;
      if (pattern.test(normalizedText)) {
        pattern.lastIndex = 0;
        translated = normalizedText.replace(pattern, replacement);
        let result = `${leading}${translated}${trailing}`;
        if (this.useDevTerms) result = this.applyDevTerms(result);
        return result;
      }
    }

    // Known long UI fragments can be split around links/components. Compare a
    // normalized representation, while leaving arbitrary user-authored text alone.
    for (const [source, replacement] of this.pageConfig.partialRules || []) {
      const normalizedSource = this.normalizeUIString(source);
      if (normalizedText.includes(normalizedSource)) {
        translated = normalizedText.split(normalizedSource).join(replacement);
        let result = `${leading}${translated}${trailing}`;
        if (this.useDevTerms) result = this.applyDevTerms(result);
        return result;
      }
    }

    for (const [pattern, replacement] of this.pageConfig.regexpRules) {
      pattern.lastIndex = 0;
      if (pattern.test(normalizedText)) {
        pattern.lastIndex = 0;
        translated = normalizedText.replace(pattern, replacement);
        let result = `${leading}${translated}${trailing}`;
        if (this.useDevTerms) result = this.applyDevTerms(result);
        return result;
      }
    }
    return false;
  }

  translateGitHubGeneratedFormValue(element) {
    if (!element || !['INPUT', 'TEXTAREA'].includes(element.tagName)) return false;
    const original = element.value;
    if (!original || !/[a-zA-Z]/.test(original)) return false;

    let translated = false;
    if (element.tagName === 'INPUT' && /^Welcome to .+ Discussions!$/.test(original.trim())) {
      translated = this.transText(original);
    } else if (element.tagName === 'TEXTAREA' && globalThis.GHK_SYSTEM_TEMPLATE?.isDiscussionWelcome(original)) {
      translated = globalThis.GHK_SYSTEM_TEMPLATE.translateDiscussionWelcome(original);
    }

    if (!translated || translated === original) return false;
    element.value = translated;
    if (element.tagName === 'INPUT') element.setAttribute('value', translated);
    return true;
  }

  resolveKoreanParticles(rootNode) {
    if (!rootNode || !rootNode.ownerDocument) return;
    const targetNode = rootNode.nodeType === Node.ELEMENT_NODE ? rootNode : rootNode.parentElement;
    if (!targetNode || this.processedNodes.has(targetNode)) return;

    const walker = document.createTreeWalker(targetNode, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => this.processedNodes.has(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    }, false);
    
    let textNode;
    const regex = /(을\(를\)|이\(가\)|은\(는\)|와\(과\))/g;

    while ((textNode = walker.nextNode())) {
      if (!regex.test(textNode.textContent)) continue;

      const newText = textNode.textContent.replace(regex, (match, p1, offset, string) => {
        let prevChar = '';
        const textBefore = string.substring(0, offset);
        const localMatch = textBefore.match(/[가-힣a-zA-Z0-9](?=[^가-힣a-zA-Z0-9]*$)/);

        if (localMatch) {
          prevChar = localMatch[0];
        } else {
          const prevWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
          prevWalker.currentNode = textNode;
          let pNode;
          while ((pNode = prevWalker.previousNode())) {
            const pMatch = pNode.textContent.match(/[가-힣a-zA-Z0-9](?=[^가-힣a-zA-Z0-9]*$)/);
            if (pMatch) { prevChar = pMatch[0]; break; }
          }
        }

        if (prevChar) {
          let hasJongseong = false;
          if (/[가-힣]/.test(prevChar)) hasJongseong = (prevChar.charCodeAt(0) - 0xAC00) % 28 > 0;
          else hasJongseong = /[136780lLmMnNrR]/.test(prevChar);

          if (match === '을(를)') return hasJongseong ? '을' : '를';
          if (match === '이(가)') return hasJongseong ? '이' : '가';
          if (match === '은(는)') return hasJongseong ? '은' : '는';
          if (match === '와(과)') return hasJongseong ? '과' : '와';
        }
        return match;
      });

      if (textNode.textContent !== newText) {
        textNode.textContent = newText;
        this.processedNodes.add(textNode);
      }
    }
  }

  processKnownCompositeText(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const candidates = [];
    if (root.matches?.('p, div, li')) candidates.push(root);
    root.querySelectorAll?.('p, div, li').forEach((el) => candidates.push(el));

    for (const element of candidates) {
      const fullText = element.textContent?.replace(/\s+/g, ' ').trim() || '';
      if (!fullText) continue;

      // GitHub inserts the Copilot feature link between "With" and the rest of
      // this sentence. Translate only inside this unmistakable settings paragraph.
      if (fullText.includes('developers can delegate tasks to Copilot') &&
          fullText.includes('Assign a task to Copilot') &&
          fullText.includes('leave feedback on the pull request')) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const textNode = walker.currentNode;
          const raw = textNode.textContent;
          if (/^\s*With[\s\u00a0]*$/.test(raw)) {
            textNode.textContent = raw.replace(/With[\s\u00a0]*/, '');
            continue;
          }
          const source = ', developers can delegate tasks to Copilot, freeing them to focus on the creative, complex, and high-impact work that matters most. Assign a task to Copilot, wait for the agent to request review, then leave feedback on the pull request to iterate.';
          if (raw.includes(source)) {
            textNode.textContent = raw.replace(source, '를 사용하면 개발자는 작업을 Copilot에 맡기고 더 창의적이고 복잡하며 영향력이 큰 일에 집중할 수 있습니다. Copilot에 작업을 할당한 뒤 에이전트가 검토를 요청할 때까지 기다리고, 끌어오기 요청에 피드백을 남겨 결과를 개선할 수 있습니다.');
          }
        }
      }
    }
  }

  processNode(node) {
    if (!this.useTranslation || !this.pageConfig || !this.pageConfig.ignoreSelectors) return;
    if (this.processedNodes.has(node)) return;

    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches(this.pageConfig.ignoreSelectors) || node.closest(this.pageConfig.ignoreSelectors)) return;

      this.processKnownCompositeText(node);

      const flexElements = node.matches('.flex-1') ?[node] : Array.from(node.querySelectorAll('span.flex-1'));
      flexElements.forEach(flexElem => {
        if (flexElem.parentElement && flexElem.parentElement.tagName === 'H3') this.reorderFlexElements(flexElem);
      });

      if (node.tagName === 'DIV' && node.querySelector('relative-time')) {
        if (node.textContent.includes('Updated')) {
          this.reorderUpdatedRelativeTime(node);
          this.removeOnPrefix(node);
        }
      }
    }

    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (this.processedNodes.has(n)) return NodeFilter.FILTER_REJECT;
        if (n.nodeType === Node.ELEMENT_NODE) {
          if (n.matches(this.pageConfig.ignoreSelectors)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
        if (n.nodeType === Node.TEXT_NODE) {
          if (/^\s*$/.test(n.textContent)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    });
    
    while (treeWalker.nextNode()) {
      const currentNode = treeWalker.currentNode;

      if (currentNode.nodeType === Node.TEXT_NODE) {
        const translated = this.transText(currentNode.textContent);
        if (translated && currentNode.textContent !== translated) {
          currentNode.textContent = translated;
          this.processedNodes.add(currentNode);
        }
      } 
      else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        // GitHub-generated discussion title/body live in editable form controls.
        // Only exact GitHub defaults are translated; normal user input remains untouched.
        this.translateGitHubGeneratedFormValue(currentNode);

        const translatableAttributes =['placeholder', 'title', 'aria-label', 'value', 'data-confirm'];
        let attrModified = false;
        
        for (const attr of translatableAttributes) {
          if (currentNode.hasAttribute(attr)) {
            if (attr === 'value') {
              const tagName = currentNode.tagName.toUpperCase();
              if (tagName === 'INPUT') {
                const type = (currentNode.getAttribute('type') || '').toLowerCase();
                if (!['button', 'submit', 'reset'].includes(type)) continue;
              } else {
                continue; 
              }
            }

            const translated = this.transText(currentNode.getAttribute(attr));
            if (translated && currentNode.getAttribute(attr) !== translated) {
              currentNode.setAttribute(attr, translated);
              attrModified = true;
            }
          }
        }
        if (attrModified) this.processedNodes.add(currentNode);
      }
    }

    if (this.useParticles) this.resolveKoreanParticles(node);
  }

  transTitle() {
    if (!this.useTranslation) return;
    const titleNode = document.querySelector('title');
    if (titleNode && this.processedNodes.has(titleNode)) return;

    const originalTitle = document.title;
    const translated = this.transText(originalTitle);
    if (translated && originalTitle !== translated) {
      document.title = translated;
      if (titleNode) this.processedNodes.add(titleNode);
    }
  }

  mutationCallback(mutations) {
    if (!this.useTranslation) return;

    if (document.documentElement.lang !== this.config.LANG) {
      document.documentElement.lang = this.config.LANG;
    }

    for (const mutation of mutations) {
      if (mutation.target?.nodeName === 'TITLE') {
        this.processedNodes.delete(mutation.target);
        this.pendingNodes.add(mutation.target);
        continue;
      }

      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            this.pendingNodes.add(node);
          }
        }
      } else if (mutation.type === 'attributes' || mutation.type === 'characterData') {
        // GitHub frequently reuses DOM nodes during Turbo navigation. Allow reused nodes to translate again.
        this.processedNodes.delete(mutation.target);
        this.pendingNodes.add(mutation.target);
      }
    }

    this.scheduleFlush();
  }

  scheduleFlush() {
    if (this.flushScheduled || !this.pendingNodes.size) return;
    this.flushScheduled = true;

    const run = () => {
      this.flushScheduled = false;
      const start = performance.now();
      let processed = 0;
      const batch = Array.from(this.pendingNodes);

      for (const node of batch) {
        this.pendingNodes.delete(node);
        if (!node || !node.isConnected) continue;
        if (node.nodeName === 'TITLE') this.transTitle();
        else this.processNode(node);
        processed += 1;
        if (processed >= this.maxNodesPerFlush) break;
      }

      if (this.logPerformance) {
        const duration = performance.now() - start;
        if (duration > 5) console.debug(`[GitHub 한국어+] ${processed}개 노드 처리: ${duration.toFixed(2)}ms`);
      }

      if (this.pendingNodes.size) this.scheduleFlush();
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 80 });
    } else {
      window.setTimeout(run, 16);
    }
  }

  async init() {
    if (typeof I18N === 'undefined') return;

    const settings = await chrome.storage.local.get({
      useTranslation: true,
      useDevTerms: false,
      useParticles: true,
      useLogs: false
    });
    
    this.useTranslation = settings.useTranslation;
    this.useDevTerms = settings.useDevTerms;
    this.useParticles = settings.useParticles;
    this.logPerformance = settings.useLogs;

    chrome.storage.onChanged.addListener((changes) => {
      let needsReload = false;
      if (changes.useTranslation) { this.useTranslation = changes.useTranslation.newValue; needsReload = true; }
      if (changes.useDevTerms) { this.useDevTerms = changes.useDevTerms.newValue; needsReload = true; }
      if (changes.useParticles) this.useParticles = changes.useParticles.newValue;
      if (changes.useLogs) this.logPerformance = changes.useLogs.newValue;
      if (needsReload) window.location.reload();
    });

    if (!this.useTranslation) return;
    this.observer = new MutationObserver(this.mutationCallback.bind(this));

    const startTranslation = () => {
      document.documentElement.lang = this.config.LANG;
      this.updatePageConfig();
      this.transTitle();

      // Translate the global chrome first so the page feels localized immediately.
      const priority = document.querySelector('header, [role="banner"], nav[aria-label="Global"]');
      if (priority) this.processNode(priority);

      // Defer the heavier page body to idle time. Queue top-level regions separately
      // so large pages do not block GitHub interaction during first paint.
      for (const child of document.body.children) this.pendingNodes.add(child);
      this.scheduleFlush();

      this.observer.disconnect();
      this.observer.observe(document.documentElement, this.observerConfig);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startTranslation, { once: true });
    } else {
      startTranslation();
    }
    
    const onRouteChange = () => {
      if (!this.useTranslation) return;
      if (this.previousURL !== window.location.href) {
        this.previousURL = window.location.href;
        this.processedNodes = new WeakSet();
      }
      startTranslation();
    };

    document.addEventListener('turbo:load', onRouteChange);
    document.addEventListener('turbo:render', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
  }
}

new GitHubKoreanPlus().init();