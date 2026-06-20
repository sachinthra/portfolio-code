---
title: 'Project Rover: From Raspberry Pi to ESP32'
description: 'How I built a 4WD robotics platform with ESP32, solved brownout resets with proper power design, and created a remote PlatformIO flashing workflow.'
pubDate: 'Jun 20 2026'
tags: ['Robotics', 'ESP32', 'Raspberry Pi', 'Embedded Systems', 'PlatformIO', 'IoT']
---

Project Rover started as a Raspberry Pi-controlled 4WD platform and evolved into a real-time ESP32-based robot. This build taught me practical lessons in power distribution, firmware workflows, and responsive embedded web control.

In this post, I cover the hardware choices, the star-grounding approach that kept the system stable, the headless remote flashing pipeline, and the software architecture behind the control interface.

---

## Hardware Bill of Materials

- **Microcontroller (Brain):** ESP32-WROOM-32 (38-pin DevKitC)
- **Compile/Flash Host:** Raspberry Pi 4 (Debian 12)
- **Motor Drivers:** 2x L298N dual H-bridge modules
- **Motors:** 4x 6V BO DC motors (100 RPM / 300 RPM variants)
- **Battery:** 11.1V 2200mAh 3S LiPo (XT60)
- **Regulation:** LM2596 3A buck converter

---

## Phase 1: Power Distribution and Stability

With a 3S LiPo, voltage and current spikes are the biggest risk. A fully charged pack can hit around 12.6V, and motor stall current can introduce enough noise to crash the controller if wiring is sloppy.

### Star Ground Topology

Instead of daisy-chaining grounds, I used a star topology:

1. Battery positive and ground go to central distribution points.
2. Raw battery voltage goes directly to both L298N motor driver inputs.
3. A separate branch feeds the LM2596, tuned to a stable 5.0V output.
4. The ESP32 `VIN` is powered from this regulated 5V branch.
5. ESP32 ground returns directly to the central ground hub.

This keeps noisy motor return current out of the logic ground path and improved system reliability immediately.

---

## Phase 2: Brain Transplant to ESP32

I initially controlled the rover from a Raspberry Pi using Python GPIO libraries, but moved control to ESP32 for better real-time behavior and cleaner C++ firmware architecture.

### Headless Flashing Workflow

I turned the Raspberry Pi into a remote compile-and-flash station so I could update firmware over SSH without tethering a laptop to the rover.

1. ESP32 connects to the Pi via a Micro-USB data cable.
2. I SSH into the Pi and run PlatformIO CLI.
3. `pio run -t upload` compiles and flashes firmware over USB.

One practical issue: if PlatformIO reports `Unable to verify flash chip connection`, the upload baud rate is usually too high. Setting `upload_speed = 115200` in `platformio.ini` fixed this reliably.

---

## Phase 3: Async Web Control and Motor Logic

With ESP32 in control, I built a responsive Wi-Fi control interface around `ESPAsyncWebServer`.

- **Web UI storage:** HTML/CSS/JS served from LittleFS.
- **PWM control:** Native `ledc` channels (8-bit, 1000Hz) drive `ENA`/`ENB` pins.
- **Motor safety:** PWM duty limited to 50% to protect 6V motors from 3S battery voltage.

### Fixing Brownout Resets

During early testing, pressing forward caused full reboots after a short burst.

- **Cause:** simultaneous motor startup produced a current spike and voltage dip.
- **Fix:** software soft-start ramped PWM from 0% to 50% over a few hundred milliseconds.

I also plan to add bulk capacitance near the LM2596 output as an additional hardware safeguard.

---

## Phase 4: Sensor Expansion Roadmap

The 38-pin ESP32 board still leaves enough GPIO for autonomy features:

- **Ultrasonic radar (HC-SR04 + servo):** obstacle scanning with a 5V-to-3.3V divider on Echo.
- **IR line tracking:** digital reads on input-only GPIOs (34, 35, 36, 39).
- **I2C display:** reserved GPIO 21 (SDA) and GPIO 22 (SCL) for telemetry.

Next milestone is integrating autonomous navigation and adding Bluetooth gamepad control.

---

Built with C++, PlatformIO, and many hardware debugging sessions.
