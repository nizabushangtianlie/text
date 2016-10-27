/**
 * Created by Administrator on 2016/10/01.
 */

$(function () {
   $('#btn1').click(function () {
       $('.set-container .set').show();
   });
    $('.set-container .set #span1').click(function () {
        $('.set-container .set').hide();
    });
    /*换肤*/
var changeImg=$('.set-container .set img');
    changeImg.eq(0).on('click', function () {
        $('body').css('background','url(images/1.jpg)');
    });
    changeImg.eq(1).on('click', function () {
        $('body').css('background','url(images/2.jpg)');
    });
    changeImg.eq(2).on('click', function () {
        $('body').css('background','url(images/3.jpg)');
    });
    /*隐藏显示 搜索框*/
 var oBtn=$('.set-container .set button');
    oBtn.eq(0).on('click', function () {
        $('.search').show();
    });
    oBtn.eq(1).on('click', function () {
        $('.search').hide();
    });
    /*批量显示常用地址*/

    var ali1=$('.set-container .set li');
    var aLiList=$('.wrapper li');

    ali1.eq(0).on('click', function () {
            for(var i=4;i<aLiList.length;i++){
                aLiList.eq(i).hide(function () {
                    $('.set-container .set').hide();
                });
            }

    });
    ali1.eq(1).on('click', function () {
            for(i=0;i<8;i++){
                aLiList.eq(i).show(function () {
                    $('.set-container .set').hide();
                });
            }
            for(var i=8;i<aLiList.length;i++){
                aLiList.eq(i).hide(function () {
                    $('.set-container .set').hide();
                });
            }
    });
    ali1.eq(2).on('click', function () {
            for(var i=0;i<aLiList.length;i++){
                aLiList.eq(i).show(function () {
                    $('.set-container .set').hide();
                });
            }
    });

    /*显示span*/
    aLiList.each(function () {
        $(this).on('mouseover', function () {
            $(this).find('span').css('display',"block");
            });
        $(this).on('mouseleave', function () {
            $(this).find('span').css('display',"none");
        })
        });
    /*地址栏的删除 */
    var aSpan=$('.wrapper .temp span');

    for(var i=0;i<aSpan.length;i++){
        aSpan.eq(i).on('click', function () {
            $(this).parent().parent().hide();
        })
    }
});
/*-----------------js部分---------------------*/
/* 常用地址栏的拖拽*/
window.onload=function ()
{
    var oUl=document.getElementById('ul1');
    var aLi=oUl.getElementsByTagName('li');
    var aPos=[];
    var iMinZindex=2;
    var i=0;

    //布局转换
    for(i=0;i<aLi.length;i++)
    {
        aPos[i]={left: aLi[i].offsetLeft, top: aLi[i].offsetTop};
    }

    for(i=0;i<aLi.length;i++)
    {
        aLi[i].style.left=aPos[i].left+'px';
        aLi[i].style.top=aPos[i].top+'px';

        aLi[i].style.position='absolute';
        aLi[i].style.margin='0';

        aLi[i].index=i;
    }

    //拖拽
    for(i=0;i<aLi.length;i++)
    {
        setDrag(aLi[i]);
    }

    function setDrag(obj)
    {
        obj.onmousedown=function (ev)
        {
            var oEvent=ev||event;

            obj.style.zIndex=iMinZindex++;

            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;

            document.onmousemove=function (ev)
            {
                var oEvent=ev||event;

                obj.style.left=oEvent.clientX-disX+'px';
                obj.style.top=oEvent.clientY-disY+'px';

                for(i=0;i<aLi.length;i++)
                {
                    aLi[i].className='';
                }

                var oNear=findNearest(obj);

                if(oNear)
                {
                    oNear.className='active';
                }

            };

            document.onmouseup=function ()
            {
                document.onmousemove=null;
                document.onmouseup=null;

                var oNear=findNearest(obj);

                if(oNear)
                {

                    oNear.className='';

                    oNear.style.zIndex=iMinZindex++;
                    obj.style.zIndex=iMinZindex++;

                    startMove(oNear, aPos[obj.index]);
                    startMove(obj, aPos[oNear.index]);

                    var tmp=0;

                    tmp=obj.index;
                    obj.index=oNear.index;
                    oNear.index=tmp;
                }
                else
                {
                    startMove(obj, aPos[obj.index]);
                }
            };

            clearInterval(obj.timer);

            return false;
        };
    }

    //碰撞检测
    function cdTest(obj1, obj2)
    {
        var l1=obj1.offsetLeft;
        var r1=obj1.offsetLeft+obj1.offsetWidth;
        var t1=obj1.offsetTop;
        var b1=obj1.offsetTop+obj1.offsetHeight;

        var l2=obj2.offsetLeft;
        var r2=obj2.offsetLeft+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=obj2.offsetTop+obj2.offsetHeight;

        if(r1<l2 || l1>r2 || b1<t2 || t1>b2)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    function getDis(obj1, obj2)
    {
        var a=obj1.offsetLeft-obj2.offsetLeft;
        var b=obj1.offsetTop-obj2.offsetTop;

        return Math.sqrt(a*a+b*b);
    }

    function findNearest(obj)	//找到碰上的，并且最近的
    {
        var iMin=999999999;
        var iMinIndex=-1;

        for(i=0;i<aLi.length;i++)
        {
            if(obj==aLi[i])continue;

            if(cdTest(obj, aLi[i]))
            {
                var dis=getDis(obj, aLi[i]);

                if(iMin>dis)
                {
                    iMin=dis;
                    iMinIndex=i;
                }
            }
        }

        if(iMinIndex==-1)
        {
            return null;
        }
        else
        {
            return aLi[iMinIndex];
        }
    }

    //运动

};