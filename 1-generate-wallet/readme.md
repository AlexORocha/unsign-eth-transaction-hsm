# Gerar Wallet

1. Gerar uma Carteira:
    - openssl ecparam -name secp256k1 -genkey -out eth_txn_hard_way.pem

2. Ler o valor da chave privada da carteira:
    - openssl ec -in eth_txn_hard_way.pem -noout -text |sed -n '/priv:/,/pub:/p' |grep -v priv |grep -v pub | tr -d ' :\n'
    (a4ac710e01f56deb2ef4822987e1e85d9ce51d90312fe24ad7f07c86b08fc558)

3. Extrair a chave pública da carteira:
    - openssl ec -in eth_txn_hard_way.pem -noout -text |sed -n '/pub:/,/ASN/p' |grep -v pub |grep -v ASN | tr -d ' :\n' | cut -c 3-
    (5096e9fff1fd5f91f5f1fbca9d59ac476d0c49bf298e487fc19afc13e10eb4153355954cdb595516b88628d5f1af8dde7d97e71be3ea0a6bd9a2520cb4e4f9b0)

4. Calcular Keccak-256 hash:
    - virtualenv venv
    - source venv/bin/activate
    - pip install -r requirements.txt
    - python3 keccak.py 5096e9fff1fd5f91f5f1fbca9d59ac476d0c49bf298e487fc19afc13e10eb4153355954cdb595516b88628d5f1af8dde7d97e71be3ea0a6bd9a2520cb4e4f9b0
    (2da6c4feecb7c8cab1bd14e0f7b558bf7f439fcb5e05138b5a73fbfdeb7dbbd3)

5. Truncar o endereço final:
    - echo 2da6c4feecb7c8cab1bd14e0f7b558bf7f439fcb5e05138b5a73fbfdeb7dbbd3| cut -c 25-
    (f7b558bf7f439fcb5e05138b5a73fbfdeb7dbbd3)

6. Adicionar o 0x:
    - 0xf7b558bf7f439fcb5e05138b5a73fbfdeb7dbbd3

## Referências

https://lsongnotes.wordpress.com/2017/12/28/ethereum-key-and-address-from-shell/
https://lsongnotes.wordpress.com/2018/01/14/signing-an-ethereum-transaction-the-hard-way/