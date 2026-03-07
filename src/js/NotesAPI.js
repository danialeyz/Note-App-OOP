export default class NotesAPI {
  // ── Notes ──────────────────────────────────────────

  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notes-app") || "[]");
    return notes.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updated) - new Date(a.updated);
    });
  }

  static getNotesByCategory(categoryId) {
    if (!categoryId || categoryId === "all") return NotesAPI.getAllNotes();
    return NotesAPI.getAllNotes().filter(
      (n) => n.category === categoryId
    );
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((n) => n.id === noteToSave.id);

    if (existing) {
      existing.title = noteToSave.title ?? existing.title;
      existing.body = noteToSave.body ?? existing.body;
      existing.color = noteToSave.color ?? existing.color;
      existing.pinned = noteToSave.pinned ?? existing.pinned;
      existing.category = noteToSave.category ?? existing.category;
      existing.updated = new Date().toISOString();
    } else {
      noteToSave.id = Date.now();
      noteToSave.updated = new Date().toISOString();
      noteToSave.created = new Date().toISOString();
      noteToSave.color = noteToSave.color || "default";
      noteToSave.pinned = noteToSave.pinned || false;
      noteToSave.category = noteToSave.category || "uncategorized";
      notes.push(noteToSave);
    }

    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filtered = notes.filter((n) => n.id !== Number(id));
    localStorage.setItem("notes-app", JSON.stringify(filtered));
  }

  static duplicateNote(id) {
    const notes = NotesAPI.getAllNotes();
    const original = notes.find((n) => n.id === Number(id));
    if (!original) return;

    NotesAPI.saveNote({
      title: original.title + " (copy)",
      body: original.body,
      color: original.color,
      category: original.category,
      pinned: false,
    });
  }

  static togglePin(id) {
    const notes = NotesAPI.getAllNotes();
    const note = notes.find((n) => n.id === Number(id));
    if (note) {
      note.pinned = !note.pinned;
      localStorage.setItem("notes-app", JSON.stringify(notes));
    }
  }

  static searchNotes(query, categoryId) {
    const q = query.toLowerCase();
    let notes = NotesAPI.getAllNotes();
    if (categoryId && categoryId !== "all") {
      notes = notes.filter((n) => n.category === categoryId);
    }
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q)
    );
  }

  static getStats(categoryId) {
    const notes =
      categoryId && categoryId !== "all"
        ? NotesAPI.getNotesByCategory(categoryId)
        : NotesAPI.getAllNotes();
    const totalWords = notes.reduce((sum, n) => {
      return sum + n.body.split(/\s+/).filter(Boolean).length;
    }, 0);
    return { count: notes.length, totalWords };
  }

  static exportAll() {
    const categories = NotesAPI.getAllCategories();
    const notes = NotesAPI.getAllNotes();
    const lines = [];

    for (const cat of categories) {
      const catNotes = notes.filter((n) => n.category === cat.id);
      if (catNotes.length === 0) continue;
      lines.push(`== ${cat.name} ==\n`);
      for (const n of catNotes) {
        lines.push(`# ${n.title}\n${n.body}\n\n---\n`);
      }
      lines.push("");
    }

    // Uncategorized
    const uncategorized = notes.filter(
      (n) => !n.category || n.category === "uncategorized"
    );
    if (uncategorized.length > 0) {
      lines.push("== Uncategorized ==\n");
      for (const n of uncategorized) {
        lines.push(`# ${n.title}\n${n.body}\n\n---\n`);
      }
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-notes-export.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Categories ─────────────────────────────────────

  static getAllCategories() {
    return JSON.parse(localStorage.getItem("notes-app-categories") || "[]");
  }

  static saveCategory(category) {
    const categories = NotesAPI.getAllCategories();
    const existing = categories.find((c) => c.id === category.id);

    if (existing) {
      existing.name = category.name;
      existing.icon = category.icon ?? existing.icon;
    } else {
      category.id = "cat-" + Date.now();
      category.icon = category.icon || "";
      categories.push(category);
    }

    localStorage.setItem("notes-app-categories", JSON.stringify(categories));
    return category;
  }

  static deleteCategory(categoryId) {
    const categories = NotesAPI.getAllCategories();
    const filtered = categories.filter((c) => c.id !== categoryId);
    localStorage.setItem("notes-app-categories", JSON.stringify(filtered));

    // Move notes in this category to uncategorized
    const notes = NotesAPI.getAllNotes();
    for (const note of notes) {
      if (note.category === categoryId) {
        note.category = "uncategorized";
      }
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static getCategoryNoteCounts() {
    const notes = NotesAPI.getAllNotes();
    const counts = { all: notes.length, uncategorized: 0 };
    for (const note of notes) {
      const cat = note.category || "uncategorized";
      if (cat === "uncategorized") {
        counts.uncategorized++;
      } else {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    }
    return counts;
  }

  // ── Theme ──────────────────────────────────────────

  static getSavedTheme() {
    return localStorage.getItem("notes-app-theme") || "dracula";
  }

  static saveTheme(theme) {
    localStorage.setItem("notes-app-theme", theme);
  }
}
