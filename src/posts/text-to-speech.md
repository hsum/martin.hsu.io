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
  }
  
  .rate-value, .pitch-value {
    float: right;
    width: 5%;
    line-height: 1.5;
  }
  
  #rate, #pitch {
    float: right;
    width: 81%;
  }
  </style>
---
<script>
document.addEventListener("DOMContentLoaded", function(event) { 

var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputText = document.getElementById('text');
var inputLang = document.getElementById('lang');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

function speak(){
  if(inputText.value !== ''){
    var utterThis = new SpeechSynthesisUtterance(inputText.value);
    utterThis.lang = inputLang.value;
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

});
</script>

<h1>Speech synthesiser</h1>

<p>Enter some text, change the rate or pitch.</p>
    
<form>
  <input type="text" id='text' class="txt" value='{{ settings.name }}'>
  <input type="text" id='lang' class="txt" value='en-US'>
  <div>
    <label for="rate">Rate</label><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate">
    <div class="rate-value">1</div>
    <div class="clearfix"></div>
  </div>
  <div>
    <label for="pitch">Pitch</label><input type="range" min="0" max="2" value="1" step="0.1" id="pitch">
    <div class="pitch-value">1</div>
    <div class="clearfix"></div>
  </div>
</form>
