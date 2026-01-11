---
title: 'File Locker – Secure Self-Hosted File Storage'
description: 'Production-ready encrypted file storage & streaming server built with Go, Preact, Docker, and AES-256.'
pubDate: 'Jan 11 2026'
heroImage: '/images/blog/file-locker/file-locker-hero.jpg'
tags: ['Go', 'Security', 'Self-Hosted', 'Full-Stack', 'Docker', 'Portfolio']
---

## File Locker  
**Production-ready encrypted file storage & streaming server**

I built File Locker as a **self-hosted, privacy-first file storage platform** with built-in encryption, secure video streaming, a modern web UI, admin dashboard, and a full-featured CLI tool.

This project demonstrates **backend engineering, security design, DevOps, and system architecture** in a real-world, production-grade system running on my Raspberry Pi 4.

**Key Highlights:**
- Encrypted Storage with AES-256
- Secure Video Streaming with seek support
- Web UI + Admin Dashboard + CLI
- Dockerized multi-service deployment
- Running on Raspberry Pi 4 (ARM64)

---

## Tech Stack

**Backend:** Go · Chi · PostgreSQL · Redis · MinIO  
**Frontend:** Preact · Vite · Axios  
**Security:** AES-256-GCM · AES-256-CTR · JWT · Bcrypt  
**DevOps:** Docker · Docker Compose · Nginx  
**Deployment:** ARM64 · Raspberry Pi 4 · Linux  

---

## Key Features

- AES-256 encrypted file storage (at rest)
- Secure video streaming with **seek support**
- Web UI with drag-and-drop uploads
- Admin dashboard with user & storage management
- Role-based access control (User / Admin)
- Personal Access Tokens for automation
- Full-featured CLI (38 commands)
- Multi-service Docker deployment
- Running on Raspberry Pi 4 with 1TB storage

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

## Technical Challenges Solved

1. **Encrypted Video Streaming**  
   Enabled seek support using AES-CTR + HTTP Range.

2. **Multi-Arch Docker Builds**  
   Built amd64 + arm64 images with Docker buildx.

3. **Session Security**  
   Redis-based session TTL + admin force logout.

4. **Frontend Proxy Issues**  
   Solved Vite + Nginx API routing conflicts.

5. **CLI Reliability**  
   Robust error handling and token detection.

---

## Key Achievements

- Built full system **from scratch**
- Production-ready architecture
- Secure encryption implementation
- Multi-platform deployment
- Real-world usage on Raspberry Pi
- Developer-friendly CLI + docs

---

## Future Enhancements

- End-to-end client-side encryption  
- Public file sharing  
- Mobile apps  
- OCR search  
- Multi-cloud backups  
- Real-time analytics dashboard  

---

## Project Links

- **GitHub:** https://github.com/sachinthra/file-locker  
- **Docs:** API + setup guides included in repository  
- **Live Demo:** Running on my personal Raspberry Pi 4  

---

## Why This Project Matters

This project demonstrates:

- **Backend engineering:** Go APIs, database design, and efficient data handling
- **Security implementation:** AES encryption, JWT authentication, and RBAC
- **DevOps practices:** Docker containerization, multi-service orchestration, and ARM64 deployment
- **System design:** Scalable architecture with proper separation of concerns
- **Real-world production experience:** Running 24/7 on my home network

File Locker isn't just a demo app — it's a **real system** I use daily to solve real storage and streaming needs.
```

---

