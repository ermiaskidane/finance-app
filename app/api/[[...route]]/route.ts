import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { HTTPException } from "hono/http-exception";

import accounts from "./accounts";

export const runtime = 'edge';

const app = new Hono().basePath('/api')

// app.onError((err, c) => {
//   if (err instanceof HTTPException) {
//     return err.getResponse();
//   }

//   return c.json({ error: "Internal server error" }, 500);
// });

const routes = app
  .route("/accounts", accounts)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes;
// RPC enables end to end typesafety








// import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
// import { Hono } from 'hono'
// import { handle } from 'hono/vercel'

// import authors from './author'
// import books from './books'

// export const runtime = 'edge';

// const app = new Hono().basePath('/api')

// app.route('/authors', authors)
// app.route('/books', books)

// app.get('/hello',
//     clerkMiddleware(),
//     (c) => {
//       const auth = getAuth(c)

//       if (!auth?.userId) {
//         return c.json({
//           message: 'You are not logged in.'
//         })
//       }
//       return c.json({
//         message: 'Hello Next.js!',
//         userId: auth.userId
//       })
//     })

// export const GET = handle(app)
// export const POST = handle(app)