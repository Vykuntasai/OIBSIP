
let display = document.getElementById('screen');
const wipe = () => {
display.value = ' ';
}
const del= () => {
display.value = display.value.slice(0,-1);
}
const show = (n) => {
display.value += n;
}
const calc = () => {
try {
display.value = eval(display.value);
} 
catch (e) {   
display.value = 'Error';
}
}