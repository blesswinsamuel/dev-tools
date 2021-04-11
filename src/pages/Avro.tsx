import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactJson from 'react-json-view'
import styles from './Avro.module.css'
import Tabs from '../components/Tabs'
import Button from '../components/Button'
import { default as initWasm, process_avro } from '../../tools-wasm/pkg'
import wasmURL from '../../tools-wasm/pkg/tools_wasm_bg.wasm?url'

const theme = {
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
      try {
        await initWasm(new URL(wasmURL, window.location.origin))
        const buffer = new Uint8Array(await acceptedFiles[0].arrayBuffer())
        const avroFile = process_avro(buffer)
        const schema = JSON.parse(avroFile.get_schema())
        const records = JSON.parse(avroFile.get_record())
        console.log('SCHEMA', schema)
        console.log('RECORDS', records)
        setData({ schema, records })
      } catch (e) {
        console.log(e)
      }
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
                children: showRaw ? (
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
                  <code>
                    <ReactJson
                      src={data.schema}
                      theme={theme} // 'rjv-default'}
                      name={false}
                      style={{
                        fontFamily:
                          "'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas, monospace",
                        padding: '1em',
                      }}
                    />
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
                    <ReactJson
                      src={data.records}
                      theme={theme} // 'rjv-default'}
                      name={false}
                      style={{
                        fontFamily:
                          "'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas, monospace",
                        padding: '1em',
                      }}
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
