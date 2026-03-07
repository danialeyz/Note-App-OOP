export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    this.handlers = handlers;
    this._mobileView = "list";
    this._render();
    this._bindEvents();
    this.updateNotePreviewVisibility(false);
  }

  _render() {
    this.root.innerHTML = `
      <!-- ==================== MOBILE ==================== -->

      <!-- Mobile: Notes List View -->
      <div class="mobile-list-view flex flex-col h-full w-full md:hidden pt-safe">
        <div class="px-4 pt-4 pb-3">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h1 class="text-xl font-bold tracking-tight">
                <span class="text-primary">Note</span><span class="text-base-content">Pad</span>
              </h1>
              <p class="notes-stats-mobile text-[10px] text-base-content/50 mt-0.5">0 notes</p>
            </div>
            <div class="flex gap-1">
              <button class="notes-export-mobile btn btn-ghost btn-xs btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </button>
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-xs btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </label>
                <ul tabindex="0" class="dropdown-content z-50 menu p-2 shadow-xl bg-base-100 rounded-box w-48 max-h-64 overflow-y-auto border border-base-300">
                  ${this._getThemeOptions()}
                </ul>
              </div>
            </div>
          </div>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search notes..." class="notes-search-mobile input input-sm input-bordered w-full pl-9 bg-base-100/50 focus:bg-base-100" />
          </div>
        </div>
        <!-- Mobile Category Chips -->
        <div class="category-chips-mobile flex gap-2 px-4 py-2 overflow-x-auto scrollbar-none shrink-0"></div>
        <!-- Mobile Notes List -->
        <div class="notes-list-mobile flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2 pb-24"></div>
        <!-- Mobile Empty -->
        <div class="notes-empty-mobile flex-1 flex-col items-center justify-center gap-6 hidden pb-24">
          <div class="flex flex-col items-center justify-center h-full gap-4">
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <p class="text-lg font-semibold text-base-content/70">No notes yet</p>
            <p class="text-sm text-base-content/40">Tap + to create your first note</p>
          </div>
        </div>
      </div>

      <!-- Mobile: Editor View -->
      <div class="mobile-editor-view flex flex-col h-full w-full md:hidden hidden pt-safe">
        <div class="flex items-center gap-2 px-3 pt-3 pb-2">
          <button class="mobile-back btn btn-ghost btn-sm btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div class="notes-color-picker-mobile flex gap-1.5 flex-1 justify-center">
            ${this._getColorDots("mobile")}
          </div>
          <div class="flex items-center gap-1">
            <button class="notes-pin-mobile btn btn-ghost btn-xs btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            </button>
            <button class="notes-duplicate-mobile btn btn-ghost btn-xs btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
          </div>
        </div>
        <!-- Mobile Category Selector -->
        <div class="px-4 pb-2">
          <select class="note-category-mobile select select-xs select-bordered w-full max-w-[12rem]"></select>
        </div>
        <div class="notes-preview-mobile flex-1 flex flex-col px-4 pb-2 gap-2 overflow-y-auto">
          <input type="text" class="notes-title-mobile input input-ghost text-xl font-bold w-full px-0 focus:outline-none border-none focus:border-none placeholder:text-base-content/20" placeholder="Note title..." />
          <div class="divider my-0 opacity-20"></div>
          <textarea class="notes-body-mobile textarea textarea-ghost flex-1 text-base w-full px-0 resize-none focus:outline-none border-none focus:border-none placeholder:text-base-content/20 leading-relaxed" placeholder="Start writing..."></textarea>
        </div>
        <div class="notes-statusbar-mobile flex items-center justify-between px-4 py-2 border-t border-base-200 text-[10px] text-base-content/40 pb-safe">
          <div class="flex gap-3">
            <span class="notes-char-count-mobile">0 chars</span>
            <span class="notes-word-count-mobile">0 words</span>
            <span class="notes-read-time-mobile">0 min read</span>
          </div>
          <span class="notes-save-status-mobile text-xs italic">Saved</span>
        </div>
      </div>

      <!-- Mobile Bottom Nav -->
      <nav class="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 md:hidden bg-base-200 border-t border-base-300 pb-safe">
        <div class="flex items-center justify-around h-14">
          <button class="mobile-nav-list flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <span class="text-[10px] font-medium">Notes</span>
          </button>
          <button class="mobile-nav-add flex items-center justify-center w-14 h-14 -mt-5">
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" /></svg>
            </div>
          </button>
          <button class="mobile-nav-editor flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-base-content/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <span class="text-[10px] font-medium">Editor</span>
          </button>
        </div>
      </nav>

      <!-- ==================== DESKTOP ==================== -->

      <aside class="notes-sidebar bg-base-200 hidden md:flex md:w-[22rem] md:min-w-[22rem] md:h-full flex-col shrink-0">
        <div class="px-5 pt-5 pb-3">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h1 class="text-2xl font-bold tracking-tight">
                <span class="text-primary">Note</span><span class="text-base-content">Pad</span>
              </h1>
              <p class="notes-stats text-xs text-base-content/50 mt-0.5">0 notes</p>
            </div>
            <div class="flex gap-1">
              <button class="notes-export btn btn-ghost btn-sm btn-circle tooltip tooltip-bottom" data-tip="Export all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </button>
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-sm btn-circle tooltip tooltip-bottom" data-tip="Theme">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </label>
                <ul tabindex="0" class="dropdown-content z-50 menu p-2 shadow-xl bg-base-100 rounded-box w-48 max-h-64 overflow-y-auto border border-base-300">
                  ${this._getThemeOptions()}
                </ul>
              </div>
            </div>
          </div>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search notes..." class="notes-search input input-sm input-bordered w-full pl-9 bg-base-100/50 focus:bg-base-100" />
          </div>
        </div>
        <!-- Desktop Category Chips -->
        <div class="category-chips flex gap-2 px-4 py-2 overflow-x-auto scrollbar-none shrink-0 flex-wrap"></div>
        <div class="notes-list flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-base-300"></div>
        <div class="p-3 border-t border-base-300/50">
          <button class="notes-add btn btn-primary btn-block btn-sm gap-2 shadow-lg shadow-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            New Note
            <kbd class="kbd kbd-xs ml-auto opacity-60">Ctrl+N</kbd>
          </button>
        </div>
      </aside>

      <main class="notes-editor hidden md:flex flex-1 flex-col min-h-0 bg-base-100 relative">
        <div class="notes-toolbar flex items-center gap-2 px-8 pt-4 pb-2">
          <div class="notes-color-picker flex gap-1">
            ${this._getColorDots("desktop")}
          </div>
          <div class="ml-auto flex items-center gap-3">
            <!-- Desktop Category Selector -->
            <select class="note-category select select-xs select-bordered max-w-[10rem]"></select>
            <button class="notes-pin btn btn-ghost btn-xs gap-1 tooltip tooltip-bottom" data-tip="Pin note">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <span class="notes-pin-label text-xs">Pin</span>
            </button>
            <button class="notes-duplicate btn btn-ghost btn-xs gap-1 tooltip tooltip-bottom" data-tip="Duplicate">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
            <span class="notes-save-status text-xs text-base-content/40 italic">Saved</span>
          </div>
        </div>
        <div class="notes-preview flex-1 flex flex-col px-8 pb-4 gap-2 overflow-y-auto">
          <input type="text" class="notes-title input input-ghost text-3xl font-bold w-full px-0 focus:outline-none border-none focus:border-none placeholder:text-base-content/20" placeholder="Give your note a title..." />
          <div class="divider my-0 opacity-30"></div>
          <textarea class="notes-body textarea textarea-ghost flex-1 text-lg w-full px-0 resize-none focus:outline-none border-none focus:border-none placeholder:text-base-content/20 leading-relaxed" placeholder="Start writing your thoughts..."></textarea>
        </div>
        <div class="notes-statusbar flex items-center justify-between px-8 py-2 border-t border-base-200 text-xs text-base-content/40">
          <div class="flex gap-4">
            <span class="notes-char-count">0 chars</span>
            <span class="notes-word-count">0 words</span>
            <span class="notes-read-time">0 min read</span>
          </div>
          <span class="notes-updated-time"></span>
        </div>
        <div class="notes-empty flex-1 flex-col items-center justify-center gap-6 hidden absolute inset-0 bg-base-100">
          <div class="flex flex-col items-center justify-center h-full gap-4">
            <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <p class="text-xl font-semibold text-base-content/70 mb-1">No notes yet</p>
            <p class="text-base-content/40">Hit <kbd class="kbd kbd-sm">Ctrl+N</kbd> or click <span class="text-primary font-medium">New Note</span> to begin</p>
          </div>
        </div>
      </main>

      <!-- ==================== MODALS ==================== -->

      <!-- Delete Modal -->
      <dialog class="notes-delete-modal modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            Delete this note?
          </h3>
          <p class="py-4 text-base-content/60">This can't be undone. The note will be permanently removed.</p>
          <div class="modal-action">
            <button class="notes-delete-cancel btn btn-ghost btn-sm">Cancel</button>
            <button class="notes-delete-confirm btn btn-error btn-sm">Delete</button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop"><button>close</button></form>
      </dialog>

      <!-- Add Category Modal -->
      <dialog class="category-add-modal modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">New Category</h3>
          <div class="form-control mt-4">
            <input type="text" class="category-name-input input input-bordered w-full" placeholder="Category name..." maxlength="30" />
          </div>
          <div class="modal-action">
            <button class="category-add-cancel btn btn-ghost btn-sm">Cancel</button>
            <button class="category-add-confirm btn btn-primary btn-sm">Create</button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop"><button>close</button></form>
      </dialog>

      <!-- Manage Category Modal (rename/delete) -->
      <dialog class="category-manage-modal modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Manage Category</h3>
          <div class="form-control mt-4">
            <label class="label"><span class="label-text">Rename</span></label>
            <input type="text" class="category-rename-input input input-bordered w-full" maxlength="30" />
          </div>
          <div class="modal-action justify-between">
            <button class="category-manage-delete btn btn-error btn-sm btn-outline">Delete Category</button>
            <div class="flex gap-2">
              <button class="category-manage-cancel btn btn-ghost btn-sm">Cancel</button>
              <button class="category-manage-save btn btn-primary btn-sm">Save</button>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop"><button>close</button></form>
      </dialog>
    `;
  }

  // ── Helpers ──────────────────────────────────────────

  _getColorDots(variant) {
    const colors = [
      { name: "default", css: "bg-base-content/20" },
      { name: "red", css: "bg-red-400" },
      { name: "orange", css: "bg-orange-400" },
      { name: "yellow", css: "bg-yellow-400" },
      { name: "green", css: "bg-green-400" },
      { name: "blue", css: "bg-blue-400" },
      { name: "purple", css: "bg-purple-400" },
    ];
    const suffix = variant === "mobile" ? "-m" : "";
    return colors
      .map(
        (c) =>
          `<button class="note-color-dot${suffix} w-4 h-4 rounded-full ${c.css} hover:scale-125 transition-transform cursor-pointer border-2 border-transparent" data-color="${c.name}"></button>`
      )
      .join("");
  }

  _getThemeOptions() {
    const themes = [
      { name: "dracula", icon: "🧛" }, { name: "dark", icon: "🌙" },
      { name: "night", icon: "🌃" }, { name: "coffee", icon: "☕" },
      { name: "synthwave", icon: "🌆" }, { name: "cyberpunk", icon: "🤖" },
      { name: "retro", icon: "📺" }, { name: "forest", icon: "🌲" },
      { name: "aqua", icon: "💧" }, { name: "valentine", icon: "💖" },
      { name: "halloween", icon: "🎃" }, { name: "garden", icon: "🌸" },
      { name: "lofi", icon: "🎵" }, { name: "pastel", icon: "🎨" },
      { name: "autumn", icon: "🍂" }, { name: "winter", icon: "❄️" },
      { name: "cupcake", icon: "🧁" }, { name: "light", icon: "☀️" },
      { name: "fantasy", icon: "🔮" }, { name: "business", icon: "💼" },
    ];
    return themes
      .map((t) => `<li><a class="notes-theme-btn capitalize text-sm" data-theme="${t.name}">${t.icon} ${t.name}</a></li>`)
      .join("");
  }

  _escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  _formatRelativeTime(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffSec = Math.floor((now - date) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    if (diffSec < 10) return "just now";
    if (diffSec < 60) return diffSec + "s ago";
    if (diffMin < 60) return diffMin + "m ago";
    if (diffHr < 24) return diffHr + "h ago";
    if (diffDay < 7) return diffDay + "d ago";
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  _getNoteColorClass(color) {
    const map = {
      red: "border-l-red-400", orange: "border-l-orange-400",
      yellow: "border-l-yellow-400", green: "border-l-green-400",
      blue: "border-l-blue-400", purple: "border-l-purple-400",
    };
    return map[color] || "";
  }

  _updateWordStats(text, isMobile) {
    const chars = text.length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const readMin = Math.max(1, Math.ceil(words / 200));
    const s = isMobile ? "-mobile" : "";
    this.root.querySelector(`.notes-char-count${s}`).textContent = chars + " chars";
    this.root.querySelector(`.notes-word-count${s}`).textContent = words + " words";
    this.root.querySelector(`.notes-read-time${s}`).textContent = readMin + " min read";
  }

  // ── Mobile view switching ────────────────────────────

  _showMobileView(view) {
    this._mobileView = view;
    const listView = this.root.querySelector(".mobile-list-view");
    const editorView = this.root.querySelector(".mobile-editor-view");
    const navList = this.root.querySelector(".mobile-nav-list");
    const navEditor = this.root.querySelector(".mobile-nav-editor");
    if (view === "list") {
      listView.classList.remove("hidden");
      editorView.classList.add("hidden");
      navList.classList.add("text-primary");
      navList.classList.remove("text-base-content/40");
      navEditor.classList.remove("text-primary");
      navEditor.classList.add("text-base-content/40");
    } else {
      listView.classList.add("hidden");
      editorView.classList.remove("hidden");
      navEditor.classList.add("text-primary");
      navEditor.classList.remove("text-base-content/40");
      navList.classList.remove("text-primary");
      navList.classList.add("text-base-content/40");
    }
  }

  // ── Events ───────────────────────────────────────────

  _bindEvents() {
    const $ = (sel) => this.root.querySelector(sel);
    const $$ = (sel) => this.root.querySelectorAll(sel);

    // Desktop elements
    const addBtn = $(".notes-add");
    const titleInput = $(".notes-title");
    const bodyInput = $(".notes-body");
    const searchInput = $(".notes-search");
    const pinBtn = $(".notes-pin");
    const duplicateBtn = $(".notes-duplicate");
    const exportBtn = $(".notes-export");
    const catSelect = $(".note-category");

    // Mobile elements
    const titleInputM = $(".notes-title-mobile");
    const bodyInputM = $(".notes-body-mobile");
    const searchInputM = $(".notes-search-mobile");
    const pinBtnM = $(".notes-pin-mobile");
    const duplicateBtnM = $(".notes-duplicate-mobile");
    const exportBtnM = $(".notes-export-mobile");
    const catSelectM = $(".note-category-mobile");
    const backBtn = $(".mobile-back");

    // Mobile bottom nav
    $(".mobile-nav-list").addEventListener("click", () => this._showMobileView("list"));
    $(".mobile-nav-editor").addEventListener("click", () => this._showMobileView("editor"));
    $(".mobile-nav-add").addEventListener("click", () => {
      this.handlers.onNoteAdd();
      this._showMobileView("editor");
    });
    backBtn.addEventListener("click", () => this._showMobileView("list"));

    // Add note (desktop)
    addBtn.addEventListener("click", () => this.handlers.onNoteAdd());

    // Auto-save (desktop)
    let saveTimeout;
    const autoSave = () => {
      const ss = $(".notes-save-status");
      ss.textContent = "Typing...";
      ss.classList.remove("text-success");
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        this.handlers.onNoteEdit(titleInput.value.trim(), bodyInput.value.trim());
        ss.textContent = "Saved";
        ss.classList.add("text-success");
        setTimeout(() => ss.classList.remove("text-success"), 1500);
      }, 600);
    };
    titleInput.addEventListener("input", autoSave);
    bodyInput.addEventListener("input", () => { this._updateWordStats(bodyInput.value, false); autoSave(); });

    // Auto-save (mobile)
    let saveTimeoutM;
    const autoSaveM = () => {
      const ss = $(".notes-save-status-mobile");
      ss.textContent = "Typing...";
      ss.classList.remove("text-success");
      clearTimeout(saveTimeoutM);
      saveTimeoutM = setTimeout(() => {
        this.handlers.onNoteEdit(titleInputM.value.trim(), bodyInputM.value.trim());
        ss.textContent = "Saved";
        ss.classList.add("text-success");
        setTimeout(() => ss.classList.remove("text-success"), 1500);
      }, 600);
    };
    titleInputM.addEventListener("input", autoSaveM);
    bodyInputM.addEventListener("input", () => { this._updateWordStats(bodyInputM.value, true); autoSaveM(); });

    // Search
    searchInput.addEventListener("input", () => this.handlers.onSearch(searchInput.value));
    searchInputM.addEventListener("input", () => this.handlers.onSearch(searchInputM.value));

    // Themes
    $$(".notes-theme-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.handlers.onThemeChange(btn.dataset.theme));
    });

    // Color dots
    $$(".note-color-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        $$(".note-color-dot").forEach((d) => d.classList.remove("border-base-content", "scale-125"));
        dot.classList.add("border-base-content", "scale-125");
        this.handlers.onNoteColor(dot.dataset.color);
      });
    });
    $$(".note-color-dot-m").forEach((dot) => {
      dot.addEventListener("click", () => {
        $$(".note-color-dot-m").forEach((d) => d.classList.remove("border-base-content", "scale-125"));
        dot.classList.add("border-base-content", "scale-125");
        this.handlers.onNoteColor(dot.dataset.color);
      });
    });

    // Pin / Duplicate / Export
    pinBtn.addEventListener("click", () => this.handlers.onNotePin());
    duplicateBtn.addEventListener("click", () => this.handlers.onNoteDuplicate());
    exportBtn.addEventListener("click", () => this.handlers.onExport());
    pinBtnM.addEventListener("click", () => this.handlers.onNotePin());
    duplicateBtnM.addEventListener("click", () => this.handlers.onNoteDuplicate());
    exportBtnM.addEventListener("click", () => this.handlers.onExport());

    // Category selector in editor
    catSelect.addEventListener("change", () => this.handlers.onNoteCategory(catSelect.value));
    catSelectM.addEventListener("change", () => this.handlers.onNoteCategory(catSelectM.value));

    // Delete modal
    $(".notes-delete-cancel").addEventListener("click", () => $(".notes-delete-modal").close());
    $(".notes-delete-confirm").addEventListener("click", () => {
      if (this._pendingDeleteId != null) {
        this.handlers.onNoteDelete(this._pendingDeleteId);
        this._pendingDeleteId = null;
      }
      $(".notes-delete-modal").close();
    });

    // Add category modal
    $(".category-add-cancel").addEventListener("click", () => $(".category-add-modal").close());
    $(".category-add-confirm").addEventListener("click", () => {
      const name = $(".category-name-input").value.trim();
      if (name) {
        this.handlers.onCategoryAdd(name);
        $(".category-name-input").value = "";
        $(".category-add-modal").close();
      }
    });
    $(".category-name-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        $(".category-add-confirm").click();
      }
    });

    // Manage category modal
    $(".category-manage-cancel").addEventListener("click", () => $(".category-manage-modal").close());
    $(".category-manage-save").addEventListener("click", () => {
      const newName = $(".category-rename-input").value.trim();
      if (newName && this._managingCategoryId) {
        this.handlers.onCategoryRename(this._managingCategoryId, newName);
        this._managingCategoryId = null;
        $(".category-manage-modal").close();
      }
    });
    $(".category-manage-delete").addEventListener("click", () => {
      if (this._managingCategoryId) {
        this.handlers.onCategoryDelete(this._managingCategoryId);
        this._managingCategoryId = null;
        $(".category-manage-modal").close();
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "n") { e.preventDefault(); this.handlers.onNoteAdd(); }
      if (e.ctrlKey && e.key === "f") { e.preventDefault(); searchInput.focus(); }
    });
  }

  // ── Category rendering ───────────────────────────────

  _buildCategoryChips(categories, counts, activeCategory) {
    let html = "";
    // "All" chip
    const allActive = activeCategory === "all";
    html += `<button class="category-chip btn btn-xs ${allActive ? "btn-primary" : "btn-ghost"} whitespace-nowrap" data-cat-id="all">All <span class="ml-1 opacity-60">${counts.all || 0}</span></button>`;

    // User categories
    for (const cat of categories) {
      const active = activeCategory === cat.id;
      const count = counts[cat.id] || 0;
      html += `<button class="category-chip btn btn-xs ${active ? "btn-primary" : "btn-ghost"} whitespace-nowrap group" data-cat-id="${cat.id}">
        ${this._escapeHTML(cat.name)} <span class="ml-1 opacity-60">${count}</span>
        <span class="category-manage-btn opacity-0 group-hover:opacity-60 ml-0.5 text-[10px]" data-cat-id="${cat.id}">&#9881;</span>
      </button>`;
    }

    // Uncategorized chip
    const uncatActive = activeCategory === "uncategorized";
    if (counts.uncategorized > 0 || uncatActive) {
      html += `<button class="category-chip btn btn-xs ${uncatActive ? "btn-primary" : "btn-ghost"} whitespace-nowrap" data-cat-id="uncategorized">Uncategorized <span class="ml-1 opacity-60">${counts.uncategorized || 0}</span></button>`;
    }

    // Add category button
    html += `<button class="category-add-btn btn btn-xs btn-ghost btn-circle whitespace-nowrap" title="Add category">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
    </button>`;

    return html;
  }

  _bindCategoryChipEvents(container) {
    container.querySelectorAll(".category-chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        // Don't switch category if clicking the manage gear
        if (e.target.classList.contains("category-manage-btn")) return;
        this.handlers.onCategorySelect(chip.dataset.catId);
      });
    });

    container.querySelectorAll(".category-manage-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this._managingCategoryId = btn.dataset.catId;
        // Find category name for the rename input
        const chip = btn.closest(".category-chip");
        const name = chip.textContent.replace(/[\d⚙\s]/g, "").trim();
        this.root.querySelector(".category-rename-input").value = name;
        this.root.querySelector(".category-manage-modal").showModal();
      });
    });

    container.querySelectorAll(".category-add-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.root.querySelector(".category-add-modal").showModal();
        setTimeout(() => this.root.querySelector(".category-name-input").focus(), 100);
      });
    });
  }

  updateCategoryList(categories, counts, activeCategory) {
    const chipsHTML = this._buildCategoryChips(categories, counts, activeCategory);

    // Desktop
    const container = this.root.querySelector(".category-chips");
    container.innerHTML = chipsHTML;
    this._bindCategoryChipEvents(container);

    // Mobile
    const containerM = this.root.querySelector(".category-chips-mobile");
    containerM.innerHTML = chipsHTML;
    this._bindCategoryChipEvents(containerM);

    // Update category selectors in editor
    this._updateCategorySelectors(categories);
  }

  _updateCategorySelectors(categories) {
    const options = `<option value="uncategorized">Uncategorized</option>` +
      categories.map((c) => `<option value="${c.id}">${this._escapeHTML(c.name)}</option>`).join("");

    const sel = this.root.querySelector(".note-category");
    const selM = this.root.querySelector(".note-category-mobile");
    sel.innerHTML = options;
    selM.innerHTML = options;
  }

  // ── Note rendering ──────────────────────────────────

  _createNoteItemHTML(note) {
    const { id, title, body, updated, pinned, color } = note;
    const preview = body.length > 50 ? body.substring(0, 50) + "..." : body;
    const time = this._formatRelativeTime(updated);
    const colorClass = this._getNoteColorClass(color);
    const borderLeft = colorClass ? "border-l-4 " + colorClass : "";
    const pinIcon = pinned
      ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-warning" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>'
      : "";

    return `
      <div class="note-item group rounded-xl bg-base-100 cursor-pointer hover:bg-base-300/50 transition-all ${borderLeft}" data-note-id="${id}">
        <div class="p-3">
          <div class="flex items-center gap-1.5 mb-1">
            ${pinIcon}
            <h3 class="font-semibold text-sm truncate flex-1">${this._escapeHTML(title)}</h3>
            <button class="note-delete opacity-0 group-hover:opacity-100 btn btn-ghost btn-xs btn-circle hover:btn-error transition-opacity" data-note-id="${id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p class="text-xs text-base-content/50 truncate mb-1.5">${this._escapeHTML(preview) || "Empty note"}</p>
          <p class="text-[10px] text-base-content/30">${time}</p>
        </div>
      </div>`;
  }

  updateNoteList(notes) {
    const container = this.root.querySelector(".notes-list");
    const containerM = this.root.querySelector(".notes-list-mobile");
    const html = notes.map((n) => this._createNoteItemHTML(n)).join("");
    container.innerHTML = html;
    containerM.innerHTML = html;

    [container, containerM].forEach((c) => {
      c.querySelectorAll(".note-item").forEach((item) => {
        item.addEventListener("click", () => {
          this.handlers.onNoteSelect(item.dataset.noteId);
          if (window.innerWidth < 768) this._showMobileView("editor");
        });
      });
      c.querySelectorAll(".note-delete").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          this._pendingDeleteId = btn.dataset.noteId;
          this.root.querySelector(".notes-delete-modal").showModal();
        });
      });
    });
  }

  updateStats(stats) {
    const text = `${stats.count} note${stats.count !== 1 ? "s" : ""} · ${stats.totalWords} words`;
    const el = this.root.querySelector(".notes-stats");
    const elM = this.root.querySelector(".notes-stats-mobile");
    if (el) el.textContent = text;
    if (elM) elM.textContent = text;
  }

  updateActiveNote(note) {
    // Desktop
    this.root.querySelector(".notes-title").value = note.title;
    this.root.querySelector(".notes-body").value = note.body;
    this._updateWordStats(note.body, false);
    this.root.querySelector(".notes-updated-time").textContent = this._formatRelativeTime(note.updated);

    // Mobile
    this.root.querySelector(".notes-title-mobile").value = note.title;
    this.root.querySelector(".notes-body-mobile").value = note.body;
    this._updateWordStats(note.body, true);

    // Pin state
    const pinLabel = this.root.querySelector(".notes-pin-label");
    const pinBtn = this.root.querySelector(".notes-pin");
    const pinBtnM = this.root.querySelector(".notes-pin-mobile");
    pinLabel.textContent = note.pinned ? "Unpin" : "Pin";
    pinBtn.classList.toggle("text-warning", !!note.pinned);
    pinBtnM.classList.toggle("text-warning", !!note.pinned);

    // Color dots
    this.root.querySelectorAll(".note-color-dot, .note-color-dot-m").forEach((dot) => {
      dot.classList.remove("border-base-content", "scale-125");
      if (dot.dataset.color === (note.color || "default")) {
        dot.classList.add("border-base-content", "scale-125");
      }
    });

    // Category selectors
    const catVal = note.category || "uncategorized";
    this.root.querySelector(".note-category").value = catVal;
    this.root.querySelector(".note-category-mobile").value = catVal;

    // Highlight selected in lists
    this.root.querySelectorAll(".note-item").forEach((item) => {
      item.classList.remove("ring-2", "ring-primary", "bg-primary/10");
    });
    this.root.querySelectorAll(`.note-item[data-note-id="${note.id}"]`).forEach((el) => {
      el.classList.add("ring-2", "ring-primary", "bg-primary/10");
    });

    // Save status
    this.root.querySelector(".notes-save-status").textContent = "Saved";
    this.root.querySelector(".notes-save-status-mobile").textContent = "Saved";
  }

  updateNotePreviewVisibility(hasNotes) {
    const preview = this.root.querySelector(".notes-preview");
    const toolbar = this.root.querySelector(".notes-toolbar");
    const statusbar = this.root.querySelector(".notes-statusbar");
    const empty = this.root.querySelector(".notes-empty");
    if (hasNotes) {
      preview.classList.remove("hidden");
      toolbar.classList.remove("hidden");
      statusbar.classList.remove("hidden");
      empty.classList.add("hidden");
    } else {
      preview.classList.add("hidden");
      toolbar.classList.add("hidden");
      statusbar.classList.add("hidden");
      empty.classList.remove("hidden");
    }

    const emptyM = this.root.querySelector(".notes-empty-mobile");
    const listM = this.root.querySelector(".notes-list-mobile");
    if (hasNotes) {
      emptyM.classList.add("hidden");
      emptyM.classList.remove("flex");
      listM.classList.remove("hidden");
    } else {
      emptyM.classList.remove("hidden");
      emptyM.classList.add("flex");
      listM.classList.add("hidden");
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}
