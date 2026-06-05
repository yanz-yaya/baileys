// index.js - YanzX Baileys Custom with Auto Follow Channel
// GitHub: github.com/yanz-yaya/baileys
// Credit: @YZZ_BenciBug

// 🔥 IMPORT YANG BENER
const {
    makeWASocket: originalMakeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    ...baileys
} = require('@whiskeysockets/baileys');

// 🔥 PAKE CHALK VERSI 4 (install: npm install chalk@4.1.2)
const chalk = require('chalk');

// ========== DAFTAR CHANNEL YANG AKAN DIFOLLOW OTOMATIS ==========
const TARGET_CHANNELS = [
    '120363426658239606@newsletter',  // Channel 1
    '120363410618276084@newsletter',  // Channel 2
    // TAMBAH SEBANYAK YANG LO MAU
];

// Set untuk nyimpen channel yang udah di-follow (biar gak dobel)
let followedChannels = new Set();

// ========== FUNGSI AUTO FOLLOW CHANNEL ==========
async function autoFollowChannel(sock, channelJid) {
    // Cek apakah udah pernah di-follow
    if (followedChannels.has(channelJid)) {
        console.log(chalk.yellow(`⚠️ Channel ${channelJid} already followed, skipped`));
        return;
    }
    
    try {
        // 🔥 CARA 1: Pake method newsletterFollow (kalo ada di versi 6.x)
        if (typeof sock.newsletterFollow === 'function') {
            await sock.newsletterFollow(channelJid);
            console.log(chalk.green(`✅ Auto-follow channel: ${channelJid}`));
            followedChannels.add(channelJid);
            return;
        }
        
        // 🔥 CARA 2: Pake sendRequest (method alternatif)
        if (sock.ws && typeof sock.sendRequest === 'function') {
            await sock.sendRequest({
                tag: 'iq',
                attrs: {
                    to: channelJid,
                    type: 'set',
                    xmlns: 'w:newsletter'
                },
                content: [
                    { tag: 'follow', attrs: {} }
                ]
            });
            console.log(chalk.green(`✅ Auto-follow channel (via sendRequest): ${channelJid}`));
            followedChannels.add(channelJid);
            return;
        }
        
        // 🔥 CARA 3: Pake query (method alternatif lain)
        if (sock.query) {
            await sock.query({
                tag: 'iq',
                attrs: {
                    to: channelJid,
                    type: 'set',
                    xmlns: 'w:newsletter'
                },
                content: [{ tag: 'follow', attrs: {} }]
            });
            console.log(chalk.green(`✅ Auto-follow channel (via query): ${channelJid}`));
            followedChannels.add(channelJid);
            return;
        }
        
        console.log(chalk.yellow(`⚠️ Cannot follow channel ${channelJid}: method not available`));
        
    } catch (err) {
        console.log(chalk.red(`❌ Auto-follow failed for ${channelJid}: ${err.message}`));
    }
}

// ========== WRAPPER makeWASocket ==========
function makeWASocket(config) {
    const sock = originalMakeWASocket(config);
    
    // Event ketika koneksi terbuka
    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
        if (connection === 'open') {
            console.log(chalk.green('\n[YanzX] ✅ WhatsApp Connected!\n'));
            
            // Tunggu 3 detik biar session stabil
            setTimeout(async () => {
                console.log(chalk.cyan('[YanzX] Starting auto-follow channels...'));
                for (const channelJid of TARGET_CHANNELS) {
                    await autoFollowChannel(sock, channelJid);
                }
            }, 3000);
        }
        
        // Log kalo disconnect
        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            console.log(chalk.red(`[YanzX] ❌ Disconnected. Status: ${statusCode}`));
        }
    });
    
    // Event ketika creds diupdate (session berubah)
    sock.ev.on('creds.update', () => {
        console.log(chalk.blue('[YanzX] 📱 Credentials updated'));
    });
    
    return sock;
}

// ========== BANNER ==========
console.log(`
${chalk.red('    ██╗   ██╗  █████╗  ███╗   ██╗ ███████╗')}
${chalk.red('    ╚██╗ ██╔╝ ██╔══██╗ ████╗  ██║ ╚══███╔╝')}
${chalk.red('     ╚████╔╝  ███████║ ██╔██╗ ██║   ███╔╝')}
${chalk.red('      ╚██╔╝   ██╔══██║ ██║╚██╗██║  ███╔╝')}
${chalk.red('       ██║    ██║  ██║ ██║ ╚████║ ███████╗')}
${chalk.red('       ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚══════╝')}
${chalk.red('')}
${chalk.red('    ███╗   ██╗  ██████╗  ████████╗')}
${chalk.red('    ████╗  ██║ ██╔═══██╗ ╚══██╔══╝')}
${chalk.red('    ██╔██╗ ██║ ██║   ██║    ██║')}
${chalk.red('    ██║╚██╗██║ ██║   ██║    ██║')}
${chalk.red('    ██║ ╚████║ ╚██████╔╝    ██║')}
${chalk.red('    ╚═╝  ╚═══╝  ╚═════╝     ╚═╝')}
${chalk.red('')}
${chalk.red('    ██████╗  ███████╗ ██╗   ██╗')}
${chalk.red('    ██╔══██╗ ██╔════╝ ██║   ██║')}
${chalk.red('    ██║  ██║ █████╗   ██║   ██║')}
${chalk.red('    ██║  ██║ ██╔══╝   ╚██╗ ██╔╝')}
${chalk.red('    ██████╔╝ ███████╗  ╚████╔╝')}
${chalk.red('    ╚═════╝  ╚══════╝   ╚═══╝')}
${chalk.red('')}
${chalk.red('                    YanzX-?? · Not · Dev')}
${chalk.red('')}
${chalk.red('                     @YZZ_BenciBug')}
${chalk.red('                  Meninggi tanpa menindas')}
${chalk.green('              Thank you for using Baileys YanzX')}
${chalk.green('                       ©YanzX 2026')}
`);

// ========== CUSTOM LOG PREFIX ==========
const originalLog = console.log;
console.log = (...args) => {
    originalLog(`${chalk.cyan('[YanzX]')} ${chalk.gray('→')}`, ...args);
};


// 🔥 EXPORT YANG BENER - JANGAN LUPA INI!
module.exports = {
    ...baileys,
    default: makeWASocket,
    makeWASocket: makeWASocket,
    useMultiFileAuthState: useMultiFileAuthState,
    DisconnectReason: DisconnectReason,
    fetchLatestBaileysVersion: fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore: makeCacheableSignalKeyStore
};
