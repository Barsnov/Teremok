import { createRouter, createWebHistory } from 'vue-router';
import TaskOne from '@//components/TaskOne/Back.vue';
import TaskTwo from '@//components/TaskTwo/Back.vue';
import TaskThree from '@//components/TaskThree/Back.vue';

const routes = [
    { path: '/', redirect: '/task-one' },
    { path: '/task-one', component: TaskOne },
    { path: '/task-two', component: TaskTwo },
    { path: '/task-three', component: TaskThree },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;