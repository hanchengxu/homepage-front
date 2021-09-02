import Container from '@/components/Container/Container.vue';
import HamsterCare from '@/components/Container/hamsterCare/HamsterCare.vue';
import Resume from '@/components/Container/resume/Resume.vue';
import Ukulele from '@/components/Container/ukulele/Ukulele.vue';


const routes=[
    { path: '/hamsterCare', component: HamsterCare },
    { path: '/resume', component: Resume },
    { path: '/ukulele', component: Ukulele },
    { path: '/', component: Container },
    { path: '/:pathMatch(.*)*', component: Container }
]

export {routes};