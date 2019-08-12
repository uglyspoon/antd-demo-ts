import React, {useCallback, useEffect,useState } from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './Dropzone.less'
import XLS from 'assets/xls.svg';
import XLSX from 'assets/xlsx.svg';
import TRASH from 'assets/trash.svg';
import axios from 'axios';
import request from 'utils/request';


type fileType = {
  name: string;
  lastModified: number;
}
function Dropzone({ saveFile }: {saveFile: (file: File) => void}) {
  const [files, setFiles] = useState<fileType[]>([]);
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map((file:fileType ) => ({
      name: file.name,
      lastModified: file.lastModified,
    })))
    saveFile(acceptedFiles[0])
  }, [])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});

  const onClickDelete = async (e: any) => {
    setFiles([])
  }
  return (
    <section className={styles.container}>
      {
        files.length ?
          <div className='dropzone'>
            {files.map((item, idx) => {
              return <div key={item.lastModified} className="file-container">
                <div>
                  <img src={XLSX} alt="" />
                  <span className="file-title">{item.name}</span>
                </div>
                <img src={TRASH} alt="" style={{ width: 20, cursor: 'pointer' }} data-index={idx} onClick={onClickDelete}/>
              </div>
            })}
          </div> :
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <img src={XLS} alt="" style={{width:60}}/>
            <h1 style={{marginTop: 20}}>将模版拖拽至此区域 或 <a>点击上传</a></h1>
            <span>仅限制上传10M以下xls或xlsx格式文件</span>
          </div>
      }
    </section>
  );
}
export default Dropzone;
