/*
 * GitHub 한국어+ current GitHub UI overrides.
 * Keep this file project-owned so fast-moving GitHub strings can be updated
 * without editing the upstream/vendor dictionaries.
 */
globalThis.GHK_OVERRIDES = {
  static: {
    "Issues integrate lightweight task tracking into your repository. Keep projects on track with issue labels and milestones, and reference them in commit messages.": "이슈는 저장소에 간단한 작업 추적 기능을 제공합니다. 이슈 레이블과 마일스톤으로 프로젝트 진행 상황을 관리하고, 커밋 메시지에서 이슈를 참조할 수 있습니다.",
    "Issue permissions": "이슈 권한",
    "All users": "모든 사용자",
    "Anyone can create an issue": "누구나 이슈를 만들 수 있습니다",
    "Collaborators only": "협력자만",
    "Only collaborators can create issues": "협력자만 이슈를 만들 수 있습니다",

    "Discussions is the space for your community to have conversations, ask questions and post answers without opening issues.": "토론은 이슈를 만들지 않고도 커뮤니티 구성원끼리 대화하고, 질문하고, 답변을 게시할 수 있는 공간입니다.",
    "Since you're new here, we're helping you to get started by generating your first post to the community. Don't worry, you can edit this discussion after you post!": "처음 오신 분을 위해 커뮤니티에 올릴 첫 게시물을 자동으로 준비해 드립니다. 게시한 뒤에도 이 토론 글을 자유롭게 수정할 수 있으니 걱정하지 마세요!",
    "accessibility": "접근성",
    "Barrier affecting people with disabilities": "장애가 있는 사용자에게 영향을 주는 접근성 문제",

    "Actions policy insights": "액션 정책 분석",
    "Policy insights": "정책 분석",
    "See how rulesets are affecting this repository": "규칙 집합이 이 저장소에 어떤 영향을 주는지 확인하세요",
    "Enterprise accounts enable you to review commits against rulesets to track pass, fail, or bypass status for greater oversight and understanding.": "Enterprise 계정에서는 커밋이 규칙 집합을 통과했는지, 실패했는지, 우회했는지를 검토하여 규칙 적용 상태를 더 쉽게 파악할 수 있습니다.",
    "Try GitHub Enterprise": "GitHub Enterprise 사용해 보기",

    "No Copilot cloud agent access": "Copilot 클라우드 에이전트 이용 권한 없음",
    "You can configure Copilot cloud agent for other users with access to this repository, but you won't be able to assign tasks to Copilot because you don't have a Copilot Pro, Copilot Pro+, Copilot Business or Copilot Enterprise license.": "이 저장소에 접근할 수 있는 다른 사용자를 위해 Copilot 클라우드 에이전트를 설정할 수는 있지만, 현재 계정에 Copilot Pro, Copilot Pro+, Copilot Business 또는 Copilot Enterprise 라이선스가 없으므로 직접 Copilot에 작업을 할당할 수는 없습니다.",
    "When Copilot pushes changes, require approval from a maintainer with write access before Actions workflows are run. When this policy is disabled, Actions workflows run automatically when Copilot pushes, except when the push comes from an automation.": "Copilot이 변경 사항을 푸시했을 때 액션 워크플로를 실행하기 전에 쓰기 권한이 있는 유지 관리자의 승인을 받도록 합니다. 이 정책을 끄면 자동화에서 발생한 푸시를 제외하고 Copilot이 푸시할 때 액션 워크플로가 자동으로 실행됩니다.",
    "Allowing GitHub Actions workflows to run without approval may allow unreviewed code written by Copilot to gain write access to your repository or access your GitHub Actions secrets.": "승인 없이 GitHub 액션 워크플로 실행을 허용하면 검토되지 않은 Copilot 작성 코드가 저장소에 쓰기 권한을 얻거나 GitHub 액션 비밀 값에 접근할 수 있습니다.",
    "When enabled, users with write access can create automations that automatically run agents on a schedule or in response to events like new issues or updated pull requests.": "켜면 쓰기 권한이 있는 사용자가 일정에 따라 또는 새 이슈나 업데이트된 끌어오기 요청 같은 이벤트에 반응하여 에이전트를 자동 실행하는 자동화를 만들 수 있습니다.",
    "When enabled, automations will only run if the user triggering the event has write access to the repository. When disabled, users can create automations that listen for events triggered by users without write access.": "켜면 이벤트를 발생시킨 사용자에게 저장소 쓰기 권한이 있을 때만 자동화가 실행됩니다. 끄면 쓰기 권한이 없는 사용자가 발생시킨 이벤트에도 반응하는 자동화를 만들 수 있습니다.",
    "Allowing automations to be triggered by users without write access to the repository increases risk of prompt injection attacks, where an untrusted user can cause an agent to take actions in the repository using the agent's permissions.": "저장소 쓰기 권한이 없는 사용자가 자동화를 실행할 수 있게 하면 프롬프트 주입 공격 위험이 커집니다. 신뢰할 수 없는 사용자가 에이전트의 권한을 이용해 저장소에서 작업을 수행하도록 유도할 수 있습니다.",
    "Configure which tools Copilot cloud agent uses to validate its work and iterate before requesting human review.": "Copilot 클라우드 에이전트가 사람에게 검토를 요청하기 전에 작업을 검증하고 개선하는 데 사용할 도구를 설정합니다.",
    "Use CodeQL to scan for security vulnerabilities.": "CodeQL을 사용해 보안 취약점을 검사합니다.",
    "Use Copilot code review to identify code quality issues.": "Copilot 코드 검토를 사용해 코드 품질 문제를 찾습니다.",
    "Scan for accidentally committed secrets and credentials.": "실수로 커밋된 비밀 값과 인증 정보를 검사합니다.",
    "Check new dependencies against the GitHub Advisory Database for known vulnerabilities.": "새 종속성을 GitHub 보안 권고 데이터베이스와 비교하여 알려진 취약점이 있는지 확인합니다.",

    "Webhooks allow external services to be notified when certain events happen. When the specified events happen, we'll send a POST request to each of the URLs you provide. Learn more in our webhook guide.": "웹훅을 사용하면 특정 이벤트가 발생했을 때 외부 서비스에 알릴 수 있습니다. 지정한 이벤트가 발생하면 입력한 각 URL로 POST 요청을 보냅니다. 자세한 내용은 웹훅 가이드를 참고하세요.",

    "When enabled, only users explicitly granted access to this repository will be able to submit pull request reviews that \"approve\" or \"request changes\". All users able to submit comment pull request reviews will continue to be able to do so.": "켜면 이 저장소에 명시적으로 접근 권한을 부여받은 사용자만 끌어오기 요청 검토에서 ‘승인’ 또는 ‘변경 요청’을 제출할 수 있습니다. 댓글 형식의 끌어오기 요청 검토를 제출할 수 있는 사용자는 계속 댓글 검토를 남길 수 있습니다.",

    "Count of total contribution activity to Discussions, Issues, and PRs": "토론, 이슈 및 끌어오기 요청에서의 전체 기여 활동 수",
    "Discussions are to share announcements, create conversation in your community, answer questions, and more.": "토론에서는 공지 사항을 공유하고, 커뮤니티에서 대화를 나누고, 질문에 답하는 등 여러 활동을 할 수 있습니다.",
    "To get started, you can create a new discussion.": "시작하려면 새 토론을 만들어 보세요.",

    "No projects found": "프로젝트를 찾을 수 없습니다",
    "There are no projects linked to this repository.": "이 저장소에 연결된 프로젝트가 없습니다.",
    "All pull requests": "모든 끌어오기 요청",
    "No pull requests matched your search": "검색 조건과 일치하는 끌어오기 요청이 없습니다",
    "No pull requests matched your search.": "검색 조건과 일치하는 끌어오기 요청이 없습니다.",
    "Try a different search query.": "다른 검색어로 다시 시도해 보세요.",
    "Learn more about searching and filtering pull requests.": "끌어오기 요청 검색 및 필터링에 대해 자세히 알아보세요.",
    "Projects on GitHub are created at the repository owner's level (organization or user) and can be linked to a repository's Projects tab. Projects are suitable for cross-repository development efforts such as feature work, complex product roadmaps or even Issue triage.": "GitHub 프로젝트는 저장소 소유자(조직 또는 사용자) 단위로 만들며, 저장소의 프로젝트 탭에 연결할 수 있습니다. 기능 개발, 복잡한 제품 로드맵, 이슈 분류처럼 여러 저장소에 걸친 개발 작업을 관리하는 데 적합합니다.",
    "Discussions are to share announcements, create conversation in your community, answer questions, and more. To get started, you can create a new discussion.": "토론에서는 공지 사항을 공유하고, 커뮤니티에서 대화를 나누고, 질문에 답하는 등 여러 활동을 할 수 있습니다. 시작하려면 새 토론을 만들어 보세요.",
    "pull requests": "끌어오기 요청",
    "new discussion": "새 토론",
    "webhook guide": "웹훅 가이드",
    "PRs": "끌어오기 요청",
  },

  regexp: [
    [/^Welcome to (.+) Discussions!$/, "$1 토론에 오신 것을 환영합니다!"],
    [/^Issues integrate lightweight task tracking into your repository\. Keep projects on track with issue labels and milestones, (?:and|그리고) reference them in commit messages\.$/, "이슈는 저장소에 간단한 작업 추적 기능을 제공합니다. 이슈 레이블과 마일스톤으로 프로젝트 진행 상황을 관리하고, 커밋 메시지에서 이슈를 참조할 수 있습니다."],
    [/^Discussions is the space for your community to have conversations, ask questions (?:and|그리고) post answers without opening issues\.$/, "토론은 이슈를 만들지 않고도 커뮤니티 구성원끼리 대화하고, 질문하고, 답변을 게시할 수 있는 공간입니다."],
    [/^See how rulesets are affecting this (?:repository|저장소)$/, "규칙 집합이 이 저장소에 어떤 영향을 주는지 확인하세요"],
    [/^Count of total contribution activity to Discussions, Issues, (?:and|그리고) (?:PRs|pull requests|끌어오기 요청)$/, "토론, 이슈 및 끌어오기 요청에서의 전체 기여 활동 수"],
    [/^Learn more about searching and filtering (?:pull requests|끌어오기 요청)\.?$/, "끌어오기 요청 검색 및 필터링에 대해 자세히 알아보세요."]
  ],

  partial: [
    ["With Copilot cloud agent, developers can delegate tasks to Copilot, freeing them to focus on the creative, complex, and high-impact work that matters most. Assign a task to Copilot, wait for the agent to request review, then leave feedback on the pull request to iterate.", "Copilot 클라우드 에이전트를 사용하면 개발자는 작업을 Copilot에 맡기고 더 창의적이고 복잡하며 영향력이 큰 일에 집중할 수 있습니다. Copilot에 작업을 할당한 뒤 에이전트가 검토를 요청할 때까지 기다리고, 끌어오기 요청에 피드백을 남겨 결과를 개선할 수 있습니다."],
    ["Webhooks allow external services to be notified when certain events happen. When the specified events happen, we'll send a POST request to each of the URLs you provide. Learn more in our", "웹훅을 사용하면 특정 이벤트가 발생했을 때 외부 서비스에 알릴 수 있습니다. 지정한 이벤트가 발생하면 입력한 각 URL로 POST 요청을 보냅니다. 자세한 내용은"],
    ["Discussions are to share announcements, create conversation in your community, answer questions, and more. To get started, you can create a", "토론에서는 공지 사항을 공유하고, 커뮤니티에서 대화를 나누고, 질문에 답하는 등 여러 활동을 할 수 있습니다. 시작하려면"],
    ["Discussions are to share announcements, create conversation in your community, answer questions, 그리고 more. To get started, you can create a", "토론에서는 공지 사항을 공유하고, 커뮤니티에서 대화를 나누고, 질문에 답하는 등 여러 활동을 할 수 있습니다. 시작하려면"],
    ["Count of total contribution activity to Discussions, Issues, 그리고 PRs", "토론, 이슈 및 끌어오기 요청에서의 전체 기여 활동 수"],
    [", developers can delegate tasks to Copilot, freeing them to focus on the creative, complex, and high-impact work that matters most. Assign a task to Copilot, wait for the agent to request review, then leave feedback on the pull request to iterate.", "를 사용하면 개발자는 작업을 Copilot에 맡기고 더 창의적이고 복잡하며 영향력이 큰 일에 집중할 수 있습니다. Copilot에 작업을 할당한 뒤 에이전트가 검토를 요청할 때까지 기다리고, 끌어오기 요청에 피드백을 남겨 결과를 개선할 수 있습니다."],
    ["There are no projects linked to this repository.", "이 저장소에 연결된 프로젝트가 없습니다."],
    ["Try a different search query.", "다른 검색어로 다시 시도해 보세요."],
    ["Learn more about searching and filtering", "검색 및 필터링에 대해 자세히 알아보세요"],
    ["To get started, you can create a", "시작하려면"],
    ["Learn more in our", "자세한 내용은"]
  ]
};

