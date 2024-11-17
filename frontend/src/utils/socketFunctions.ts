// OneVsOne.ts

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export class OneVsOne {
  private setPlayerFound: SetState<boolean>;
  private setLoading: SetState<boolean>;
  private setOpponentName: SetState<string>;

  constructor(
    setPlayerFound: SetState<boolean>,
    setLoading: SetState<boolean>,
    setOpponentName: SetState<string>
  ) {
    this.setPlayerFound = setPlayerFound;
    this.setLoading = setLoading;
    this.setOpponentName = setOpponentName;
  }

  public playerJoinedOneVsOneRoom = (prop: { name: string }): void => {
    this.setPlayerFound(true);
    this.setLoading(false);
    this.setOpponentName(prop.name);
  };
}

export class Practice {
  private setShowResult: SetState<boolean>;

  constructor(setShowResult: SetState<boolean>) {
    this.setShowResult = setShowResult;
  }

  public handleTimeUp = () => {
    this.setShowResult(false);
  };
}
