import Container from '@/components/Container/Container.vue';

import HamsterCare from '@/components/Container/hamsterCare/HamsterCare.vue';

//路由懒加载
const MessageCard = () => import('@/components/Container/messageCard/MessageCard.vue');
const Ukulele = () => import('@/components/Container/ukulele/Ukulele.vue');
const Resume = () => import('@/components/Container/resume/Resume.vue');
// const WaterLogin = () => import('@/components/Container/water/WaterLogin.vue');
import Attendance from '@/components/Container/attendance/Attendance.vue';
import AttendanceMaster from '@/components/Container/attendance/AttendanceMaster.vue';

const routes = [
    { path: "/hCare", name: "hCare", component: HamsterCare, meta: { transition: 'fade', title: 'HamsterCare🐹' } },
    { path: "/resume", name: "resume", component: Resume, meta: { transition: 'fade', title: 'Resume' } },
    { path: "/ukulele", name: "ukulele", component: Ukulele, meta: { transition: 'fade', title: 'ukulele🎶' } },
    { path: "/messageCard", name: "messageCard", component: MessageCard, meta: { title: 'MessageCard📜' } },
    // { path: "/water", name: "water", component: WaterLogin ,meta: { title: 'water XX'}},
    { path: "/attendance", name: "attendance", component: Attendance, meta: { title: '签到系统',showHeaderAndFooer: false, transition: 'fade' } },
    { path: '/attendanceMaster', name: "attendanceMaster", component: AttendanceMaster, 
        meta: { title: '签到系统_设置', showHeaderAndFooer: false, transition: 'fade'},
        beforeEnter(to, from, next) {
            if (from.path === '/attendance') {
                next()
            } else {
                next('/attendance')
            }
        } 
    },
    { path: '/', component: Container, meta: { transition: 'fade' } },
    { path: '/:pathMatch(.*)*', component: Container, meta: { transition: 'fade' } }
]

export { routes };