// Custom Type Formatting
// Date.prototype.formatDBType = a => a.getTime();

const Model = {
    db: require('../config').db, // เพื่อให้ /feature/model.js ตัวอื่น สามารถใช้งาน db object ได้
    async findAll() {
        try {
            let patients = await this.db.any(`select * from ${this.table}`);
            return patients;
        } catch (err) {
            throw err;
        }
    },
    async find(id) {
        try {
            let patient = await this.db.oneOrNone(`select * from ${this.table} where id = $1`, +id); // +id คือแปลง string to integer
            return patient;
        } catch (err) {
            throw err;
        }
    },
    async create(attrs) {
        try {
            const datas = this.withPermitedAttrs(attrs, {
                active: true
            });
            const values = Object.keys(datas).reduce((acc, curr) => {
                return acc + (acc.length === 0 ? '' : ', ') + ` $(${curr})`;
            }, '');
            const sql = `INSERT INTO ${this.table} ($(this~)) VALUES (${values}) RETURNING *`;
            
            let patient = await this.db.one(sql, datas);
            return patient;
        } catch (err) {
            throw err;
        }
    },
    async update(id, attrs) {
        try {
            const datas = this.withPermitedAttrs(attrs);
            const values = Object.keys(datas).reduce((acc, curr) => {
                return acc + (acc.length === 0 ? '' : ', ') + `"${curr}" = $(${curr})`;
            }, '');
            const sql = `UPDATE ${this.table} SET ${values} WHERE id = ${+id} RETURNING *`;
            let patient = await this.db.one(sql, datas);
            return patient;
        } catch (err) {
            throw err;
        }
    },
    async inactive(id) {
        try {
            let result = await this.db.result(`update ${this.table} SET active = false where id = $1`, +id); // +id คือแปลง string to integer
            // rowCount = number of rows affected by the query
            return result.rowCount;
        } catch (err) {
            throw err;
        }
    },
    async destroy(id) {
        try {
            let result = await this.db.result(`delete from ${this.table} where id = $1`, +id); // +id คือแปลง string to integer
            // rowCount = number of rows affected by the query
            return result.rowCount;
        } catch (err) {
            throw err;
        }
    },
    withPermitedAttrs(attrs, init = {}) {
        return this.permittedAttrs.reduce(
            (record, attr) => {
                return attrs[attr] ? Object.assign(record, {
                    [attr]: attrs[attr]
                }) : record
            }, init);
    }
};

module.exports = Model;