// GitHub's generated first-Discussion template is system content even though it
// lives in a textarea. We only translate it when these signatures are present,
// so normal user-authored Markdown remains untouched.
globalThis.GHK_SYSTEM_TEMPLATE = {
  isDiscussionWelcome(value) {
    return typeof value === 'string' &&
      value.includes('## 👋 Welcome!') &&
      (value.includes("We're using Discussions as a place to connect with other members of our community.") || value.includes("We’re using Discussions as a place to connect with other members of our community.")) &&
      value.includes('For the maintainers, here are some tips') &&
      value.includes('Discussions is available!');
  },

  translateDiscussionWelcome(value) {
    if (!this.isDiscussionWelcome(value)) return false;
    const replacements = [
      ["✏️ Optional: Customize the content below to let your community know what you intend to use Discussions for.", "✏️ 선택 사항: 아래 내용을 수정하여 이 커뮤니티에서 토론을 어떻게 사용할지 안내할 수 있습니다."],
      ["## 👋 Welcome!", "## 👋 환영합니다!"],
      ["We're using Discussions as a place to connect with other members of our community. We hope that you:", "토론은 우리 커뮤니티 구성원들이 서로 소통하는 공간입니다. 다음과 같이 함께해 주세요:"],
      ["We’re using Discussions as a place to connect with other members of our community. We hope that you:", "토론은 우리 커뮤니티 구성원들이 서로 소통하는 공간입니다. 다음과 같이 함께해 주세요:"],
      ["* Ask questions you’re wondering about.", "* 궁금한 점을 질문해 주세요."],
      ["* Share ideas.", "* 아이디어를 공유해 주세요."],
      ["* Engage with other community members.", "* 다른 커뮤니티 구성원들과 적극적으로 소통해 주세요."],
      ["* Welcome others and are open-minded. Remember that this is a community we", "* 새로 온 분들을 환영하고 열린 마음으로 대해 주세요. 이곳은 우리가 함께"],
      ["build together 💪.", "만들어 가는 커뮤니티라는 점을 기억해 주세요 💪."],
      ["To get started, comment below with an introduction of yourself and tell us about what you do with this community.", "시작하려면 아래에 간단한 자기소개와 이 커뮤니티에서 어떤 활동을 하는지 댓글로 알려주세요."],
      ["For the maintainers, here are some tips 💡 for getting started with Discussions. We'll leave these in Markdown comments for now, but feel free to take out the comments for all maintainers to see.", "유지 관리자를 위한 토론 시작 팁입니다 💡. 지금은 Markdown 주석으로 남겨 두지만, 모든 유지 관리자가 볼 수 있도록 필요하면 주석 밖으로 꺼내도 됩니다."],
      ["📢 **Announce to your community** that Discussions is available! Go ahead and send that tweet, post, or link it from the website to drive traffic here.", "📢 커뮤니티에 **토론 기능을 사용할 수 있다고 알려주세요!** SNS 게시물이나 웹사이트 링크 등을 통해 이곳을 소개해 보세요."],
      ["🔗 If you use issue templates, **link any relevant issue templates** such as questions and community conversations to Discussions. Declutter your issues by driving community content to where they belong in Discussions. If you need help, here's a [link to the documentation]", "🔗 이슈 템플릿을 사용한다면 질문이나 커뮤니티 대화 같은 **관련 이슈 템플릿을 토론에 연결하세요**. 커뮤니티 관련 내용은 토론으로 안내하여 이슈 목록을 깔끔하게 유지할 수 있습니다. 도움이 필요하면 [문서 링크]"],
      ["➡️ You can **convert issues to discussions** either individually or bulk by labels. Looking at you, issues labeled “question” or “discussion”.", "➡️ 이슈를 개별적으로 또는 레이블별로 한꺼번에 **토론으로 변환할 수 있습니다**. 특히 ‘question’이나 ‘discussion’ 레이블이 붙은 이슈에 유용합니다."]
    ];
    let result = value;
    for (const [from, to] of replacements) result = result.split(from).join(to);
    return result;
  }
};
