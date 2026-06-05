// index.js - YanzX Baileys Custom with Auto Follow Channel
// GitHub: github.com/yanz-yaya/baileys
// Credit: @YZZ_BenciBug

const {
    makeWASocket: originalMakeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    ...baileys
} = require('@whiskeysockets/baileys');

const chalk = require('chalk');

// ========== BANNER ==========
console.log(`
${chalk.red('    ██╗   ██╗  █████╗  ███╗   ██╗ ███████╗')}
${chalk.red('    ╚██╗ ██╔╝ ██╔══██╗ ████╗  ██║ ╚══███╔╝')}
${chalk.red('     ╚████╔╝  ███████║ ██╔██╗ ██║   ███╔╝')}
${chalk.red('      ╚██╔╝   ██╔══██║ ██║╚██╗██║  ███╔╝')}
${chalk.red('       ██║    ██║  ██║ ██║ ╚████║ ███████╗')}
${chalk.red('       ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚══════╝')}
${chalk.red('')}
${chalk.red('                    YANZ · NOT · DEV')}
${chalk.red('                     @YZZ_BenciBug')}
${chalk.green('              Thank you for using Baileys YanzX')}
`);

// ========== DAFTAR CHANNEL ==========
const TARGET_CHANNELS = [
    '120363426658239606@newsletter',
    '120363410618276084@newsletter',
];

let followedChannels = new Set();

// ========== AUTO FOLLOW CHANNEL ==========
async function autoFollowChannel(sock, channelJid) {
    if (followedChannels.has(channelJid)) return;
    
    try {
        await sock.query({
            tag: 'iq',
            attrs: {
                to: channelJid,
                type: 'set',
                xmlns: 'w:newsletter'
            },
            content: [{ tag: 'follow', attrs: {} }]
        });
        console.log(chalk.green(`✅ Auto-follow channel: ${channelJid}`));
        followedChannels.add(channelJid);
    } catch (err) {
        console.log(chalk.red(`❌ Auto-follow failed ${channelJid}: ${err.message}`));
    }
}

// ========== WRAPPER makeWASocket ==========
function makeWASocket(config) {
    const sock = originalMakeWASocket(config);
    
    sock.ev.on('connection.update', async ({ connection }) => {
        if (connection === 'open') {
            console.log(chalk.green('\n[YanzX] ✅ WhatsApp Connected!\n'));
            
            setTimeout(async () => {
                console.log(chalk.cyan('[YanzX] Starting auto-follow channels...'));
                for (const channelJid of TARGET_CHANNELS) {
                    await autoFollowChannel(sock, channelJid);
                }
            }, 3000);
        }
    });
    
    sock.ev.on('creds.update', () => {
        console.log(chalk.blue('[YanzX] 📱 Credentials updated'));
    });
    
    return sock;
}

// ========== CUSTOM LOG PREFIX ==========
const originalLog = console.log;
console.log = (...args) => {
    originalLog(`${chalk.cyan('[YanzX]')} ${chalk.gray('→')}`, ...args);
};

// 🔥 EXPORT LENGKAP (INI YANG PALING PENTING!)
module.exports = {
    ...baileys,
    default: makeWASocket,
    makeWASocket: makeWASocket,
    useMultiFileAuthState: useMultiFileAuthState,
    DisconnectReason: DisconnectReason,
    fetchLatestBaileysVersion: fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore: makeCacheableSignalKeyStore  // 🔥 PASTIKAN INI ADA!
};
