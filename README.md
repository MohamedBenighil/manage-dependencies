```bash
- create new project
- add clerk with local  "/signin" and "/signout" routes (instead of external routes like the default): use 2 env var
    - Go hyperui : look for "auth form". Then redirect to the / after "/signin": use 2 env var. PS: it works without those env vars




- create navbar: it changes when the user is connected. PS use rafce snippet



//Prisma
- install prisma > init sqlite (see : you have a folder called prisma) > create lib/prisma.ts (copy paste schema from github) > install the prisma client (with the same version)
- add the schema from github
- migrate then generate, then hit npx prisma studio to access to db on localhost:5555

```
