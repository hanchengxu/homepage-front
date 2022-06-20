module.exports = {
    header:{
        menu:{
            topPage: '首页',
            resume: '关于我',
            hamsterCare: 'HamsterCare',
            ukulele: '尤克里里'
        },
        languageName:'简体中文'
    },
    footer:{
        menuDIY: 'DIY项目',
        menuBlog: '博客',
    },
    homepage:{
        resume:{
            title:'关于我',
            detail:'点击它、了解更丰富多彩的我'
        },
        hamsterCare:{
            title:'HamsterCare',
            detail:'基于esp32(arduino)制作的物联网智能仓鼠箱。 拥有获取仓鼠每日运动信息、监控环境温湿度等功能，还可通过Siri自动喂食。'
        },
        messageCard:{
            title:'MessageCard',
            detail:'超简易的文本显示卡片'
        },
        ukulele:{
            title:'尤克里里',
            detail:'收集的一些尤克里里谱子、艰难练习中(⊙o⊙)………'
        }
    },
    hamsterCare:{
        pageOne:{
            tilteOne:'基于esp32的IoT智能仓鼠箱',
            titleTwo:'使用传感器记录仓鼠运动信息，环境温湿度等。通过mqtt协议传输至后台。经过分析处理的数据最终显示在网页终端。配置快捷指令，也可实现利用Siri语音进行自动喂食。'
        },
        pageTwo:{
            title:'如您所见',
            p1:'折线图所展示的是我所饲养的一只年龄为{age}岁(月龄:{age_of_moon}个月)的罗布罗夫斯基雄性仓鼠的每日运动信息。',
            p2:'作为一种夜行性动物🌒，仓鼠通常在深夜😴开启一天的生活。我们往往难以了解他们的夜间活动情况。',
            p3:'通过 {sys_name}  ，您可以轻松获取仓鼠夜间的运动信息，并通过这些信息来辅助判断仓鼠的健康状况。'
        },
        pageThree:{
            title:'小时单位平均运动量',
            p1:'右图是根据半年左右的运动数据统计得来的，以小时为单位的平均运动量。',
            p2:'的确作为夜行动物的他，主要得活动时间是从晚上20点到早上6点。',
            p3:'其中凌晨3点左右的跑圈数最大，达到了3000多圈。中午时间段有时也会有运动，可能是因为白天喂食的原因他也会运动一下。',
        },
        pageFour:{
            title:'每日夜间运动',
            p1:'您可通过下方按钮来选取仓鼠最近几日的运动信息。',
            p2:'图中以2分钟为采样率展示了更为详细的运动数据，您可以通过它了解仓鼠的夜间活动。'
        }
    },
    messageCard:{
        pageOne:{
            title2:'基于Esp8266制作的超简易文本显示卡片',
            p1:'两块面包板，一块0.96OLED屏幕(I2C),一片Esp8266,即可组装出这精美小巧的MessageCard。',
            p2:'将需要显示的内容同程序一起烧写进去，即可滚动循环显示文本内容。',
            p3:'本体不包含电源模块，使用 {usb} 即可供电。',
            s1:'从前有座山',
            s2:'山上有座庙',
            s3:'庙里有个老和尚',
            s4:'在给小和尚讲故事',
            s5:'讲的什么故事呢？',
            s6:'从前有座山',
            s7:'山上有座庙',
            s8:'庙里有个老和尚',
            s9:'在给小和尚讲故事',
            s10:'讲的什么故事呢？'
        },
        pageTwo:{
            title:'了解更多'
        }
    },
    resume:{
        title:'关于我',
        introduce:{
            in1:' 你好！我是Hanchengxu。一名从业{work_year}年零{mos}个月的Web软件开发工程师。',
            in2:'代码爱好者，编程不仅仅是一份工作，更是我的业余爱好。',
            in3:'手残工匠，喜欢制作手工，最近痴迷于Arduino平台，DIY一些有趣的小玩意儿。',
            in4: '养鼠人，欢迎围观我家鼠子每日运动状态。'
        },
        language:'语言',
        techStack:'技术栈',
        learnling:'学习中',
        contact:{
            title:'联系我',
            mail: '邮箱'
        }
    }

}