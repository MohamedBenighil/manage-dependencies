```bash
- create new project
- add clerk with local  "/signin" and "/signout" routes (instead of external routes like the default): use 2 env var
    - Go hyperui : look for "auth form". Then redirect to the / after "/signin": use 2 env var. PS: it works without those env vars




- create navbar: it changes when the user is connected. PS use rafce snippet



//Prisma
- install prisma > init sqlite (see : you have a folder called prisma) > create lib/prisma.ts (copy paste schema from github) > install the prisma client (with the same version)
- add the schema from github
- migrate then generate, then hit npx prisma studio to access to db on localhost:5555
==============================================================================================
- now we have a user connected to our app BUT not ibserted in DB:
    - implement a function to check if conneted user is in DB? if yes do nothing else insert it.
        - create server app/actions.ts to request db
        - create client (because of useffect which calls the function inside app/actions.ts ) component Budget/page.tsx
            - remove useEffect from Budget/page.tsx and add it to components/Navbar.tsx. Then add <Navbar> to Budget/page.tsx (because Navbar is shared between all pages and it has useUser() hook where we get email)
            - add <Wrapper for navbar>



```
