Creating the react project using vite[https://vite.dev/guide/]

```bash id="m1q7sd"
pnpm create vite@latest
cd video_react_client
pnpm approve-builds
pnpm install
pnpm install dovenv
```

Then, create `.env.development` and a `.env.production` for the future.

```env
VITE_API_POSTS_URL=http://localhost:3000/api/v1/posts
VITE_SEARCH_API_URL=http://localhost:3000/api/v1/search
VITE_API_KEY=your_api_key_here
VITE_API_SECRET=your_api_secret_here
VITE_APP_NAME=VideoRailsReactApp
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=This is a React app for the Video Rails React application.
VITE_APP_AUTHOR=Anderson Lopes
VITE_APP_LICENSE=MIT
# VITE_APP_REPOSITORY=
VITE_API_SEARCH_URL=http://localhost:3000/api/v1/search

```

Run the client.

```bash
pnpm install @vitejs/plugin-react

pnpm install

pnpm update vite

pnpm run dev
```

Vercel

```bash
pnpm install -g vercel
vercel login
vercel
```

```bash
pnpm install react-router-dom
```

In `App.jsx`

```js
<Router>
  <div className="App">
    <h1>Video React Client</h1>
    <p>React client from Video Rails API</p>
    <PostList />
  </div>
</Router>
```
