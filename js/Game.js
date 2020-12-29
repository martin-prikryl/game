'use strict'

class Game {

    constructor() {
        this.key = false;
        this.initLocations();
    }

    initLocations() {
        const castle = new Location('https://www.itnetwork.cz/images/47219/hrad.png', 'Stojíš před okovanou branou gotického hradu, která je zřejmě jediným vchodem do pevnosti. Klíčová dírka je pokryta pavučinami, což vzbuzuje dojem, že je budova opuštěná.');
        castle.castle = true;
        const wood1 = new Location('https://www.itnetwork.cz/images/47219/les.png', 'Jsi na lesní cestě, která se klikatí až za obzor, kde mizí v siluetě zapadajícího slunce. Ticho podvečerního lesa občas přeruší zpěv posledních ptáků.');
        const fork = new Location('https://www.itnetwork.cz/images/47219/les2.png', 'Nacházíš se na lesním rozcestí.');
        const wood2 = new Location('https://www.itnetwork.cz/images/47219/les.png', 'Jsi na lesní cestě, která se klikatí až za obzor, kde mizí v siluetě zapadajícího slunce. Ticho podvečerního lesa občas přeruší zpěv posledních ptáků.');
        wood2.key = true;
        const pond = new Location('https://www.itnetwork.cz/images/47219/rybnik.png', 'Došel jsi ke břehu malého rybníka. Hladina je v bezvětří jako zrcadlo. Kousek od tebe je dřevěná plošina se stavidlem.');
        const wood3 = new Location('https://www.itnetwork.cz/images/47219/les.png', 'Jsi na lesní cestě, která se klikatí až za obzor, kde mizí v siluetě zapadajícího slunce. Ticho podvečerního lesa občas přeruší zpěv posledních ptáků.');
        const house = new Location('https://www.itnetwork.cz/images/47219/dum.png', 'Stojíš před svým rodným domem, cítíš vůni čerstvě nasekaného dřeva, která se line z hromady vedle vstupních dveří.');
        this.location = house;
        castle.right = wood1;
        wood1.left = castle;
        wood1.right = fork;
        fork.left = wood1;
        fork.right = wood2;
        fork.down = wood3;
        wood2.left = fork;
        wood2.right = pond;
        pond.left = wood2;
        wood3.up = fork;
        wood3.right = house;
        house.left = wood3;
        this.location = house;
    }

    left() {
        this.location = this.location.left;
        this.draw();
    }

    right() {
        this.location = this.location.right;
        this.draw();
    }

    up() {
        this.location = this.location.up;
        this.draw();
    }

    down() {
        this.location = this.location.down;
        this.draw();
    }

    draw() {
        document.body.innerHTML = `
            <div style="text-align:center" id="main">
            <h1>Procházecí hra</h1>
            <img src="${this.location.image}" id="image"><br>
            ${this.location.text}<br>
            <img src="https://www.itnetwork.cz/images/47219/nahoru.png" id="up">
            <img src="https://www.itnetwork.cz/images/47219/doleva.png" id="left">
            <img src="https://www.itnetwork.cz/images/47219/dolu.png" id="down">
            <img src="https://www.itnetwork.cz/images/47219/doprava.png" id="right">
            </div>`
        const odemknout = () => {
            const napis = document.createElement('h2');
            napis.innerText = "Podařilo se Ti odemknout hrad! KONEC HRY";
            document.getElementById('main').appendChild(napis);
        };
        if (this.key) {
            const key_element = document.createElement('img');
            key_element.src = 'https://www.itnetwork.cz/images/47219/klic.svg';
            if (this.location.castle) key_element.onclick = odemknout;
            document.getElementById('main').appendChild(key_element);
        }
        if (this.location.key) {
            const key_element = document.createElement('img');
            key_element.src = 'https://www.itnetwork.cz/images/47219/klic.svg';
            key_element.style.position = 'relative';
            key_element.style.top = '-200px';
            key_element.style.left = '100px';
            key_element.onclick = () => {
                this.key = true;
                this.location.key = false;
                this.draw();
            };
            document.getElementById('main').appendChild(document.createElement('br'));
            document.getElementById('main').appendChild(key_element);
        }
        const image = document.getElementById('image');
        const left = document.getElementById('left');
        const right = document.getElementById('right');
        const up = document.getElementById('up');
        const down = document.getElementById('down');
        if (this.location.left) left.onclick = () => this.left(); else left.style.opacity = 0.2;
        if (this.location.right) right.onclick = () => this.right(); else right.style.opacity = 0.2;
        if (this.location.up) up.onclick = () => this.up(); else up.style.opacity = 0.2;
        if (this.location.down) down.onclick = () => this.down(); else down.style.opacity = 0.2;
        if (this.location.castle) {
            if (this.key) image.onclick = odemknout;
            else image.onclick = () => alert("Brána hradu je zamčená. Potřebuješ klíč.");
        };
    }

}