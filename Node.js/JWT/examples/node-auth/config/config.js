module.exports = {
    port: process.env.PORT || 3000, // ถ้าไม่ระบุใน env ให้ใช้ port 3000 แทน
    debug: process.env.NODE_ENV === 'development',
    mongoUri: process.env.MLAB_DB,
    secret: process.env.SECRET
}