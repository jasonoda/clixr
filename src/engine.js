

export default class Engine{
    constructor(input, scene, sounds, utilities, ui){

        this.input = input;
        this.s = sounds;
        this.scene = scene;
        this.ui = ui;
        this.u = utilities;

        this.mobile = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) || window.innerWidth<600) {
            this.mobile = true;
        }

        var testUA = navigator.userAgent;

        if(testUA.toLowerCase().indexOf("android") > -1){
            this.mobile = true;
        }

        this.action = "set up";
        this.count = 0;

    }

    start(){
        
    }

    update() {
        var currentTime = new Date().getTime();
        this.dt = (currentTime - this.lastTime) / 1000;
        if (this.dt > 1) this.dt = 0;
        this.lastTime = currentTime;
    
        document.getElementById("feedback").innerHTML = this.action;
    
        if (this.action === "set up") {
            this.action = "load images";
        } 
        else if (this.action === "load images") {
            this.waitForImages().then(() => {
                document.body.style.visibility = "visible";
                document.body.style.opacity = "1";
                document.body.style.transition = "opacity 0.1s ease-in";
    
                console.log('All images fully loaded!');
                this.scene.buildScene();
                this.action = "build";
            });
            this.action = "load wait";
        } 
        else if (this.action === "build") {
            window.addEventListener("resize", () => this.resize());
            this.loadBack = 1;
            this.loadWords = 1;
            this.count = 0;
            this.action = "wait";
        } 
        else if (this.action === "wait") {
            this.loadWords -= this.dt;
            document.getElementById("loadingImage").style.opacity = this.loadWords + "";
            this.scene.update();
            this.count += this.dt;
            if (this.count > 1) {
                this.count = 0;
                this.action = "go";
            }
        } 
        else if (this.action === "go") {
            this.loadBack -= this.dt;
            if (this.loadBack < 0) this.loadBack = 0;
            document.getElementById("loadingBack").style.opacity = this.loadBack + "";
            this.scene.update();
            this.ui.update();
        }
    }
    
    // NEW helper function
    waitForImages() {
        const images = Array.from(document.images);
        return Promise.all(images.map(img => {
            return img.complete ? Promise.resolve() : 
                new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
        }));
    }
    

    resize(){

        console.log("resize")
    
    }

}