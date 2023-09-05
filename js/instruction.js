
function changeFunc() {

    let size = document.getElementById("circles").value;
    let colorAmount = document.getElementById("options").value;

    if (size >= 3 && size <= 6)
        localStorage.setItem("size", JSON.stringify(size));

    if (colorAmount >= 5 && colorAmount <= 8 && colorAmount >= size)
        localStorage.setItem("colorAmount", JSON.stringify(colorAmount));
}

function viewOptions() {
    document.getElementById("changeNumbers").style.display = "block";
    document.getElementById("toChange").style.display = "none";
}