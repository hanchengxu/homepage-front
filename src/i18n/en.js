module.exports = {
    header:{
        menu:{
            topPage: 'Home',
            resume: 'About me',
            hamsterCare: 'HamsterCare',
            ukulele: 'Ukulele'
        },
        languageName:'English'
    },
    footer:{
        menuDIY: 'DIY',
        menuBlog: 'Blog',
    },
    homepage:{
        resume:{
            title:'About me',
            detail:'Click it and get to know the more colorful me'
        },
        hamsterCare:{
            title:'HamsterCare',
            detail:"An IoT smart hamster box built on the esp32 (Arduino) platform. It records the hamster's daily activity and monitors ambient temperature & humidity, and can even feed the hamster automatically via Siri."
        },
        messageCard:{
            title:'MessageCard',
            detail:'An ultra-simple text display card'
        },
        ukulele:{
            title:'Ukulele',
            detail:"Some ukulele sheet music I'm still practicing — it's really tough (⊙o⊙)………"
        },
        timescar:{
            title:'Times CAR',
            detail:'My car-share data panel: model ranking, mileage & cost stats 🚗'
        }
    },
    hamsterCare:{
        pageOne:{
            tilteOne:'IoT smart hamster box based on esp32',
            titleTwo:"Sensors record the hamster's movement and the environmental temperature/humidity, then send the data to the backend over the MQTT protocol. After analysis and processing, the data is finally shown on the web terminal. With a shortcut configured, you can even feed the hamster automatically using Siri voice commands."
        },
        pageTwo:{
            title:'As you can see',
            p1:"The line chart shows the daily activity of a male Roborovski hamster I keep, aged {age} years ({age_of_moon} months).",
            p2:"As a nocturnal animal 🌒, the hamster usually starts its day at night 😴, so it's hard for us to observe its night-time behaviour.",
            p3:"With {sys_name}, you can easily get the hamster's night-time activity data and use it to help assess the hamster's health."
        },
        pageThree:{
            title:'Average activity per hour',
            p1:"The chart on the right shows the average per-hour activity, calculated from the daily data collected by {sys_name}.",
            p2:'Indeed, as a nocturnal animal, his main active period is from 8 p.m. to 6 a.m.',
            p3:"He runs the most around 3 a.m., reaching more than 3,000 laps. He sometimes exercises at noon too, probably because he is fed during the day."
        },
        pageFour:{
            title:'Nightly activity',
            p1:"Use the buttons below to view your hamster's activity over recent days.",
            p2:"The chart samples the data every 2 minutes and shows much more detail, so you can learn about your hamster's night-time routine."
        }
    },
    messageCard:{
        pageOne:{
            title2:'Ultra-simple message display card based on Esp8266',
            p1:'Two breadboards, one 0.96" OLED screen (I2C) and one Esp8266 are all you need to assemble this compact and lovely MessageCard.',
            p2:'Just flash the text you want to display together with the program, and it will scroll through the message in a loop.',
            p3:'The board has no built-in power module — simply power it with {usb}.',
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
    },
    resume:{
        title:'About me',
        introduce:{
            in1:"Hi! I'm Hanchengxu, a web software development engineer with {work_year} years and {mos} months of experience.",
            in2:"A coding enthusiast — programming is not just a job to me, but a hobby as well.",
            in3:"A clumsy craftsman who loves making things by hand. Lately I've been into the Arduino platform, DIY-ing all kinds of fun little gadgets.",
            in4:"Hamster keeper — welcome to check out my little one's daily activity."
        },
        language:'Language',
        techStack:'Tech Stack',
        learnling:'Learning',
        contact:{
            title:'Contact me',
            mail:'E-mail Address'
        }
    }
}
