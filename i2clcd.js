module.exports = function(RED) {

   LCD = require('./node_modules/i2c-lcd/lib/lcd');
   var lcd;
   
   function initLCD() {
      lcd.init().then(function() {
        return lcd.createChar(0, [0x1b, 0x15, 0x0e, 0x1b, 0x15, 0x1b, 0x15, 0x0e]);
      }).then(function() {
        return lcd.createChar(1, [0x0c, 0x12, 0x12, 0x0c, 0x00, 0x00, 0x00, 0x00]);
      }).then(function() {
        return lcd.home();
      }).then(function() {
        return lcd.print("Raspberry Pi " + (String.fromCharCode(0)));
      }).then(function() {
        return lcd.setCursor(0, 1);
      }).then(function() {
        return lcd.print("lcd-node");
      }).delay(1500);
   };

   function LcdNode(config) {
       
      console.log("creating LCD node");
      RED.nodes.createNode(this,config);
      var node = this;
      this.LCD_ADDR = parseInt(config.addr);
      console.log("LCD node init @ i2c addr:" + this.LCD_ADDR);
      lcd = new LCD("/dev/i2c-1",this.LCD_ADDR);
      initLCD();
          
      this.on('input', function(msg) {
         console.log("LCD input "+msg.topic);
         if (msg.topic.localeCompare("init") == 0) {
             lcd.init();
         }

         if (msg.topic.localeCompare("line1") == 0) {
         lcd.setCursor(0,0).then(function() {
            lcd.print(msg.payload);
         });
         }

         if (msg.topic.localeCompare("line2") == 0) {
            lcd.setCursor(0,1).then(function() {
               lcd.print(msg.payload); });
         }
         node.send(msg); //pass message through
      });
   }
      
   RED.nodes.registerType("i2clcd",LcdNode);
    
}
