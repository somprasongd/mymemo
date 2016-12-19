# Git #

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