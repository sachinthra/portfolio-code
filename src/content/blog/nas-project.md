---
title: 'NAS Project'
description: 'Deploying a NAS solution from scratch using custom hardware, software learned.'
pubDate: 'Jan 08 2025'
heroImage: '/blog-placeholder-3.jpg'
tags: [NAS, Home Server, Portfolio]
---

I have been working on a NAS (Network Attached Storage) project at home. The goal is to create a centralized storage solution that can be accessed from anywhere in the house, and also in future remotely when needed. 

# NAS Project

Over the past few months I’ve been building a home NAS (Network Attached Storage) to centralize all my files, media and backups. The goal was two-fold:

1. Create a rock-solid, always-on storage server accessible from any device on my local network.  
2. Lay the groundwork for future remote access—so I can grab a photo or a video from anywhere in the world.

---

## Why a Home NAS?

- **Centralized Storage**  
  No more scattered USB drives or half-filled SD cards. Everything lives in one place.  
- **Media Streaming**  
  Stream movies, music and photos to TVs, laptops and phones without juggling external drives.  
- **Automated Backups**  
  Nightly snapshots of laptops and mobile devices keep data safe and recoverable.  

---

## Hardware & Software Stack

- **Raspberry Pi 4**  
  Low power draw, silent operation, and enough USB 3.0 throughput for a few spinning drives.  
- **OpenMediaVault (OMV)**  
  Debian-based NAS OS with a polished web UI—packages for SMB, NFS, FTP, Docker and more.  
- **External Drives**  
  A pair of 4 TB HDDs in a USB-powered enclosure, configured for snapshots and quota management.  
- **Networking**  
  - Static IP via NetworkManager to keep the server address predictable.  
  - Gigabit Ethernet backhaul for maximum throughput.  

---

## What I Did

1. **Hardware Assembly**  
   – Chose and assembled the Pi + USB-HDD enclosure  
   – Screenless design tucked under my desk  
2. **OMV Installation & Configuration**  
   – Ran OMV install script and rebooted  
   – Created and mounted file systems (EXT4) in the web UI  
   – Defined shared folders and applied user/group permissions  
3. **Service Enablement**  
   – SMB for Windows clients, NFS for Linux/macOS, and optional FTP  
   – Docker on OMV for future containers (e.g., Nextcloud, Plex)  
4. **Networking**  
   – Assigned a static IP (e.g., 192.168.1.150) via `nmcli`  
   – Verified connectivity and configured UFW rules for planned remote VPN  
5. **Automation & Backups**  
   – Cron jobs to rsync client data night-ly  
   – Email alerts on failed jobs  

---

## Key Lessons & Next Steps

- **Planning Matters**  
  Mapping share structure and user permissions up-front saved countless headaches.  
- **Stay Minimal**  
  Running only the services I actually need keeps the system lean and secure.  
- **Remote Access**  
  Next up is setting up a WireGuard VPN so I can safely reach my NAS from anywhere.  
- **Containerization**  
  I’ll deploy Nextcloud in Docker for cloud-style file sync, and Plex for on-the-fly transcoding.

---

This project not only gave me a robust home-grown storage server but also deepened my skills in Linux administration, networking, and automation. Stay tuned for a detailed setup guide—coming next!