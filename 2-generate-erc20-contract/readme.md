1. Instalar o truffle:
    - npm install -g truffle

2. Instalar dependências:
    - npm i

## Compilação

Para compilar o contrato, execute o comando abaixo:

```bash
truffle compile
```

## Deploy

Para realizar o deploy do contrato, execute o comando abaixo:

Obs: é necessário que tenha fundos na carteira que irá realizar o Deploy!

```bash
truffle migrate --network development # Se for executado em uma rede local com Ganache
truffle migrate --network sepolia # Se for Testnet
```


   Deploying 'MichaelScottToken'
   -----------------------------
   > transaction hash:    0x882527138431b1d20ef5244013092f4206aed77698f818fcaf190d6437d4b99c
   > Blocks: 0            Seconds: 8
   > contract address:    0xAba4F467573E93A7348A9F0D650b714799678760
   > block number:        6808830
   > block timestamp:     1727985300
   > account:             0xf7b558bF7f439fcB5e05138b5A73fbfdEb7dbbD3
   > balance:             2.00562048076665068
   > gas used:            941706 (0xe5e8a)
   > gas price:           153.31697922 gwei
   > value sent:          0 ETH
   > total cost:          0.14437951923334932 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     0.14437951923334932 ETH