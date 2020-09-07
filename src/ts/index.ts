import {Application, Texture, Sprite, Ticker, filters} from 'pixi.js-legacy'
import {randomInt} from './functions'

export const app = new Application({transparent: true});

document.body.appendChild(app.view);

const starT: Texture = Texture.from('src/img/star.png');
const blur = new filters.BlurFilter;
blur.blur = 3 / window.devicePixelRatio;

function resize(){
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

resize();

window.onresize = resize;

let it: number = 0;
app.ticker.add((delta) => {
    if(it % 10 == 0){
        let star = Sprite.from(starT);
        handleStar(star)
    }
    it++;
})

function handleStar(star: Sprite){
    let x = randomInt(0, window.innerWidth);
    let y = randomInt(0, window.innerHeight);
    let time = randomInt(300, 3000);
    star.position.x = x;
    star.position.y = y;
    star.alpha = 0;
    star.width = star.height = window.innerWidth / 200 + randomInt(-1*(window.innerWidth / 500), (window.innerWidth / 500));
    star.filters = [blur];
    let show = new Ticker();
    let hide = new Ticker();
    let it: number = 0;
    show.start();
    show.add((delta) => {
        if(it % 30){
            star.alpha += 0.01;
        }
        it++;
        if(star.alpha >= 1){
            setTimeout(function(){
                show.stop();
                hide.start();
            }, time);
        }
    })
    hide.add((delta) => {
        if(it % 10){
            star.alpha -= 0.01;
        }
        it--;
        if(star.alpha <= 0){
            hide.stop();
        }
    })
    app.stage.addChild(star)

}