import argparse
from Crypto.Hash import keccak

# Configurar o argparse para receber o argumento public_key
parser = argparse.ArgumentParser(description="Calcula o hash Keccak-256 de uma public_key")
parser.add_argument('public_key', type=str, help="Public key no formato hexadecimal")
args = parser.parse_args()

# Pegar o public_key passado como argumento
public_key = args.public_key

# Calcular o hash Keccak-256
keccak_hash = keccak.new(digest_bits=256)
pub = bytearray.fromhex(public_key)
keccak_hash.update(bytes(pub))

# Exibir o resultado
print(keccak_hash.hexdigest())
