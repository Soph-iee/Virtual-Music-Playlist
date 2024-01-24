"use strict";
const songImage = document.querySelector(".song-img"),
  audio = document.getElementById("audio"),
  songTitle = document.getElementById("track-name"),
  albumImage = document.querySelector(".song-img"),
  artistName = document.getElementById("artist"),
  playBtn = document.getElementById("play-pause"),
  nextBtn = document.getElementById("next"),
  prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progress");
///////////////////////////////////////////////
//   using linkedlist data structure
///////////////////////////////////////////////
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
    this.size = 1;
  }
}
class Song {
  constructor(title, artist, album, filepath, color) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.filepath = filepath;
    this.color = color;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  addSong(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }
  songArray() {
    let songs = [];
    let current = this.head;
    while (current) {
      songs.push(current.data);
      current = current.next;
    }
    return songs;
  }
    removeSong(index) {
    if (index > 0 && index > this.size) {
      return;
    }
    let current = this.head;
    let count = 0;
    let previous;
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
}
const musicPlayer = new LinkedList();
const song1 = new Song(
  "stand up",
  "Cynthia Erivo",
  "go",
  "audio 1.mp3",
  "pink"
);
const song2 = new Song("sit down", "Josh 2Funny", "go", "audio 2.mp3", "aqua");
const song3 = new Song(
  "carryon",
  "John Legend",
  "go",
  "audio 3.mp3",
  "blueviolet"
);
const song4 = new Song(
  "fireon fire",
  "Sam Smith",
  "go",
  "audio 1.mp3",
  "brown"
);
musicPlayer.addSong(song1);
musicPlayer.addSong(song2);
musicPlayer.addSong(song3);
musicPlayer.addSong(song4);

const test = musicPlayer.songArray();
let count = 0;
// ///////////////////////////////////////////
// working with stacks and queues
//////////////////////////////////
class playQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(song) {
    this.queue.push(song);
  }
  dequeue() {
    return this.queue.shift();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  shuffle() {
    for (let i = this.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    }
  }
}

let songQueue = new playQueue();
for (let i = 0; i < test.length; i++) {
  const song = test[i];
  songQueue.enqueue(song);
}
console.log(songQueue.shuffle());

// console.log(songQueue);
// let currentSong = songQueue.dequeue();
// currentSong = songQueue.dequeue();
// console.log(currentSong);

///////////////////////////////////////
// functions and event listeners////
////////////////////////////////////////
playSong();
function playSong() {
  let playingNow = test[count];
  songTitle.innerHTML = playingNow.title;
  artistName.innerHTML = playingNow.artist;
  albumImage.style.backgroundColor = `${playingNow.color}`;
  audio.src = `${playingNow.filepath}`;
  audio.play();
}
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (count !== test.length - 1) {
    count++;
    playSong();
  }
});
prevBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (count !== 0) {
    count--;
    playSong();
  }
});
playBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (audio.paused) {
    audio.play();
  } else audio.pause();
  // playBtn.innerHTML = "pause";
});
audio.addEventListener("timeupdate", function () {
  let currentTime = audio.currentTime;
  let duration = audio.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = progressWidth + "%";
});
audio.addEventListener("ended", function () {
  // e.preventDefault();
  if (count !== test.length - 1) {
    count++;
    playSong();
  }
});
