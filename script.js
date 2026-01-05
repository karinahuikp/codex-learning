(function () {
  const startBtn = document.getElementById("startBtn");
  const roleSelection = document.getElementById("roleSelection");
  const scriptView = document.getElementById("scriptView");
  const roleList = document.getElementById("roleList");
  const roleName = document.getElementById("roleName");
  const scriptContent = document.getElementById("scriptContent");
  const panel = document.getElementById("panel");
  const panelTitle = document.getElementById("panelTitle");
  const panelBody = document.getElementById("panelBody");
  const panelClose = document.getElementById("panelClose");
  const toolbar = {
    profile: document.getElementById("btnProfile"),
    task: document.getElementById("btnTask"),
    clue: document.getElementById("btnClue"),
  };

  let selectedRole = null;

  function renderRoles() {
    if (!Array.isArray(STORY_DATA?.roles)) return;
    roleList.innerHTML = "";
    STORY_DATA.roles.forEach((role) => {
      const card = document.createElement("button");
      card.className = "role-card";
      card.type = "button";
      card.setAttribute("data-role", role.id);
      card.innerHTML = `
        <div class="role-card__name">${role.name}</div>
        <div class="role-card__meta">${role.tagline}</div>
      `;
      card.addEventListener("click", () => selectRole(role.id));
      roleList.appendChild(card);
    });
  }

  function selectRole(roleId) {
    selectedRole = STORY_DATA.roles.find((r) => r.id === roleId);
    if (!selectedRole) return;

    roleSelection.classList.add("hidden");
    scriptView.classList.remove("hidden");

    roleName.textContent = selectedRole.name;
    scriptContent.textContent = selectedRole.script.trim();
  }

  function showPanel(type) {
    if (!selectedRole) return;

    const config = {
      profile: { title: "個人宗卷", body: selectedRole.sheet },
      task: { title: "當前任務", body: selectedRole.task },
      clue: { title: "已獲得線索", body: selectedRole.clues.join("、") },
    };

    const content = config[type];
    if (!content) return;

    panelTitle.textContent = content.title;
    panelBody.textContent = content.body;
    panel.classList.remove("hidden");
  }

  function hidePanel() {
    panel.classList.add("hidden");
  }

  startBtn?.addEventListener("click", () => {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    roleSelection.classList.remove("hidden");
  });

  toolbar.profile.addEventListener("click", () => showPanel("profile"));
  toolbar.task.addEventListener("click", () => showPanel("task"));
  toolbar.clue.addEventListener("click", () => showPanel("clue"));
  panelClose.addEventListener("click", hidePanel);

  renderRoles();
})();
