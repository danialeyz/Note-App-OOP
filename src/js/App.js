import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.searchQuery = "";
    this.activeCategory = "all";

    this.view = new NotesView(root, this._handlers());

    const savedTheme = NotesAPI.getSavedTheme();
    this.view.setTheme(savedTheme);

    this._refreshCategories();
    this._refreshNotes();
  }

  _refreshCategories() {
    const categories = NotesAPI.getAllCategories();
    const counts = NotesAPI.getCategoryNoteCounts();
    this.view.updateCategoryList(categories, counts, this.activeCategory);
  }

  _refreshNotes() {
    let notes;
    if (this.searchQuery) {
      notes = NotesAPI.searchNotes(this.searchQuery, this.activeCategory);
    } else {
      notes = NotesAPI.getNotesByCategory(this.activeCategory);
    }

    this._setNotes(notes);

    const stats = NotesAPI.getStats(this.activeCategory);
    this.view.updateStats(stats);

    if (notes.length > 0) {
      const activeExists =
        this.activeNote && notes.find((n) => n.id === this.activeNote.id);
      this._setActiveNote(activeExists || notes[0]);
    } else {
      this.activeNote = null;
    }
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const category =
          this.activeCategory !== "all" ? this.activeCategory : "uncategorized";
        NotesAPI.saveNote({
          title: "Untitled Note",
          body: "",
          category,
        });
        this.searchQuery = "";
        this._refreshNotes();
        this._refreshCategories();
      },

      onNoteEdit: (title, body) => {
        if (!this.activeNote) return;
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title,
          body,
        });
        this._refreshNotes();
        this._refreshCategories();
      },

      onNoteSelect: (noteId) => {
        const note = this.notes.find((n) => n.id === Number(noteId));
        if (note) this._setActiveNote(note);
      },

      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
        this._refreshCategories();
      },

      onNotePin: () => {
        if (!this.activeNote) return;
        NotesAPI.togglePin(this.activeNote.id);
        this._refreshNotes();
      },

      onNoteDuplicate: () => {
        if (!this.activeNote) return;
        NotesAPI.duplicateNote(this.activeNote.id);
        this._refreshNotes();
        this._refreshCategories();
      },

      onNoteColor: (color) => {
        if (!this.activeNote) return;
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: this.activeNote.title,
          body: this.activeNote.body,
          color,
        });
        this._refreshNotes();
      },

      onNoteCategory: (categoryId) => {
        if (!this.activeNote) return;
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: this.activeNote.title,
          body: this.activeNote.body,
          category: categoryId,
        });
        this._refreshNotes();
        this._refreshCategories();
      },

      onCategorySelect: (categoryId) => {
        this.activeCategory = categoryId;
        this._refreshCategories();
        this._refreshNotes();
      },

      onCategoryAdd: (name) => {
        NotesAPI.saveCategory({ name });
        this._refreshCategories();
      },

      onCategoryRename: (categoryId, newName) => {
        NotesAPI.saveCategory({ id: categoryId, name: newName });
        this._refreshCategories();
        this._refreshNotes();
      },

      onCategoryDelete: (categoryId) => {
        NotesAPI.deleteCategory(categoryId);
        if (this.activeCategory === categoryId) {
          this.activeCategory = "all";
        }
        this._refreshCategories();
        this._refreshNotes();
      },

      onSearch: (query) => {
        this.searchQuery = query;
        this._refreshNotes();
      },

      onThemeChange: (theme) => {
        this.view.setTheme(theme);
        NotesAPI.saveTheme(theme);
      },

      onExport: () => {
        NotesAPI.exportAll();
      },
    };
  }
}
