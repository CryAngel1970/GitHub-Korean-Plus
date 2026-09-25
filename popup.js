const defaults = { useTranslation: true, useDevTerms: false, useParticles: true, useLogs: false };
const ids = Object.keys(defaults);

async function init() {
  const settings = await chrome.storage.local.get(defaults);
  for (const id of ids) {
    const el = document.getElementById(id);
    el.checked = Boolean(settings[id]);
    el.addEventListener('change', async () => {
      await chrome.storage.local.set({ [id]: el.checked });
      updateStatus();
    });
  }
  updateStatus();
}

function updateStatus() {
  const enabled = document.getElementById('useTranslation').checked;
  const status = document.getElementById('status');
  status.textContent = enabled ? '활성' : '꺼짐';
  status.style.color = enabled ? '#3fb950' : '#f85149';
}

init();
