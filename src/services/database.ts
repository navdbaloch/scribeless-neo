import firebase from 'firebase';
import store from '../store/index';

/**
 * Wrapper for firesore access
 */
class Database {
  /**
   * Firestore ref
   */
  db = firebase.firestore();

  /**
   * Fetch a list of records
   * @param collectionName
   */
  async get<T>(collectionName: CollectionEnum): Promise<T[] | boolean> {
    store.dispatch('loader/show');
    try {
      const querySnapshot = await this.db
        .collection(collectionName)
        .where('userId', '==', store.getters.user.data.id)
        .get();
      const data: any[] = [];
      querySnapshot.forEach((doc) => data.push(doc.data()));
      return data;
    } catch (err) {
      return false;
    } finally {
      store.dispatch('loader/hide');
    }
  }

  /**
   * Add a new document to firestore
   * @param record document to store
   * @param collectionName the collection where the document should be stored
   */
  async add(
    record: any,
    collectionName: CollectionEnum
  ): Promise<firebase.firestore.DocumentData | undefined | boolean> {
    record.userId = store.getters.user.data.id;
    store.dispatch('loader/show');
    try {
      const doc = await this.db.collection(collectionName).add(record);
      return (await doc.get()).data();
    } catch (err) {
      return false;
    } finally {
      store.dispatch('loader/hide');
    }
  }
}

export enum CollectionEnum {
  Favourites = 'user_favs',
}
export default new Database();
