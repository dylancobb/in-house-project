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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## In House Project

In House Project is an exciting game that merges the creativity of Pictionary with the unpredictable twists of Chinese Whispers.

## How it Works

**Prompting:** The game kicks off with the first player providing a mysterious prompt. It could be anything from a word, phrase, or even a quirky idea.

**Drawing:** The prompt is then passed to the next player, who translates it into a captivating masterpiece through drawing.

**Guessing:** Now, it's the third player's turn to step into the world of imagination. They must decipher the original prompt solely based on the artwork created.

**Result:** At the end of the game, everyone gets to experience the grand reveal! Witness the magic as the original prompts are unveiled alongside the beautiful artworks they inspired.

## Installation

Clone the project:

```bash
  git clone https://github.com/fac28/in-house-project
```

Go to the project directory:

```bash
  cd in-house-project
```

Install dependencies:

```bash
  npm install
```

Running the app:

```bash
  npm run dev
```

## Technologies Used

This project is primarily built using:

- React
- Next.js
- TypeScript
- Tailwind CSS

## Project Structure

The project is organized with the following directory structure:

- **APP:** The main application directory containing the core logic.

  - **COMPONENTS:** Houses React components used throughout the application.
  - **UTILITIES:** Contains utility functions utilized within the project.
  - **PAGES:** Includes route configurations for different pages in the application.

- **PUBLIC:** This directory is at the same level as the APP directory and is used for storing images and icons utilized within the application.

## Temporary Schema Example

```
Game state sample {
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
}

```

## Credits

The project was created by <a href="https://github.com/DeepsDali">Deepa Dali</a>, <a href="https://github.com/dylancobb">Dylan Cobb</a>, <a href="https://github.com/GeorgeKlemperer">George Klemperer</a> & <a href="https://github.com/benante">Tommaso Orlandi.</a>
