;(function() {
  
    'use strict';
    
    var c = document.getElementById('c-frame');
    var ctx = c.getContext('2d');
    var w = c.width = "350";
    var h = c.height = "550";
    
    function Pixel(x, y, s) {
      this.x = x;
      this.y = y;
      this.s = s;
      this.gx = 0;
      this.gy = 0;
      this.vx = Math.random() * 10 - 5;
      this.vy = Math.random() * 10 - 5;
      this.c = 0;
    }
    
    Pixel.prototype = {
      constructor: Pixel,
      update: function() {
        
        this.c += 0.1;
        
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        
        this.x += this.vx;
        this.y += this.vy;
        
        if(this.x > w) {
          this.x = 0;
        } else if(this.x < 0) {
          this.x = w;
        }
        
        if(this.y > h) {
          this.y = 0;
        } else if(this.y < 0) {
          this.y = h;
        }
        
        this.gx = Math.floor(this.x / this.s) * this.s;
        this.gy = Math.floor(this.y / this.s) * this.s;
        
      },
      draw: function(ctx) {
        ctx.save();
        ctx.translate(this.gx, this.gy);
        ctx.fillStyle = 'hsl(' + this.c + ', 100%, 50%)';
        ctx.fillRect(0, 0, this.s, this.s);
        ctx.restore();
      }
    };
    
    var pixels = [];
    var itr = 150;
    var pixel;
    
    for(var i = 0; i < itr; i++) {
      pixel = new Pixel(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 10
      );
      
      pixels.push(pixel);
    }
    
    requestAnimationFrame(function loop() {
      requestAnimationFrame(loop);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, w, h);
      
      for(var i = 0; i < itr; i++) {
        pixel = pixels[i];
        pixel.update();
        pixel.draw(ctx);
      }
    });
    
  })();