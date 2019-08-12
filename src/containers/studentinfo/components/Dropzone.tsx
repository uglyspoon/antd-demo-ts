import React, {useCallback, useEffect,useState } from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './Dropzone.less'
import XLS from 'assets/xls.svg';
import XLSX from 'assets/xlsx.svg';
import TRASH from 'assets/trash.svg';
import { message } from 'antd';
import ZIP from 'assets/ZIP.svg';
import RAR from 'assets/RAR.svg';

type fileType = {
  name: string;
  lastModified: number;
  suffix: string;
}

type DropzonePropsType = {
  saveFile: (file: File) => void;
  content: any;
  accept: string[];
}

function Dropzone({ saveFile, content, accept }: DropzonePropsType) {
  const [files, setFiles] = useState<fileType[]>([]);
  const onDrop = useCallback(acceptedFiles => {
    if (!acceptedFiles.length) {
      message.warning('请检查文件格式之后再试~')
    }
    setFiles(acceptedFiles.map((file:fileType ) => ({
      name: file.name,
      lastModified: file.lastModified,
      suffix: (file.name.split('.').pop() || '').toLocaleLowerCase()
    })))

    saveFile(acceptedFiles[0])
  }, [])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept});

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
                  {item.suffix === 'xlsx' && <img src={XLSX} alt="xlsx" />}
                  {item.suffix === 'xls' && <img src={XLS} alt="xls" />}
                  {item.suffix === 'zip' && <img src={ZIP} alt="zip" />}
                  {item.suffix === 'rar' && <img src={RAR} alt="zip" />}

                  <span className="file-title">{item.name}</span>
                </div>
                <img src={TRASH} alt="" style={{ width: 20, cursor: 'pointer' }} data-index={idx} onClick={onClickDelete}/>
              </div>
            })}
          </div> :
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            {content}
          </div>
      }
    </section>
  );
}
export default Dropzone;
