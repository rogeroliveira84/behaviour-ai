// BehaviourAI.js
// A javascript library to track behaviour patterns using AI/ML approaches
// by Roger Oliveira
// 21/08/2019

function getHash(str, format = "SHA-256") {
    return crypto.subtle.digest(format, new TextEncoder('utf-8').encode(str))
        .then(hash => {
            window.hash = hash;
            // here hash is an arrayBuffer,
            // so we'll connvert it to its hex version
            let result = '';
            const view = new DataView(hash);
            for (let i = 0; i < hash.byteLength; i += 4) {
                result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
            }
            return result;
        });
}

let hashTable = new Map();

function addBehaviour(hashTable, payload) {

    if (!hashTable) {
        throw new Error('hashTable is required');
    }

    getHash(JSON.stringify(payload))
        .then(hash => {
            let value = hashTable.get(hash);
            value ? 
                ++value.rate : 
                hashTable.set(hash, { rate: 1, payload });
        })
        .catch(error => { throw new Error(error.message) });
}

(() => {
    addBehaviour(hashTable, { action: 'CREATE_CUSTOMER', payload: { name: 'Steve Jobs', birth: '1955-02-24' } });
    addBehaviour(hashTable, { action: 'CREATE_CUSTOMER', payload: { name: 'Steve Jobs', birth: '1955-02-24' } });
    addBehaviour(hashTable, { action: 'CREATE_CUSTOMER', payload: { name: 'Steve Jobs', birth: '1955-02-24' } });
    addBehaviour(hashTable, { action: 'CREATE_CUSTOMER', payload: { name: 'Bill Gates', birth: '1955-10-28' } });
    addBehaviour(hashTable, { action: 'CREATE_CUSTOMER', payload: { name: 'Bill Gates', birth: '1955-10-28' } });
    addBehaviour(hashTable, { action: 'CREATE_CUSTOMER', payload: { name: 'Seu Jorge', birth: '1970-06-08' } });
})();
