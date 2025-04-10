export interface Snapper {
  fixOffset(newStart: number, newEnd: number): { start: number; end: number };
}

export interface UseSnapper<SNAPPER extends Snapper> {
  initSnapper: (text: string) => SNAPPER;
}
