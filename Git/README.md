# Git #

เนื้อหาย้ายไปเขียนใน [Medium](https://medium.com/open-source-technology/git-%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-git-e8f873a4fdc) แทนแล้ว

Download: [https://git-scm.com/](https://git-scm.com/ "https://git-scm.com/")

ทดสอบว่าติดตั้งสำเร็จ `$ git --version`

คำสั่งต่างๆ

- `$ git init`  โดยโปรแกรมจะสร้าง Git repo folder (.git)  ขึ้นมาให้ 
- `$ git status`  บอกสถานะ
- `$ git add filename/folder`  ไว้เพิ่มไฟล์ลงไปใน version control
	- ถ้าไม่ต้องการ control version folder/file ไหน ให้ใส่ไว้ใน .gitignore ซึ่งเมื่อ `$ git status` จะไม่เห็น
- `$ git add -A` เพิ่มทั้งหมดเลย
- `$ git commit -m "commit message log"` สั่งให้ commit เข้าไปเป็น version ล่าสุด

# Github #

เป็น git repo server [https://github.com/](https://github.com/ "https://github.com/")
