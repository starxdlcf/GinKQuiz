FROM node:lts-alpine
WORKDIR /app
# Copia apenas os arquivos de dependências
COPY package.json package-lock.json ./
RUN npm install
# Copia o resto do projeto
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

