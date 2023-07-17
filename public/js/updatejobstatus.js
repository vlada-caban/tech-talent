const updateStatusFormHandler = async (e) => {
  e.preventDefault();

  console.log(e);

  console.log("Update status was pressed!");

  const status = document.getElementById("status").value;
  console.log(status);

  const passed_job_id = document.getElementById("job_id").value;
  console.log(passed_job_id);

    const response = await fetch(`/dashboard/job-status/${passed_job_id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to update.");
    }
};

const assignJobId = async (e) => {
  e.preventDefault();

  const job = e.target;
  const job_id = job.dataset.id;

  console.log(job_id);

  document.querySelector("#job_id").value = job_id;
};

document
  .querySelector("#update-status-btn")
  .addEventListener("click", updateStatusFormHandler);

const buttons = document.querySelectorAll(".modal-trigger");

for (i of buttons) {
  i.addEventListener("click", assignJobId);
}

document.addEventListener("DOMContentLoaded", function () {
  let select = document.querySelectorAll("select");
  let selectinstances = M.FormSelect.init(select);

  let modal = document.querySelectorAll(".modal");
  let modalinstances = M.Modal.init(modal);

//   CORS ERROR DO NOT USE
//   let links = document.querySelectorAll(".link_to_job");
//   links.forEach((link) => {
//     fetch(link.getAttribute('href'))
//     .then((response) => {
//         console.log(response.status)
//         if (response.status === 404) {
//             console.log("oh now");
//         }
//     })
//   });
  
});
