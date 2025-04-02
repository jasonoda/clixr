import gsap from "gsap";

export class Scene {

    setUp(e) {
        this.e = e;
        this.ringCount = 0;
    }

    buildScene() {

        this.handleVerticalScroll();

        this.loadJournal();
        this.loadbb();

        const scrollElement = document.scrollingElement || document.documentElement;
        const maxScrollX = scrollElement.scrollWidth - window.innerWidth;
        const maxScrollY = scrollElement.scrollHeight - window.innerHeight;
        const halfwayX = maxScrollX / 2;

        window.scrollTo({
            top: maxScrollY,
            left: halfwayX,
            behavior: 'smooth'
        });

        let isDragging = false;
        let startMouseX = 0;
        let startMouseY = 0;
        let startScrollX = 0;
        let startScrollY = 0;

        window.addEventListener('mousedown', (e) => {
            if (e.target.closest('.dot')) return;
            isDragging = true;
            document.body.classList.add('dragging');
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startScrollX = window.scrollX;
            startScrollY = window.scrollY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dragOffsetX = e.clientX - startMouseX;
            const dragOffsetY = e.clientY - startMouseY;

            const targetX = startScrollX - dragOffsetX;
            const targetY = startScrollY - dragOffsetY;

            window.scrollTo({
                left: targetX,
                top: this.enableVerticalDrag ? targetY : window.scrollY
            });
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.classList.remove('dragging');
        });

        window.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                document.body.classList.remove('dragging');
            }
        });

        window.addEventListener('resize', () => {
            this.handleVerticalScroll();
        });

        this.dots = document.querySelectorAll('.dot');
        this.dotsWhite = document.querySelectorAll('.dotw');

        for (let i = 0; i < this.dots.length; i++) {

            const dot = this.dots[i];
            const dotw = this.dotsWhite[i];

            dot.addEventListener('mouseenter', () => {
                gsap.killTweensOf(dot);
                gsap.killTweensOf(dotw);

                dotw.style.opacity = 1;

                this.e.s.p("click");

                gsap.to(dot, { scale: 4, duration: .2, ease: 'power2.out' });
                gsap.to(dotw, { scale: 4, duration: .2, ease: 'power2.out' });
                gsap.to(dotw, { opacity: 0, duration: 1, ease: 'power2.out' });
            });

            dot.addEventListener('mouseleave', () => {
                gsap.killTweensOf(dot);
                gsap.to(dot, { scale: 2, duration: 0.5, ease: 'power2.out' });
                gsap.to(dotw, { scale: 2, duration: 0.5, ease: 'power2.out' });
            });

        }

        this.rings = document.querySelectorAll('.ring');
        this.ringCount = 0;

        this.cloudDiv = document.getElementById("cloud");
        this.bgOffsetX = 0;

        this.water1Div = document.getElementById("water1");
        this.water1OffsetX = 0;

        this.water2Div = document.getElementById("water2");
        this.water2OffsetX = 0;
        
        document.getElementById("lightIn").style.opacity = .25;
        gsap.to(document.getElementById("lightIn"), { opacity: .5, duration: 3, repeat: -1, yoyo: true, ease: 'power2.out' });

        //

        this.action = "wait";

        //

        this.infoWrapper = document.getElementById("infoWrapper");
        this.infoDiv = document.getElementById("infoDiv");
        this.infoDiv.style.opacity = 0;
        this.infoDiv.style.width = "0px";

        this.closeDiv = document.getElementById("closeDiv")
        this.computerDiv = document.getElementById("computerDiv")
        this.windowInfoDiv = document.getElementById("windowInfoDiv")
        this.windowIframe = document.getElementById("windowIframe")

        this.backDrop = document.getElementById("backDrop");
        this.sectionTitle = document.getElementById("sectionTitle");
        this.closeBut = document.getElementById("closeBut");

        this.closeBut.addEventListener('mousedown', (e) => {

            this.action = "close section";
           
        });

        document.getElementById("dot1").addEventListener('mousedown', (e) => {

            this.action = "bb start";
            this.mySection = "bb";
           
        });

        document.getElementById("dot2").addEventListener('mousedown', (e) => {

            this.action = "beats start";
            this.mySection = "beats";
           
        });

        document.getElementById("dot3").addEventListener('mousedown', (e) => {

            this.action = "open window";
            this.mySection = "computer";
           
        });

        document.getElementById("dot4").addEventListener('mousedown', (e) => {

            this.action = "journal start";
            this.mySection = "journal";
           
        });

        document.getElementById("dot5").addEventListener('mousedown', (e) => {

            this.action = "record start";
            this.mySection = "records";
           
        });

        document.getElementById("dot6").addEventListener('mousedown', (e) => {

            this.action = "merch start";
            this.mySection = "merch";
           
        });

        document.getElementById("dot7").addEventListener('mousedown', (e) => {

            this.action = "book start";
            this.mySection = "book";
           
        });

        this.buttons=[];

        this.buttons.push( document.getElementById("dot1") );
        this.buttons.push( document.getElementById("dot2") );
        this.buttons.push( document.getElementById("dot3") );
        this.buttons.push( document.getElementById("dot4") );
        this.buttons.push( document.getElementById("dot5") );
        this.buttons.push( document.getElementById("dot6") );
        this.buttons.push( document.getElementById("dot7") );

        document.getElementById("computerClose").addEventListener("click", () => {
            this.count = 0;
            this.action = "close";
            this.computerDiv.style.display = "none";
        });
          
        document.getElementById("closeDiv").addEventListener("click", () => {
            this.count = 0;
            this.action = "close";
        });
          
        document.getElementById("winClose").addEventListener("click", () => {
            if(this.action==="window"){

            }

            document.getElementById("windowDiv").style.display="none"
            // this.windowIframe.style.display = "none";
        });
          
        document.getElementById("icon3").addEventListener("click", () => {
            document.getElementById("windowDiv").style.display="block"
            document.getElementById("winText").innerHTML = "Candy Dispenser Design"

            fetch("bookOfTheCure.html")
                .then(response => response.text())
                .then(html => {
                    const temp = document.createElement("html");
                    temp.innerHTML = html;

                    const innerContent = temp.querySelector("body")?.innerHTML;

                    if (innerContent) {
                        this.windowInfoDiv.innerHTML = innerContent;
                        this.windowInfoDiv.scrollTop = 0;
                    }

            });

        });
          
        document.getElementById("icon4").addEventListener("click", () => {
            document.getElementById("windowDiv").style.display="block"
            document.getElementById("winText").innerHTML = "Purse Design"

            fetch("designConcepts.html")
                .then(response => response.text())
                .then(html => {
                    const temp = document.createElement("html");
                    temp.innerHTML = html;

                    const innerContent = temp.querySelector("body")?.innerHTML;

                    if (innerContent) {
                        this.windowInfoDiv.innerHTML = innerContent;
                        this.windowInfoDiv.scrollTop = 0;
                    }

            });
            
        });
          
        document.getElementById("icon5").addEventListener("click", () => {
            document.getElementById("windowDiv").style.display="block"
            document.getElementById("winText").innerHTML = "Mother"
            
            fetch("mother.html")
                .then(response => response.text())
                .then(html => {
                    const temp = document.createElement("html");
                    temp.innerHTML = html;

                    const innerContent = temp.querySelector("body")?.innerHTML;

                    if (innerContent) {
                        this.windowInfoDiv.innerHTML = innerContent;
                        this.windowInfoDiv.scrollTop = 0;
                    }

            });
            
        });
          
        document.getElementById("icon6").addEventListener("click", () => {
            document.getElementById("windowDiv").style.display="block"
            document.getElementById("winText").innerHTML = "Wallpapers"
            
            fetch("wallPapers.html")
                .then(response => response.text())
                .then(html => {
                    const temp = document.createElement("html");
                    temp.innerHTML = html;

                    const innerContent = temp.querySelector("body")?.innerHTML;

                    if (innerContent) {
                        this.windowInfoDiv.innerHTML = innerContent;
                        this.windowInfoDiv.scrollTop = 0;
                    }

            });
            
        });
          
        // document.getElementById("icon7").addEventListener("click", () => {
            // document.getElementById("windowDiv").style.display="block"
            // document.getElementById("winText").innerHTML = "Wallpapers"
            
            // fetch("wallPapers.html")
            //     .then(response => response.text())
            //     .then(html => {
            //         const temp = document.createElement("html");
            //         temp.innerHTML = html;

            //         const innerContent = temp.querySelector("body")?.innerHTML;

            //         if (innerContent) {
            //             this.windowInfoDiv.innerHTML = innerContent;
            //             this.windowInfoDiv.scrollTop = 0;
            //         }

            // });

            // this.windowIframe.style.display = "block";

            // this.windowInfoDiv.innerHTML = "";
            
        // });
          
        //   window.addEventListener("resize", this.positionCloseButton);
        //   window.addEventListener("scroll", this.positionCloseButton);
        //   this.positionCloseButton(); // run on load

    }

    // positionCloseButton() {
    //     const info = document.getElementById("infoDiv");
    //     const close = document.getElementById("closeDiv");
      
    //     const rect = info.getBoundingClientRect();
    //     close.style.top = rect.top + "px";
    //     close.style.left = (rect.right - 40) + "px"; // 40 = button width
    //   }

    handleVerticalScroll() {
        if (window.innerHeight < 700) {
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";
            this.enableVerticalDrag = true;
        } else {
            document.documentElement.style.overflowY = "hidden";
            document.body.style.overflowY = "hidden";
            this.enableVerticalDrag = false;
        }
    }

    update() {

        //-----------------------

        document.getElementById("playerDiv").style.left = ((window.innerWidth / 2) - 185) + "px";

        const hasVerticalScroll = this.infoDiv.scrollHeight > this.infoDiv.clientHeight;

        if (hasVerticalScroll) {
            this.closeDiv.style.right = "28px"; // offset if scrollbar is present
        } else {
            this.closeDiv.style.right = "10px";
        }

        this.bgOffsetX -= 3 * this.e.dt;
        this.water1OffsetX -= 23 * this.e.dt;
        this.water2OffsetX += 23 * this.e.dt;

        this.cloudDiv.style.backgroundPosition = `${this.bgOffsetX}px 0`;
        this.water1Div.style.backgroundPosition = `${this.water1OffsetX}px 0`;
        this.water2Div.style.backgroundPosition = `${this.water2OffsetX}px 0`;

        this.rc = 0.075;

        this.ringCount += this.e.dt;

        if (this.ringCount > 2 + this.rc * 9) {
            this.setRings(10);
            this.ringCount = 0;
        } else if (this.ringCount > 2 + this.rc * 8) {
            this.setRings(9);
        } else if (this.ringCount > 2 + this.rc * 7) {
            this.setRings(8);
        } else if (this.ringCount > 2 + this.rc * 6) {
            this.setRings(7);
        } else if (this.ringCount > 2 + this.rc * 5) {
            this.setRings(6);
        } else if (this.ringCount > 2 + this.rc * 4) {
            this.setRings(5);
        } else if (this.ringCount > 2 + this.rc * 3) {
            this.setRings(4);
        } else if (this.ringCount > 2 + this.rc * 2) {
            this.setRings(3);
        } else if (this.ringCount > 2 + this.rc * 1) {
            this.setRings(2);
        } else if (this.ringCount > 2 + this.rc * 0) {
            this.setRings(1);
        }

        if(this.action==="wait"){

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if(this.action==="open window"){

            for(var i=0; i<this.buttons.length; i++){

                this.buttons[i].style.pointerEvents="none";
                gsap.to(this.buttons[i], { opacity: 0, duration: .2, ease: "linear" });

            }

           

            this.infoDiv.style.width = "0px";
            this.infoDiv.style.left = "50%";

            this.count=0;
            this.action="open window load";

        }else if(this.action==="open window load"){

            this.action="opwn window x";
            
            if(this.mySection==="computer"){

                this.action = "computer";

            }else{

                this.infoWrapper.style.pointerEvents = "auto";
                
                fetch(this.mySection + ".html")
                .then(response => response.text())
                .then(html => {
                    const temp = document.createElement("html");
                    temp.innerHTML = html;

                    const innerContent = temp.querySelector("body")?.innerHTML;

                    if (innerContent) {
                    this.infoDiv.innerHTML = innerContent;

                    const innerWrapper = this.infoDiv.querySelector(".frameLayout");
                    if (innerWrapper) {
                        innerWrapper.style.height = "auto";
                        innerWrapper.style.overflow = "visible";
                    }

                    this.infoDiv.scrollTop = 0;
                    }

                    this.action = "open window go";

                });
    
            }


        }else if(this.action==="open window go"){

            gsap.to(this.infoDiv, { opacity: 1, width: "900px", duration: .2, ease: "linear" });
            this.action="open window wait";

        }else if(this.action==="open window wait"){

            this.count+=this.e.dt;
            if(this.count>.2){

                this.closeDiv.style.display = "block";

                this.action="wait"
                this.count=0;

            }

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="book start"){

            gsap.killTweensOf(this.sectionTitle);
            this.sectionTitle.innerHTML = "books"
            gsap.to(this.sectionTitle, { opacity: .8, duration: .5, ease: "linear" });

            gsap.killTweensOf(this.bookContainer);
            this.bookContainer = document.getElementById("bookContainer");
            this.book1 = document.getElementById("book1");
            this.book2 = document.getElementById("book2");
            this.book3 = document.getElementById("book3");
            this.book4 = document.getElementById("book4");
            this.bigBook = document.getElementById("bigBook");

            this.book1.style.opacity=0;
            this.book2.style.opacity=0;
            this.book3.style.opacity=0;
            this.book4.style.opacity=0;
            this.bigBook.style.opacity=0;
            this.closeBut.style.opacity=0;

            this.bookContainer.style.opacity=1;

            var df = .075;

            this.backDrop.style.display="block";
            this.backDrop.style.pointerEvents="auto";
            this.bookContainer.style.display="flex";

            gsap.killTweensOf(this.backDrop);
            gsap.to(this.backDrop, { opacity: .8, duration: .2, ease: "linear" });

            gsap.to(this.book1, { opacity: 1, duration: .5, delay: df*1, ease: "linear" });
            gsap.to(this.book2, { opacity: 1, duration: .5, delay: df*2, ease: "linear" });
            gsap.to(this.book3, { opacity: 1, duration: .5, delay: df*3, ease: "linear" });
            gsap.to(this.book4, { opacity: 1, duration: .5, delay: df*4, ease: "linear" });
            gsap.to(this.bigBook, { opacity: 1, duration: .5, delay: df*5, ease: "linear" });

            gsap.killTweensOf(this.closeBut);
            gsap.to(this.closeBut, { opacity: 1, duration: .5, delay: df*6, ease: "linear" });
            this.closeBut.style.pointerEvents = "auto";

            if(this.bookListeners===undefined){

                this.bookListeners=true;

                this.book1.addEventListener('mousedown', (e) => {
                    this.bigBook.src = "./src/updateMe/book1.jpg"
                });

                this.book2.addEventListener('mousedown', (e) => {
                    this.bigBook.src = "./src/updateMe/book2.jpg"
                });

                this.book3.addEventListener('mousedown', (e) => {
                    this.bigBook.src = "./src/updateMe/book3.jpg"
                });

                this.book4.addEventListener('mousedown', (e) => {
                    this.bigBook.src = "./src/updateMe/book4.jpg"
                });

            }

            this.action="book"

        }else if( this.action==="book"){

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="record start"){

            gsap.killTweensOf(this.sectionTitle);
            this.sectionTitle.innerHTML = "records"
            gsap.to(this.sectionTitle, { opacity: .8, duration: .5, ease: "linear" });

            gsap.killTweensOf(this.recordContainer);
            this.recordContainer = document.getElementById("recordContainer");
            this.record1 = document.getElementById("recordHolder1");
            this.record2 = document.getElementById("recordHolder2");
            this.record3 = document.getElementById("recordHolder3");
            this.record4 = document.getElementById("recordHolder4");
            this.record5 = document.getElementById("recordHolder5");

            this.record1.style.opacity=0;
            this.record2.style.opacity=0;
            this.record3.style.opacity=0;
            this.record4.style.opacity=0;
            this.record5.style.opacity=0;
            this.closeBut.style.opacity=0;

            gsap.killTweensOf(this.recordContainer)
            this.recordContainer.style.opacity=1;

            var df = .05;

            this.backDrop.style.display="block";
            this.backDrop.style.pointerEvents="auto";
            this.recordContainer.style.display="flex";
            this.recordContainer.style.pointerEvents="auto";

            gsap.killTweensOf(this.backDrop);
            gsap.to(this.backDrop, { opacity: .8, duration: .2, ease: "linear" });

            gsap.to(this.record1, { opacity: 1, duration: .2, delay: df*1, ease: "linear" });
            gsap.to(this.record2, { opacity: 1, duration: .2, delay: df*2, ease: "linear" });
            gsap.to(this.record3, { opacity: 1, duration: .2, delay: df*3, ease: "linear" });
            gsap.to(this.record4, { opacity: 1, duration: .2, delay: df*4, ease: "linear" });
            gsap.to(this.record5, { opacity: 1, duration: .2, delay: df*5, ease: "linear" });

            gsap.killTweensOf(this.closeBut);
            gsap.to(this.closeBut, { opacity: 1, duration: .5, delay: df*6, ease: "linear" });
            this.closeBut.style.pointerEvents = "auto";

            if(this.recordListeners===undefined){

                this.recordListeners=true;

                this.record1.addEventListener('mousedown', (e) => {
                    window.open('https://open.spotify.com/playlist/2Ba2l06NG5i3lyVbbVFmBu?si=b49940e5fa3c47d8&nd=1&dlsi=02928cc643a64f32', '_blank');
                });

                this.record2.addEventListener('mousedown', (e) => {
                    window.open('https://open.spotify.com/artist/58KQMoZRikk6azsdnTFY0c?si=RNTnxIlNTZ2fhwIYYexpcQ&nd=1&dlsi=7955f65125aa4c71', '_blank');
                });

                this.record3.addEventListener('mousedown', (e) => {
                    window.open('https://open.spotify.com/playlist/45g2uOU5KsvOk4xWiaN83m?si=6f673f5048664b90&nd=1&dlsi=c996be1aca5048ad', '_blank');
                });

                this.record4.addEventListener('mousedown', (e) => {
                    window.open('https://open.spotify.com/playlist/1Wy1FTwmkZcJRAHbBCUfpj?si=6fd9f5401b8d4db3&nd=1&dlsi=de0ab1897a4e40be', '_blank');
                });

                this.record5.addEventListener('mousedown', (e) => {
                    window.open('https://open.spotify.com/playlist/3H9dNxmQv5rFJ5skMYHsmH?si=5137a3292f0748b8&nd=1&dlsi=9e1fdcb7e2434a0d', '_blank');
                });

            }

            this.action="record"

        }else if( this.action==="record"){

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="journal start"){

            gsap.killTweensOf(this.sectionTitle);
            this.sectionTitle.innerHTML = "journal"
            gsap.to(this.sectionTitle, { opacity: .8, duration: .5, ease: "linear" });

            var df = .1;

            this.backDrop.style.opacity="0";
            this.backDrop.style.display="block";
            this.backDrop.style.pointerEvents="auto";

            this.journalContainer = document.getElementById("journalContainer")

            gsap.killTweensOf(this.backDrop);
            gsap.to(this.backDrop, { opacity: .8, duration: .25, ease: "linear" });

            this.journalContainer.style.display="block";
            this.journalContainer.style.pointerEvents="auto";
            gsap.to(this.journalContainer, { opacity: 1, duration: .25, delay: .25, ease: "linear" });

            gsap.killTweensOf(this.closeBut);
            gsap.to(this.closeBut, { opacity: 1, duration: .25, delay: .5, ease: "linear" });
            this.closeBut.style.pointerEvents = "auto";

            this.action="journal"

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="bb start"){

            gsap.killTweensOf(this.sectionTitle);
            this.sectionTitle.innerHTML = "Bulletin Board"
            gsap.to(this.sectionTitle, { opacity: .8, duration: .5, ease: "linear" });

            var df = .1;

            this.backDrop.style.opacity="0";
            this.backDrop.style.display="block";
            this.backDrop.style.pointerEvents="auto";

            this.bbContainer = document.getElementById("bbContainer")

            gsap.killTweensOf(this.backDrop);
            gsap.to(this.backDrop, { opacity: .8, duration: .25, ease: "linear" });

            this.bbContainer.style.display="block";
            this.bbContainer.style.pointerEvents="auto";
            gsap.to(this.bbContainer, { opacity: 1, duration: .25, delay: .25, ease: "linear" });

            gsap.killTweensOf(this.closeBut);
            gsap.to(this.closeBut, { opacity: 1, duration: .25, delay: .5, ease: "linear" });
            this.closeBut.style.pointerEvents = "auto";

            this.action="journal"

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="merch start"){

            gsap.killTweensOf(this.sectionTitle);
            this.sectionTitle.innerHTML = "Merch"
            gsap.to(this.sectionTitle, { opacity: .8, duration: .5, ease: "linear" });

            var df = .1;

            this.backDrop.style.opacity="0";
            this.backDrop.style.display="block";
            this.backDrop.style.pointerEvents="auto";

            this.merchContainer = document.getElementById("merchContainer")

            gsap.killTweensOf(this.backDrop);
            gsap.to(this.backDrop, { opacity: .8, duration: .25, ease: "linear" });

            this.merchContainer.style.display="flex";
            this.merchContainer.style.pointerEvents="auto";
            gsap.to(this.merchContainer, { opacity: 1, duration: .25, delay: .25, ease: "linear" });

            gsap.killTweensOf(this.closeBut);
            this.closeBut.style.opacity=0;
            gsap.to(this.closeBut, { opacity: 1, duration: .25, delay: .5, ease: "linear" });
            this.closeBut.style.pointerEvents = "auto";

            // ---

            this.merch1 = document.getElementById("merchHolder1");
            this.merch2 = document.getElementById("merchHolder2");
            this.merch3 = document.getElementById("merchHolder3");

            this.merch1.style.opacity=0;
            this.merch2.style.opacity=0;
            this.merch3.style.opacity=0;

            gsap.killTweensOf(this.merchContainer)
            this.merchContainer.style.opacity=1;

            var df = .05;

            gsap.to(this.merch1, { opacity: 1, duration: .2, delay: df*1, ease: "linear" });
            gsap.to(this.merch2, { opacity: 1, duration: .2, delay: df*2, ease: "linear" });
            gsap.to(this.merch3, { opacity: 1, duration: .2, delay: df*3, ease: "linear" });

            if(this.merchListeners===undefined){

                this.merchListeners=true;

                this.merch1.addEventListener('mousedown', (e) => {
                    window.open('http://google.com', '_blank');
                });

                this.merch2.addEventListener('mousedown', (e) => {
                    window.open('http://google.com', '_blank');
                });

                this.merch3.addEventListener('mousedown', (e) => {
                    window.open('http://google.com', '_blank');
                });


            }

            this.action="merch"

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="beats start"){

            gsap.killTweensOf(this.sectionTitle);
            this.sectionTitle.innerHTML = "beats"
            gsap.to(this.sectionTitle, { opacity: .8, duration: .5, ease: "linear" });

            var df = .1;

            this.backDrop.style.opacity="0";
            this.backDrop.style.display="block";
            this.backDrop.style.pointerEvents="auto";

            this.beatsContainer = document.getElementById("beatsContainer")

            gsap.killTweensOf(this.backDrop);
            gsap.to(this.backDrop, { opacity: .8, duration: .25, ease: "linear" });

            this.beatsContainer.style.display="flex";
            this.beatsContainer.style.pointerEvents="auto";
            gsap.to(this.beatsContainer, { opacity: 1, duration: .25, delay: .25, ease: "linear" });

            gsap.killTweensOf(this.closeBut);
            gsap.to(this.closeBut, { opacity: 1, duration: .25, delay: .5, ease: "linear" });
            this.closeBut.style.pointerEvents = "auto";

            this.action="beats"

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if( this.action==="close section"){

            gsap.to(this.sectionTitle, { opacity: 0, duration: .25, ease: "linear" });

            gsap.to(this.closeBut, { opacity: 0, duration: .25, ease: "linear" });
            this.closeBut.style.pointerEvents = "none";

            gsap.to(this.backDrop, { opacity: 0, duration: .25, ease: "linear" });
            this.backDrop.style.pointerEvents = "none";
           
            if(this.mySection==="book"){

                gsap.to(this.bookContainer, { opacity: 0, duration: .25, ease: "linear" });
                this.bookContainer.style.pointerEvents = "none";
               
            }else if(this.mySection==="records"){

                gsap.to(this.recordContainer, { opacity: 0, duration: .25, ease: "linear" });
                this.recordContainer.style.pointerEvents = "none";
               
            }else if(this.mySection==="journal"){

                gsap.to(this.journalContainer, { opacity: 0, duration: .5, ease: "linear" });
                this.journalContainer.style.pointerEvents = "none";

            }else if(this.mySection==="bb"){

                gsap.to(this.bbContainer, { opacity: 0, duration: .5, ease: "linear" });
                this.bbContainer.style.pointerEvents = "none";

            }else if(this.mySection==="merch"){

                gsap.to(this.merchContainer, { opacity: 0, duration: .5, ease: "linear" });
                this.merchContainer.style.pointerEvents = "none";

            }else if(this.mySection==="beats"){

                gsap.to(this.beatsContainer, { opacity: 0, duration: .5, ease: "linear" });
                this.beatsContainer.style.pointerEvents = "none";

            }

            this.action="wait";

            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------

        }else if(this.action==="computer"){

            this.computerDiv.style.opacity = 0;
            this.computerDiv.style.display = "block";
            gsap.to(this.computerDiv, { opacity: 1, duration: .2, ease: "linear" });

            this.action="computer view"

        }else if(this.action==="computer view"){

        }else if(this.action==="close"){

            for(var i=0; i<this.buttons.length; i++){

                this.buttons[i].style.pointerEvents="auto";
                gsap.to(this.buttons[i], { opacity: 1, duration: .2, ease: "linear" });

            }

            gsap.to(this.infoDiv, { opacity: 0, width: "0px", duration: .2, ease: "linear" });

            this.closeDiv.style.display = "none";

            this.infoWrapper.style.pointerEvents = "none";

            this.action="close wait";

        }else if(this.action==="close wait"){

            this.count+=this.e.dt;
            if(this.count>.2){

                this.action="wait"
                this.count=0;

            }

        } 

        this.mixer();

    }

    setRings(num) {

        for (var i = 0; i < this.rings.length; i++) {

            if (num === 1) {
                this.rings[i].style.opacity = 1;
                gsap.to(this.rings[i], { opacity: 0, duration: this.rc * 8, ease: "linear" });
            }

            this.rings[i].src = "./src/images/ring/r" + num + ".png";

        }

    }

    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------d

    loadJournal() {
        console.log("Loading journal...");
    
        fetch('./src/updateMe/journal.json')
            .then(response => response.json())
            .then(data => {
                const journalContainer = document.getElementById('journalContainer');
    
                // Loop through each section of the journal
                data.sections.forEach(section => {
                    const sectionElement = document.createElement('div');
                    sectionElement.classList.add('journal-section');
    
                    // Create and add the title
                    if (section.title) {
                        const titleElement = document.createElement('div');
                        titleElement.classList.add('diaryTitle');
                        titleElement.textContent = section.title;
                        sectionElement.appendChild(titleElement);
                    }
    
                    // Create and add the content
                    if (section.content) {
                        const contentElement = document.createElement('div');
                        contentElement.classList.add('diaryText');
    
                        // Split content by newlines and create paragraphs
                        const paragraphs = section.content.split('\n');
                        paragraphs.forEach(paragraph => {
                            const p = document.createElement('p');
                            p.textContent = paragraph;
                            contentElement.appendChild(p);
                        });
    
                        sectionElement.appendChild(contentElement);
                    }
    
                    // Check if lyrics field exists and apply `.diaryTextCenter` class
                    if (section.lyrics) {
                        const contentElement = document.createElement('div');
                        contentElement.classList.add('diaryTextCenter');
    
                        const paragraphs = section.lyrics.split('\n'); // Assuming lyrics are also newline-separated
                        paragraphs.forEach(paragraph => {
                            const p = document.createElement('p');
                            p.textContent = paragraph;
                        
                            // Add custom margin to reduce space between paragraphs
                            p.style.marginBottom = '-15px'; // Adjust this value to control the space
                        
                            contentElement.appendChild(p);
                        });
    
                        sectionElement.appendChild(contentElement);
                    }
    
                    // Append the section to the journal container
                    journalContainer.appendChild(sectionElement);
                });
    
                // Show the journal container after loading content
                // journalContainer.style.opacity = 1;
                // journalContainer.style.pointerEvents = 'auto';
            })
            .catch(error => console.error('Error loading journal content:', error));
    }
    

    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------d

    loadbb(){

        const bbInner = document.getElementById('bbInner');
        
        function checkScrollbar() {
            if (bbInner.scrollHeight > bbInner.clientHeight) {
                bbInner.style.paddingRight = '10px';
            } else {
                bbInner.style.paddingRight = '0';
            }
        }
    
        checkScrollbar();
        window.addEventListener('resize', checkScrollbar);

        // -----------------------

        fetch('./src/updateMe/bb.json')
            .then(response => response.json())
            .then(data => {
                const bbInner = document.getElementById('bbInner');
                
                // Loop through each section in the bb.json
                data.sections.forEach(section => {
                    const bbNote = document.createElement('div');
                    bbNote.classList.add('bbNote');
    
                    if (section.title && section.title.trim() !== "") {
                        const bbTitle = document.createElement('div');
                        bbTitle.classList.add('bbTitle');
                        bbTitle.textContent = section.title;
                        bbNote.appendChild(bbTitle);
                    }
    
                    // Create and add the content (words) if it's not an empty string
                    if (section.content && section.content.trim() !== "") {
                        const bbWords = document.createElement('div');
                        bbWords.classList.add('bbWords');
                        bbWords.textContent = section.content;
                        bbNote.appendChild(bbWords);
                    }
    
                    // Create and add the pin images
                    const pinLeft = document.createElement('img');
                    pinLeft.classList.add('pinLeft');
                    pinLeft.src = './src/images/bb/pin.png';
                    bbNote.appendChild(pinLeft);
    
                    const pinRight = document.createElement('img');
                    pinRight.classList.add('pinRight');
                    pinRight.src = './src/images/bb/pin.png';
                    bbNote.appendChild(pinRight);
    
                    // Append the bbNote to bbInner
                    bbInner.appendChild(bbNote);
                });
            })
            .catch(error => console.error('Error loading bb content:', error));
        
        
    }


    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------d


    mixer() {

        if (document.getElementById("mix").checked === true) {

            var c1_H = document.getElementById("c1_H").value;
            var c1_S = document.getElementById("c1_S").value;
            var c1_L = document.getElementById("c1_L").value;
            document.getElementById("c1_Color").value = this.e.u.hslToHex(c1_H, c1_S, c1_L);

            var c2_H = document.getElementById("c2_H").value;
            var c2_S = document.getElementById("c2_S").value;
            var c2_L = document.getElementById("c2_L").value;
            document.getElementById("c2_Color").value = this.e.u.hslToHex(c2_H, c2_S, c2_L);

            var c3_H = document.getElementById("c3_H").value;
            var c3_S = document.getElementById("c3_S").value;
            var c3_L = document.getElementById("c3_L").value;
            document.getElementById("c3_Color").value = this.e.u.hslToHex(c3_H, c3_S, c3_L);

            var c4_H = document.getElementById("c4_H").value;
            var c4_S = document.getElementById("c4_S").value;
            var c4_L = document.getElementById("c4_L").value;
            document.getElementById("c4_Color").value = this.e.u.hslToHex(c4_H, c4_S, c4_L);

            var c5_H = document.getElementById("c5_H").value;
            var c5_S = document.getElementById("c5_S").value;
            var c5_L = document.getElementById("c5_L").value;
            document.getElementById("c5_Color").value = this.e.u.hslToHex(c5_H, c5_S, c5_L);

            var num1 = document.getElementById("num1").value;
            var num2 = document.getElementById("num2").value;
            var num3 = document.getElementById("num3").value;
        }
    }
}