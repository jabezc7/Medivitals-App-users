import { createRouter, createWebHistory } from 'vue-router'
import  Layout from '../layouts/Layout.vue'
import  AuthLayout from '../layouts/AuthLayout.vue'
import { useAuth } from '../store/useAuth'

const PatientDashboard = () => import('../views/patient/PatientDashboard.vue')
const Alerts = () => import('../views/alerts/Alerts.vue')
const BIOBandMonitoring = () => import('../views/monitoring/BIOBandMonitoring.vue')
const Communications = () => import('../views/communications/Communications.vue')
const UserDashboard = () => import('../views/user/UserDashboard.vue')
const Auth = () => import('../views/auth/Auth.vue')
const PatientList = () => import('../views/patient/PatientList.vue')
const PatientDeviceList = () => import('../views/monitoring/PatientDeviceList.vue')
const Automations = () => import('../views/automations/Automations.vue')

const routes = [
    {
        path: '/',
        redirect: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'MY DASHBOARD',
                component: UserDashboard
            },
            {
                path: 'patients',
                name: 'PATIENT',
                component: PatientList,
                children: [
                    {
                        path: ':id',
                        name: 'PATIENT DASHBOARD',
                        component: PatientDashboard,
                        props: (route) => ({
                            id: route.params.id
                        })
                    },
                ]
            },
            {
                path: 'patients/:id',
                name: 'PATIENT DASHBOARD',
                component: PatientDashboard,
                props: (route) => ({
                    id: route.params.id
                })
            },
            {
                path: '/alerts',
                name: 'ALERTS',
                component: Alerts
            },
            {
                path: '/monitoring',
                name: 'BIO-BAND MONITORING',
                component: PatientDeviceList
            },
            {
                path: '/monitoring/:id',
                name: 'PATIENT BIO-BAND MONITORING',
                component: BIOBandMonitoring,
                props: (route) => ({
                    id: route.params.id
                })
            },
            {
                path: '/communications',
                name: 'COMMUNICATIONS',
                component: Communications
            },
            {
                path: '/automations',
                name: 'AUTOMATIONS',
                component: Automations
            },
        ]
    },
    {
        path: '/',
        redirect: '/login',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Auth',
                component: Auth
            },
        ]
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    base: import.meta.env.BASE_URL,
    routes
})

router.beforeEach(async (to) => {
    const auth = useAuth()

    await auth.me()
    await auth.checkIsLoggedIn()

    if (!auth.isLoggedIn && to.name !== 'Auth') {
        return { name: 'Auth' }
    }
})


export default router
