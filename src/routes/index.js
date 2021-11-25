import Container from '@/components/Container/Container.vue';

//路由懒加载
const HamsterCare = () => import('@/components/Container/hamsterCare/HamsterCare.vue');
const MessageCard = () => import('@/components/Container/messageCard/MessageCard.vue');
const Ukulele = () => import('@/components/Container/ukulele/Ukulele.vue');
const Resume = () => import('@/components/Container/resume/Resume.vue');


const routes = [
    { path: "/hCare", name: "hCare", component: HamsterCare, meta: { transition: 'fade',title: 'HamsterCare🐹' } },
    { path: "/resume", name: "resume", component: Resume, meta: { transition: 'fade' ,title: 'Resume'} },
    { path: "/ukulele", name: "ukulele", component: Ukulele, meta: { transition: 'fade',title: 'ukulele🎶' } },
    { path: "/messageCard", name: "messageCard", component: MessageCard ,meta: { title: 'MessageCard📜' }},
    { path: '/', component: Container, meta: { transition: 'fade' } },
    { path: '/:pathMatch(.*)*', component: Container, meta: { transition: 'fade' } }
]

export { routes };