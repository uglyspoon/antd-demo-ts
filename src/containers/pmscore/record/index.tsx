import React, {useEffect, useState, useCallback, MouseEvent} from 'react';
import styles from './style.module.less';
import { ProfileData } from './data.d';
import { Row, Col, Button, Modal, Alert, Icon, Divider, message } from 'antd';
import MyDropzone from './components/Dropzone';
import request from 'utils/request';
import configs from 'utils/config';
import StandardTable, {StandardTableColumnProps} from 'components/StandardTable';

interface profileProps {
  profile: ProfileData;
  loading: boolean;
}

const Record: React.FC<profileProps> = ({ loading, profile }) => {

  const [file, setFile] = useState<any>()
  const [upStatus, setUpStatus] = useState({uploaded: false, failNum: 0, successNum: 0, totalNum: 0})
  const handleSubmit = async () => {
    const res  = await request({
      url: '/file/importStuModel',
      method: 'post',
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('res', res)
    if (res && res.status === 200) {
      setUpStatus({
        uploaded: true,
        ...res.data
      })
    }
  }
  const downloadTemplateFile = async (e: MouseEvent) => {
    e.preventDefault();
    const res = await request({
      url: '/file/downloadStuModel',
      method:'get'
    })
    if (res) {
      let aElem = document.createElement('a');
      aElem.href = configs.HOST + '/admin/excel/studentModel.xlsx';
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, true);
      aElem.dispatchEvent(evt);
    } else {
      message.error('下载出错~')
    }
  }
  const saveFile = (file: File) => {
    let formData = new FormData();
    formData.append('file', file);
    setFile(formData)
  }
  const columns:StandardTableColumnProps[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
  ]
  return (
    <>
      { console.log('file modal', file)}
      <Row>
        <Col><Button type="primary">上传基础数据</Button></Col>
      </Row>
      <Modal
        title="上传基础数据"
        width="60%"
        visible={false}
        centered
        footer={
          <div style={{ alignItems: 'center', justifyContent: 'center', display:'flex' }}>
            <Button type='primary' onClick={handleSubmit} disabled={!file}>上传</Button>
          </div>
        }
      >
        <Alert
          message="注意事项"
          description={
            <>
              <p><b>1.</b>上传前请先下载标准Excel模版并按照标准模版中的说明编辑文件</p>
              <p><b>2.</b>一次最多上传1000行数据，文件大小不能超过10M</p>
              <p><b>3.</b>支持xls或xlsx格式的文件</p>
            </>
          }
          type="info"
        />

        <div style={{marginTop:20, marginBottom: 10}}>
          <a href="" style={{marginRight:20}} onClick={downloadTemplateFile}><Icon type="file" />下载标准Excel模版</a>
          <span>(上传前请先下载标准Excel模版并按照标准模版中的说明编辑文件)</span>
        </div>
        {
          upStatus.uploaded ?
            <>
              <div>共上传{upStatus.totalNum}条数据, 成功{upStatus.successNum}条， 失败{upStatus.failNum}条</div>
              <StandardTable
                rowKey='id'
                columns={columns}
                data={{
                  list: [{name: '123', key:1}],
                  pagination: {}
                }}
              />
            </> :
          <MyDropzone saveFile={saveFile}/>
        }
      </Modal>
    </>
  )
}
export default Record;

