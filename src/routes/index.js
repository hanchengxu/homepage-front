import Container from '@/components/Container/Container.vue';
import HamsterCare from '@/components/Container/hamsterCare/HamsterCare.vue';
import MessageCard from '@/components/Container/messageCard/MessageCard.vue';
import Resume from '@/components/Container/resume/Resume.vue';
import Ukulele from '@/components/Container/ukulele/Ukulele.vue';


const routes = [
    { path: "/hCare", name: "hCare", component: HamsterCare, meta: { transition: 'fade',title: 'HamsterCare🐹' } },
    { path: "/resume", name: "resume", component: Resume, meta: { transition: 'fade' ,title: 'Resume'} },
    { path: "/ukulele", name: "ukulele", component: Ukulele, meta: { transition: 'fade',title: 'ukulele🎶' } },
    { path: "/messageCard", name: "messageCard", component: MessageCard ,meta: { title: 'MessageCard📜' }},
    { path: '/', component: Container, meta: { transition: 'fade' } },
    { path: '/:pathMatch(.*)*', component: Container, meta: { transition: 'fade' } }
]

export { routes };