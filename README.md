# 💵 API de Multas Brasil 
### A ideia desse repositório é obter dados de Multas de todos os Detrans, através de Web Scrap e retornar os dados das multas em JSON

# Estados suportados
Ainda não suportamos todos os estados, em breve  iremos adicionar mais estados, se quiser sugerir um estado, abra uma PR

|    DETRANS    |   SITUAÇÃO        |   DISPONIBILIDADE    |
|---------------|-------------------|----------------------|
|    Detran AC	|Em desenvolvimento |                      |
|    Detran AL	|	DISPONÍVEL      |    Operacional       |   
|    Detran DF	|   DISPONÍVEL      |    Operacional       |
|    Detran GO	|	DISPONÍVEL      |    Operacional       |
|    Detran MG	|	DISPONÍVEL      |    Operacional       |
|    Detran MS	|	DISPONÍVEL      |    Operacional       |
|    Detran PB	|	DISPONÍVEL      |    Operacional       |
|    Detran PE	|   DISPONÍVEL      |    Operacional       |
|    Detran SE	|   DISPONÍVEL      |    Operacional       |
|    Detran AM	|Em desenvolvimento |                      |
|    Detran BA	|Em desenvolvimento |                      |
|    Detran CE	|Em desenvolvimento |                      |
|    Detran ES	|Em desenvolvimento |                      |
|    Detran MA	|Em desenvolvimento |                      |
|    Detran MT	|Em desenvolvimento |                      |
|    Detran PA	|Em desenvolvimento |                      |
|    Detran PR	|Em desenvolvimento |                      |
|    Detran RJ	|Em desenvolvimento |                      |
|    Detran RN	|Em desenvolvimento |                      |
|    Detran RO	|Em desenvolvimento |                      |
|    Detran RR	|Em desenvolvimento |                      |
|    Detran RS	|Em desenvolvimento |                      |
|    Detran SC	|Em desenvolvimento |                      |
|    Detran SP	|Em desenvolvimento |                      |
|    Detran TO  |Em desenvolvimento |                      |

# Dependencias (Linux)
```bash
apt update -y && apt upgrade -y && apt install git curl -y 
```

# Instalando Node 18 Linux
```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash  && source ~/.profile  && nvm install 18 && nvm use 18
```

# Instalando Yarn Linux
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && sudo apt update -y && sudo apt install yarn -y && yarn global add pm2
```

# Instalando Node e Yarn Windows

https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

https://nodejs.org/pt-br/download

# Instalação API
```bash 
cd /opt/
```

```bash
git clone https://github.com/APIBrasil/api-multas.git && cd /api-multas
```

```bash
cp .env-exemplo .env && yarn && yarn start
```

# Exemplos de requests e respostas
### Endpoint

```
[POST] https://localhost:2222/multas/mg
```
```
[POST] https://localhost:2222/multas/al
```
### Payload
O payload é padrão para todos os estados.
```json
{ 
    "placa":"ABC1234",
    "renavam":"00000000000"
}
```

### Response
O response pode variar de acordo com o estado.
```json
{
    "placa": "ABC1234",
    "renavam": "00000000000",
    "multas": [
        {
            "sequencia": "1",
            "processo": "00000000",
            "descricao": "TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITIDA EM ATE 2",
            "local": "AV. RISOLETA NEVES  A 138M DA RUA RAIMUNDA FERREIR",
            "valor": 152.11
        },
        {
            "sequencia": "2",
            "processo": "00000000",
            "descricao": "DIRIGIR VEICULO SEGURANDO TELEFONE CELULAR",
            "local": "AVE AFONSO SILVA ESQUINA RUA ESPIRITO DE LUZ",
            "valor": 299.54
        }
    ]
}
```
# Observações
⚠️ Essa API é apenas parte de um estudo pessoal, use em produção por sua conta e risco, lembre-se essa API se basea em técnicas de web scrap para obter os dados em transformar em JSON, se o DETRAN do seu estado alterar algo nos avise para que possamos corrgir. 
