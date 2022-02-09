import React, { useState } from 'react';
import styles from './App.module.css';

const App = () => {

 const [files, setfiles] = useState([]);
 const [clas, setClas] = useState('');

 function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

 const deletePhoto = (id) => {
  setClas(id) 
  setTimeout(() => {
    let newFiles = [...files].filter(el => el.id !== id);
    setfiles(newFiles);
  }, 500)
 };


  const addInput = () => {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <input type="file" multiple={true} accept=".jpg, .png, .gif, .jpeg" id="file" onChange={(e) => getFile(e)}/>
          <label htmlFor='file' className={styles.btn}>Открыть</label>
          {files.length === 0 ? null : <button className={styles.btnPromary}>Загрузить</button>}
        </div>
        <div className={styles.previom}>
          {files.length !== 0 ? files.map(el => {
            return <div className={`${clas !== el.id ? styles.previomimg  : `${styles.previomimg} ${styles.removing}`}`}>
              <div className={styles.remove} onClick={() => deletePhoto(el.id)}>&times;</div>
              <img src={el.photo} alt="photo"/>
              <div className={styles.info}>{bytesToSize(el.size)}</div>
              </div>
          }): 
          <div className={styles.none}>фото отсутствуют</div>
          }
        </div>
      </div>
    )
  }

  const getFile = (e) => {
    const photos = Array.from(e.target.files);
    photos.map(el => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setfiles(prev => [
          ...prev, 
          {photo: ev.target.result, id: Math.random() * 100, size: el.size}
        ])
      }
      reader.readAsDataURL(el);
    })
  }



  return ( 
    <div className="App">
      {addInput()}
    </div>
  )
};



export default App;
