# .env environment 🚀

- For developmen - .env.development
- For production - .env.production
- https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

# Custom docoument 🚀

- https://nextjs.org/docs/advanced-features/custom-document
- A custom Document is commonly used to augment your application's <html> and <body> tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.
  To override the default Document, create the file ./pages/\_document.js and extend the Document class as shown

1. Design related packeges

# Install styled components

- npm install styled-components --save
- npm install babel-plugin-styled-components --save
  (https://styled-components.com/docs/advanced#example) change ./pages/\_document.js

2. For cookie storage

- npm install js-cookie --save (https://www.npmjs.com/package/js-cookie)
- file path - utils/cookie.js make two function for get and set cookie

3. For form related package

- npm install react-hook-form --save (https://react-hook-form.com/)
- Easy to use form and handle complex form

4. For request related package

- npm install axios --save (https://www.npmjs.com/package/axios)
- alternate of fetch - axois

5. Add SeoComponent

- add SeoComponent in components folder
- add SeoComponent in \_app.js file, apply entire website
  (import SeoComponent from "../components/SeoComponent")
- dynamic seo create, to add SeoComponent in perticular pages file
- default seo value set in utils/constant.js file

6. For Grid related package

- npm install react-awesome-styled-grid
- https://www.npmjs.com/package/react-awesome-styled-grid

7. For Single date picker package

- npm i react-datepicker --save
- https://www.npmjs.com/package/react-datepicker

8. For google autocomplete and map package

- npm i @react-google-maps/api --save
- https://www.npmjs.com/package/@react-google-maps/api

9. For select2

- npm i react-select
- https://www.npmjs.com/package/react-select
- https://codesandbox.io/s/react-hook-form-controller-079xx

10. Toaster

- npm install --save react-toastify
- https://fkhadra.github.io/react-toastify/installation

11. Font awesome

- npm install font-awesome --save

12. Checkbox

- https://www.npmjs.com/package/react-icheck
- npm install react-icheck icheck --save

13. Redux

- https://redux-toolkit.js.org/
- https://github.com/kirill-konshin/next-redux-wrapper
- # Redux persists (For redux state store in localstorage)
- npm i redux-persist --save
- https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist
- https://edvins.io/how-to-use-redux-persist-with-redux-toolkit

14. Range Datepicker

- npm install react-day-picker --save
- https://react-day-picker.js.org/docs/getting-started

15. Modal

- npm install react-responsive-modal --save
- https://react-responsive-modal.leopradel.com/#installation

16. Collapsible (According)

- npm i react-collapsible --save
- https://www.npmjs.com/package/react-collapsible

17. moment

- npm i moment --save
- https://www.npmjs.com/package/moment

18. pagination

- npm i react-paginate --save
- https://www.npmjs.com/package/react-paginate

19. Switch Button

- npm i react-switch --save
- https://www.npmjs.com/package/react-switch

20. confirm alert box

- npm i react-confirm-alert --save
- https://www.npmjs.com/package/react-confirm-alert

21. Input Range

- npm i react-input-range
- https://www.npmjs.com/package/react-input-range

22. Stripe element

- npm install @stripe/stripe-js @stripe/react-stripe-js --save
- https://stripe.com/docs/stripe-js/react
- https://www.pluralsight.com/guides/how-to-integrate-stripe-with-react

23. Review element

- npm install react-rating-stars-component
- https://www.npmjs.com/package/react-rating-stars-component

24. Gallery

- npm install --save simple-react-lightbox
- https://github.com/michelecocuccio/simple-react-lightbox

25. Copy to clipboard

- npm i react-copy-to-clipboard
- https://www.npmjs.com/package/react-copy-to-clipboard

# Folder structure 🚀

1.  components
2.  pages (default)
3.  public (add assets)
4.  styles (design related files)
5.  utils (custom files)
6.  redux

# EXTRA

# Custom next auth (username,password) 🚀

- https://next-auth.js.org/providers/credentials
- https://stackoverflow.com/questions/64576733/where-and-how-to-change-session-user-object-after-signing-in
- if you use credential,make sure to enalble jwt true in nextauth file(session->jwt:true)

- https://github.com/vercel/next.js/tree/canary/examples/with-next-auth
- https://arunoda.me/blog/add-auth-support-to-a-next-js-app-with-a-custom-backend

# Facbook Login 🚀

https://developers.facebook.com/

- create App
- add website url
- setting->basic = App Domains,Privacy Policy URL,Add platform
- App reivew -> request->public_profile
- products->settting= Valid Oauth redirct url (https://5de5146f077f.ngrok.io/api/auth/callback/facebook)
- https://next-auth.js.org/getting-started/rest-api

# custom login page 🚀

- https://next-auth.js.org/configuration/pages#email-sign-in-page

# Two React Hook Form in same page 🚀

- https://stackoverflow.com/questions/60276510/how-to-make-react-hook-form-work-with-multiple-forms-in-one-page
