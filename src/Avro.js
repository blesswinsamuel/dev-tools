import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import avro from 'avsc'
import ReactJson from 'react-json-view'

const baseStyle = {
  flex: 1,
  display: 'flex',
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
  opacity: 1,
}

const acceptStyle = {
  borderColor: '#00e676',
  opacity: 1,
}

const rejectStyle = {
  borderColor: '#ff1744',
  opacity: 1,
}

const hasDataStyle = {
  opacity: 0,
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      resolve(data)
    }
    reader.onerror = e => {
      reject(e.target.error)
    }
    reader.readAsArrayBuffer(file)
  })
}

function Avro() {
  const [data, setData] = useState(null)
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: async acceptedFiles => {
      // const file = await readFile(acceptedFiles[0])
      // console.log(file)
      const d = await new Promise((resolve, reject) => {
        const records = []
        const decoder = avro.createBlobDecoder(acceptedFiles[0])
        decoder
          .on('data', function(val) {
            if (records.length >= 10000) {
              resolve(records)
              return
            }
            records.push(val)
          })
          .on('end', function() {
            resolve(records)
          })
          .on('error', function(err) {
            reject(err)
          })
      })
      setData(d)
    },
  }) //{accept: '*'});

  const hasData = !!data

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(hasData ? hasDataStyle : {}),
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, hasData]
  )

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {data && <ReactJson src={data} />}
    </div>
  )
}

export default Avro
