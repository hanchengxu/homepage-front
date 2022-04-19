module.exports = {
    header:{
        menu:{
            topPage: 'Home',
            resume: 'Resume',
            hamsterCare: 'HamsterCare',
            ukulele: 'Ukulele'
        },
        languageName:'English'
    },
    homepage:{
        resume:{
            title:'Resume',
            detail:'Click it, find the colorful me'
        },
        hamsterCare:{
            title:'HamsterCare',
            detail:"IoT hamster box based on esp32(arduino) platform.Easily get the hamster's movement environmental temperature and humidity information,also can fed hamster automatically via Siri"
        },
        messageCard:{
            title:'MessageCard',
            detail:'Simple message Card by Esp8266'
        },
        ukulele:{
            title:'ウクレレ',
            detail:"Sheet music being practiced,It's difficult for me I think(⊙o⊙)………"
        }
    },
    hamsterCare:{
        pageOne:{
            tilteOne:'IoT hamster box based on esp32 platform',
            titleTwo:"Easily get the hamster's movement environmental temperature and humidity information,also can fed hamster automatically via Siri"
        },
        pageTwo:{
            title:'As you can see',
            p1:'The line chart shows the daily movement information of a Robrovsky male hamster I raised for {age_of_moon} months.',
            p2:'As a nocturnal animal🌒，Hamsters usually start a day of life at night😴.We often find it difficult to understand their night activities.',
            p3:"By {sys_name}  ,You can easily get the hamster's night movement information, And you can use this information to help determine the health of the hamster."
        },
        pageThree:{
            title:'小时单位平均运动量',
            p1:'右图是根据半年左右的运动数据统计得来的，以小时为单位的平均运动量。',
            p2:'的确作为夜行动物的他，主要得活动时间是从晚上20点到早上6点。',
            p3:'其中凌晨3点左右的跑圈数最大，达到了3000多圈。中午时间段有时也会有运动，可能是因为白天喂食的原因他也会运动一下。',
        }
    },
    messageCard:{
        pageOne:{
            title2:'simple message card by Esp8266',
            p1:'两块面包板，一块0.96OLED屏幕(I2C),一片Esp8266,即可组装出这精美小巧的MessageCard。',
            p2:'将需要显示的文本同程序一起烧写进去，即可滚动循环显示文本内容。',
            p3:'本体不包含电源模块，使用 {usb} 即可供电。',
            s1:'Baa, baa,',
            s2:'black sheep,',
            s3:'Have you any ',
            s4:'wool? Yes sir',
            s5:'yes sir,Three',
            s6:'bags full. One',
            s7:'for the master',
            s8:'One for the dame',
            s9:'And one for the',
            s10:'down the lane'
        },
        pageTwo:{
            title:'Learn more'
        }
    }
}