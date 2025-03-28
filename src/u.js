
export class Utilities {

    setUp(e) {
        this.e=e;
    }
  
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    }
  
    ca(ang) {
      var pi = Math.PI;
      return ang * (pi/180);
    }
  
    ca2(ang){
      var pi = Math.PI;
      return ang * (180/pi);
    }
  
    ran(num) {
      var num1 = Math.random() * num;
      var num2 = Math.floor(num1);
      
      return num2;
    }

    nran(num) {
      var num1 = Math.random() * (num*2);
      var num2 = Math.floor(num1-num);
      return num2;
    }

    getDistance(xA, yA, xB, yB) { 
      var xDiff = xA - xB; 
      var yDiff = yA - yB; 
      return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }
  
    hslToHex(h, s, l) {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
      };
      return `${f(0)}${f(8)}${f(4)}`;
    }
  
    HSLToRGB = (h, s, l) => {
      s /= 100;
      l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [255 * f(0), 255 * f(8), 255 * f(4)];
    };

    rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
  
    ranArray(ar){
  
      var r = this.ran(ar.length);
  
      var removeMe = ar[r];
      ar.splice(r, 1);
  
      return removeMe;
  
    }
  
  }