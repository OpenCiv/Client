<header class="full">
   <div id="time-bar" class="fourth">
      <p>Turn&nbsp;123 - 30&nbsp;000&nbsp;BC</p>
   </div>
   <div id="research-bar" class="fourth">
      <p class="center">Currently researching: Agriculture</p>
   </div>
   <div id="menu-bar" class="fourth">
      <p class="center">Menus</p>
   </div>
   <div id="account-bar" class="fourth">
      <p class="right">King Blaablaa of Finland</p>
   </div>
</header>
<main class="full">
   <div id="map" class="two-thirds">
      <p>Kartta</p>
   </div>
   <div id="sidebar" class="third">
      <h2>Select a unit to build</h2>
      <h3>Unit name</h3>
      <p>Unit decription?</p>
      <h3>Unit name</h3>
      <p>Unit decription?</p>
      <h3>Unit name</h3>
      <p>Unit decription?</p>
   </div>
</main>
<footer class="full">
   <div id="info-panel" class="third">
      <h3>Current unit</h3>
      <p>Some information.</p>
   </div>
   <div id="commands-panel" class="third">
      <p class="center">Command options</p>
   </div>
   <div id="status-panel" class="third">
      <h2 class="center">Turn complete</h2>
      <p class="center"><button id="end-turn">End Turn</button></p>
   </div>
</footer>

<style>
/* LESS Document */
/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
mark {
  background: #ff0;
  color: #000;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  box-sizing: content-box;
  height: 0;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
/* MIXINS */
/* Pääväri */
/* Toinen pääväri */
/* Tekstin väri */
/* Negatekstin väri */
/* Taustan väri */
/* Leipäfontti */
/* Otsikkofontti */
/* Sivuilla oleva yleinen väli */
/* Ylhäällä ja alhaalla oleva yleinen väli */
/* Ylhäällä ja alhaalla oleva isompi väli */
/* Ylhäällä ja alhaalla oleva isoin väli */
.col {
  width: 100%;
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
}
.clearfix {
  *zoom: 1;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
/* ======================================================== */
/* BODY */
/* ======================================================== */
body {
  font-size: 0.85em;
  font-family: 'Lato', Arial, sans-serif;
  color: #333333;
  background-color: #fff;
  overflow-x: hidden;
  -ms-overflow-x: hidden;
}
@-ms-viewport {
  width: device-width;
}
/* ======================================================== */
/* HEADINGS */
/* ======================================================== */
h1,
h2,
h3,
h4 {
  font-family: 'Lora', Times New Roman, serif;
  font-style: italic;
  color: #333333;
}
h1 {
  margin: 0 25px 0.5em 25px;
  font-size: 3em;
  font-weight: 400;
  line-height: 110%;
  letter-spacing: 0px;
  text-align: left;
}
h2 {
  margin: 0.25em 25px 30px 25px;
  font-size: 2.2em;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 120%;
}
h3 {
  margin: 0.5em 25px 0.25em 25px;
  font-size: 1.5em;
  font-weight: 400;
  letter-spacing: 0em;
  color: #444;
}
h4 {
  margin: 0.75em 25px 0.5em 25px;
  font-size: 1.1em;
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 150%;
}
.nimiotsikko {
  margin-bottom: -0.5em;
}
/* ======================================================== */
/* LEIPÄTEKSTI */
/* ======================================================== */
p {
  margin: 0.5em 25px 0.75em 25px;
  font-size: 1em;
  font-weight: 400;
  line-height: 170%;
  text-align: left;
}
ul li {
  line-height: 190%;
}
::selection {
  background: #8b189b;
  color: #ffffff;
}
::-moz-selection {
  background: #8b189b;
  color: #ffffff;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
/* ======================================================== */
/* LINKS */
/* ======================================================== */
a,
a:visited,
summary {
  text-decoration: none;
  color: #8b189b;
  cursor: pointer;
}
a:hover,
a:active {
  color: #9f1bb1;
  cursor: pointer;
}
.button {
  background-color: transparent;
  border: 3px solid #8b189b;
  padding: 6.25px 18.75px;
  color: #8b189b;
  display: inline-block;
  font-size: 1em;
  font-weight: 700;
  font-family: 'Lato', Arial, sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: auto;
  min-width: 6em;
  text-decoration: none;
  text-align: center;
  text-indent: 0;
  border-radius: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  transition: all 0.2s ease-in-out;
}
.button:hover,
.button:active {
  background-color: #8b189b;
  /*.tausta-gradientti;*/
  color: #fff;
  transform: scale(1.1);
}
/* ======================================================== */
/* IMAGES */
/* ======================================================== */
img,
object {
  display: block;
  max-width: 100%;
  height: auto;
}
/* ======================================================== */
/* STRUCTURE */
/* ======================================================== */
.full {
  width: 100%;
  float: left;
  display: block;
  padding: 25px 0;
  overflow-x: hidden;
  background-color: #ffffff;
}
.wrapper {
  width: 94%;
  display: block;
  margin: 0 3%;
  *zoom: 1;
}
.wrapper:before,
.wrapper:after {
  content: "";
  display: table;
}
.wrapper:after {
  clear: both;
}
.whole {
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
  width: 100%;
  clear: none;
}
.half {
  width: 100%;
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
  width: 50%;
  clear: none;
}
.two-thirds {
  width: 100%;
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
  width: 66.66%;
  clear: none;
}
.third {
  width: 100%;
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
  width: 33.333%;
  clear: none;
}
.fourth {
  width: 100%;
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
  width: 25%;
  clear: none;
}
.sixth {
  width: 100%;
  clear: both;
  margin-left: 0;
  margin-bottom: 0;
  padding: 25px auto;
  float: left;
  display: block;
  width: 33.333%;
  clear: none;
}
header,
header.full,
footer,
footer.full,
#sidebar {
  background-color: #333;
  position: fixed;
}
header h1,
header.full h1,
footer h1,
footer.full h1,
#sidebar h1,
header h2,
header.full h2,
footer h2,
footer.full h2,
#sidebar h2,
header h3,
header.full h3,
footer h3,
footer.full h3,
#sidebar h3,
header h4,
header.full h4,
footer h4,
footer.full h4,
#sidebar h4,
header p,
header.full p,
footer p,
footer.full p,
#sidebar p {
  color: #fff;
}
header,
header.full {
  top: 0;
  padding: 0.25em 0.25em 0.25em 0.25em;
  z-index: 100;
}
#sidebar {
  background-color: #444;
  height: 100vh;
  right: 0;
  padding-top: 30px;
}
footer {
  bottom: 0;
}
#research-bar,
#menu-bar,
#commands-panel {
  background-color: #444;
}
</style>
