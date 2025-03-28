import './main.css';
import assets from '../dist/assets.json';

import Engine from "./engine.js"; 
import { Input } from "./input.js";
import { Scene } from "./scene.js";
import { Sounds } from "./sounds.js";
import { Utilities } from "./u.js";
import { UI } from "./ui.js";

var input = new Input();
var scene = new Scene();
var sounds = new Sounds();
var utilities = new Utilities();
var ui = new UI();

var engine = new Engine(input,scene,sounds,utilities,ui);
  
ui.setUp(engine);
utilities.setUp(engine);
scene.setUp(engine);
sounds.setUp(engine);
input.setUp(engine);
  
engine.start(engine);

function update() {
    engine.update();
    requestAnimationFrame(update);
}
  
requestAnimationFrame(update);
