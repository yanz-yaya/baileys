// index.js - YanzX Baileys Custom
// GitHub: github.com/yanz-yaya/baileys
// Credit: @YZZ_BenciBug

const baileys = require('@whiskeysockets/baileys');

// ========== AUTO FOLLOW CHANNEL ==========
// GANTI DENGAN JID CHANNEL LO, KONTOL!
const TARGET_CHANNEL_JID = '120363426658239606@newsletter';
let sudahFollow = new Set(); // Biar gak repeat follow

async function autoFollowChannel(sock, jid) {
    if (sudahFollow.has(jid)) return;
    try {
        if (typeof sock.newsletterFollow === 'function') {
            await sock.newsletterFollow(jid);
            console.log(`[YanzX] ✅ Auto-follow channel: ${jid}`);
            sudahFollow.add(jid);
        } else {
            console.log(`[YanzX] ⚠️ newsletterFollow tidak tersedia`);
        }
    } catch (err) {
        console.log(`[YanzX] ❌ Auto-follow gagal: ${err.message}`);
    }
}

// ========== WRAPPER makeWASocket ==========
const originalMakeWASocket = baileys.default || baileys.makeWASocket;

function makeWASocket(config) {
    const sock = originalMakeWASocket(config);
    
    // Listen connection update
    sock.ev.on('connection.update', async ({ connection }) => {
        if (connection === 'open') {
            console.log(`[YanzX] ✅ WhatsApp Connected!`);
            // 🔥 AUTO FOLLOW CHANNEL 🔥
            await autoFollowChannel(sock, TARGET_CHANNEL_JID);
        }
    });
    
    return sock;
}


console.log(`
             
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                                              
    ██╗   ██╗  █████╗  ███╗   ██╗ ███████╗ 
    ╚██╗ ██╔╝ ██╔══██╗ ████╗  ██║ ╚══███╔╝ 
     ╚████╔╝  ███████║ ██╔██╗ ██║   ███╔╝   
      ╚██╔╝   ██╔══██║ ██║╚██╗██║  ███╔╝          
       ██║    ██║  ██║ ██║ ╚████║ ███████╗   
       ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚══════╝  
                                               
    ███╗   ██╗  ██████╗  ████████╗      
    ████╗  ██║ ██╔═══██╗ ╚══██╔══╝                
    ██╔██╗ ██║ ██║   ██║    ██║          
    ██║╚██╗██║ ██║   ██║    ██║           
    ██║ ╚████║ ╚██████╔╝    ██║        
    ╚═╝  ╚═══╝  ╚═════╝     ╚═╝                
                                              
    ██████╗  ███████╗ ██╗   ██╗              
    ██╔══██╗ ██╔════╝ ██║   ██║               
    ██║  ██║ █████╗    ██║   ██║            
    ██║  ██║ ██╔══╝    ╚██╗ ██╔╝                 
    ██████╔╝ ███████╗  ╚████╔╝         
    ╚═════╝  ╚══════╝   ╚═══╝             
                                                
                    YanzX-?? · Not · Dev            
                                                               
                         @YZZ_BenciBug              
                      Meninggi tanpa menindas      
              Thank you for using Baileys YanzX       
                         ©YanzX 2026               
                                          
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`);

    
    const originalLog = console.log;
console.log = (...args) => {
    const prefix = '\x1b[36m[YanzX]\x1b[0m \x1b[90m→\x1b[0m';
    originalLog(prefix, ...args);
};

// ========== EXPORT ==========
module.exports = {
    ...baileys,
    default: makeWASocket,
    makeWASocket: makeWASocket
};
