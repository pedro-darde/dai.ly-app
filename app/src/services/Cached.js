export default class Cached {
  #cache = new Map();
  async __cached(key, $fetch) {
    if (!this.#cache.has(key)) {
      console.debug("caching:", key);
      this.#cache.set(key, $fetch());
    }

    return await this.#cache.get(key);
  }
}
