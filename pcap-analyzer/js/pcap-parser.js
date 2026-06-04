/**
 * Pcap Parser - 解析 pcap 文件格式
 * 支持: .pcap 文件 (Ethernet / IPv4)
 */

// 主解析函数
export function parsePcap(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    const packets = [];

    // 检查 magic number
    const magic = view.getUint32(0, false);
    const isLittleEndian = magic === 0xa1b2c3d4;
    const isBigEndian = magic === 0xd4c3b2a1;

    if (!isLittleEndian && !isBigEndian) {
        throw new Error('Invalid pcap file: magic number not found');
    }

    let offset = 24; // Skip global header

    let packetIndex = 0;
    while (offset + 16 <= arrayBuffer.byteLength) {
        const packetHeader = {
            ts_sec: view.getUint32(offset, isLittleEndian),
            ts_usec: view.getUint32(offset + 4, isLittleEndian),
            incl_len: view.getUint32(offset + 8, isLittleEndian),
            orig_len: view.getUint32(offset + 12, isLittleEndian)
        };

        offset += 16;

        if (offset + packetHeader.incl_len > arrayBuffer.byteLength) break;

        // 解析 Ethernet + IPv4
        if (packetHeader.incl_len >= 34) {
            const etherType = view.getUint16(offset + 12, false);

            if (etherType === 0x0800) {
                const ipOffset = offset + 14;
                const srcIp = `${view.getUint8(ipOffset + 12)}.${view.getUint8(ipOffset + 13)}.${view.getUint8(ipOffset + 14)}.${view.getUint8(ipOffset + 15)}`;
                const dstIp = `${view.getUint8(ipOffset + 16)}.${view.getUint8(ipOffset + 17)}.${view.getUint8(ipOffset + 18)}.${view.getUint8(ipOffset + 19)}`;
                const protocol = view.getUint8(ipOffset + 9);

                let srcPort = 0, dstPort = 0, payload = '';

                if (protocol === 6 && packetHeader.incl_len >= 54) {
                    srcPort = view.getUint16(ipOffset + 20, false);
                    dstPort = view.getUint16(ipOffset + 22, false);
                    const flags = view.getUint8(ipOffset + 33);
                    const flagNames = ['SYN', 'SYN-ACK', 'ACK', 'FIN', 'RST'];
                    payload = `TCP ${srcPort} → ${dstPort} [${flagNames[flags & 0x1f] || 'PSH-ACK'}]`;
                } else if (protocol === 17 && packetHeader.incl_len >= 42) {
                    srcPort = view.getUint16(ipOffset + 20, false);
                    dstPort = view.getUint16(ipOffset + 22, false);
                    payload = `UDP ${srcPort} → ${dstPort}`;
                }

                packets.push({
                    index: packetIndex++,
                    timestamp: packetHeader.ts_sec + packetHeader.ts_usec / 1000000,
                    src_ip: srcIp,
                    dst_ip: dstIp,
                    protocol: protocol === 6 ? 'TCP' : protocol === 17 ? 'UDP' : 'OTHER',
                    src_port: srcPort,
                    dst_port: dstPort,
                    length: packetHeader.incl_len,
                    payload: payload
                });
            }
        }

        offset += packetHeader.incl_len;
    }

    return packets;
}

// 按会话聚合
export function aggregateSessions(packets) {
    const sessions = {};

    packets.forEach(pkt => {
        const key = `${pkt.src_ip}-${pkt.dst_ip}`;
        if (!sessions[key]) {
            sessions[key] = {
                id: key,
                src_ip: pkt.src_ip,
                dst_ip: pkt.dst_ip,
                packets: [],
                sent_bytes: 0,
                recv_bytes: 0,
                protocols: new Set()
            };
        }

        sessions[key].packets.push(pkt);
        sessions[key].protocols.add(pkt.protocol);

        // 简化计算：本机IP为源时计为发送
        if (pkt.src_ip.startsWith('192.168') || pkt.src_ip.startsWith('10.')) {
            sessions[key].sent_bytes += pkt.length;
        } else {
            sessions[key].recv_bytes += pkt.length;
        }
    });

    return Object.values(sessions).map(s => ({
        ...s,
        protocols: Array.from(s.protocols),
        total_bytes: s.sent_bytes + s.recv_bytes
    }));
}