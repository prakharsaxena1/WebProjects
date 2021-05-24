function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setBg() {
    let colorHexValue = getRandomColor();
    colorHex.textContent = colorHexValue;
    container.style.backgroundColor = colorHexValue;
    navbar.style.backgroundColor = colorHexValue;
    footer.style.backgroundColor = colorHexValue;
}

let navbar = document.getElementById("navbar"); 
let footer = document.getElementById("footer"); 
let colorHex = document.getElementById("hex");
let randomColorBox = document.getElementById("randomColorBox");
let container = document.getElementById("container");
setBg()

randomColorBox.addEventListener("click", setBg);
