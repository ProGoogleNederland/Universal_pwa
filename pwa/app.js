"use strict";

//register a service worker

if ('serviceWorker' in navigator) {

  // sw.js can literally be empty, but must exist

  navigator.serviceWorker.register('pwa/sw.js');

}

//globals

const resistance = 0.98;

const particleDespawnThreshold = 2;

let particleCounter = 0;

let particleMaxLimit = 200;

let spawnClearance = false;

let TOUCH;

let walls = {w: 0, h: 0};

//helpers

const pickRandom = (arr) => {

  return arr[~~(Math.random() * arr.length)];

};

const randInt = (min, max) => {

  return ~~ min + Math.random() * (max - min);

};

const randFloat = (min, max) => {

  return min + Math.random() * (max - min);

};

const randHSL = () => {

  return `hsl(${randInt(0, 360)}, 100%, 50%)`;

};

//classes

class ticker {

  constructor(fps){

    //fps control

    this.frameRate = fps ? fps : 60;

    this.frameInterval = 1000 / this.frameRate;

    this.time = 1; //speed of flow of time 

    let timeElapsed, Now,

    Then = (performance || Date).now();

    //for getting delta based on time

    let last = (performance || Date).now();

    let now, delta;

    

    this.callback = () => {};

    

    const mainLoop = () => {

      requestAnimationFrame(mainLoop);

      Now = (performance || Date).now();

      timeElapsed = Now - Then;

      if (timeElapsed > this.frameInterval) {

        Then = Now - (timeElapsed % this.frameRate);

       

        now = (performance || Date).now();

        delta = (now - last) * this.time;

        last = now;

        this.callback(delta);

      }

    };

    mainLoop();

  }

  

  onTick(callback){

    this.callback = callback;

  }

  

  setFrameRate(fps) {

    this.frameRate = fps;

    this.frameInterval = 1000 / fps;

  }

}

class scene {

  constructor(){

    this.children = [];

    this.count = 0;

  }

  

  add(...entities){

    this.count ++;

    for(let entity of entities) {

      if(!('type' in entity)) return;

      this.children.push(entity);

    }

  }

}

class renderer {

  constructor({ height, width, alpha, pixelRatio }){

    this.height = (height / window.innerHeight) * 100;

    this.width = (width / window.innerWidth) * 100;

    this.h = height;

    this.w = width;

    this.alpha = alpha ? alpha : false;

    this.pixelRatio = pixelRatio ? pixelRatio : 1;

    const canvas = document.createElement('canvas');

    Object.assign(canvas.style, {

      height: `${this.height}vh`,

      width:   `${this.width}vw`,


    });

    Object.assign(canvas, {

      height: this.pixelRatio * this.h,

      width:  this.pixelRatio * this.w,

      h: this.h,

      w: this.w,

    });

    this.domElement = canvas;

    this.context = canvas.getContext('2d');

  }

  

  clrScr(ctx){

    ctx.clearRect(

      0,

      0,

      this.domElement.width,

      this.domElement.height

    );

  }

  

  
