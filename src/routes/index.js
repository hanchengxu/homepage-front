import Container from '@/components/Container/Container.vue';
import HamsterCare from '@/components/Container/hamsterCare/HamsterCare.vue';
import Resume from '@/components/Container/resume/Resume.vue';
import Ukulele from '@/components/Container/ukulele/Ukulele.vue';


const routes=[
    { path: '/hCare', component: HamsterCare , meta:{transition:'fade'}},
    { path: '/resume', component: Resume , meta:{transition:'fade'}},
    { path: '/ukulele', component: Ukulele , meta:{transition:'fade'}},
    { path: '/', component: Container , meta:{transition:'fade'}},
    { path: '/:pathMatch(.*)*', component: Container , meta:{transition:'fade'}}
]

export {routes};