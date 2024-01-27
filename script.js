"use strict";
const songImage = document.querySelector(".song-img"),
  audio = document.getElementById("audio"),
  songTitle = document.getElementById("track-name"),
  albumImage = document.querySelector(".song-img"),
  artistName = document.getElementById("artist"),
  playBtn = document.getElementById("play-pause"),
  nextBtn = document.getElementById("next"),
  shuffleSong = document.getElementById("shuffle"),
  repeatSong = document.getElementById("repeat"),
  mainContainer = document.querySelector(".music-player"),
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
  constructor(title, artist, filepath, color) {
    this.title = title;
    this.artist = artist;
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
  songList() {
    let current = this.head;
    while (current) {
      console.log(current.data.title);
      current = current.next;
    }
    return current;
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
const song1 = new Song("ayo", "ayoife", "audio 4.mp3", "pink");
const song2 = new Song(
  "3 minutes charge II",
  "apostle segun obadje",
  "audio 2.mp3",
  "aqua"
);
const song3 = new Song("ferrari", "unkown artist", "audio 3.mp3", "blueviolet");
const song4 = new Song(
  "3 minutes charge I",
  "apostle segun obadje",
  "audio 1.mp3",
  "brown"
);
musicPlayer.addSong(song1);
musicPlayer.addSong(song2);
musicPlayer.addSong(song3);
musicPlayer.addSong(song4);
musicPlayer.songList();

const allMusic = musicPlayer.songArray();
let count = Math.floor(Math.random() * allMusic.length);
console.log(count);
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
for (let i = 0; i < allMusic.length; i++) {
  const song = allMusic[i];
  songQueue.enqueue(song);
}

///////////////////////////////////////
// functions and event listeners////
//////////////////////////////////////
window.addEventListener("load", () => {
  playSong(count);
});
function playSong(element) {
  songTitle.innerHTML = allMusic[element].title;
  artistName.innerHTML = allMusic[element].artist;
  albumImage.style.backgroundColor = `${allMusic[element].color}`;
  audio.src = `${allMusic[element].filepath}`;
}
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (count !== allMusic.length - 1) {
    count++;
    playSong(count);
    playMusic();
  }
});
prevBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (count !== 0) {
    count--;
    playSong(count);
    playMusic();
  }
});
function shuffleFunction() {
  let randomIndex = Math.floor(Math.random() * allMusic.length);
  do {
    randomIndex = Math.floor(Math.random() * allMusic.length);
  } while (randomIndex == count);
  count = randomIndex;
  console.log(count);
  playSong(count);
  playMusic();
}
shuffleSong.addEventListener("click", function (e) {
  e.preventDefault();
  shuffleFunction();
});
function pauseMusic() {
  mainContainer.classList.add("paused");
  playBtn.innerHTML = '<i class="play-icon fa-solid fa-play"></i>';
  audio.pause();
}

function playMusic() {
  mainContainer.classList.remove("paused");
  playBtn.innerHTML = '<i class="play-icon fa-solid fa-pause"></i>';
  audio.play();
}

playBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const isPlaying = mainContainer.classList.contains("paused");
  isPlaying ? playMusic() : pauseMusic();
});
audio.addEventListener("timeupdate", function () {
  let currentTime = audio.currentTime;
  let duration = audio.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = progressWidth + "%";
});
audio.addEventListener("ended", function () {
  // e.preventDefault();
  if (count !== allMusic.length - 1) {
    count++;
    playSong();
  }
});
