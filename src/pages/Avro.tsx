import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import avro from 'avsc'
import JSONTree from 'react-json-tree'
import styles from './Avro.module.css'
import Tabs from '../components/Tabs'
import Button from '../components/Button'

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
}

function Avro() {
  const [data, setData] = useState<{ schema: any; records: any } | null>(null)
  const [showRaw, setShowRaw] = useState(false)
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // const file = await readFile(acceptedFiles[0])
      // console.log(file)
      const [schema, records] = await new Promise((resolve, reject) => {
        const records: any = []
        let schema: any = null
        const decoder = avro.createBlobDecoder(acceptedFiles[0])
        decoder
          // @ts-ignore
          .on('metadata', function (type) {
            schema = type.toJSON()
          })
          .on('data', function (val) {
            if (records.length >= 10000) {
              resolve([schema, records])
              return
            }
            records.push(val)
          })
          .on('end', function () {
            resolve([schema, records])
          })
          .on('error', function (err) {
            reject(err)
          })
      })
      setData({ schema, records })
    },
  }) //{accept: '*'});

  const hasData = !!data

  const className = useMemo(
    () =>
      [
        styles.dropContainer,
        !hasData && styles.noData,
        hasData && styles.hasData,
        isDragActive && styles.active,
        isDragAccept && styles.accept,
        isDragReject && styles.reject,
      ]
        .filter((x) => x)
        .join(' '),
    [isDragActive, isDragReject, isDragAccept, hasData]
  )

  return (
    <div className={styles.container}>
      <div
        {...getRootProps({
          className,
          onClick: (event) => {
            hasData && event.stopPropagation()
          },
        })}
      >
        <input {...getInputProps({ className: styles.dropInput })} />
        <p className={styles.dropText}>
          Drag 'n' drop some files here, or click to select files
        </p>
        {data && (
          <Tabs
            rightElement={
              <Button
                onClick={() => setShowRaw((raw) => !raw)}
                selected={showRaw}
              >
                RAW
              </Button>
            }
            data={[
              {
                title: 'Schema',
                children: (
                  <code>
                    {showRaw ? (
                      <textarea
                        readOnly
                        style={{
                          width: '100%',
                          height: '800px',
                          fontFamily: 'source-code-pro, Menlo, monospace',
                        }}
                        value={JSON.stringify(data.schema, null, 2)}
                      />
                    ) : (
                      <JSONTree
                        data={data.schema}
                        theme={theme}
                        invertTheme
                        shouldExpandNode={() => true}
                      />
                    )}
                  </code>
                ),
              },
              {
                title: 'Records',
                children: showRaw ? (
                  <textarea
                    readOnly
                    style={{
                      width: '100%',
                      height: '800px',
                      fontFamily: 'source-code-pro, Menlo, monospace',
                    }}
                    value={JSON.stringify(data.records, null, 2)}
                  />
                ) : (
                  <code>
                    <JSONTree
                      data={data.records}
                      theme={theme}
                      invertTheme
                      hideRoot
                      shouldExpandNode={() => true}
                    />
                  </code>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}

export default Avro
