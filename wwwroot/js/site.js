const uri = 'https://localhost:7135/WeatherForecast';
const uriSongs = 'https://localhost:7135/Songs';
const uriSongByname = 'https://localhost:7135/Songs/1';
let forecasts = [];

// https://localhost:7135/WeatherForecast

function getForecast() {
    fetch(uri, {
        mode:  'cors' ,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //   key1: 'value1',
        //   key2: 'value2'
        // })
      })
      .then(response => response.json())
      .then(data => _displayForecast(data))
      .then(data => console.log(data))
      .catch(error => console.error('Unable to get forecast.', error));
}

function getSongs() {
    fetch(uriSongs, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //   key1: 'value1',
        //   key2: 'value2'
        // })
    })
        .then(response => response.json())
        .then(data => _displaySongs(data))
        .then(data => console.log(data))
        .catch(error => console.error('Unable to get songs.', error));
}


//Fileresponse
function getSongByName() {
    fetch(uriSongByname, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'audio/wav'
        },
    })
    //.then(response => response.json())
    .then(data => _displaySong(data))
    .then(data => console.log(data))
    .catch(error => console.error('Unable to get song by name.', error));
}

function _displayForecast(data) {


  // get pointer to tables body 
  const tBody = document.getElementById('forecasts');
  tBody.innerHTML = '';

  console.log(data);
    console.log('_displayForecast');

  data.forEach(item => {
        
    //add rows to tbody
    let tr = tBody.insertRow();
        
    let td1 = tr.insertCell(0);
    td1.appendChild(document.createTextNode(item.summary));

    let td2 = tr.insertCell(1);
    td2.appendChild(document.createTextNode(item.temperatureC));

    //td1.appendChild(document.createTextNode(item));

    // let td2 = tr.insertCell(1);
    // let textNode = document.createTextNode(item.name);
    // td2.appendChild(textNode);
   });
   
   forecasts = data;

}

function _displaySong(data) {

    console.log(data);
    //context.decodeAudioData(new ArrayBuffer(new Uint8Array(item.data)), function (buffer) {
    //    dogBarkingBuffer = buffer;
    //});

    //const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    //const fetchSong = (path) =>
    //    fetch(path)
    //        .then((res) => res.arrayBuffer())
//        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));

    const blob = new Blob([new Uint8Array(data)], { type: 'audio/wav' });

    // new ArrayBuffer(
    const audio2 = document.getElementById('audio2');
    const source2 = document.getElementById('source2');

    source2.src = data;
    audio2.load();

}

function playByteArray(bytes) {
    var buffer = new Uint8Array(bytes.length);
    buffer.set(new Uint8Array(bytes), 0);

    context.decodeAudioData(buffer.buffer, play);
}

function play(audioBuffer) {
    var source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(0);
}

function _displaySongs(data) {

    // get pointer to tables body 
    const tBody = document.getElementById('songs');
    tBody.innerHTML = '';

    console.log(data);
    console.log('_displaySongs');

    data.forEach(item => {

        //add rows to tbody
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.name));

        //let td2 = tr.insertCell(1);
        //td2.appendChild(document.createTextNode(item.data));
        context.decodeAudioData(new ArrayBuffer(new Uint8Array(item.data)), function (buffer) {
            dogBarkingBuffer = buffer;
        });

        /*
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const fetchSong = (path) =>
            fetch(path)
                .then((res) => res.arrayBuffer())
                .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
        */

        // new ArrayBuffer(
        // Get DOM elements.
        var bytes = item.data;
        var buffer2 = new Uint8Array(bytes.length);
        buffer2.set(new Uint8Array(bytes), 0);

        console.log(bytes);

        const blob2 = new Blob(buffer2, { type: 'audio/wav' });
        //context.decodeAudioData(buffer2.buffer, play);
        //console.log(buffer2.buffer);

        const audio2 = document.getElementById('audio2');
        const source2 = document.getElementById('source2');

        source2.src = bytes; // blob2;// dogBarkingBuffer;
        source.start(0);
        audio2.load();

        // Create blob from Uint8Array & Object URL.
        const blob = new Blob([new Uint8Array(item.data)], { type: 'audio/wav' });


        //const blob = new Blob(item.data, { type: 'audio/wav' });
        //console.log(blob2);
        const url = URL.createObjectURL(blob);

        // Get DOM elements.
        const audio = document.getElementById('audio');
        const source = document.getElementById('source');

        // Insert blob object URL into audio element & play.
        source.src = blob; // url;
        //console.log(url);
        audio.load();
        //audio.play();

    });

    forecasts = data;

}

var dogBarkingBuffer = null;
var context = new AudioContext();

function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            dogBarkingBuffer = buffer;
        }, onError);
    }
    request.send();
}

//  const button = document.createElement('button');

//   data.forEach(item => {
//     let isCompleteCheckbox = document.createElement('input');
//     isCompleteCheckbox.type = 'checkbox';
//     isCompleteCheckbox.disabled = true;
//     isCompleteCheckbox.checked = item.isComplete;

//     let editButton = button.cloneNode(false);
//     editButton.innerText = 'Edit';
//     editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

//     let deleteButton = button.cloneNode(false);
//     deleteButton.innerText = 'Delete';
//     deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

//     let tr = tBody.insertRow();
    
//     let td1 = tr.insertCell(0);
//     td1.appendChild(isCompleteCheckbox);

//     let td2 = tr.insertCell(1);
//     let textNode = document.createTextNode(item.name);
//     td2.appendChild(textNode);

//     let td3 = tr.insertCell(2);
//     td3.appendChild(editButton);

//     let td4 = tr.insertCell(3);
//     td4.appendChild(deleteButton);
//   });

//   todos = data;
//}

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');

  const item = {
    isComplete: false,
    name: addNameTextbox.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(isCompleteCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  todos = data;
}