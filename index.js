// index.js - YanzX Baileys Custom
// GitHub: github.com/yanz-yaya/baileys
// Credit: @YZZ_BenciBug


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

module.exports = require('@whiskeysockets/baileys');
