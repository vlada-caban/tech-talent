const deleteJobHandler = async (e) => {
  e.stopPropagation();

  const job = e.target;
  const job_id = job.dataset.id;

  console.log("Delete job was pressed!");

  const response = await fetch(`/dashboard/job/${job_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert("Failed to delete a post.");
  }
};

const btns = document.querySelectorAll("#delete-job-btn");

for (i of btns) {
  i.addEventListener("click", deleteJobHandler);
}
