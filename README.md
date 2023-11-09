## How it Works

**Prompting:** The game kicks off with the first player providing a mysterious prompt. It could be anything from a word, phrase, or even a quirky idea.

**Drawing:** The prompt is then passed to the next player, who translates it into a captivating masterpiece through drawing.

**Guessing:** Now, it's the third player's turn to step into the world of imagination. They must decipher the original prompt solely based on the artwork created.

**Result:** At the end of the game, everyone gets to experience the grand reveal! Witness the magic as the original prompts are unveiled alongside the beautiful artworks they inspired.

## Technologies Used

This project is primarily built using:

- React
- Next.js
- TypeScript
- Tailwind CSS

````Game state sample {
  "game_id": "12345",
   "status": "active",
  "current_round": 3,
  "players": [
    {
      "user_id": 1,
      "username": "Player1",
"prompt": "boat on a beach"
   "drawing_url": "https://example.com/drawings/123.png",
"guess": "Superman flying"


    },
    {
      "user_id": 2,
      "username": "Player2",
"prompt": "boat on a beach"
   "drawing_url": "https://example.com/drawings/123.png",
"guess": "Superman flying"


    },
    {
      "user_id": 3,
      "username": "Player1",
"prompt": "boat on a beach"
   "drawing_url": "https://example.com/drawings/123.png",
"guess": "Superman flying"


    },
    {
      "user_id": 4,
      "username": "Player1",
"prompt": "boat on a beach"
   "drawing_url": "https://example.com/drawings/123.png",
"guess": "Superman flying"


    }
  ]
}```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
