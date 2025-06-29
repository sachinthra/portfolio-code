---
title: 'Home Server'
description: 'Running a server at home can be a great way to learn and experiment with technology.'
pubDate: 'Dec 26 2024'
heroImage: '/raspberry-pi-server-running-medium.jpeg'
---

I always wanted to run a server at home, some of the reasons was to 
1. learn and experiment with technology. 
2. I also wanted to have a place to store my files, run my own services.
3. I wanted to have a place to host my own website, which solves some simple problems. 

I started with a Raspberry Pi, which i was already familiar with. It was a great way to get started, as it was cheap and easy way to own a server. First I experimented with some of the options. Like running different OS, running docker containers with my existing applications I build. 

I had some of the projects in mind already, like
1. A NAS(Network Attached Storage) to store my files, photos and movies. which can be accessed form anywhere unless i am connected to home network.
2. A web server to convert 
    - PDF files to images, and resize
    - Image compress images.
3. A Photo gallery to store and view my photos. To alternative to Google Photos which is full already.
4. Some home automation projects, with combining using ESP32.

Guess what, I was able to run all of these projects on my Raspberry Pi. It was a great learning experience, and I was able to learn a lot about IOT, networking, and web development. And also other products link GITHub runners, docker, Proxy servers, etc.

For the NAS, I used [OpenMediaVault](https://www.openmediavault.org/) which is a free and open-source NAS solution based on Debian Linux. It was easy to set up and use, and it had all the features I needed. I was able to access my files from anywhere, and I could also share them with my friends and family. Wait one interesting feature with this NAS i also added a Torrent client. Well will go in details about it in another post.
This was a start of my home server journey. 