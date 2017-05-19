# Java SE 8 #

- ติดตั้ง JDK บน Windows

	ดาวน์โหลด JDK [http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html "Download JDK 8") 

- ตั้งค่า Windows 10 Environtment
	
	- JAVA_HOME : C:\Program Files\Java\jdk1.8.0_112
	- JDK_HOME  : %JAVA_HOME%
	- JRE_HOME  : %JAVA_HOME%\jre
	- CLASSPATH : .;%JAVA_HOME%\lib;%JAVA_HOME%\jre\lib
	- PATH      : your-unique-entries;%JAVA_HOME%\bin (make sure that the longish your-unique-entries does not contain any other references to another Java installation folder.
	[There is a blogpost explaining the rationale behind all these environment variables.](http://gedankenverlust.blogspot.de/2012/05/java-environment-variables-definitive.html)
	
	Optional recommendations

	- Add an user environment variable JAVA_TOOL_OPTIONS with value -Dfile.encoding="UTF-8". This ensures that Java (and tools such as Maven) will run with a Charset.defaultCharset() of UTF-8 (instead of the default Windows-1252). This has saved a lot of headaches when wirking with my own code and that of others, which unfortunately often assume the (sane) default encoding UTF-8.
	- When JDK is installed, it adds to the system environment variable Path an entry C:\ProgramData\Oracle\Java\javapath;. I anecdotally noticed that the links in that directory didn't get updated during an JDK installation update. So it's best to remove C:\ProgramData\Oracle\Java\javapath; from the Path system environment variable in order to have a consistent environment.

- ติดตั้ง Netbeans IDE
	
	1. ดาวน์โหลด Netbeans [https://netbeans.org/](https://netbeans.org/)
	2. เมื่อติดตั้งเสร็จให้ เปิด และปิด Netbeans ก่อน 1 ครั้ง
	3. แก้ไข config เพื่อเพิ่ม RAM ที่ไฟล์ /etc/netbeans.conf ที่ netbeans\_default\_options
	
	
	```
	netbeans_default_options="-J-client -J-Xss2m -J-Xms1024m -J-XX:PermSize=350m -J-Xmx3072m -J-XX:MaxPermSize=700m -J-Dapple.laf.useScreenMenuBar=true -J-Dapple.awt.graphics.UseQuartz=true -J-Dsun.java2d.noddraw=true -J-Dsun.java2d.dpiaware=true -J-Dsun.zip.disableMemoryMapping=true"
	```

- เนื้อหา
	
	-	Section 1: Variables, Datatypes and Operators
	-	Section 2: Expressions, Statements, Code blocks, Methods and more
	-	Section 3: Control Flow Statements
	-	Section 4: OOP Part 1 - Classes, Constructors and Inheritance
	-	Section 5: OOP Part 2 - Composition, Encapsulation, and Polymorphism
	-	Section 6: Arrays, Java inbuilt Lists, Autoboxing and Unboxing
	-	Section 7: Inner and Abstract Classes & Interfaces
	-	Section 8: Java Generics
	-	Section 9: Naming Conventions and Packages. static and final keywords
	-	Section 10: Java Collections
	-	Section 11: JavaFX
	-	Section 12: Basic Input & Output including java.util
	-	Section 13: Concurrency in Java
	-	Section 14: Lambda Expressions
	-	Section 15: Regular Expressions
	-	Section 16: Debugging and Unit Testing
	-	Section 17: Databases
	-	Section 18: Multithread
	-	Section 19: Web Service
	-	Section 20: WebSocket

