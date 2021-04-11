#!/usr/bin/env bash
# https://gist.github.com/lightdiscord/9ee47c760be963604a7fcac4a7dd0f94

set -xe

if [[ "$SKIP_WASM_BUILD" == "true" ]]; then
    echo "Skipping wasm build"
    exit 0
fi

# cweb_version=0.6.16
# cweb=https://github.com/koute/cargo-web/releases/download/$cweb_version/cargo-web-x86_64-unknown-linux-gnu.gz
# curl -Lo cargo-web.gz $cweb
# gunzip cargo-web.gz
# chmod u+x cargo-web

# binaryen_version=version_51
# binaryen=https://github.com/WebAssembly/binaryen/releases/download/$binaryen_version/binaryen-$binaryen_version-x86_64-linux.tar.gz
# curl -Lo binaryen.tar.gz $binaryen
# tar -xzf binaryen.tar.gz

# curl https://sh.rustup.rs -sSf | sh -s - --default-toolchain nightly -y
cd tools-wasm

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s - --default-toolchain nightly -y
source ~/.cargo/env
rustup target add wasm32-unknown-unknown

curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s - -y

wasm-pack build --target web
# ./cargo-web deploy --target=wasm32-unknown-unknown --release

# shopt -s nullglob
# for filename in ./target/deploy/*.wasm
# do
#     ./binaryen-$binaryen_version/wasm-opt -Oz -d -o $filename $filename 2> /dev/null
# done
