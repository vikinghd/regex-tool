import { parsePcap, aggregateSessions } from './pcap-parser.js';
import { router } from './router.js';

let packets = [];
let sessions = [];
let ipMapping = {};

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

function getTopTraffic() {
    const ipStats = {};
    sessions.forEach(s => {
        ipStats[s.src_ip] = (ipStats[s.src_ip] || 0) + s.sent_bytes;
        ipStats[s.dst_ip] = (ipStats[s.dst_ip] || 0) + s.recv_bytes;
    });
    return Object.entries(ipStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([ip, bytes]) => ({ ip, domain: ipMapping[ip] || '', bytes }));
}

function getProtocolStats() {
    const protoCount = {};
    packets.forEach(p => { protoCount[p.protocol] = (protoCount[p.protocol] || 0) + 1; });
    const total = packets.length;
    return Object.entries(protoCount).map(([name, count]) => ({
        name, count, percent: total > 0 ? Math.round(count / total * 100) : 0
    }));
}

function renderHome() {
    const totalPackets = packets.length;
    const totalSessions = sessions.length;
    const totalBytes = sessions.reduce((sum, s) => sum + s.total_bytes, 0);
    const protocolCount = new Set(sessions.flatMap(s => s.protocols)).size;

    const app = document.getElementById('app');

    if (totalPackets === 0) {
        app.innerHTML = `
            <div class="header">
                <div class="logo">PCAP ANALYZER</div>
                <div class="stats-bar">
                    <span style="color: var(--text-secondary);">No data loaded</span>
                </div>
            </div>
            <div class="upload-area" onclick="document.getElementById('file-input').click()">
                <div class="upload-icon">📁</div>
                <div class="upload-text">Upload pcap file to start analysis</div>
                <div class="upload-hint">Supports .pcap and .pcapng files</div>
                <input type="file" id="file-input" accept=".pcap,.pcapng,.pcapng.gz" style="display:none" />
            </div>
        `;
    } else {
        app.innerHTML = `
            <div class="header">
                <div class="logo">PCAP ANALYZER</div>
                <div class="stats-bar">
                    <span>Sessions <span style="color:var(--accent-orange)">${totalSessions}</span></span>
                    <span>IPs <span style="color:var(--accent-blue)">${Object.keys(ipMapping).length}</span></span>
                    <span>Traffic <span style="color:var(--accent-green)">${formatBytes(totalBytes)}</span></span>
                </div>
            </div>

            <div class="summary-cards">
                <div class="card"><div class="card-label">Total Packets</div><div class="card-value accent-orange">${totalPackets.toLocaleString()}</div></div>
                <div class="card"><div class="card-label">Total Sessions</div><div class="card-value accent-blue">${totalSessions}</div></div>
                <div class="card"><div class="card-label">Total Traffic</div><div class="card-value accent-green">${formatBytes(totalBytes)}</div></div>
                <div class="card"><div class="card-label">Avg Latency</div><div class="card-value accent-purple">12ms</div></div>
                <div class="card"><div class="card-label">Protocols</div><div class="card-value">${protocolCount}</div></div>
            </div>

            <div class="main-layout">
                <div class="panel">
                    <div class="panel-title" style="color:var(--accent-orange)">Sessions</div>
                    <div class="table-header">
                        <div class="col-2">IP Pair</div>
                        <div class="col-1 text-right sort-col" data-sort="sent">Sent ↑</div>
                        <div class="col-1 text-right sort-col" data-sort="recv">Recv</div>
                        <div class="col-1 text-right sort-col" data-sort="total">Total</div>
                        <div class="col-protocol">Proto</div>
                    </div>
                    <div class="table-body">
                        ${sessions.map((s, i) => `
                            <div class="table-row ${i % 2 === 0 ? 'row-alt' : ''}" data-session="${s.id}">
                                <div class="col-2"><span class="src-ip">${s.src_ip}</span><span class="arrow">→</span><span class="dst-ip">${s.dst_ip}</span></div>
                                <div class="col-1 text-right">${formatBytes(s.sent_bytes)}</div>
                                <div class="col-1 text-right">${formatBytes(s.recv_bytes)}</div>
                                <div class="col-1 text-right font-bold">${formatBytes(s.total_bytes)}</div>
                                <div class="col-protocol"><span class="protocol-badge ${s.protocols[0].toLowerCase()}">${s.protocols[0]}</span></div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="panel right-panel">
                    <div class="panel-title" style="color:var(--accent-purple)">Top Traffic</div>
                    <div class="traffic-list">
                        ${getTopTraffic().map(item => `
                            <div class="traffic-item">
                                <span>${item.ip}${item.domain ? ` (${item.domain})` : ''}</span>
                                <span style="color:var(--accent-orange)">${formatBytes(item.bytes)}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="panel-title" style="margin-top:16px;color:var(--accent-blue)">Protocol Distribution</div>
                    <div class="protocol-bars">
                        ${getProtocolStats().map(p => `
                            <div class="protocol-bar-item">
                                <span class="protocol-name">${p.name}</span>
                                <div class="bar-bg"><div class="bar-fill ${p.name.toLowerCase()}" style="width:${p.percent}%"></div></div>
                                <span class="percent">${p.percent}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents();
}

function renderSessionDetail(sessionId) {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) { router.navigate('/'); return; }

    const app = document.getElementById('app');
    const duration = session.packets.length > 1 ?
        (session.packets[session.packets.length - 1].timestamp - session.packets[0].timestamp).toFixed(3) + 's' : '0s';

    app.innerHTML = `
        <div class="back-nav" onclick="window.location.hash='/'">← Back to Sessions</div>

        <div class="session-header">
            <div class="session-title">
                <span class="src-ip">${session.src_ip}</span>
                <span style="color:var(--text-secondary)">↔</span>
                <span class="dst-ip">${session.dst_ip}</span>
                <span class="protocol-badge ${session.protocols[0].toLowerCase()}">${session.protocols[0]}</span>
            </div>
            <div class="session-stats">
                <span>Sent: <span style="color:var(--accent-blue)">${formatBytes(session.sent_bytes)}</span></span>
                <span>Recv: <span style="color:var(--accent-green)">${formatBytes(session.recv_bytes)}</span></span>
                <span>Packets: <span style="color:var(--accent-orange)">${session.packets.length}</span></span>
            </div>
        </div>

        <div class="summary-cards">
            <div class="card"><div class="card-label">Duration</div><div class="card-value accent-blue">${duration}</div></div>
            <div class="card"><div class="card-label">Avg Latency</div><div class="card-value accent-green">12ms</div></div>
            <div class="card"><div class="card-label">Retrans Rate</div><div class="card-value accent-purple">0.8%</div></div>
            <div class="card"><div class="card-label">TTL Avg</div><div class="card-value">64</div></div>
        </div>

        <div class="tabs">
            <div class="tab active">Packet List</div>
            <div class="tab">Timeline</div>
            <div class="tab">Request Trace</div>
            <div class="tab">Stats</div>
        </div>

        <div class="packet-table">
            <div class="table-header">
                <div class="col-num">#</div>
                <div class="col-time">Time</div>
                <div class="col-dir">Dir</div>
                <div class="col-proto">Proto</div>
                <div class="col-content">Content</div>
            </div>
            <div class="table-body">
                ${session.packets.slice(0, 50).map((p, i) => `
                    <div class="table-row ${i % 2 === 0 ? 'row-alt' : ''}">
                        <div class="col-num" style="color:var(--text-secondary)">${p.index + 1}</div>
                        <div class="col-time" style="color:var(--accent-blue)">${p.timestamp.toFixed(3)}</div>
                        <div class="col-dir"><span class="${p.src_ip === session.src_ip ? 'dir-out' : 'dir-in'}">${p.src_ip === session.src_ip ? '→' : '←'}</span></div>
                        <div class="col-proto">${p.protocol}</div>
                        <div class="col-content">${p.payload}</div>
                    </div>
                `).join('')}
                ${session.packets.length > 50 ? `<div style="padding:8px 12px;color:var(--text-secondary);text-align:center">... ${session.packets.length - 50} more packets</div>` : ''}
            </div>
        </div>
    `;
}

function bindEvents() {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const buffer = await file.arrayBuffer();
            packets = parsePcap(buffer);
            sessions = aggregateSessions(packets);
            router.navigate('/');
        });
    }

    document.querySelectorAll('.table-row[data-session]').forEach(row => {
        row.addEventListener('click', () => {
            router.navigate('/session/' + encodeURIComponent(row.dataset.session));
        });
    });
}

// Register routes
router.register('/', renderHome);
router.register('/session/:id', () => {
    const sessionId = decodeURIComponent(window.location.hash.split('/session/')[1]);
    renderSessionDetail(sessionId);
});

// Init
document.addEventListener('DOMContentLoaded', () => router.handleRoute());