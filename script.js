"use strict";
const songImage = document.querySelector(".song-img"),
  audio = document.getElementById("audio"),
  songTitle = document.getElementById("track-name"),
  albumImage = document.querySelector(".song-img"),
  artistName = document.getElementById("artist"),
  playBtn = document.getElementById("play-pause"),
  nextBtn = document.getElementById("next"),
  shuffleBtn = document.getElementById("shuffle"),
  repeatBtn = document.getElementById("repeat"),
  mainContainer = document.querySelector(".music-player"),
  prevBtn = document.getElementById("prev"),
  playListContainer = document.querySelector(".playlist"),
  closeBtn = document.querySelector(".close"),
  openBtn = document.querySelector(".playlist-icon"),
  songList = document.querySelector("ul"),
  progressBar = document.getElementById("progress"),
  alertMsg = document.querySelector(".alert");

/////////////// LINKEDLIST
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
  "anendlessocean ft Moses Bliss",
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
let count = 0;
// ////////////////////////////////// QUEUE
class playQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(song) {
    this.queue.push(song);
  }
  dequeue(count) {
    this.queue.splice(count, 1);
    return this.queue;
  }
  playSong(element) {
    songTitle.innerHTML = this.queue[element].title;
    artistName.innerHTML = this.queue[element].artist;
    albumImage.style.backgroundColor = `${this.queue[element].color}`;
    audio.src = `${this.queue[element].filepath}`;
  }
  shuffleSong(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    console.log(array);
    array = array;
    return array;
  }
  nextSong() {
    if (count !== this.queue.length - 1) count++;
    return count;
  }
  prevSong() {
    if (count !== 0) return count--;
  }
}
let songQueue = new playQueue();
for (let i = 0; i < allMusic.length; i++) {
  const song = allMusic[i];
  songQueue.enqueue(song);
}
///////////////FUNCTIONS
function alertMessage(text) {
  alertMsg.innerText = text;
  setTimeout(function () {
    alertMsg.innerText = "playing  now";
  }, 2000);
}
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
function printSong(songs) {
  let theQueue = songs.queue;
  for (let i = 0; i < theQueue.length; i++) {
    let liTag = `<li li-index="${i}">
 <div class='row'>
  <span>${theQueue[i].title}</span>
  <p>${theQueue[i].artist}</p>
  </div>
   <i  index = '${i}' class="fa-solid fa-trash"></i>
  <audio class ='${theQueue[i].filepath} src=" ${theQueue[i].src}"></audio>
  </li>`;
    songList.innerHTML += liTag;
    const allDeleteBtn = songList.querySelectorAll(".fa-trash");
    for (let index = 0; index < allDeleteBtn.length; index++) {
      const deleteBtn = allDeleteBtn[index];
      deleteBtn.addEventListener("click", function () {
        const liRemove = songList.querySelector(`[li-index='${index}']`);
        songList.removeChild(liRemove);
        const data = liRemove.getAttribute("li-index");
        songQueue.dequeue(data);
        songList.innerHTML = "";
        printSong(songQueue);
        songQueue.playSong(count);
      });
    }
  }
  return songList;
}
// ////////EVENT LISTENERS
window.addEventListener("load", () => {
  songQueue.playSong(count);
  printSong(songQueue);
  alertMessage("🎵welcome🎵");
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
  if (repeatBtn.classList.contains("clicked")) {
    audio.currentTime = 0;
    songQueue.playSong(count);
    playMusic();
  } else if (shuffleBtn.classList.contains("clicked")) {
    setTimeout(function () {
      shuffleBtn.classList.toggle("clicked");
    }, 3000);
    let array = songQueue;
    songQueue.shuffleSong(array.queue);
    songQueue.playSong(count);
    songList.innerHTML = "";
    printSong(array);
    playMusic();
  } else {
    if (count !== allMusic.length - 1) {
      audio.currentTime = 0;
      count++;
      songQueue.playSong(count);
      playMusic();
    }
  }
});
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alertMessage("next song");
  songQueue.nextSong();
  songQueue.playSong(count);
  playMusic();
});
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alertMessage("previous song");
  songQueue.prevSong();
  songQueue.playSong(count);
  playMusic();
});
shuffleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shuffleBtn.classList.toggle("clicked");
  shuffleBtn.classList.toggle("active");
  if (shuffleBtn.classList.contains("active")) {
    alertMessage("shuffle on");
  } else alertMessage("shuffle off");
});
repeatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  repeatBtn.classList.toggle("clicked");
  if (repeatBtn.classList.contains("clicked")) {
    alertMessage("repeat on");
  } else alertMessage("repeat off");
});
openBtn.addEventListener("click", openPlaylist);
