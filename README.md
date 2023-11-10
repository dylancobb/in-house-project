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
