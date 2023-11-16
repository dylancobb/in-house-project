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
- AWS DynamoDB

## Schema

```
{"game_id":1,
"game_state":"Result",
"game_stats":
{"players":
[{"player_drawing":"https://t4.ftcdn.net/jpg/01/36/70/67/360_F_136706734_KWhNBhLvY5XTlZVocpxFQK1FfKNOYbMj.jpg","player_guess":"Smiley face","player_id":1,"player_prompt":"Man on the moon","player_avatar":"0","player_username":"Dylan"},
{"player_drawing":"","player_guess_text":"","player_id":2,"player_prompt":"","player_guess_drawing":"","player_avatar":"0","player_username":"Josh"},{"player_drawing":"","player_guess_text":"","player_id":3,"player_prompt":"","player_guess_drawing":"","player_avatar":"0","player_username":"Ben"}]}}

```

## Lambda Function used to interact with DynamoDB database

```
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "IHP-Games";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
  console.log("Received request:", event.httpMethod, event.path);
  console.log("event", event);

  const routeSwitch = `${event.httpMethod} ${event.path}`;
  const gameIdFromPath = event.pathParameters.items.split('/')[1];
  console.log({ routeSwitch });
  console.log({ gameIdFromPath });

  try {
    switch (event.httpMethod) {
      case "DELETE /items/{game_id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              game_id: event.pathParameters.game_id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.game_id}`;
        break;

      case "PUT":
  if (gameIdFromPath) {
    const putRequestJSON = JSON.parse(event.body);
    const existingGame = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          game_id: Number(gameIdFromPath),
        },
      })
    );

    if (existingGame.Item) {
      // Update the game data with the new values
      // For example, update game_state and game_stats
      existingGame.Item.game_state = putRequestJSON.game_state;
      existingGame.Item.game_stats = putRequestJSON.game_stats;

      // Update the DynamoDB item with the modified game state
      await dynamo.send(
        new PutCommand({
          TableName: tableName,
          Item: existingGame.Item,
        })
      );

      body = "Game updated successfully";
    } else {
      body = "Game not found";
      statusCode = 404;
    }
  }

  break;
      case "GET":
        if (gameIdFromPath) {
          const result = await dynamo.send(
            new GetCommand({
              TableName: tableName,
              Key: {
                game_id: Number(gameIdFromPath),
              },
            })
          );
          body = {
            game_id: result.Item.game_id,
            game_state: result.Item.game_state,
            game_stats: result.Item.game_stats,
          };
        } else {
          console.log("items");
          body = await dynamo.send(new ScanCommand({ TableName: tableName }));
          body = body.Items;
        }
        break;

      case "POST":
        let postRequestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              game_id: postRequestJSON.game_id,
              game_state: postRequestJSON.game_state,
              game_stats: postRequestJSON.game_stats,
            },
          })
        );
        body = `Put item ${postRequestJSON.game_id}`;
        break;

      default:
        console.log("Unsupported route", routeSwitch);
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

```

=======

## Credits

Scrum: <a href="https://github.com/GeorgeKlemperer">George Klemperer</a> <br>
DevOps: <a href="https://github.com/DeepsDali">Deepa Dali</a> <br>
Ux/UI: <a href="https://github.com/benante">Tommaso Orlandi</a> <br>
QA: <a href="https://github.com/dylancobb">Dylan Cobb</a>
