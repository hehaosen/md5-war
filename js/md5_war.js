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

    /**
     * 生成属性数值
     * @param arr
     * @returns {number}
     */
    function joint( arr ) {

        var sum = 0;
        for ( i in arr) {
            sum += name_md5.indexOf(arr[i]).toString() == -1 ? '' : name_md5.indexOf(arr[i]).toString();
        }
        return parseInt(sum);
    }

    this.name = name;

    this.HP = joint(['1','2','3']) % 1000;

    this.att = joint(['4','5']) % 100;

    this.def = joint(['6','7']) % 100;

    this.spe = joint(['8','9']) % 100;

    this.skill = joint(['a','b']) % 100;

    this.luck = joint(['c','d']) % 100;

};

var player1 = new player('神雕侠侣');
var player2 = new player('王金贝');
var is1P,hurt,dodge;
var skill = {

    '火球术' : function () {

    }
};
//确定谁先行动
if( player1.spe > player2.spe ) {
    is1P = true;
}

var main = setInterval(mainstream(), 500);

function mainstream (){
    return function () {

        if (is1P) {
            is1P = false;
            dodge = player1.spe - player2.spe < 0 ? 0 : player1.spe - player2.spe;
            hurt = Math.floor(Math.random()*100) + 1 < dodge ? 0 : Math.floor(player1.att * (100 - player2.def) / 100) + Math.floor(Math.random()*10) + 1;
            player2.HP -= hurt;

            if(player2.HP <= 0 ) {
                clearInterval(main);
                console.log('[' + player1.name + ']对[' + player2.name + ']造成了 ' + hurt + ' 点伤害, [' + player2.name + ']死亡！！！！');
                return
            }

            if( hurt === 0 ) {
                console.log('[' + player1.name + ']攻击[' + player2.name + '],但[' + player2.name + ']非常风骚的躲开了攻击,剩余HP:' + player2.HP);
                return
            }
            console.log('[' + player1.name + ']对[' + player2.name + ']造成了 ' + hurt + ' 点伤害, [' + player2.name + ']剩余HP:' + player2.HP);

        } else {
            is1P = true;

            dodge = player2.spe - player1.spe < 0 ? 0 : player2.spe - player1.spe;
            hurt = Math.floor(Math.random()*100) + 1 < dodge ? 0 : Math.floor(player2.att * (100 - player1.def) / 100) + Math.floor(Math.random()*10) + 1;

            player1.HP -= hurt;

            if(player1.HP <= 0 ) {
                clearInterval(main);
                console.log('[' + player2.name + ']对[' + player1.name + ']造成了 ' + hurt + ' 点伤害, [' + player1.name + ']死亡！！！！！');
                return
            }

            if(player2.HP <= 0 ) {
                clearInterval(main);
                console.log('[' + player1.name + ']对[' + player2.name + ']造成了 ' + hurt + ' 点伤害, [' + player2.name + ']死亡！！！！');
                return
            }

            if( hurt === 0 ) {
                console.log('[' + player2.name + ']攻击[' + player1.name + '],但[' + player1.name + ']非常风骚的躲开了攻击,剩余HP:' + player1.HP);
                return
            }
            console.log('[' + player2.name + ']对[' + player1.name + ']造成了 ' + hurt + ' 点伤害, [' + player1.name + ']剩余HP:' + player1.HP);
        }
    }
}
