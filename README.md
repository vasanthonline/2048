# 2048


## Available Scripts

In the project root directory, run the below command.

### `sh start.sh`
To setup all dependencies and start the game. The project expects "nvm" to be already installed and available in PATH. If it's not installed, uncomment the first two lines in start.sh and re-run above command.

## Individal commands

### `npm run compile`
To compile Typescript files to Javascript.

### `npm run test`
To run test cases and produce code coverage report.

### `npm run start`
To start the game.

### Game play

1) Print a 4 * 4 board on each turn to the console and wait for user input
2) The user will input one of 1, 2, 3, 4 to indicate left, right, up, down
3) The program should move all the tiles in the given direction and merge adjacent tiles.  
4) It should then randomly select an empty location and place a 2 or a 4
5) Repeat step 1-5 until there are no more tiles left or the player has reached 2048.

### Additional extension possible
1) Play up to 4096 instead of 2048 
2) Change the board from 4x4 to 8x8
3) Change the playing interface from a console to a graphical UI
4) Interface an automated playing agent to play instead of a human player


### Areas to improve:
1. Graphical UI for the game.
2. Deployment - The app can be encompassed in a docker container and deployed to a AWS / Google cloud instance.



