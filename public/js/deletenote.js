const deleteNoteHandler = async (e) => {
  e.stopPropagation();

  const note = e.target;
  const note_id = note.dataset.id;

  console.log("Delete note was pressed!");

  const response = await fetch(`/dashboard/note/${note_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to delete a note.");
  }
};

const btns = document.querySelectorAll("#delete-note-btn");

for (i of btns) {
  i.addEventListener("click", deleteNoteHandler);
}
