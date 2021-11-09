---
title: text to speech in browser
description: read text aloud
date: 2021-11-04
tags:
  - javascript
  - recipe
related_links:
  - ['mdn speechsynthesis', 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis', null]
  - ['utterance', 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance', '🗣']
css_page: >
  <style>
  .txt, select, form > div {
    display: block;
    margin: 0 auto;
    font-family: sans-serif;
    font-size: 16px;
    padding: 5px;
  }
  
  .txt {
    width: 80%;
  }
  
  select {
    width: 83%;
  }
  
  form > div {
    width: 81%;
  }
  
  .txt, form > div {
    margin-bottom: 10px;
    overflow: auto;
  }
  
  .clearfix {
    clear: both;
  }
  
  label {
    float: left;
    width: 10%;
    line-height: 1.5;
    color: #888;
  }
  
  .rate-value, .pitch-value {
    width: 5%;
    line-height: 1.5;
    color: #888;
  }
  
  .instructions {
    color: #888;
  }

  .label {
    color: #666;
  }
  
  #rate, #pitch {
    float: right;
    width: 81%;
  }
  .controls {
    margin-top: 10px;
  }

  .controls button {
    padding: 10px;
  }
  </style>
---
<script>
document.addEventListener("DOMContentLoaded", function(event) { 

var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputText = document.getElementById('text');
var voiceSelect = document.getElementById('voiceSelect');

var pitch = document.getElementById('pitch');
var pitchValue = document.getElementById('pitchvalue');
var rate = document.getElementById('rate');
var rateValue = document.getElementById('ratevalue');

function speak(){
  if(inputText.value !== ''){
    var utterThis = new SpeechSynthesisUtterance(inputText.value);
    utterThis.lang = voiceSelect.selectedOptions[0].dataset.lang;
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();
  speak();
  inputText.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
  speak();
  inputText.blur();
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
  speak();
  inputText.blur();
}

voiceSelect.addEventListener('change', (event) => {
  speak();
  inputText.blur();
});

function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  var voices = speechSynthesis.getVoices();

  for(var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].lang==='en-US') {
      option.selected = true;
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

});
</script>



<div class="max-w rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
  <h2 style='color: #006EFF'>Speech synthesizer</h2>

<p class='instructions text-left'>Enter some text, change the rate or pitch.</p>
  </div>
<form>
<div class="grid grid-cols-1 md:grid-cols-2">
    <div class='label'>text</div><div><input type="text" id='text' class="txt" value='{{ settings.name }}'></div>
    <div class='label'>voice</div><div><select id="voiceSelect" class="form-select block w-full mt-1"></select></div>
    <div class='label'>rate <span id='ratevalue'>1</span></div><div><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate"></div>
    <div class='label'>pitch <span id='pitchvalue'>1</span></div><div><input type="range" min="0.5" max="2" value="1" step="0.1" id="pitch"></div>
</div>
   <div class="controls">
      <button id="read" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Read</button>
    </div>
</form>
</div>
