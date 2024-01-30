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
  prevBtn = document.getElementById("prev"),
  playListContainer = document.querySelector(".playlist"),
  closeBtn = document.querySelector(".close"),
  openBtn = document.querySelector(".playlist-icon"),
  progressBar = document.getElementById("progress");

////////////////////////////////////////////////////////////////////////////////////////////// LINKEDLIST
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
}
const musicPlayer = new LinkedList();
const song1 = new Song(
  "ayo - Joy",
  "anendlessocean ft Moses Bliss ",
  "audio 4.mp3",
  "pink"
);
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
const allMusic = musicPlayer.songArray();
let count = Math.floor(Math.random() * allMusic.length);
// //////////////////////////////////////////////////////////////////////////
// QUEUE
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
  playSong(element) {
    songTitle.innerHTML = this.queue[element].title;
    artistName.innerHTML = this.queue[element].artist;
    albumImage.style.backgroundColor = `${this.queue[element].color}`;
    audio.src = `${this.queue[element].filepath}`;
  }
  nextSong() {
    if (count !== this.queue.length - 1) count++;
    return count;
  }
  prevSong() {
    if (count !== 0) return count--;
  }
  shuffleFunction() {
    let randomIndex = Math.floor(Math.random() * allMusic.length);
    do {
      randomIndex = Math.floor(Math.random() * allMusic.length);
    } while (randomIndex == count);
    count = randomIndex;
  }
  removeSong(count) {
    songQueue.dequeue();
    const songList = document.querySelector("ul");
    songList.innerHTML = "";
    console.log(songQueue);
    printSong();
  }
}
let songQueue = new playQueue();
for (let i = 0; i < allMusic.length; i++) {
  const song = allMusic[i];
  songQueue.enqueue(song);
}
///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
function closePlaylist() {
  playListContainer.classList.add("display");
}
function openPlaylist() {
  playListContainer.classList.toggle("display");
}
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
function printSong() {
  const songList = document.querySelector("ul");
  let theQueue = songQueue.queue;
  for (let i = 0; i < theQueue.length; i++) {
    let liTag = `<li li-index="${i}">
 <div class='row'>
  <span>${theQueue[i].title}</span>
  <p>${theQueue[i].artist}</p>
  </div>
  <audio class ='${theQueue[i].filepath} src=" ${theQueue[i].src}"></audio>
  </li>`;
    songList.insertAdjacentHTML("beforeend", liTag);
  }
}
// //////////////////////////////////////////////////////////////////////////////////EVENT LISTENERS
window.addEventListener("load", () => {
  songQueue.playSong(count);
  printSong();
});
closeBtn.addEventListener("click", closePlaylist);
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const isPlaying = mainContainer.classList.contains("paused");
  isPlaying ? playMusic() : pauseMusic();
});
audio.addEventListener("timeupdate", () => {
  let currentTime = audio.currentTime;
  let duration = audio.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = progressWidth + "%";
});
audio.addEventListener("ended", () => {
  if (repeatSong.classList.contains("clicked")) {
    audio.currentTime = 0;
    songQueue.playSong(count);
    playMusic();
  } else {
    if (count !== allMusic.length - 1) {
      count++;
      playSong();
      console.log(allMusic);
    }
  }
});
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  songQueue.nextSong();
  songQueue.playSong(count);
  playMusic();
});
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  songQueue.prevSong();
  songQueue.playSong(count);
  playMusic();
});
shuffleSong.addEventListener("click", (e) => {
  e.preventDefault();
  shuffleSong.classList.toggle("clicked");
});
repeatSong.addEventListener("click", (e) => {
  e.preventDefault();
  repeatSong.classList.toggle("clicked");
});
openBtn.addEventListener("click", openPlaylist);
