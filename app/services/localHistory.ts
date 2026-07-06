export const MaxLocalDocumentLength = 30
export const AutoSaveInterval = 60 * 1000

function saveTimeSort(a: { SaveTime: string }, b: { SaveTime: string }) {
  return new Date(b.SaveTime).getTime() - new Date(a.SaveTime).getTime()
}

type LocalDB = IDBDatabase

export class IndexDB {
  private options: { name: string, storeName?: string, storeOptions?: IDBObjectStoreParameters, storeInit?: (s: IDBObjectStore) => void }
  private storeName = ''

  constructor(options: { name: string, storeName?: string, storeOptions?: IDBObjectStoreParameters, storeInit?: (s: IDBObjectStore) => void } = { name: '' }) {
    this.options = options
  }

  async init(): Promise<LocalDB> {
    const idb = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB || (window as any).msIndexedDB
    if (!idb)
      throw new Error('浏览器不支持 indexdb')
    const { name, storeName = '', storeOptions = {}, storeInit = () => {} } = this.options
    this.storeName = storeName
    const request = idb.open(name)
    return new Promise((resolve, reject) => {
      request.onerror = () => reject(new Error('初始化数据库失败！'))
      request.onsuccess = () => resolve(request.result)
      request.onupgradeneeded = () => {
        const db = request.result
        const objectStore = db.createObjectStore(storeName, storeOptions)
        storeInit(objectStore)
      }
    })
  }
}

export function getLocalDocuments(db: LocalDB, DocumentID: number) {
  return new Promise<any[]>((resolve, reject) => {
    try {
      const transaction = db.transaction(['customers'], 'readonly')
      const store = transaction.objectStore('customers')
      const index = store.index('DocumentID')
      const req = index.openCursor(IDBKeyRange.only(DocumentID))
      const result: any[] = []
      req.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          result.push(cursor.value)
          cursor.continue()
        }
        else {
          result.sort(saveTimeSort)
          resolve(result)
        }
      }
      req.onerror = event => reject(event)
    }
    catch (e) {
      reject(e)
    }
  })
}

export function setLocalDocuments(db: LocalDB, localDocuments: any[], document: any = {}) {
  const draftIndex = 0
  if (localDocuments[draftIndex + 1] && localDocuments[draftIndex + 1].Content === localDocuments[draftIndex].Content) {
    return Promise.resolve()
  }
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(['customers'], 'readwrite')
    const store = transaction.objectStore('customers')
    let req: IDBRequest
    if (localDocuments.length >= MaxLocalDocumentLength) {
      const { id } = localDocuments.sort(saveTimeSort)[localDocuments.length - 1]
      req = store.put({ ...document, id })
    }
    else {
      req = store.add(document)
    }
    req.onsuccess = () => resolve()
    req.onerror = event => reject(event)
  })
}

export function setLocalDraft(db: LocalDB, localDocuments: any[], document: any = {}) {
  const draft = localDocuments[0]
  if (draft && document.Content === draft.Content) {
    return Promise.resolve()
  }
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(['customers'], 'readwrite')
    const store = transaction.objectStore('customers')
    const { id } = draft
    const req = store.put({ ...document, id })
    req.onsuccess = () => resolve()
    req.onerror = event => reject(event)
  })
}
