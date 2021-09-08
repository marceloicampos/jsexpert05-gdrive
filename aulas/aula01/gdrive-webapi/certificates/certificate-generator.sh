# Instalação no windows
# https://github.com/FiloSottile/mkcert

# Passo ZERO - Instalação do Chocolatey
# Abra o PowerShell como administrador e verifique as políticas de execução com o comando

# >>> Get-ExecutionPolicy

# Se retornar restricted então rode o comando

# >>> Set-ExecutionPolicy AllSigned e escolha Yes

# Consulte novamente o Get-ExecutionPolicy e verifique a mudança para sem restrições
# Então instale o Chocolatey de acordo com o site chocolatey.org ou usando o comando

# >>> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Passo 1 - Instalação do mkcert
# No terminal digite o comando a seguir, lembrando que é necessário ter o chocolatey instalado:

# choco install mkcert

# Passo 2 - Instalação do certificado
# Após ter instalado o mkcert digite os seguintes comandos dentro pasta certificates:

# mkcert -install

# e após o comando abaixo para criar os certificados

# mkcert -key-file key.pem -cert-file cert.pem 0.0.0.0 localhost 127.0.0.1 ::1
