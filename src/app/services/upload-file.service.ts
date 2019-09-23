import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';


@Injectable()
export class UploadFileService {

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage) {

  }

  date: number;
  fullPatch: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  getFiles() {

    let ref = this.db.list('files');

    return ref.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

  }

  uploadToStorage(information): AngularFireUploadTask {

    this.date = Date.now();
    const newName = this.date + '.txt';
    const file = information;
    const filePath = `files/${newName}`;
    this.ref = this.afStorage.ref(filePath);
    this.task = this.ref.putString(file);
    this.fullPatch = this.task.downloadURL();

    console.log('task: ' + this.fullPatch);
    //console.log('metadata: ' + ref);

    return this.task;

  }

  storageInfoDataBase(metainfo) {

    console.log('metainfo: ' + metainfo);

    let toSave = {
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      //fullPatch: metainfo.fullPatch,
      fullPatch: 'teste',
      contentType: metainfo.contentType
    }

    return this.db.list('files').push(toSave);

  }

  delteFile(file) {

    console.log(file.fullPatch);
    let key = file.key;
    let storagePath = file.fullPatch;

    // Remove entry from database
    this.db.list('files').remove(key);

    // Remove file from storage
    return this.afStorage.ref(storagePath).delete();

  }

}
