const saveJobFormHandler = async (e) => {
  e.preventDefault();

  console.log("Save Job was pressed!");

  const note_title = document.querySelector("#note_title").value;
  const note_body = document.querySelector("#note_body").value;
  const status = document.getElementById("status").value;
  const job_title = document.getElementById("job_title").innerHTML;
  const company_name = document.getElementById("company_name").innerHTML;
  const urlArr = window.location.toString().split("/");
  const job_id = urlArr[urlArr.length - 1];

  console.log(status);
  console.log(job_title);
  console.log(company_name);
  console.log(note_title);
  console.log(note_body);
  console.log(job_id);

  const response = await fetch("/api/job/post/", {
    method: "POST",
    body: JSON.stringify({ note_title, note_body, status, job_title, company_name, job_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to save job.");
  }
};

document
  .querySelector("#save-job-btn")
  .addEventListener("click", saveJobFormHandler);

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll("select");
  let instances = M.FormSelect.init(elems);
});
