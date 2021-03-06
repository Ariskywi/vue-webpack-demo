import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    authCode: 'String'           路由所需权限
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/
export const constantRoutes = [
    {
        path: '/login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "Login" */ '@/views/login/index'),
        hidden: true
    },
    {
        path: '/home',
        component: Layout,
        name: 'home',
        meta: {
            authCode: 'C21001'
        },
        redirect: '/home/index',
        children: [
            {
                path: 'index',
                component: () =>
                    import(/* webpackChunkName: "Home" */ '@/views/hello'),
                name: 'homeIndex',
                meta: {
                    title: 'homeIndex',
                    icon: 'homeIndex',
                    authCode: 'C21011',
                    noCache: true,
                    affix: true
                }
            }
        ]
    },
    {
        path: '/message',
        component: Layout,
        name: 'message',
        meta: {
            authCode: 'C22001'
        },
        redirect: '/message/index',
        children: [
            {
                path: 'index',
                component: () =>
                    import(/* webpackChunkName: "Message" */ '@/views/hello'),
                name: 'info',
                meta: {
                    title: 'info',
                    icon: 'info',
                    authCode: 'C22021',
                    noCache: true,
                    affix: true
                }
            }
        ]
    },
    {
        path: '/account',
        component: Layout,
        meta: {
            authCode: 'C23001'
        },
        children: [
            {
                path: 'manage',
                component: () =>
                    import(/* webpackChunkName: "Account-manage" */ '@/views/hello'),
                name: 'manage',
                meta: {
                    title: 'manage',
                    icon: 'manage',
                    authCode: 'C23031',
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'materials',
                component: () =>
                    import(/* webpackChunkName: "Account-materials" */ '@/views/hello'),
                name: 'materials',
                meta: {
                    title: 'materials',
                    icon: 'materials',
                    authCode: 'C23032',
                    noCache: true,
                    affix: true
                }
            }
        ]
    },
    {
        path: '/404',
        component: () =>
            import(/* webpackChunkName: "Page404" */ '@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '',
        redirect: '/home'
    }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.BASE_URL,
    routes: constantRoutes
})

export const asyncRoutes = [
    {
        path: '/operation',
        component: Layout,
        alwaysShow: true, // will always show the root menu
        meta: {
            title: 'auth',
            icon: 'lock',
            roles: ['admin'], // you can set roles in root nav
            authCode: 'C20001'
        },
        children: [
            {
                path: 'dashboard',
                component: () =>
                    import(/* webpackChunkName: "Dashboard" */ '@/views/hello'),
                name: 'dashboard',
                meta: {
                    title: 'dashboard',
                    roles: ['admin'],
                    authCode: 'C20011'
                }
            },
            {
                path: 'personal',
                component: () =>
                    import(/* webpackChunkName: "Personal" */ '@/views/hello'),
                name: 'personal',
                meta: {
                    title: 'personal',
                    roles: ['admin'],
                    authCode: 'C20012'
                }
            },
            {
                path: 'enterprise',
                component: () =>
                    import(/* webpackChunkName: "Enterprise" */ '@/views/nested'),
                name: 'enterprise',
                meta: {
                    title: 'enterprise',
                    roles: ['admin'],
                    authCode: 'C20013'
                },
                children: [
                    {
                        path: 'item1',
                        component: () =>
                            import(/* webpackChunkName: "Item1" */ '@/views/hello'),
                        name: 'item1',
                        meta: {
                            title: 'item1',
                            roles: ['admin'],
                            authCode: 'C20131'
                        }
                    },
                    {
                        path: 'item2',
                        component: () =>
                            import(/* webpackChunkName: "Item2" */ '@/views/hello'),
                        name: 'item2',
                        meta: {
                            title: 'item2',
                            roles: ['admin'],
                            authCode: 'C20132'
                        }
                    },
                    {
                        path: 'item3',
                        component: () =>
                            import(/* webpackChunkName: "Item3" */ '@/views/hello'),
                        name: 'item3',
                        meta: {
                            title: 'item3',
                            roles: ['admin'],
                            authCode: 'C20133'
                        }
                    }
                ]
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]
