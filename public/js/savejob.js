
const saveJobFormHandler = async (e) => {
  e.preventDefault();

  console.log("Save Job was pressed!");

  const note_title = document.querySelector("#note_title").value;
  const note_body = document.querySelector("#note_body").value;
  const status = document.getElementById("status").value;

  const urlArr = window.location.toString().split("/");
  const job_id = urlArr[urlArr.length - 1];

  console.log(status);
  console.log(note_title);
  console.log(note_body);
  console.log(job_id);

    // const response = await fetch("/post", {
    //   method: "POST",
    //   body: JSON.stringify({ post_title, post_body }),
    //   headers: { "Content-Type": "application/json" },
    // });

    // if (response.ok) {
    //   document.location.replace(`/dashboard`);
    // } else {
    //   alert("Failed to save job.");
    // }
};

document
  .querySelector("#save-job-btn")
  .addEventListener("click", saveJobFormHandler);


document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll("select");
  let instances = M.FormSelect.init(elems);
});



