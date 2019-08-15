import React, {useState} from 'react';
import { Modal, Button, Alert, Icon } from 'antd';
import MyDropzone from './Dropzone';
import request from 'utils/request';
import { isSuccess } from 'utils';
import configs from 'utils/config';
import StandardTable, {StandardTableColumnProps} from 'components/StandardTable';
import ZIP from 'assets/ZIP.svg';
import RAR from 'assets/RAR.svg';
type ModalPropsType  = {
  visible: boolean;
  toggleVisible: any;
}

const defaultStatus = { uploaded: false, failNum: 0, successNum: 0, totalNum: 0, errorList:[] };
const accept: string[] = ['.zip', '.rar'];

const columns:StandardTableColumnProps[] = [
  {
    title: '学生',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sexStr',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '学号',
    dataIndex: 'sn',
  },
  {
    title: '院系',
    dataIndex: 'college',
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '班级',
    dataIndex: 'clazz',
  },
]

const UploadModal = ({visible, toggleVisible}: ModalPropsType) => {

  const [file, setFile] = useState()
  const [upStatus, setUpStatus] = useState(defaultStatus)

  const saveFile = (file: File) => {
    let formData = new FormData();
    formData.append('file', file);
    setFile(formData)
  }
  const downloadTemplateFile = async (event: any) => {
    event.preventDefault();
    const res = await request({
      url: '/file/downloadStuModel',
      method:'get'
    })
    if (isSuccess(res)) {
      let aElem = document.createElement('a');
      aElem.href = configs.HOST + '/admin/excel/studentModel.xlsx';
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, true);
      aElem.dispatchEvent(evt);
    }
  }

  const handleSubmit = async () => {
    const res  = await request({
      url: '/file/uploadPics',
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (isSuccess(res)) {
      setUpStatus({
        uploaded: true,
        ...res.data
      })
    }
  }
  const resetModal = () => {
    setFile(undefined)
    setUpStatus(defaultStatus)
  }
  const content = (
    <>
      <div style={{ display:'flex'}}>
        <img src={ZIP} alt="" style={{ width: 60 }} />
        <img src={RAR} alt="" style={{width:60}}/>
      </div>
      <h1 style={{marginTop: 20}}>将文件拖拽至此区域 或 <a>点击上传</a></h1>
      <span>仅限制上传100M以下RAR或ZIP格式文件</span>
    </>
  )
  return (
    <Modal
      title="上传基础数据"
      width="60%"
      visible={visible}
      onCancel={toggleVisible}
      centered
      footer={
        <div style={{ alignItems: 'center', justifyContent: 'center', display:'flex' }}>
          {
            upStatus.uploaded ?
              <Button onClick={resetModal} disabled={!file}>再次上传</Button> :
              <Button type='primary' onClick={handleSubmit} disabled={!file}>上传</Button>
          }

        </div>
      }
    >
      <Alert
        message="注意事项"
        description={
          <>
            <p><b>1.</b>上传前请先先将每张图片命名为学号，如201800001</p>
            <p><b>2.</b>命名后请将所有图片打包压缩，文件大小不能超过100M</p>
            <p><b>3.</b>压缩包支持zip和rar格式</p>
          </>
        }
        type="info"
      />

      <div style={{marginTop:20, marginBottom: 10}}>
        {/* <a href="" style={{ marginRight: 20 }} onClick={downloadTemplateFile}>
          <Icon type="file" style={{marginRight: 5}}/>下载标准Excel模版
        </a>
        <span>(上传前请先下载标准Excel模版并按照标准模版中的说明编辑文件)</span> */}
      </div>
      {
        upStatus.uploaded ?
          <>
            <h3>共上传
              <b style={{ color: '#1890ff' }}>{upStatus.totalNum}</b>条数据,
              成功<b style={{ color: '#1890ff' }}>{upStatus.successNum}</b>条,
              失败<b style={{ color: '#FF4D4F' }}>{upStatus.failNum}</b>条
            </h3>
            {
              upStatus.errorList.length ?
                <>
                  <h5 style={{color: 'red'}}>上传出错, 出错信息如下:</h5>
                  <ul>
                    {
                      upStatus.errorList.map(item => {
                        return <li key={item}>{item}</li>
                      })
                    }
                  </ul>
                </>
                :
                null
            }
            <StandardTable
              rowKey='key'
              columns={columns}
              data={{
                list: [{name: '123', key:1}],
                pagination: {}
              }}
            />
          </> :
          <MyDropzone
            saveFile={saveFile}
            content={content}
            accept={accept}
          />
      }
    </Modal>
  )
}
UploadModal.whyDidYouRender = true

export default React.memo(UploadModal)
