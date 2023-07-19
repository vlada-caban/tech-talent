document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

var employmentTypeDropdown = document.querySelector(
  ".employment-type-dropdown"
);
var remoteDropdown = document.querySelector(".remote-dropdown");
var applyBtn = document.getElementById("apply-btn");

var roles = document.querySelector(".jobCard");

applyBtn.addEventListener("click", async function () {
  var employmentType = employmentTypeDropdown.value;
  var remoteStatus = remoteDropdown.value;
  console.log(employmentType);
  console.log(remoteStatus);

  try {
    const response = await fetch(`/jobs/filter/${employmentType}/${remoteStatus}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    // console.log(data.json());
    if (response.ok ){
        // console.log("TESTU+IGG")
        document.location.replace(`/jobs/filter/${employmentType}/${remoteStatus}`);
    }
    } catch (error) {
           console.log(error);
      };
  // window.location.href = `/jobs/filter`;
});
