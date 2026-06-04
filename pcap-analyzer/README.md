# Pcap Analyzer

A network packet analysis tool for engineers.

## Usage

1. Open `index.html` in a browser
2. Upload a `.pcap` or `.pcapng` file
3. View session statistics and packet details

## Features

- Session tracking with traffic statistics
- Protocol classification (TCP/UDP/HTTP/DNS)
- IP traffic ranking
- Detailed packet list view

## Tech Stack

- Pure HTML/CSS/JavaScript (no framework)
- pcap parser in JavaScript
- Hash-based routing

## File Structure

├── index.html
├── css/
│   └── style.css
├── js/
│   ├── pcap-parser.js
│   ├── router.js
│   └── app.js
└── README.md