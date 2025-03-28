import gsap from "gsap";

export class Scene {

    setUp(e) {
        this.e = e;
        this.ringCount = 0;
    }

    buildScene() {

        this.handleVerticalScroll();

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

    }

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

        document.getElementById("playerDiv").style.left = ((window.innerWidth / 2) - 185) + "px";

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