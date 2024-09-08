export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
      <!-- list -->
      <div
        class="notes__sidebar scrollbar-none bg-primary glass w-full drop-shadow-lg shadow-accent-focus md:h-[98vh] md:m-3 md:w-1/3 md:p-4 md:max-w-sm md:shadow-md md:shadow-gray-800 md:rounded-3xl text-center overflow-hidden"
      >
        <div
          class="notes__logo font-extrabold md:text-[2em] text-accent-content text-md"
        >
          My notes
        </div>
        <!-- list row -->
        <div
          class="notes__list scrollbar-none rounded-2xl p-3 w-full flex flex-row items-center md:flex-col overflow-y-scroll overflow-x-scroll gap-2 h-full sm:pb-[3rem]"
        >
     

        </div>
      </div>

      <!-- writing section -->

      <div
        class="w-full h-full flex flex-col items-center justify-center p-4 shadow-inner md:ml-auto md:mr-auto md:max-w-7xl"
      >
        <div class="notes__preview flex flex-col gap-y-4 w-full h-full">
          <input
            type="text"
            class="notes__title p-1 py-2 sm:py-4 rounded-lg sm:rounded-xl shadow-inner shadow-gray-500 bg-secondary placeholder-black md:text-[1em] md:font-extrabold"
            placeholder="note title ..."
          />
          <textarea
            name=""
            class="notes__body p-2 rounded-lg h-1/2 shadow-inner shadow-gray-500 bg-secondary sm:rounded-xl font-bold md:text-[1.25em]"
          >
Take some note ...</textarea
          >

          <!-- add button -->
          <button class="notes__add btn btn-outline btn-primary">
            ADD NOTE
          </button>
        </div>
      </div>

    `;

    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    addNoteBtn.addEventListener("click", () => {
      // run add note method !!
      this.onNoteAdd();
    });

    [inputBody, inputTitle].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newBody = inputBody.value.trim();
        const newTitle = inputTitle.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    // hide notes preview in firs tloading :
    this.updateNotePreviewVisibility(false);
  }

  _creatListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `
    <div class="notes__list-item my-1 md:mx-2 flex justify-center flex-col text-center p-5 rounded-xl w-1/2 md:w-full shadow-lg shadow-primary-focus cursor-pointer bg-secondary" data-note-id="${id}" >
     <div class="notes__item-header">
     <div class="notes__small-title">${title}</div>
     <span class="notes__list-trash" data-note-id="${id}">
        <i class="far fa-trash-alt"></i>
     </span>
     </div>
    <div class="notes__samall-body">
    ${body.substring(0, MAX_BODY_LENGTH)}
    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
    </div>
    <div class="notes__small-updated">
    ${new Date(updated).toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    })}
     </div>
  </div>
    `;
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    //  empty noteList
    notesContainer.innerHTML = "";
    let notesList = "";
    for (const note of notes) {
      const { id, title, body, updated } = note;
      const html = this._creatListItemHTML(id, title, body, updated);
      notesList += html;
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () =>
        this.onNoteSelect(noteItem.dataset.noteId)
      );
    });

    notesContainer
      .querySelectorAll(".notes__list-trash")
      .forEach((noteItem) => {
        noteItem.addEventListener("click", (e) => {
          e.stopPropagation();
          this.onNoteDelete(noteItem.dataset.noteId);
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    //  add selected class :
    this.root.querySelectorAll(".notes__list-item").forEach((item) => {
      item.classList.remove("notes__list-item--selected");
    });

    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
