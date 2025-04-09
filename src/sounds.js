import { Howl } from 'howler';
export class Sounds {

    setUp(e) {

        this.e=e;
        this.soundArray = ["click", "track1", "track2", "track3", "track4", "track5"];
        this.loadedSounds = [];

        for(var i=0; i<this.soundArray.length; i++){
            this.loadSounds(this.soundArray[i]);
        }
        
    }

    loadSounds(url){

        var theSound = new Howl({
            src: ['/src/sounds/'+url+".mp3"]
        });

        theSound.on('load', (event) => {
            theSound.name=url;
            this.loadedSounds.push(theSound);
            // console.log("SOUND: "+url+" - "+this.loadedSounds.length+" / "+this.soundArray.length);
        });

    }

    p(type){

        for(var i=0; i<this.loadedSounds.length; i++){

            if(this.loadedSounds[i].name===type){
                this.loadedSounds[i].play();
            }
            
        }

    }

    stopAllSounds(){
        for(var i=0; i<this.loadedSounds.length; i++){
            this.loadedSounds[i].stop();
        }
    }
}