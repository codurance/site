var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    document.getElementById("nextBtn").innerHTML = "Next";
}

function next_step() {
    var x = document.getElementsByClassName("tab");
    x[currentTab].style.display = "none";

    currentTab = currentTab + n;
    showTab(currentTab);
}