const cols = document.querySelectorAll('.col');
const message = document.querySelector('.hdr-m');

document.addEventListener('keydown', event => {
  if(event.code.toLowerCase() === 'space') {
    event.preventDefault();
	setRandomColors();
  }
});

document.addEventListener('click', event => {
  const type = event.target.dataset.type;
  if(type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
	node.classList.toggle('fa-lock-open');
	node.classList.toggle('fa-lock');
  }
  else if(type === 'copy') {
	copyToClipBoard(event.target.textContent);
	message.classList.remove('hidden');
    setTimeout(function() {
      message.classList.add('hidden');
    }, 1000);
  }
});

function generateRandomColor() {
  const hexCode = "0123456789ABCDEF";
  let color = "";
  for (let i=0; i<6; i++){
	color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }
  return '#' + color;
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash():[];
  cols.forEach((col, index) => {
	const isLocked = col.querySelector('i').classList.contains('fa-lock');	
	const text = col.querySelector('h2');
	const button = col.querySelector('button');
	//const color = generateRandomColor();
	if (isLocked) {
	  colors.push(text.textContent);
	  return;
	}
	const color = isInitial ? 
	colors[index] ? colors[index] : 
	chroma.random() : chroma.random();
	if(!isInitial) {
	  colors.push(color);
	}
	
	col.style.background = color;
	text.textContent = color;
	setTextColor(text,color);
	setTextColor(button,color);
  });
  updateColorHash(colors);
}

function setTextColor(text,color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClipBoard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorHash(colors = []) {
  document.location.hash = colors
  .map((col) => col.toString().substring(1))
  .join('-');
  //console.log(colors);
}

function getColorsFromHash() {
  if(document.location.hash.length > 1) {
    return document.location.hash
	.substring(1).split('-')
	.map((color) => '#' + color);
  }
  return[];
}

setRandomColors(true);