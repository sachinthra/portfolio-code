---
title: 'File Locker'
description: 'A production-ready encrypted file storage and streaming system built from scratch using Go, Docker, and AES-256 encryption.'
pubDate: 'Jan 1 2026'
heroImage: '/images/blog/file-locker/file-locker-hero.jpg'
tags: ['Go', 'Security', 'Self-Hosted', 'Full-Stack', 'Docker', 'System Design']
---

## The Pitch
I wanted a Google Drive alternative, but one where *I* owned the encryption keys.

**File Locker** is a self-hosted platform I built to store files securely. It’s not just a wrapper around an S3 bucket; it encrypts everything at rest using **AES-256**, supports video streaming with seeking (which is hard with encryption!), and has a full CLI for automation.

It’s currently running live on my Raspberry Pi.

---

## Tech Stack

* **Backend:** Go (Chi router), PostgreSQL (Metadata), Redis (Sessions), MinIO (Object Storage)
* **Frontend:** Preact (Lightweight React), Vite, TailwindCSS
* **Security:** AES-256-GCM (Files), AES-CTR (Streaming), JWT, Argon2
* **DevOps:** Docker Compose, Multi-Arch Builds (ARM64/AMD64)

---

## The Coolest Features

### 1. Encrypted Video Streaming (with Seek!)
This was the hardest technical challenge. You can't just encrypt a video file and expect it to stream.
* **The Problem:** If a user jumps to minute 5:00, the player requests a specific byte range. But encryption changes byte alignment.
* **The Solution:** I implemented **AES-CTR** mode for streaming. I calculate the exact block offset based on the requested byte range, adjust the IV (Initialization Vector), and decrypt *just* that chunk on the fly.

### 2. "No-Trust" Storage
Even if someone steals the physical hard drive from my Pi, they get nothing.
* Files are encrypted *before* they touch the disk.
* Metadata (names, types) is stored separately in Postgres.
* Keys are managed via a secure envelope pattern.

### 3. The CLI Tool
I love the terminal, so I built a Go CLI with **38 commands**. It mimics the API perfectly.
* `fl upload path/to/file` (Drag-and-drop terminal upload)
* `fl ls` (Lists files like a native directory)
* `fl share` (Generates temporary access links)

---

## Product Preview

![File Locker Dashboard](/images/blog/file-locker/file-locker-dashboard.jpg)  
*Modern web interface with file management and uploads*

![Admin Dashboard](/images/blog/file-locker/file-locker-admin.jpg)  
*System stats, user management, and audit logs*

![CLI Tool](/images/blog/file-locker/file-locker-cli.jpg)  
*Automation-ready CLI with progress tracking*

---

## What I Built

### Backend (Go)
- REST API with 32+ endpoints
- Multipart file uploads with streaming
- Automatic encryption pipeline
- Secure downloads with on-the-fly decryption
- Video streaming with HTTP Range support
- PostgreSQL full-text search

### Authentication & Security
- JWT-based sessions with Redis caching
- Personal Access Tokens for API/CLI
- Role-based access control
- Password hashing with Bcrypt
- Session expiry + force logout

### Admin Dashboard
- User approval & role management  
- File moderation & deletion  
- Storage analysis & cleanup  
- Audit logs  
- System announcements  

### Web Interface
- Drag-and-drop uploads  
- Real-time progress  
- File tagging & search  
- Expiring files  
- In-browser video player  
- Dark / light mode  

### CLI Tool
- 38 commands (100% API coverage)
- Upload, download, search, export
- Token management
- Admin tools
- Script-friendly output & exit codes

---

## Architecture Overview

It’s a microservices-style setup running via Docker Compose:

1.  **Nginx:** Handles SSL termination and routes traffic.
2.  **Go API:** The brain. Handles auth, encryption logic, and database queries.
3.  **MinIO:** The dumb storage layer. It only sees encrypted blobs.
4.  **Redis:** Caches user sessions and download tokens for speed.

**Service Flow:**

```text
Frontend (Nginx) → Go API → PostgreSQL
                     ↓
                   MinIO
                     ↓
                   Redis
```

**Encryption Pipeline:**

```text
Upload → Encrypt (AES-256-GCM) → Store (MinIO)
                ↓
         Metadata (PostgreSQL)
```

**Streaming Pipeline:**

```text
Range Request → Decrypt (AES-256-CTR) → Stream
```

---

## Key Takeaways
* **Go is perfect for IO:** Streaming encrypted data with `io.Reader` and `io.Writer` interfaces in Go is incredibly memory efficient.
* **State management:** Managing upload progress and resumable uploads required careful frontend-backend sync.
* **Cross-Platform Builds:** Since I code on a Mac (ARM64) and deploy to a Pi (Linux ARM64), setting up `docker buildx` pipelines was essential.

**[View Source on GitHub](https://github.com/sachinthra/file-locker)**

---

## Why This Project Matters

This project demonstrates:

- **Backend engineering:** Go APIs, database design, and efficient data handling
- **Security implementation:** AES encryption, JWT authentication, and RBAC
- **DevOps practices:** Docker containerization, multi-service orchestration, and ARM64 deployment
- **System design:** Scalable architecture with proper separation of concerns
- **Real-world production experience:** Running 24/7 on my home network

File Locker isn't just a demo app — it's a **real system** I use daily to solve real storage and streaming needs.
