const updateStatusFormHandler = async (e) => {
  e.preventDefault();

  console.log(e);

  console.log("Update status was pressed!");

  const status = document.getElementById("status").value;
  console.log(status);

  //TODO: need to get job_id
  const job = e.target;
  const job_id = job.dataset.id;
  
  console.log(job);
  console.log(job_id);

  //   const response = await fetch(`/dashboard/job-status/${job_id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({ status }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   if (response.ok) {
  //     document.location.reload();
  //   } else {
  //     alert("Failed to update.");
  //   }
};

document
  .querySelector("#update-status-btn")
  .addEventListener("click", updateStatusFormHandler);

document.addEventListener("DOMContentLoaded", function () {
  let select = document.querySelectorAll("select");
  let selectinstances = M.FormSelect.init(select);

  let modal = document.querySelectorAll(".modal");
  let modalinstances = M.Modal.init(modal);
});
