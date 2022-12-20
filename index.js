const conseiljssoftsigner = require('conseiljs-softsigner');
const {createWriteStream} = require('node:fs')
const readline = require('readline-sync')

let writeStream = createWriteStream('./generated.csv');
console.log('Generating keys...');

// async function createAccount() {
//     const mnemonic = conseiljssoftsigner.KeyStoreUtils.generateMnemonic();
//     console.log(`mnemonic: ${mnemonic}`);
//     const keystore = await conseiljssoftsigner.KeyStoreUtils.restoreIdentityFromMnemonic(mnemonic, '');
//     console.log(`account id: ${keystore.publicKeyHash}`);
//     console.log(`secret key: ${keystore.secretKey}`);
// }

const main = async () => {
    var numberToGenerate = readline.question('Berapa banyak : ');
    writeStream.write('Mnemonic,Private Key,Public Key\n');
    for(let i = 0; i < numberToGenerate; i++) {
        const mnemonic = conseiljssoftsigner.KeyStoreUtils.generateMnemonic();
        const keystore = await conseiljssoftsigner.KeyStoreUtils.restoreIdentityFromMnemonic(mnemonic, '');
        writeStream.write(`${mnemonic},${keystore.secretKey},${keystore.publicKeyHash}${i + 1 == numberToGenerate ? '' : '\n'}`);
    }
    writeStream.end();
    console.log('Wallets generated!');
}

main()