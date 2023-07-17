const addNoteFormHandler = async (e) => {
  e.preventDefault();

  console.log("Save note was pressed!");

  const note_title = document.querySelector("#note_title").value;
  const note_body = document.querySelector("#note_body").value;
  const urlArr = window.location.toString().split("/");
  const job_id = urlArr[urlArr.length - 1];

  const response = await fetch("/dashboard/note/", {
    method: "POST",
    body: JSON.stringify({
      note_title,
      note_body,
      job_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to add a note job.");
  }
};

document
  .querySelector("#save-note-btn")
  .addEventListener("click", addNoteFormHandler);
