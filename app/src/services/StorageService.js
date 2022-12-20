class StorageService {
  CURRENT_NOTE_KEY = "current_note";

  DEFAULT_NOTE_VALUE = {
    description: "",
    fixed: false,
  };

  getCurrentNote() {
    const currentNote = this.getStorageValue(this.CURRENT_NOTE_KEY);
    if (currentNote) return currentNote;
    this.setStorageValue(this.CURRENT_NOTE_KEY, this.DEFAULT_NOTE_VALUE);
    return this.DEFAULT_NOTE_VALUE;
  }

  getStorageValue(key) {
    if (localStorage[key]) return JSON.parse(localStorage[key]);
    return false;
  }

  setStorageValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storageService = new StorageService();
