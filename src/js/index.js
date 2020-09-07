import { Application, Texture, Sprite, Ticker, filters } from 'pixi.js-legacy';
import { randomInt } from './functions';
export var app = new Application({ transparent: true });
document.body.appendChild(app.view);
var starT = Texture.from('src/img/star.png');
var blur = new filters.BlurFilter;
blur.blur = 3 / window.devicePixelRatio;
function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
}
resize();
window.onresize = resize;
var it = 0;
app.ticker.add(function (delta) {
    if (it % 10 == 0) {
        var star = Sprite.from(starT);
        handleStar(star);
    }
    it++;
});
function handleStar(star) {
    var x = randomInt(0, window.innerWidth);
    var y = randomInt(0, window.innerHeight);
    var time = randomInt(300, 3000);
    star.position.x = x;
    star.position.y = y;
    star.alpha = 0;
    star.width = star.height = window.innerWidth / 200 + randomInt(-1 * (window.innerWidth / 500), (window.innerWidth / 500));
    star.filters = [blur];
    var show = new Ticker();
    var hide = new Ticker();
    var it = 0;
    show.start();
    show.add(function (delta) {
        if (it % 30) {
            star.alpha += 0.01;
        }
        it++;
        if (star.alpha >= 1) {
            setTimeout(function () {
                show.stop();
                hide.start();
            }, time);
        }
    });
    hide.add(function (delta) {
        if (it % 10) {
            star.alpha -= 0.01;
        }
        it--;
        if (star.alpha <= 0) {
            hide.stop();
        }
    });
    app.stage.addChild(star);
}
