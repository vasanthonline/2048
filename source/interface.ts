
export enum Directions {
  LEFT = 1,
  RIGHT = 2,
  UP = 3,
  DOWN = 4
}

export const Commands = {
  exit: /exit/i,
  start: /start/i
}

export enum Dimensions {
  X = 'x',
  Y = 'y'
}

export const Messages = {
  DIRECTIONS_DOC: `Please enter one of below directions.\n For LEFT - Enter ${Directions.LEFT} \n For RIGHT - Enter ${Directions.RIGHT} \n For UP - Enter ${Directions.UP} \n For DOWN - Enter ${Directions.DOWN} \n`,
  SEND_START: `Start the game by typing START.`,
  RECD_START: `Recieved START. Staring the game...Type EXIT to exit the game at any point.`,
  GAME_STARTS: (grid: string) => `Game starts.\n ${grid}\n`,
  RECD_EXIT: `Recieved EXIT. Closing the game...`,
  INVALID_INPUT: (input: string) => `Recieved ${input}. It is not a valid direction. ${Messages.DIRECTIONS_DOC}`,
  VALID_INPUT: (input: string) => `Recieved ${input}. Moving the grid...`,
  GAME_OVER: `No more moves left. Game over.`,
  GAME_WIN: `You win. Congrats.`
}