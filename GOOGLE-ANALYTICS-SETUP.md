# Hướng dẫn Setup Google Analytics cho Website

## 1. Tạo tài khoản Google Analytics
1. Truy cập: https://analytics.google.com
2. Đăng nhập bằng Gmail
3. Chọn "Bắt đầu đo lường"
4. Tạo Account name: "Duong Vu LED Repair"

## 2. Tạo Property (Thuộc tính)
1. Property name: "Duong Vu LED Website"
2. Reporting time zone: "Vietnam"
3. Currency: "Vietnamese Dong (VND)"

## 3. Thiết lập Data Stream
1. Chọn "Web"
2. Website URL: https://shortlink.vn/duongvu (hoặc GitHub Pages URL)
3. Stream name: "Website Traffic"

## 4. Lấy Tracking ID
1. Sau khi tạo → Copy "Measurement ID" (dạng G-XXXXXXXXXX)
2. Thay thế "G-XXXXXXXXXX" trong file index.html

## 5. Thông tin Analytics bạn sẽ có:
✅ **Real-time visitors** - Số người online hiện tại
✅ **Page views** - Lượt xem trang chi tiết
✅ **Traffic sources** - Nguồn traffic (Google, Facebook, Direct...)
✅ **Device breakdown** - Mobile vs Desktop
✅ **Location data** - Khách hàng từ đâu
✅ **Behavior flow** - Khách hàng xem gì trước
✅ **Conversion tracking** - Ai gọi điện, click Zalo

## 6. Advanced Features:
- **Goals setup** - Đo conversion (phone calls, form fills)
- **Event tracking** - Track button clicks, downloads
- **Audience insights** - Phân tích khách hàng tiềm năng
- **Custom reports** - Báo cáo theo nhu cầu

## 7. Privacy & GDPR
- Google Analytics tự động tuân thủ
- Data retention: 14 tháng (mặc định)
- IP anonymization: Tự động

## 8. Mobile Analytics App
- Tải Google Analytics app trên điện thoại
- Theo dõi real-time mọi lúc mọi nơi
- Push notifications cho traffic spikes

## Ưu điểm so với visitor counter cũ:
❌ Counter cũ: Fake được, chỉ localStorage, không chính xác
✅ Google Analytics: Data thật, professional, insights sâu

## Setup Instructions:
1. Làm theo 4 bước trên
2. Thay G-XXXXXXXXXX trong index.html bằng Measurement ID thật
3. Deploy website lên GitHub Pages
4. Đợi 24-48h để data bắt đầu hiển thị

## Cost:
- **Miễn phí** cho website nhỏ (< 10M pageviews/tháng)
- **Advanced features** có trong bản miễn phí
- **No limits** cho business insights