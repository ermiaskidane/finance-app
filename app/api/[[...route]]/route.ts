import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { HTTPException } from "hono/http-exception";

import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";

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
  .route("/categories", categories)
  .route("/transactions", transactions)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

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