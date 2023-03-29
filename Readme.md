### Cài đặt các ứng dụng và môi trường
    * cài đặt xampp
    * cài nvm( cài  node js với v14.17.0) 
    * cài react

### Clone dự án
## sau khi clone đự án từ github 
* Với Phần 'fontend' chạy lần lượt các lệnh sau
    ```sh 
    cd ./Project_SERN/client
    npm init
    npm i 

* Với phần 'backend' chạy lần lượt các lệnh sau
    ```sh 
    cd ./Project_SERN/server
    npm init
    npm i 

* nếu thấy không folder node_module thì dùng lệnh ` npm i express ` 
### Tạo file .ENV config Port
tạo ` .env ` cho cả  client và server theo mẫu của file ` .env.example `

### Tạo database và chay migrate    
**Mở xampp( truy cập localhost:phpmysql)**
    
* tạo bảng với tên  ` project_SERN ` 

* use for create table after connet database 
    ```sh 
    npx sequelize-cli db:migrate 
    ```

* use for create fake database
    ```sh 
    npx sequelize-cli db:seed:all 
    ```

* nếu port 8000 bị sử  dụng dùng lênh sau để kill port( Linux)   
    ```sh 
    kill $(lsof -t -i:8000) 
    ```
