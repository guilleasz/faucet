# Faucet

## Como empezar el proyecto

### Iniciar Nodo

Corre en la consola: 

```
npm run create-eth-account
```

Te va a pedir que ingreses una contraseña, recuerda esta contraseña y agregala a un archivo `.env` con el valor de `WALLET_PASSWORD`, También se te debería haber creado un archivo dentro de `data/keystore` agrega el relative path de este archivo en el valor `DATA_PATH` de env.

Ahora necesitas saber el address de la wallet para eso ejecuta el script: 

```
npm run get-eth-wallet-address
```

Y agrega el valor del Wallet al archivo `.env` con el valor de `WALLET_ADDRESS`.

Incluye tambien este address como key del `alloc` en `genesis.json`

Ahora corre:

```
npm run init-genesis
```

y finalmente:


```
npm run start-node
```
