const { talepPool } = require('../../config/database');

exports.getOzet = async () => {
    const [durumlar] = await talepPool.query(`
        SELECT status, COUNT(*) as sayi
        FROM reservations
        GROUP BY status
    `);

    const [buAy] = await talepPool.query(`
        SELECT COUNT(*) as sayi
        FROM reservations
        WHERE MONTH(created_at) = MONTH(CURDATE())
        AND YEAR(created_at) = YEAR(CURDATE())
    `);

    const [departmanlar] = await talepPool.query(`
        SELECT department, COUNT(*) as sayi
        FROM reservations
        GROUP BY department
        ORDER BY sayi DESC
    `);

    const [sonYediGun] = await talepPool.query(`
        SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as tarih, COUNT(*) as sayi
        FROM reservations
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY tarih
        ORDER BY tarih DESC
        LIMIT 7
    `);

    const durumObj = {};
    durumlar.forEach(d => durumObj[d.status] = d.sayi);

    return {
        durum_sayilari: {
            pending: durumObj.pending || 0,
            approved: durumObj.approved || 0,
            rejected: durumObj.rejected || 0,
            cancelled: durumObj.cancelled || 0,
            completed: durumObj.completed || 0,
        },
        bu_ay: buAy[0].sayi,
        departman_dagilimi: departmanlar,
        son_yedi_gun: sonYediGun
    };
};

exports.getAll = async () => {
    const [rows] = await talepPool.query(`
        SELECT 
            r.id,
            r.department,
            r.start_date_time,
            r.end_date_time,
            r.purpose,
            r.status,
            r.created_at,
            r.notes,
            v.license_plate,
            v.brand,
            v.model,
            u.username
        FROM reservations r
        LEFT JOIN vehicles v ON r.vehicle_id = v.id
        LEFT JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC
        LIMIT 100
    `);
    return rows;
};