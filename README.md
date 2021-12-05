# week-3-assignment-furkan-sen

PROJE ONYUZU
Onyuz ejs kullanılarak yazilmistir
Oncelikle register kismindan kayit olunmalidir
Sonrasında login uzerinden giris yapilmalidir
Categories ve Posts sekmelerinden islemleri gerceklestirebilirsiniz

PROJE SERVISLERI
Onyuz tarafinda gerçeklestirilebilen tum islemler servisler vasitasi ile de gerçeklestirebilmektedir
User servisi haric diger servislerin kullanimi icin register ve login islemleri yapılmalıdır
Login islemi ile elde edilen token header'a "Authorization" key'i ile eklenmelidir

User Service

path: http://localhost:3000/service/user/register
method: post
sample data: {
                "fullname": "ali kaya",
                "email": "ali@mail.com",
                "password": "1234"
            }

path: http://localhost:3000/service/user/login
method: post
sample data: {
                "email": "ali@mail.com",
                "password": "1234"
            }
Not: token'a ulasmak için "data.token", token categories ve posts servisleri icin zorunludur


Category Service (Tüm endpointler ixin header'a authorization key'i ile token eklenmeli)

path: http://localhost:3000/service/categories
method: get

path: http://localhost:3000/service/categories/insert
method: post
sample data: {
                "name":"asd1076",
                "description":"asd"
            }

path: http://localhost:3000/service/categories/update
method: patch
sample data: {
                "_id":"61abe335df4efd8dbe4c7537",
                "name":"asd1076",
                "description":"asd"
            }

path: http://localhost:3000/service/categories/delete/:id
method: delete


Post Service (Tüm endpointler icin header'a authorization key'i ile token eklenmeli)

path: http://localhost:3000/service/posts
method: get

path: http://localhost:3000/service/posts/:id
method: get

path: http://localhost:3000/service/posts/insert
method: post
sample data: {
                "title":"test1 title",
                "caption":"test1 caption",
                "content":"test1 content",
                "categories":"test1 category"
            }

path: http://localhost:3000/service/posts/update
method: patch
sample data: {
                "_id":"61abe581671d8c6236d4d7cd",
                "title":"test1 title",
                "caption":"test1 caption",
                "content":"test1 content",
                "categories":"test1 category"
            }

path: http://localhost:3000/service/posts/delete/:id
method: delete
