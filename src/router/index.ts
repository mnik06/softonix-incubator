import { createRouter, createWebHistory } from 'vue-router'
// import Contacts from '@/views/Contacts.vue'
// import UpsertContact from '@/views/UpsertContact.vue'
// import { useContactsStore } from '@/store'
// import { storeToRefs } from 'pinia'
import { examplesRoutes } from '@/views/examples/examples.routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'examples' }
    },
    // {
    //   path: '/contacts',
    //   name: 'contacts',
    //   component: Contacts
    // },
    // {
    //   path: '/contacts/:contactId',
    //   name: 'upsertContact',
    //   component: UpsertContact,
    //   beforeEnter (to, from, next) {
    //     const contactsStore = useContactsStore()
    //     const { contacts } = storeToRefs(contactsStore)
    //     if (to.params.contactId === 'new' || contacts.value.find(c => c.id === +to.params.contactId)) {
    //       next()
    //     } else {
    //       next({ name: 'contacts' })
    //     }
    //   }
    // },

    ...examplesRoutes
  ]
})

// Before each - is used for navigation guards, is executed before every route change.
// router.beforeEach((to, from) => {
//   console.log('In Before Each: ', { to, from })
// })

// Before resolve - is used to fetch async data or perform other necessary actions before rendering the component, is executed before the route component is rendered and
// router.beforeResolve((to, from) => {
//   console.log('In Before Resolve: ', { to, from })
// })

// Before each - executed after each route change, do not affect the navigation
// router.afterEach((to, from, failure) => {
//   console.log('In After Each: ', { to, from, failure })
// })
