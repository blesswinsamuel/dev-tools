mod utils;

// use avro_rs::Schema;
use wasm_bindgen::prelude::*;

// fn parse_avro(s: String) -> String {
//     let r = String::from("hello ");
//     // let schemas = Schema::parse_list(&[raw_schema_1, raw_schema_2]).unwrap();

//     return r + &s;
// }

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(s: String) -> String {
    let r = String::from("hello ");
    // let schemas = Schema::parse_list(&[raw_schema_1, raw_schema_2]).unwrap();

    return r + &s;
}

#[wasm_bindgen]
pub struct AvroResponse {
    schema: String,
    record: String,
}

#[wasm_bindgen]
impl AvroResponse {
    pub fn get_schema(&self) -> String {
        return self.schema.clone();
    }
    pub fn get_record(&self) -> String {
        return self.record.clone();
    }
}

#[wasm_bindgen]
pub fn process_avro(data: Vec<u8>) -> AvroResponse {
    let reader = avro_rs::Reader::new(&data[..]).unwrap();

    let schema = reader.writer_schema();
    let schema = serde_json::to_string(schema).unwrap();
    let records: Vec<serde_json::Value> = reader
        .map(|value| {
            use std::convert::TryFrom;
            serde_json::Value::try_from(value.unwrap()).unwrap()
        })
        .collect();

    AvroResponse {
        schema,
        record: serde_json::to_string(&records).unwrap(),
    }
    // match file_reader.result() {
    //     Some(value) => match value {
    //         FileReaderResult::String(value) => value,
    //         _ => String::from("not a text"),
    //     }
    //     None => String::from("empty")
    // }
}
