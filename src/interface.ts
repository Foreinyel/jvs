export interface ITerminal {
  run: (options: ITerminalOptions) => void;
}

export interface ITerminalOptions {
  target?: string;
  a?: string;
  s?: string;
}
