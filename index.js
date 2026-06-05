// index.js - YanzX Baileys Custom
// GitHub: github.com/yanz-yaya/baileys
// Credit: @YZZ_BenciBug

const baileys = require('@whiskeysockets/baileys');
const chalk = require('chalk');

// ========== AUTO FOLLOW MULTIPLE CHANNEL ==========
const TARGET_CHANNELS = [
    '120363426658239606@newsletter',  // Channel 1
    '120363410618276084@newsletter',  // Channel 2
    // TAMBAH SEBANYAK YANG LO MAU, KONTOL!
];

let sudahFollow = new Set();

async function autoFollowChannel(sock, jid) {
    if (sudahFollow.has(jid)) return;
    try {
        if (typeof sock.newsletterFollow === 'function') {
            await sock.newsletterFollow(jid);
            console.log(chalk.green(`✅ Auto-follow channel: ${jid}`));
            sudahFollow.add(jid);
        } else {
            console.log(chalk.yellow(`⚠️ newsletterFollow tidak tersedia untuk: ${jid}`));
        }
    } catch (err) {
        console.log(chalk.red(`❌ Auto-follow gagal untuk ${jid}: ${err.message}`));
    }
}

// ========== WRAPPER makeWASocket ==========
const originalMakeWASocket = baileys.default || baileys.makeWASocket;

function makeWASocket(config) {
    const sock = originalMakeWASocket(config);
    
    sock.ev.on('connection.update', async ({ connection }) => {
        if (connection === 'open') {
            console.log(chalk.green('[YanzX] ✅ WhatsApp Connected!'));
            for (const channelJid of TARGET_CHANNELS) {
                await autoFollowChannel(sock, channelJid);
            }
        }
    });
    
    return sock;
}

// ========== BANNER TANPA BORDER (CUMA TEKS + WARNA) ==========
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

// ========== CUSTOM PREFIX DENGAN WARNA ==========
const originalLog = console.log;
console.log = (...args) => {
    const prefix = `${chalk.cyan('[YanzX]')} ${chalk.gray('→')}`;
    originalLog(prefix, ...args);
};

// ========== EXPORT ==========
module.exports = {
    ...baileys,
    default: makeWASocket,
    makeWASocket: makeWASocket
};
