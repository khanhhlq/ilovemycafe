Live site: https://luyencode.net/

Phiên bản cải tiến (tùy chỉnh + thêm tiếng Việt), dựa trên mã nguồn mở [QDOJ](https://github.com/QingdaoU/OnlineJudge), nhánh clone của tác giả [Harry-zklcdc](https://github.com/Harry-zklcdc/OnlineJudge)

### Kiến trúc

Hệ thống Online Judge này bao gồm 3 module:
- Judger: https://github.com/luyencode/Judger ([Python wrapper](https://github.com/luyencode/JudgeServer))
- Web Backend: https://github.com/luyencode/OnlineJudge
- Web Frontend: https://github.com/luyencode/OnlineJudgeFE

Các module trên đều được đóng gói Docker và đã đẩy lên Docker Hub. Trong trường hợp cần thiết, bạn có thể sửa từng thành phần!

### Cài đặt trên máy Linux

1. Cài đặt môi trường

    ```bash
    sudo apt-get update && sudo apt-get install -y vim python-pip curl git
    pip install docker-compose
    ```

2. Cài Docker 

   ```bash
   sudo curl -sSL get.docker.com | sh
   ```


3. Clone repo

    ```bash
    git clone -b 2.0 https://github.com/luyencode/OnlineJudgeDeploy.git && cd OnlineJudgeDeploy
    ```

4. Khởi động

    ```bash
    docker-compose up -d
    ```

    > Nếu bạn không dùng user `root`，hãy sử dụng `sudo -E docker-compose up -d`.

Quá trình cài đặt có thể tốn từ 5 đến 30 phút phụ thuộc vào tốc độ mạng!

Sau đó, hãy kiểm tra bằng lệnh `docker ps -a`，nếu không có container nào ở trạng thái `unhealthy` hoặc `Exited (x) xxx` thì là ok rồi đó.

## Sử dụng


Truy cập cổng HTTP 80 hoặc cổng HTTPS 443 của máy chủ thông qua trình duyệt và bạn có thể bắt đầu sử dụng. Đường dẫn trang quản lý là `/admin`, tên người dùng quản trị viên được tự động thêm vào trong quá trình cài đặt là `root` và mật khẩu là `rootroot`. **Vui lòng thay đổi mật khẩu ngay**.

Tài liệu: http://opensource.qduoj.com/
