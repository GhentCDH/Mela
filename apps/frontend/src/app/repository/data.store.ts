import { effect, ref } from 'vue';

export class DataStore<DATA, ITEM> {
  private _reload = ref(Date.now());
  public data = ref<DATA>(null as any);
  public id = ref<string | null>(null);
  constructor(
    private readonly repository: {
      get: (id: string) => Promise<DATA>;
      items?: {
        delete?: (id: string) => Promise<void>;
        create?: (item: ITEM) => Promise<void>;
        patch?: (id: string, item: ITEM) => Promise<void>;
      };
    },
  ) {
    effect(() => {
      // leave this to watch the reload
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _r = this._reload.value;

      const id = this.id.value;
      if (!id) {
        this.data.value = null;
        return;
      }

      repository.get(id).then((data) => {
        if (this.id.value !== id) return;
        this.data.value = data;
      });
    });
  }

  // abstract checkIfDataIsValid(data: DATA): boolean;

  reload() {
    this._reload.value = Date.now();
  }

  setId(id: string) {
    this.id.value = id;
  }

  deleteItem(id: string) {
    if (!this.repository.items?.delete)
      throw new Error('deleteItem is not implemented for this repository');

    return this.repository.items.delete(id).then(() => {
      this.reload();
    });
  }

  createItem(item: ITEM) {
    if (!this.repository.items?.create)
      throw new Error('createItem is not implemented for this repository');

    return this.repository.items.create(item).then(() => {
      this.reload();
    });
  }

  patchItem(id: string, item: ITEM) {
    if (!this.repository.items?.patch)
      throw new Error('patchItem is not implemented for this repository');

    return this.repository.items.patch(id, item).then(() => {
      this.reload();
    });
  }
}
