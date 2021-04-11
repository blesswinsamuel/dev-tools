use std::fs::File;
use std::io::Error;

fn main() -> Result<(), Error> {
  // let filename = "/home/bless/Downloads/twitter.avro";
  let filename = "/home/bless/Downloads/twitter.snappy.avro";
  let mut encoded = File::open(filename).unwrap();
  let reader = avro_rs::Reader::new(&mut encoded).unwrap();

  // let mut file = Vec::new();
  // let wr = BufWriter::new(file);
  // let ser = serde_json::Serializer::new(wr);
  // println!("{:?}", reader.writer_schema().canonical_form());
  println!(
    "{:?}",
    serde_json::to_string(reader.writer_schema()).unwrap()
  );
  // let vals = reader.fold(Vec::new(), |acc, value| {
  //   use std::convert::TryFrom;
  //   match value {
  //     // Ok(v) => println!("{:?}", avro_rs::types::Value::from(v)),
  //     // Ok(v) => Ok(serde_json::to_string(
  //     //   &serde_json::Value::try_from(v).unwrap(),
  //     // )),
  //     Ok(v) => serde_json::Value::try_from(v),
  //     Err(e) => Err(e),
  //   };
  //   acc
  // });
  // let vals: Vec<Result<serde_json::Value, avro_rs::Error>> = reader.map(|value| {
  //   use std::convert::TryFrom;
  //   match value {
  //     // Ok(v) => println!("{:?}", avro_rs::types::Value::from(v)),
  //     // Ok(v) => Ok(serde_json::to_string(
  //     //   &serde_json::Value::try_from(v).unwrap(),
  //     // )),
  //     Ok(v) => serde_json::Value::try_from(v),
  //     Err(e) => Err(e),
  //   };
  //   serde_json::Value::try_from(value.unwrap())
  // }).collect();
  let vals: Vec<serde_json::Value> = reader
    .map(|value| {
      use std::convert::TryFrom;
      serde_json::Value::try_from(value.unwrap()).unwrap()
    })
    .collect();
  // println!("{:?}", serde_json::to_string(&vals.map(|x| x.unwrap())));
  println!("{:?}", serde_json::to_string(&vals).unwrap());

  // for value in reader {
  //   use std::convert::TryFrom;
  //   match value {
  //     // Ok(v) => println!("{:?}", avro_rs::types::Value::from(v)),
  //     Ok(v) => println!(
  //       "{:?}",
  //       serde_json::to_string(&serde_json::Value::try_from(v).unwrap())
  //     ),
  //     Err(e) => println!("Error: {}", e),
  //   };
  // }
  Ok(())
}
