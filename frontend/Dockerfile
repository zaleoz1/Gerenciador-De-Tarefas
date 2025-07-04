# Etapa 1: build da aplicação React
FROM node:14 as build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Compila a aplicação
RUN npm run build

# Etapa 2: servidor Nginx para servir o build
FROM nginx:alpine

# Copia os arquivos da build para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta que a aplicação irá rodar
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]