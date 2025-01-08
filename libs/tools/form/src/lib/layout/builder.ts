export abstract class Builder<TYPE> {
  constructor(protected readonly type: string) {}

  abstract build(): TYPE;
}
