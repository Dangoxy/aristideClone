import {createRouter, createWebHashHistory} from "vue-router"
import Homepage from "./views/Homepage.vue"
import Testing from "./views/Testing.vue"
import ProjectPage from "./views/ProjectPage.vue"
import AboutPage from "./views/AboutPage.vue"


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {name:"home", path:"/", component: Homepage},
        {path:"/testing", component: Testing},
        {path:"/:projectidname", component: ProjectPage, props:true},
        {path:"/about", component: AboutPage},
    ]
})
export default router