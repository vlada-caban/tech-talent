// const { search } = require("../../controllers/home-routes");

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

var employmentTypeSwitch = document.querySelector(".employment-swtich");
var remoteSwitch = document.querySelector(".remote-switch");
var searchInput = document.querySelector(".searchResp");
var applyBtn = document.getElementById("apply-btn");
var restoreBtn = document.getElementById("restore-btn");
var searchBtn = document.getElementById("search-btn");

var roles = document.querySelector(".jobCard");

applyBtn.addEventListener("click", async function () {
  var employmentType = employmentTypeSwitch? 'full time' : 'contract';
  var remoteStatus = remoteSwitch.checked ? 1 : 0;;
  console.log(remoteStatus)

  try {
    const response = await fetch(`/jobs/filter/${employmentType}/${remoteStatus}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok ){
        document.location.replace(`/jobs/filter/${employmentType}/${remoteStatus}`);
    }
    } catch (error) {
           console.log(error);
      };
});

restoreBtn.addEventListener("click", async function () {
  try {
    const response = await fetch(
      `/jobs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      document.location.replace(
        `/jobs`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

searchBtn.addEventListener("click", async function () {
  var searchQuery = searchInput.value;
    console.log(searchQuery)
  try {
    const response = await fetch(
      `/jobs/search/${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      document.location.replace(
        `/jobs/search/${searchQuery}`
      );
    }
  } catch (error) {
    console.log(error);
  }
});