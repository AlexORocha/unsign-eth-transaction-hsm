import os
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

# Defina o nome do arquivo e garanta que o caminho está correto
pem_file_name = "eth_txn_hard_way.pem"

# Caminho absoluto (opcional, caso o arquivo esteja no mesmo diretório)
current_directory = os.path.dirname(os.path.abspath(__file__))
pem_file_path = os.path.join(current_directory, pem_file_name)

# Ler o conteúdo do arquivo PEM
with open(pem_file_path, 'rb') as pem_file:
    pem_key = pem_file.read()

# Carregar a chave privada EC (Curva Elíptica) usando a biblioteca cryptography
private_key = serialization.load_pem_private_key(
    pem_key,
    password=None,
    backend=default_backend()
)

# Extrair a chave privada como um número inteiro (que representa a chave)
private_numbers = private_key.private_numbers()
private_value = private_numbers.private_value

# Converter o valor da chave privada para bytes (32 bytes, big-endian)
private_key_bytes = private_value.to_bytes(32, byteorder='big')

# Exibir a chave privada em formato hexadecimal (padrão Ethereum)
private_key_hex = private_key_bytes.hex()

# Exibir o resultado
print("Chave Privada (Hexadecimal):", private_key_hex)
