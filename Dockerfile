# Nodeイメージをベースにする
FROM node:18

# アプリディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# コンパイルしてアプリケーションをビルドする
RUN npm run build

# アプリケーションを起動
CMD ["npm", "start"]
