export interface ITerminal {
  run: (options: ITerminalOptions) => void;
}

export interface ITerminalOptions {
  text?: string;
}
