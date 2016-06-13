/**
 * 构造玩家
 * @param name
 * HP:血量
 * att:攻
 * def:防
 * spe:速
 * skill:技
 * luck:运
 */
var player = function (name) {

    var name_md5 = hex_md5(name);
    //职业
    var job = ['疯子','脑残儿童','智障','低能儿','傻X','屠夫','碰瓷者','纵火狂','走私者','屠龙者','妻管严','女汉子','娘娘腔','神经病','老司机','缺心眼'];

    /**
     * 生成属性数值
     * @param arr
     * @returns {number}
     */
    function joint(arr) {

        var sum = 0;
        for (i in arr) {
            sum += name_md5.indexOf(arr[i]).toString() == -1 ? '' : name_md5.indexOf(arr[i]).toString();
        }
        return parseInt(sum);
    }
    var jobNum = parseInt(name_md5.substr(0,1),16);

    this.name = job[jobNum] + '-' + name;

    this.HP = joint(['1', '2', '3']) % 1000;

    this.att = joint(['4', '5']) % 100;

    this.def = joint(['6', '7']) % 100;

    this.spe = joint(['8', '9']) % 100;

    this.skill = joint(['a', 'b']) % 100;

    this.luck = joint(['c', 'd']) % 100;

    this.debuff = {
        name: '无',
        num: 0
    };

};
/**
 * 文字输出
 */
function log(msg) {
    console.log(msg);
}

var player1 = new player('玩家一');
var player2 = new player('玩家二');
var is1P, hurt, dodge;

//技能
var skill = {
    //火球术
    0: function (_my, _other, _hurt) {
        _hurt = Math.floor(_hurt * 1.5);
        _other.HP = _other.HP - _hurt;

        //降低防御力
        _other.def = _other.def - 10 < 0 ? 0 : _other.def - 10;

        if (_hurt === 0) {
            log('[' + _my.name + ']突然高举双手，只见双手出现了一个火球，砸向[' + _other.name + '],但是没砸中！');
            return;
        }

        if (_other.HP <= 0) {
            log('[' + _my.name + ']突然高举双手，只见双手出现了一个火球，砸向[' + _other.name + '],[' + _other.name + ']衣服烧光了防御下降,受到了' + _hurt + '点伤害![' + _other.name + ']死亡！！！')
            clearInterval(main);
        } else {

            log('[' + _my.name + ']突然高举双手，只见双手出现了一个火球，砸向[' + _other.name + '],[' + _other.name + ']衣服烧光了防御下降,受到了' + _hurt + '点伤害![' + _other.name + ']剩余HP:' + _other.HP)
        }
    },
    //铁甲术
    1: function (_my, _other, _hurt) {

        //增加防御力
        _my.def = _my.def + 20 > 100 ? 100 : _my.def + 20;
        log('[' + _my.name + ']释放了铁甲术，感觉自己变硬了！！');

    },
    //小型治疗术
    2: function (_my, _other, _hurt) {

        //增加生命
        _my.HP = _my.HP + 20;
        log('[' + _my.name + ']释放了小型治疗，为自己增加了20HP,剩余血量HP:' + _my.HP + '感觉自己帮帮哒了！！');

    },
    //天使治疗术
    3: function (_my, _other, _hurt) {

        //增加生命
        _my.HP = _my.HP + 50;
        log('[' + _my.name + ']呼唤了天使，天使为他回复了50HP,剩余血量HP:' + _my.HP + '谢谢天使吧！！');

    },
};


//主要故事流程
var story = function (_my, _other) {
    dodge = _my.spe - _other.spe < 0 ? 0 : _my.spe - _other.spe;
    hurt = Math.floor(Math.random() * 100) + 1 < dodge ? 0 : Math.floor(_my.att * (100 - _other.def) / 100) + Math.floor(Math.random() * 10) + 1;

    if ((Math.floor(Math.random() * 100) + 1) <= _my.skill) {
        var skillNum = 0;
        for(var i in skill){
            skillNum++;
        }
       skill[Math.floor(Math.random() * skillNum)](_my, _other, hurt);
       // console.log(skill[skillNum]);
        return;
    }
    _other.HP -= hurt;

    if (_other.HP <= 0) {
        clearInterval(main);
        log('[' + _my.name + ']对[' + _other.name + ']造成了 ' + hurt + ' 点伤害, [' + _other.name + ']死亡！！！！');
        return
    }

    if (hurt === 0) {
        log('[' + _my.name + ']攻击[' + _other.name + '],但[' + _other.name + ']非常风骚的躲开了攻击,剩余HP:' + _other.HP);
        return
    }
    log('[' + _my.name + ']对[' + _other.name + ']造成了 ' + hurt + ' 点伤害, [' + _other.name + ']剩余HP:' + _other.HP);
};
//确定谁先行动
if (player1.spe > player2.spe) {
    is1P = true;
}

var main = setInterval(mainstream(), 500);

//主进程
function mainstream() {
    return function () {

        if (is1P) {
            is1P = false;
            story(player1, player2);

        } else {
            is1P = true;
            story(player2, player1);

        }
    }
}
