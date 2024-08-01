
class StorageService {
    getItem(key: string) {
        return localStorage.getItem(key)
    }
    setItem(key: string, item: any) {
        localStorage.setItem(key, item)
    }
    removeItem(key: string) {
        localStorage.removeItem(key)
    }
}

export const storageService = new StorageService();