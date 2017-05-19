#Ubuntu Server 16.04 LTS

 - ตั้ง root password `$ sudo passwd root`
 - เปิดการใช้งาน ssh
	 - ติดตั้ง `sudo apt-get install openssh-server`
	 - ทดสอบว่า service ทำงานหรือไม่ `sudo service ssh status`
	 - ถ้าต้องการแก้การตั้งค่า เช่น port หรือ root login permission ให้แก้ที่ `sudo nano /etc/ssh/sshd_config` และเมื่อแก้ไขเสร็จแล้วให้ restart ssh `sudo service ssh restart`
 - PPA (Personal Package Archive) คือ แหล่ง Software จากผู้พัฒนาโปรแกรมภายนอกครับ ที่ไม่ใช่กลุ่มนักพัฒนาของ Ubuntu หรือ Linux Mint โดยตรง ทำขึ่นเพื่อให้เราสามารถ apt-get ติดตั้งโปรแกรมต่างๆได้ จากแหล่งซอฟแวร์ภายนอก Ubuntu ซึ่งมีขั้นตอนการติดตั้งดังนี้
	 - ต้องเพิ่ม repository ของผู้พัฒนาโปรแกรมนั้นๆ ก่อน `$ sudo add-apt-repository ppa:git-core/ppa`
	 - ต้อง update ก่อน `$ sudo apt-get update`
	 - และติดตั้งโปรแกรมที่ต้องการ `$ sudo apt-get install git`
	 - กรณีที่ติดปัญหา `add-apt-repository: command not found` ให้ติดตั้ง add-apt-repository command และ python-software-properties package (สำหรับ precise) ก่อน `$ sudo apt-get install software-properties-common python-software-properties`
 - ถ้า apt-get update แล้วเจอ error นี้
	>W: The repository 'cdrom://Ubuntu-Server 16.04.1 LTS _Xenial Xerus_ - Release amd64 (20160719) xenial Release' does not have a Release file.
	>
	>N: Data from such a repository can't be authenticated and is therefore potentially dangerous to use.
	>
	>N: See apt-secure(8) manpage for repository creation and user configuration details.
	>
	>E: Failed to fetch cdrom://Ubuntu-Server 16.04.1 LTS _Xenial Xerus_ - Release amd64 
	>(20160719)/dists/xenial/main/binary-amd64/Packages  Please use apt-cdrom to make this CD-ROM recognized by APT. apt-get update cannot be used to add new CD-ROMs
	>
	>E: Some index files failed to download. They have been ignored, or old ones used instead.
	>Error executing command, exiting

	แก้โดย
	- แก้ไขไฟล์ `$ sudo nano /etc/apt/sources.list` 
	- และให้ลบ หรือ comment บรรทัดนี้ `deb cdrom:[Ubuntu-Server 16.04 LTS _Xenial Xerus_ - Release amd64 (20160420.3)]/ xenial main restricted`

 - การติดตั้ง Node.js v6 โดยใช้ PPA
	 - `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
	 - `sudo apt-get install -y nodejs`
	 - install build tools to compile and install native addons from npm you may also need to install build tools `sudo apt-get install -y build-essential` 
	 - Check Node.js and NPM Version
		 - `$ node -v`
		 - `$ npm -v `
	 - Create Demo Web Server (Optional)
		 - `$ nano http_server.js` แล้วใส่โค้ดดังนี้
		 	```javascript
			var http = require('http');
			http.createServer(function (req, res) {
			  res.writeHead(200, {'Content-Type': 'text/plain'});
			  res.end('Hello World\n');
			}).listen(3001, "0.0.0.0");
			console.log('Server running on port 3001/');
			```
		 - รัน `$ node --debug http_server.js`
 - Firewall ([uwf - Uncomplicated Firewall](https://help.ubuntu.com/lts/serverguide/firewall.html))
 - การติดตั้ง Git
	 - `$ sudo apt-get update`
	 - `$ sudo apt-get install git`
	 - ตั้งค่าการใช้งานเบื้องต้น
		 - กำหนดชื่อผู้ใช้งาน `$ git config --global user.name "Your Name"`
		 - กำหนดอีเมลผู้ใช้งาน `$ git config --global user.email "youremail@domain.com"`
		 - ทดสอบว่ากำหนดถูกต้องหรือไม่ `$ git config --list`
		 - หรือถ้าต้องการแก้ไขไฟล์ config ใช้ `$ nano ~/.gitconfig`